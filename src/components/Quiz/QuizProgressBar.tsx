
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
  
  const progressBarClasses = isMobile
    ? "mb-4 mt-2"
    : "mb-6 sm:mb-8 mt-2";

  return (
    <div className={progressBarClasses}>
      <div className="h-2.5 w-full bg-pink-100/50 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-300 to-pink-400 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ 
            width: `${progress}%`,
            transition: { 
              duration: 0.7, 
              ease: "easeOut"
            }
          }}
        >
          <motion.div 
            className="absolute top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent to-white/30"
            animate={{ 
              opacity: [0, 1, 0],
              x: ['-100%', '100%']
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "linear",
              delay: 0.2
            }}
          />
        </motion.div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Question {currentQuestion + 1}/{totalQuestions}
        </p>
        {!isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs sm:text-sm italic text-pink-400/80"
          >
            {motivationalTexts[currentQuestion % motivationalTexts.length]}
          </motion.p>
        )}
      </div>
    </div>
  );
};
