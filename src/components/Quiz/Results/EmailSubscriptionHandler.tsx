
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuiz, getSkinTypeFormatted } from "../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "./utils/SkinTypeDetails";
import { useBrevoIntegration } from "./hooks/useBrevoIntegration";

export const useEmailSubscription = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();
  const { subscribeToNewsletter } = useBrevoIntegration();

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
    console.log("🚀 SOUMISSION FORMULAIRE - Données collectées:", {
      email,
      firstName,
      hormoneProfile: state.hormoneProfile,
      answers: state.answers,
      answersCount: Object.keys(state.answers || {}).length
    });

    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      const formattedSkinType = getSkinTypeFormatted(state.result);
      const skinTypeInFrench = getSkinTypeText(formattedSkinType);

      // Données enrichies du quiz hormonal
      const skinType = state.hormoneProfile?.type || formattedSkinType;
      const skinState = null; // Plus de skinState dans le système hormonal
      const characteristics = state.hormoneProfile?.characteristics || [];
      const concerns = state.hormoneProfile?.concerns || [];

      console.log("📊 DONNÉES PROFIL HORMONAL ANALYSÉES:", {
        skinType,
        characteristics: characteristics.length,
        concerns: concerns.length,
        confidence: state.hormoneProfile?.confidence
      });

      // Envoi à Brevo avec toutes les données
      const brevoResult = await subscribeToNewsletter(
        email,
        firstName,
        skinType,
        skinState,
        state.answers,
        characteristics,
        concerns
      );

      if (brevoResult.success) {
        console.log("✅ BREVO SUCCESS:", brevoResult);
        toast({
          title: "Parfait ! 💝",
          description: "Ta routine personnalisée arrive bientôt dans ta boîte mail 💌",
        });
      } else {
        console.warn("⚠️ BREVO WARNING:", brevoResult.error);
        // On continue quand même pour l'utilisateur
        toast({
          title: "Données sauvegardées ! 💝",
          description: "Ta routine personnalisée va arriver dans ta boîte mail 💌",
        });
      }

      setIsSubscribed(true);

    } catch (error) {
      console.error("❌ ERREUR GÉNÉRALE:", error);
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
