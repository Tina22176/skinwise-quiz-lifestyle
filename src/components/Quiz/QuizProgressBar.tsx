import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      {/* Progress info */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-muted-foreground font-body font-medium">
          Question {currentQuestion + 1}/{totalQuestions}
        </p>
        <p className="text-xs text-muted-foreground font-body font-medium">
          {Math.round(progress)}%
        </p>
      </div>
      {/* Bar */}
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-rose-bright rounded-full"
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
