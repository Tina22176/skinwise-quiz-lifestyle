
import { motion } from "framer-motion";
import { PremiumResultsContent } from "./PremiumResultsContent";
import { useQuiz } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails, SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";
import { SkinTypeScore } from "../../utils/skinTypeCalculator";

// Animation variants optimisés
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      duration: 0.6
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface ConversionOptimizedResultsProps {
  skinType: string;
  skinState?: string | null;
  skinTypeScore?: SkinTypeScore | null;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onResetQuiz: () => void;
  instagramUrl: string;
  confidence?: number;
}

export const ConversionOptimizedResults = ({
  skinType,
  skinState,
  skinTypeScore,
  email,
  setEmail,
  firstName,
  setFirstName,
  isSubscribed,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  onResetQuiz,
  instagramUrl,
  confidence = 0.8
}: ConversionOptimizedResultsProps) => {
  // Utiliser le nouveau composant premium
  return (
    <PremiumResultsContent
      skinType={skinType}
      skinState={skinState}
      skinTypeScore={skinTypeScore}
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
  );
};
