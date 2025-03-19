
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuiz, getSkinTypeFormatted } from "../QuizContext";
import { getSkinTypeText } from "./SkinTypeDetails";

interface EmailSubscriptionHandlerProps {
  onSubscriptionComplete: () => void;
  email: string;
  firstName: string;
}

export const useEmailSubscription = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();
  const webhookUrl = "https://hooks.zapier.com/hooks/catch/14381563/2w2elvt/";

  const processLifestyleFactors = (answers: Record<string, string>) => {
    const factors: string[] = [];
    return factors;
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
    console.log("🚀 Préparation de l'envoi de données à Zapier");

    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      const lifestyleFactors = processLifestyleFactors(state.answers);
      const formattedSkinType = getSkinTypeFormatted(state.result);
      const skinTypeInFrench = getSkinTypeText(formattedSkinType);

      // Format data properly for Klaviyo
      const quizData = {
        email,
        first_name: firstName,
        skinType: formattedSkinType,
        skinTypeFrench: skinTypeInFrench,
        skin_type: formattedSkinType,
        skin_type_french: skinTypeInFrench,
        property: {
          skinType: formattedSkinType,
          skinTypeFrench: skinTypeInFrench
        },
        quizAnswers: state.answers,
        timestamp: new Date().toISOString(),
        skinDetails: getSkinTypeDetails(state.result || "normal"),
        properties: {
          $email: email,
          $first_name: firstName,
          $consent: gdprConsent,
          quiz_completed: true,
          quiz_completion_date: new Date().toISOString(),
          skin_type: formattedSkinType,
          skin_type_french: skinTypeInFrench,
          skinType: formattedSkinType,
          skinTypeFrench: skinTypeInFrench,
          lifestyle_factors: lifestyleFactors,
          skin_characteristics: getSkinTypeDetails(state.result || "normal").characteristics,
          skin_factors: getSkinTypeDetails(state.result || "normal").factors,
        }
      };

      console.log("📤 Envoi des données au webhook Zapier:", webhookUrl);
      console.log("📦 Données envoyées:", quizData);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(quizData),
      });

      console.log("✅ Données envoyées avec succès à Zapier");
      setIsSubscribed(true);
      toast({
        title: "Merci ! 💝",
        description: "Ta routine personnalisée arrive dans ta boîte mail 💌",
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi des données à Zapier:", error);
      toast({
        title: "Oups !",
        description: "Une erreur est survenue lors de l'envoi de tes données. Merci de réessayer.",
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
