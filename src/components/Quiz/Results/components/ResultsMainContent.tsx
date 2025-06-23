
import { motion } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { SkinProfileCard } from "../SkinProfileCard";
import { SkinCharacteristicsGrid } from "../SkinCharacteristicsGrid";
import { DetailedResultsChart } from "../DetailedResultsChart";
import { PersonalizedRecommendations } from "../PersonalizedRecommendations";
import { ResultsActionButtons } from "./ResultsActionButtons";

interface ResultsMainContentProps {
  skinType: string;
  answers: any;
  itemVariants: any;
  onShare: () => void;
  onDownload: () => void;
  onResetQuiz: () => void;
}

export const ResultsMainContent = ({
  skinType,
  answers,
  itemVariants,
  onShare,
  onDownload,
  onResetQuiz
}: ResultsMainContentProps) => {
  return (
    <>
      <motion.div variants={itemVariants}>
        <SkinTypeHeader skinType={skinType} variants={itemVariants} />
      </motion.div>

      <ResultsActionButtons
        onShare={onShare}
        onDownload={onDownload}
        onResetQuiz={onResetQuiz}
        variants={itemVariants}
      />

      <motion.div variants={itemVariants}>
        <DetailedResultsChart skinType={skinType} answers={answers} />
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
        <PersonalizedRecommendations skinType={skinType} answers={answers} />
      </motion.div>
    </>
  );
};
