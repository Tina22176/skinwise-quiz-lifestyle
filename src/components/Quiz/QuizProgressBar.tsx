import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, Star, Sparkles, BadgeCheck } from "lucide-react";

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
  
  const progressBarClasses = isMobile
    ? "mb-4 sm:mb-6 mt-2"
    : "mb-6 sm:mb-8 mt-2";

  return (
    <div className={progressBarClasses}>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-DEFAULT to-rose-bright rounded-full relative"
          initial={{ width: 0 }}
          animate={{ 
            width: `${progress}%`,
            transition: { duration: 0.7, ease: "easeOut" }
          }}
        >
          <motion.div 
            className="absolute top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent to-white/30"
            animate={{ opacity: [0, 1, 0], x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear", type: "tween" }}
          />
        </motion.div>
      </div>
      
      <div className="flex justify-between items-center mt-2 sm:mt-3">
        <p className="text-xs sm:text-sm text-muted-foreground font-body">
          Question {currentQuestion + 1}/{totalQuestions}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground font-body">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};
