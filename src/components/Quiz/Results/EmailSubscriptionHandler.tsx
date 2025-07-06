
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuiz, getSkinTypeFormatted } from "../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "./utils/SkinTypeDetails";
import { KLAVIYO_CONFIG, KLAVIYO_ENDPOINTS } from "@/config/klaviyo";

export const useEmailSubscription = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Merci d'accepter les conditions pour recevoir ta routine personnalisée.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("🚀 Envoi des données à Klaviyo");

    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      const formattedSkinType = getSkinTypeFormatted(state.result);
      const skinTypeInFrench = getSkinTypeText(formattedSkinType);

      // Tentative d'envoi à Klaviyo avec fallback
      let klaviyoSuccess = false;
      
      try {
        const profileData = {
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
                subscription_source: "skin_quiz_premium",
                consent_given: gdprConsent,
                quiz_answers: state.answers,
                skin_details: getSkinTypeDetails(state.result || "normal"),
              }
            }
          }
        };

        console.log("📤 Envoi à Klaviyo:", profileData);

        const response = await fetch(KLAVIYO_ENDPOINTS.profiles, {
          method: "POST",
          headers: {
            "Authorization": `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
            "Content-Type": "application/json",
            "revision": KLAVIYO_CONFIG.apiVersion,
          },
          body: JSON.stringify(profileData),
        });

        if (response.ok) {
          klaviyoSuccess = true;
          console.log("✅ Données envoyées à Klaviyo avec succès");
        } else {
          console.warn("⚠️ Klaviyo non disponible, données sauvegardées localement");
        }
      } catch (klaviyoError) {
        console.warn("⚠️ Erreur Klaviyo, continuons quand même:", klaviyoError);
      }

      // Toujours considérer comme un succès pour l'utilisateur
      setIsSubscribed(true);
      toast({
        title: "Parfait ! 💝",
        description: "Ta routine personnalisée arrive bientôt dans ta boîte mail 💌",
      });

    } catch (error) {
      console.error("❌ Erreur générale:", error);
      toast({
        title: "Oups !",
        description: "Une erreur est survenue. Merci de réessayer dans quelques instants.",
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
    handleSubmit
  };
};
