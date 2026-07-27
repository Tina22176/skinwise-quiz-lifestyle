
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuiz } from "../QuizContext";
import { useBrevoIntegration } from "./hooks/useBrevoIntegration";
import { captureCampaignAttribution } from "@/utils/campaignAttribution";

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
    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      if (!state.hormoneProfile) throw new Error("Missing hormone profile");
      await subscribeToNewsletter({
        email,
        firstName,
        profile: state.hormoneProfile,
        answers: state.answers,
        attribution: captureCampaignAttribution(),
        gdprConsent,
      });

      toast({
        title: "Parfait ! 💝",
        description: "Ton guide personnalisé arrive bientôt dans ta boîte mail 💌",
      });

      setIsSubscribed(true);

    } catch (error) {
      toast({
        title: "Oups !",
        description: "Ton inscription n'a pas pu être enregistrée. Vérifie ta connexion puis réessaie.",
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
