
import { motion } from "framer-motion";
import { SkinTypeHeader } from "./SkinTypeHeader";
import { SkinProfileCard } from "./SkinProfileCard";
import { SkinCharacteristicsGrid } from "./SkinCharacteristicsGrid";
import { DetailedResultsChart } from "./DetailedResultsChart";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";
import { SubscriptionForm } from "./SubscriptionForm";
import { SubscribedActions } from "./SubscribedActions";
import { ResultsActionButtons } from "./components/ResultsActionButtons";
import { useResultsActions } from "./hooks/useResultsActions";
import { useResultsAnimations } from "./hooks/useResultsAnimations";
import { useQuiz } from "../QuizContext";

interface EnhancedResultsContentProps {
  skinType: string;
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

export const EnhancedResultsContent = ({
  skinType,
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
}: EnhancedResultsContentProps) => {
  const { state } = useQuiz();
  const { containerVariants, itemVariants } = useResultsAnimations();
  const { handleShare, handleDownload } = useResultsActions(skinType);

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div variants={itemVariants}>
          <SkinTypeHeader skinType={skinType} variants={itemVariants} />
        </motion.div>

        <ResultsActionButtons
          onShare={handleShare}
          onDownload={handleDownload}
          onResetQuiz={onResetQuiz}
          variants={itemVariants}
        />

        <motion.div variants={itemVariants}>
          <DetailedResultsChart skinType={skinType} answers={state.answers} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkinProfileCard description={""} variants={itemVariants} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkinCharacteristicsGrid 
            characteristics={[]}
            factors={[]}
            variants={itemVariants}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PersonalizedRecommendations skinType={skinType} answers={state.answers} />
        </motion.div>

        <motion.div variants={itemVariants}>
          {!isSubscribed ? (
            <SubscriptionForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              isLoading={isLoading}
              gdprConsent={gdprConsent}
              setGdprConsent={setGdprConsent}
              handleSubmit={handleSubmit}
              variants={itemVariants}
            />
          ) : (
            <SubscribedActions 
              handleShare={handleShare}
              visitInstagram={visitInstagram}
              onResetQuiz={onResetQuiz}
              variants={itemVariants}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
