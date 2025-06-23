
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuiz, getSkinTypeFormatted } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "../SkinTypeDetails";

// Configuration Klaviyo - À remplacer par des variables d'environnement
const KLAVIYO_PUBLIC_KEY = "pk_test_YOUR_PUBLIC_KEY"; // À configurer
const KLAVIYO_API_BASE = "https://a.klaviyo.com/api";

export const useKlaviyoIntegration = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();

  const trackQuizEvent = async (eventName: string, properties: any) => {
    try {
      const response = await fetch(`${KLAVIYO_API_BASE}/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "revision": "2023-12-15",
        },
        body: JSON.stringify({
          data: {
            type: "event",
            attributes: {
              properties: {
                ...properties,
                $source: "quiz_app",
                timestamp: new Date().toISOString(),
              },
              metric: {
                data: {
                  type: "metric",
                  attributes: { name: eventName }
                }
              },
              profile: {
                data: {
                  type: "profile",
                  attributes: {
                    email: email,
                    first_name: firstName,
                  }
                }
              }
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Klaviyo API error: ${response.status}`);
      }

      console.log(`✅ Klaviyo event '${eventName}' tracked successfully`);
    } catch (error) {
      console.error(`❌ Failed to track Klaviyo event '${eventName}':`, error);
      throw error;
    }
  };

  const createOrUpdateProfile = async () => {
    const formattedSkinType = getSkinTypeFormatted(state.result);
    const skinTypeInFrench = getSkinTypeText(formattedSkinType);
    const skinDetails = getSkinTypeDetails(state.result || "normal");

    try {
      const response = await fetch(`${KLAVIYO_API_BASE}/profiles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "revision": "2023-12-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile",
            attributes: {
              email: email,
              first_name: firstName,
              properties: {
                skin_type: formattedSkinType,
                skin_type_french: skinTypeInFrench,
                quiz_completed: true,
                quiz_completion_date: new Date().toISOString(),
                skin_characteristics: skinDetails.characteristics,
                skin_factors: skinDetails.factors,
                routine_recommendation: skinDetails.routineRecommendation,
                quiz_answers: state.answers,
                gdpr_consent: gdprConsent,
              }
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Klaviyo profile API error: ${response.status}`);
      }

      console.log("✅ Klaviyo profile created/updated successfully");
    } catch (error) {
      console.error("❌ Failed to create/update Klaviyo profile:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Merci d'accepter les conditions d'utilisation pour recevoir ta routine personnalisée.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("🚀 Début de l'intégration Klaviyo directe");

    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      // 1. Créer ou mettre à jour le profil
      await createOrUpdateProfile();

      // 2. Tracker l'événement de completion du quiz
      await trackQuizEvent("Quiz Completed", {
        skin_type: getSkinTypeFormatted(state.result),
        skin_type_french: getSkinTypeText(getSkinTypeFormatted(state.result)),
        quiz_answers: state.answers,
        email: email,
        first_name: firstName,
      });

      // 3. Tracker chaque réponse individuellement pour des segments plus fins
      for (const [questionId, answer] of Object.entries(state.answers)) {
        await trackQuizEvent("Quiz Answer", {
          question_id: questionId,
          answer: answer,
          email: email,
        });
      }

      setIsSubscribed(true);
      toast({
        title: "Merci ! 💝",
        description: "Ta routine personnalisée arrive dans ta boîte mail 💌",
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'intégration Klaviyo:", error);
      toast({
        title: "Oups !",
        description: "Une erreur est survenue. Merci de réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    isSubscribed,
    isLoading,
    gdprConsent,
    setGdprConsent,
    handleSubmit,
    trackQuizEvent
  };
};
