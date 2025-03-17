
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuizAnswerOptionProps {
  option: {
    value: string;
    label: string;
    description?: string;
  };
  index: number;
  isSelected: boolean;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}

export const QuizAnswerOption = ({ 
  option, 
  index, 
  isSelected, 
  selectedAnswer, 
  onSelect 
}: QuizAnswerOptionProps) => {
  const isMobile = useIsMobile();
  
  const buttonClasses = isMobile
    ? "w-full text-left justify-start p-3 sm:p-4 h-auto glass card-hover overflow-visible relative"
    : "w-full text-left justify-start p-4 sm:p-5 h-auto glass card-hover overflow-visible relative";

  // Animation variants for each answer option
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Ripple animation for selection
  const rippleVariants = {
    initial: { 
      scale: 0,
      opacity: 0.5
    },
    animate: { 
      scale: 1.5,
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="w-full"
    >
      <Button
        variant="outline"
        className={`${buttonClasses} ${
          isSelected ? 'border-pink-400/70 bg-pink-50/50 shadow-lg' : ''
        } group`}
        onClick={() => !selectedAnswer && onSelect(option.value)}
        disabled={selectedAnswer !== null}
      >
        {/* Background gradient animation when selected */}
        {isSelected && (
          <>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-transparent rounded-[calc(var(--radius)-2px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 bg-pink-300/10 rounded-[calc(var(--radius)-2px)]"
              initial={rippleVariants.initial}
              animate={rippleVariants.animate}
            />
          </>
        )}
        
        {/* Hover border gradient effect */}
        <motion.div 
          className="absolute inset-0 rounded-[calc(var(--radius)-2px)] opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(245, 217, 223, 0.3), rgba(244, 208, 217, 0.1))',
            border: '1px solid rgba(244, 208, 217, 0.3)'
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex items-start gap-3 w-full min-w-0 relative z-10">
          {isSelected && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 15,
                delay: 0.2
              }}
              className="flex-shrink-0 mt-0.5"
            >
              <CheckCircle className="h-4 w-4 text-pink-500" />
            </motion.div>
          )}
          <div className={`${isSelected ? "flex-1" : "w-full"} min-w-0`}>
            <p className={`${isMobile ? "text-sm sm:text-base" : "text-base sm:text-lg"} font-medium ${isSelected ? 'text-pink-600' : ''} whitespace-normal break-words leading-relaxed`}>
              {option.label}
              {isSelected && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="inline-block ml-1"
                >
                  <Sparkles className="h-3 w-3 inline text-pink-400" />
                </motion.span>
              )}
            </p>
          </div>
        </div>
      </Button>
    </motion.div>
  );
};
