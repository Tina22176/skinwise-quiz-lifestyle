import { motion } from "framer-motion";

interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  motivationalTexts: string[];
}

export const QuizProgressBar = ({ 
  currentQuestion, 
  totalQuestions,
  motivationalTexts 
}: QuizProgressBarProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      {/* Progress info */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-[13px] text-text-muted font-body font-medium">
          Question {currentQuestion + 1}/{totalQuestions}
        </p>
        <p className="text-[13px] text-text-muted font-body font-medium">
          {Math.round(progress)}%
        </p>
      </div>
      {/* Bar — 4px height, lineSoft bg, rose gradient fill */}
      <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: '#F0EAF3' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #D4649A, #E077AD)' }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${progress}%`,
            transition: { duration: 0.7, ease: "easeOut" }
          }}
        />
      </div>
    </div>
  );
};