
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
    ? "mb-4 mt-2"
    : "mb-6 sm:mb-8 mt-2";

  // Determine which milestone icon to show
  const getMilestoneIcon = (stepNumber: number) => {
    const icons = [
      <Heart key="heart" className="w-3 h-3 text-pink-400" />,
      <Star key="star" className="w-3 h-3 text-pink-500" />,
      <Sparkles key="sparkles" className="w-3 h-3 text-pink-400" />, 
      <BadgeCheck key="badge" className="w-3 h-3 text-pink-500" />
    ];
    
    return icons[(stepNumber - 1) % icons.length];
  };

  // Generate milestone markers
  const milestones = [];
  for (let i = 1; i <= totalQuestions; i++) {
    const position = `${(i / totalQuestions) * 100}%`;
    const isCurrent = i === currentQuestion + 1;
    const isPast = i <= currentQuestion;
    
    milestones.push(
      <motion.div
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          delay: 0.1 + (i * 0.05)
        }}
        className={`absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full ${
          isCurrent
            ? "bg-pink-400 ring-2 ring-pink-200"
            : isPast
            ? "bg-pink-400"
            : "bg-pink-200"
        } flex items-center justify-center`}
        style={{ left: position }}
      >
        {(isCurrent || isPast) && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {getMilestoneIcon(i)}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={progressBarClasses}>
      <div className="h-2.5 w-full bg-pink-100/50 rounded-full overflow-hidden shadow-inner relative">
        {/* Milestones */}
        {!isMobile && milestones}
        
        {/* Progress bar */}
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
          {/* Shine effect */}
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
        <div className="flex items-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Question {currentQuestion + 1}/{totalQuestions}
          </p>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="ml-2"
          >
            {getMilestoneIcon(currentQuestion + 1)}
          </motion.div>
        </div>
        
        {!isMobile && (
          <motion.p
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-sm italic text-pink-400/80 flex items-center"
          >
            <Sparkles className="h-3 w-3 mr-1 text-pink-400/70" />
            {motivationalTexts[currentQuestion % motivationalTexts.length]}
          </motion.p>
        )}
      </div>
    </div>
  );
};
