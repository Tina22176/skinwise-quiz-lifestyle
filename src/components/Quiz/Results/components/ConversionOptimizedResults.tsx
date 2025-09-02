import { motion } from "framer-motion";
import { PremiumResultsContent } from "./PremiumResultsContent";
import { useQuiz } from "../../QuizContext";
import { getHormoneProfileText, getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";

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

export interface ConversionOptimizedResultsProps {
  skinType: string;
  skinState?: string | null;
  hormoneProfile?: HormoneProfile | null;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onResetQuiz: () => void;
  instagramUrl: string;
}

export const ConversionOptimizedResults = ({
  skinType,
  skinState,
  hormoneProfile,
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
}: ConversionOptimizedResultsProps) => {
  const { state } = useQuiz();
  const profileDetails = getHormoneProfileDetails(skinType);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-5xl">
        <PremiumResultsContent
          skinType={skinType}
          skinState={skinState}
          hormoneProfile={hormoneProfile}
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
          itemVariants={itemVariants}
        />
      </div>
    </motion.div>
  );
};