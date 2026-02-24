
import { useCallback } from "react";
import { logger } from "@/utils/logger";
import { BREVO_CONFIG, BREVO_ENDPOINTS } from "@/config/brevo";

export const useBrevoIntegration = () => {
  const trackCustomEvent = useCallback(async (
    email: string, 
    eventName: string, 
    properties: Record<string, any>
  ) => {
    // Brevo supporte aussi le tracking d'événements mais c'est moins central que Klaviyo
    // Pour l'instant on se concentre sur les attributs de contact, mais on garde la structure
    try {
      logger.log('📊 TRACKING EVENT BREVO (Simulé pour l\'instant):', {
        event: eventName,
        email: email,
        properties: properties
      });
      
      // Note: L'API événements de Brevo nécessite souvent une configuration différente (tracker JS)
      // ou l'utilisation de l'endpoint automation/events.
      // Pour ce MVP de migration, on se concentre sur la mise à jour des contacts qui suffit aux scénarios.
      
    } catch (error) {
      logger.error('❌ ERREUR TRACKING ÉVÉNEMENT BREVO:', error);
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
    logger.log('🚀 BREVO INTEGRATION - Début envoi données', {
      email,
      firstName,
      skinType,
      skinState,
      listId: BREVO_CONFIG.listId
    });

    // Cas spécial : peau X + peau sensible
    const isSensitiveSkin = skinState === 'sensitive';
    const combinedSkinType = isSensitiveSkin ? `${skinType}_sensitive` : skinType;
    
    // Préparation des attributs Brevo (MAJUSCULES requises par convention standard, mais dépend de ta config)
    // On envoie les données clés pour la segmentation
    const attributes = {
      FIRSTNAME: firstName,
      SKIN_TYPE: skinType,
      SKIN_STATE: skinState || 'normal',
      COMBINED_SKIN_TYPE: combinedSkinType,
      IS_SENSITIVE: isSensitiveSkin,
      SKIN_CHARACTERISTICS: skinCharacteristics?.join(', ') || '',
      SKIN_CONCERNS: skinConcerns?.join(', ') || '',
      QUIZ_COMPLETED: true,
      QUIZ_DATE: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD souvent préférable
      ORIGIN: "quiz_skinwise"
    };

    try {
      const payload = {
        email: email,
        attributes: attributes,
        listIds: [BREVO_CONFIG.listId],
        updateEnabled: true // Important: met à jour si le contact existe déjà
      };

      logger.log('📤 ENVOI À BREVO - Payload:', payload);

      const response = await fetch(BREVO_ENDPOINTS.contacts, {
        method: 'POST',
        headers: {
          'api-key': BREVO_CONFIG.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json().catch(() => ({}));
      
      logger.log('📨 RÉPONSE BREVO:', {
        status: response.status,
        ok: response.ok,
        data: responseData
      });

      if (!response.ok) {
        // Gestion spécifique des erreurs Brevo
        // Code 'duplicate_parameter' n'arrivera pas avec updateEnabled: true, mais au cas où
        throw new Error(`Brevo API Error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      logger.log('✅ BREVO SUCCESS - Contact créé/mis à jour');

      return { success: true, data: responseData };
    } catch (error) {
      logger.error('❌ BREVO ERROR - Échec envoi:', {
        error: error.message,
        email: email,
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
