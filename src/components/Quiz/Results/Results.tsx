
import { useState, useEffect } from "react";
import { useQuiz, getSkinTypeFormatted } from "../QuizContext";
import { useToast } from "@/components/ui/use-toast";
import { ResultsLoading } from "./ResultsLoading";
import { ResultsContent } from "./ResultsContent";
import { AnimatePresence } from "framer-motion";

export const Results = ({ onResetQuiz }: { onResetQuiz: () => void }) => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const webhookUrl = "https://hooks.zapier.com/hooks/catch/14381563/2w2elvt/";
  const instagramUrl = "https://www.instagram.com/majolie_peau/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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
        skinTypeFrench: skinTypeInFrench, // Ajout du type de peau en français
        skin_type: formattedSkinType,
        skin_type_french: skinTypeInFrench, // Version alternative
        property: {
          skinType: formattedSkinType,
          skinTypeFrench: skinTypeInFrench // Type de peau en français pour Klaviyo
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

  return (
    <AnimatePresence mode="wait">
      {!showResults ? (
        <ResultsLoading />
      ) : (
        <ResultsContent 
          skinType={state.result || "normal"}
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          isSubscribed={isSubscribed}
          isLoading={isLoading}
          gdprConsent={gdprConsent}
          setGdprConsent={setGdprConsent}
          handleSubmit={handleSubmit}
          onResetQuiz={onResetQuiz}
          instagramUrl={instagramUrl}
        />
      )}
    </AnimatePresence>
  );
};

// Helper functions moved from the original file
const getSkinTypeText = (skinType: string) => {
  const texts: Record<string, string> = {
    "combination": "Mixte",
    "dry": "Sèche",
    "oily": "Grasse",
    "sensitive": "Sensible",
    "normal": "Normale"
  };
  return texts[skinType] || texts["normal"];
};

const getSkinTypeDetails = (skinType: string) => {
  const details: Record<string, { characteristics: string[]; factors: string[]; description: string; routineRecommendation: string }> = {
    "combination": {
      description: "Ta peau présente deux comportements distincts : plus grasse sur la zone T (front, nez, menton) et normale à sèche sur les joues.",
      characteristics: [
        "Zone T grasse, joues plus sèches",
        "Pores visibles principalement sur le nez et le front",
        "Brillance modérée qui se développe en cours de journée"
      ],
      factors: [
        "Déséquilibre hormonal",
        "Utilisation de produits inadaptés",
        "Facteurs environnementaux"
      ],
      routineRecommendation: "Ta routine devra équilibrer les différentes zones avec des actifs adaptés, en utilisant des produits plus légers sur la zone T et plus nourrissants sur les zones sèches."
    },
    "dry": {
      description: "Ta peau manque de sébum et d'hydratation. Elle peut paraître terne, tiraillée et présenter des squames.",
      characteristics: [
        "Sensation de tiraillement fréquente",
        "Teint parfois terne ou manquant d'éclat",
        "Tendance aux ridules de déshydratation"
      ],
      factors: [
        "Production insuffisante de sébum",
        "Barrière cutanée fragilisée",
        "Facteurs environnementaux (chauffage, climatisation)"
      ],
      routineRecommendation: "Ta routine devra privilégier l'hydratation profonde et limiter les actifs exfoliants trop puissants qui pourraient accentuer la sécheresse."
    },
    "oily": {
      description: "Ta peau produit un excès de sébum qui lui donne un aspect brillant. Les pores sont souvent dilatés et les imperfections fréquentes.",
      characteristics: [
        "Brillance excessive tout au long de la journée",
        "Pores dilatés visibles",
        "Tendance aux imperfections (points noirs, comédons)"
      ],
      factors: [
        "Surproduction de sébum",
        "Facteurs hormonaux",
        "Prédisposition génétique"
      ],
      routineRecommendation: "Ta routine mettra l'accent sur la régulation du sébum tout en maintenant une bonne hydratation, car même les peaux grasses ont besoin d'être hydratées."
    },
    "sensitive": {
      description: "Ta peau réagit facilement aux stimuli externes (climat, produits, stress) par des rougeurs, irritations ou inconfort.",
      characteristics: [
        "Réactivité cutanée aux stimuli externes",
        "Rougeurs fréquentes ou permanentes",
        "Sensations d'inconfort (picotements, tiraillements)"
      ],
      factors: [
        "Barrière cutanée fragilisée",
        "Réactivité aux ingrédients cosmétiques",
        "Facteurs environnementaux et stress"
      ],
      routineRecommendation: "Ta routine devra être particulièrement douce avec des actifs apaisants, en introduisant progressivement les actifs plus puissants en petites quantités."
    },
    "normal": {
      description: "Ta peau est équilibrée, ni trop grasse ni trop sèche. Elle présente peu d'imperfections et ne réagit pas excessivement aux facteurs externes.",
      characteristics: [
        "Teint uniforme et lumineux",
        "Texture lisse avec des pores peu visibles",
        "Bonne tolérance aux produits cosmétiques"
      ],
      factors: [
        "Équilibre naturel de la production de sébum",
        "Bonne hydratation naturelle",
        "Barrière cutanée intacte"
      ],
      routineRecommendation: "Ta routine peut être adaptée à tes objectifs spécifiques (anti-âge, éclat, etc.) tout en maintenant l'équilibre naturel de ta peau."
    }
  };

  return details[skinType] || details["normal"];
};

// Export these helper functions for use in other components
export { getSkinTypeText, getSkinTypeDetails };
