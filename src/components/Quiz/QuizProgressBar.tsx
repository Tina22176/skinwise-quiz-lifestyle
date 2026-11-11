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
    <div className="mb-4">
      {/* Progress info */}
      <div className="flex justify-between items-center mb-2">
        <p className="eyebrow">
          Question {String(currentQuestion + 1).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
        </p>
        
      </div>
      {/* Bar — 6px height, lineSoft bg, rose gradient fill */}
      <div className="h-px w-full overflow-hidden bg-border">
        <motion.div
          className="h-full bg-foreground"
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