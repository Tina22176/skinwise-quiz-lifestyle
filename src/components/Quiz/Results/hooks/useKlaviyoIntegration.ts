
import { useCallback } from "react";
import { logger } from "@/utils/logger";
import { KLAVIYO_CONFIG, KLAVIYO_ENDPOINTS } from "@/config/klaviyo";

export const useKlaviyoIntegration = () => {
  const trackCustomEvent = useCallback(async (
    email: string, 
    eventName: string, 
    properties: Record<string, any>
  ) => {
    try {
      const eventData = {
        data: {
          type: "event",
          attributes: {
            properties: {
              ...properties,
              timestamp: new Date().toISOString(),
              source: 'quiz_app'
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email
                }
              }
            },
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: eventName
                }
              }
            }
          }
        }
      };

      logger.log('📊 ENVOI ÉVÉNEMENT KLAVIYO:', {
        event: eventName,
        email: email,
        properties: properties
      });

      const response = await fetch('https://a.klaviyo.com/api/events/', {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
          'Content-Type': 'application/json',
          'revision': KLAVIYO_CONFIG.apiVersion
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        logger.log('✅ ÉVÉNEMENT KLAVIYO ENVOYÉ:', { event: eventName, email });
      } else {
        const errorText = await response.text();
        logger.error('❌ ERREUR ÉVÉNEMENT KLAVIYO:', { 
          status: response.status, 
          error: errorText 
        });
      }
    } catch (error) {
      logger.error('❌ ERREUR TRACKING ÉVÉNEMENT:', error);
    }
  }, []);

  const subscribeToNewsletter = useCallback(async (
    email: string, 
    firstName: string, 
    skinType: string,
    skinState?: string | null,
    quizAnswers?: Record<string, string>,
    skinCharacteristics?: string[],
    skinConcerns?: string[]
  ) => {
    logger.log('🚀 KLAVIYO INTEGRATION - Début envoi données', {
      email,
      firstName,
      skinType,
      skinState,
      hasAnswers: !!quizAnswers,
      answersCount: quizAnswers ? Object.keys(quizAnswers).length : 0
    });

    // Cas spécial : peau X + peau sensible
    const isSensitiveSkin = skinState === 'sensitive';
    const combinedSkinType = isSensitiveSkin ? `${skinType}_sensitive` : skinType;
    
    logger.log('📊 ANALYSE TYPE DE PEAU:', {
      originalType: skinType,
      skinState,
      isSensitive: isSensitiveSkin,
      finalType: combinedSkinType,
      characteristics: skinCharacteristics,
      concerns: skinConcerns
    });

    try {
      const profileData = {
        data: {
          type: "profile",
          attributes: {
            email: email,
            first_name: firstName,
            properties: {
              // Type de peau principal
              skin_type: skinType,
              skin_state: skinState || 'normal',
              combined_skin_type: combinedSkinType,
              
              // Informations détaillées
              is_sensitive_skin: isSensitiveSkin,
              skin_characteristics: skinCharacteristics?.join(', ') || '',
              skin_concerns: skinConcerns?.join(', ') || '',
              
              // Métadonnées du quiz
              quiz_completed: true,
              quiz_completion_date: new Date().toISOString(),
              subscription_source: "skin_quiz_premium",
              
              // Réponses détaillées du quiz pour analyse
              quiz_answers: quizAnswers ? JSON.stringify(quizAnswers) : '{}',
              total_questions_answered: quizAnswers ? Object.keys(quizAnswers).length : 0,
              
              // Données pour segmentation Klaviyo
              segment_primary: skinType,
              segment_secondary: skinState || 'normal',
              segment_combined: combinedSkinType,
              
              // Trigger pour les flux automatiques
              flow_trigger: `quiz_completed_${combinedSkinType}`,
              last_quiz_date: new Date().toISOString()
            }
          }
        }
      };

      logger.log('📤 ENVOI À KLAVIYO - Données préparées:', {
        endpoint: KLAVIYO_ENDPOINTS.profiles,
        email: profileData.data.attributes.email,
        skinType: profileData.data.attributes.properties.skin_type,
        skinState: profileData.data.attributes.properties.skin_state,
        combinedType: profileData.data.attributes.properties.combined_skin_type,
        flowTrigger: profileData.data.attributes.properties.flow_trigger,
        isSensitive: profileData.data.attributes.properties.is_sensitive_skin
      });

      const response = await fetch(KLAVIYO_ENDPOINTS.profiles, {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
          'Content-Type': 'application/json',
          'revision': KLAVIYO_CONFIG.apiVersion
        },
        body: JSON.stringify(profileData)
      });

      const responseData = await response.text();
      
      logger.log('📨 RÉPONSE KLAVIYO:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData
      });

      if (!response.ok) {
        throw new Error(`Klaviyo API Error: ${response.status} - ${responseData}`);
      }

      const result = responseData ? JSON.parse(responseData) : {};
      
      // Envoyer un événement personnalisé pour déclencher les flux
      await trackCustomEvent(email, 'Quiz Completed', {
        skin_type: skinType,
        skin_state: skinState || 'normal',
        combined_skin_type: combinedSkinType,
        is_sensitive: isSensitiveSkin,
        flow_trigger: `quiz_completed_${combinedSkinType}`
      });

      logger.log('✅ KLAVIYO SUCCESS - Profil créé/mis à jour:', {
        profileId: result.data?.id,
        email: email,
        combinedSkinType: combinedSkinType
      });

      return { success: true, data: result, profileId: result.data?.id };
    } catch (error) {
      logger.error('❌ KLAVIYO ERROR - Échec envoi:', {
        error: error.message,
        email: email,
        skinType: skinType,
        skinState: skinState,
        stack: error.stack
      });
      return { success: false, error };
    }
  }, [trackCustomEvent]);

  return {
    subscribeToNewsletter,
    trackCustomEvent
  };
};
