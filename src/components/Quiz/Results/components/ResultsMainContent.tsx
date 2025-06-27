import { motion } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { SkinProfileCard } from "../SkinProfileCard";
import { SkinCharacteristicsGrid } from "../SkinCharacteristicsGrid";
import { DetailedResultsChart } from "../DetailedResultsChart";
import { PersonalizedRecommendations } from "../PersonalizedRecommendations";
import { ResultsActionButtons } from "./ResultsActionButtons";
import { AdvancedAnalysisDisplay } from "./AdvancedAnalysisDisplay";
import { useQuiz } from "../../QuizContext";
import { SkinTypeScore } from "../../utils/skinTypeCalculator";

interface ResultsMainContentProps {
  skinType: string;
  skinState?: string | null;
  skinTypeScore?: SkinTypeScore | null;
  answers: any;
  itemVariants: any;
  onShare: () => void;
  onDownload: () => void;
  onResetQuiz: () => void;
}

export const ResultsMainContent = ({
  skinType,
  skinState,
  skinTypeScore,
  answers,
  itemVariants,
  onShare,
  onDownload,
  onResetQuiz
}: ResultsMainContentProps) => {
  const { state } = useQuiz();

  return (
    <>
      <motion.div variants={itemVariants}>
        <SkinTypeHeader 
          skinType={skinType} 
          skinState={skinState}
          variants={itemVariants} 
        />
      </motion.div>

      <ResultsActionButtons
        onShare={onShare}
        onDownload={onDownload}
        onResetQuiz={onResetQuiz}
        variants={itemVariants}
      />

      {/* Analyse avancée avec le nouvel algorithme */}
      {skinTypeScore && (
        <motion.div variants={itemVariants}>
          <AdvancedAnalysisDisplay 
            skinTypeScore={skinTypeScore} 
            variants={itemVariants} 
          />
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <DetailedResultsChart skinType={skinType} answers={answers} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SkinProfileCard description={""} variants={itemVariants} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SkinCharacteristicsGrid 
          characteristics={skinTypeScore?.characteristics || []}
          factors={skinTypeScore?.concerns || []}
          variants={itemVariants}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PersonalizedRecommendations skinType={skinType} answers={answers} />
      </motion.div>
    </>
  );
};
