import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface EnhancedAnswerOptionProps {
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

export const EnhancedAnswerOption = ({ 
  option, 
  index, 
  isSelected, 
  selectedAnswer, 
  onSelect 
}: EnhancedAnswerOptionProps) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  
  const buttonClasses = isMobile
    ? "w-full text-left justify-start p-5 sm:p-6 h-auto glass card-hover overflow-visible relative group"
    : "w-full text-left justify-start p-6 sm:p-7 h-auto glass card-hover overflow-visible relative group";

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }
    }
  };

  const rippleVariants = {
    initial: { 
      scale: 0,
      opacity: 0.6
    },
    animate: { 
      scale: 2,
      opacity: 0,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const heartVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1.3], 
      opacity: [0, 1],
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15,
        delay: 0.2
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
          isSelected 
            ? 'border-pink-400/70 bg-gradient-to-r from-pink-50/70 to-pink-100/50 shadow-lg transform scale-[1.02]' 
            : isHovered 
            ? 'border-pink-300/50 bg-pink-50/30 shadow-md transform scale-[1.01]' 
            : ''
        }`}
        onClick={() => !selectedAnswer && onSelect(option.value)}
        disabled={selectedAnswer !== null}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background effects */}
        {isSelected && (
          <>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-pink-100/30 to-pink-200/20 rounded-[calc(var(--radius)-2px)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-pink-300/10 rounded-[calc(var(--radius)-2px)]"
              initial={rippleVariants.initial}
              animate={rippleVariants.animate}
            />
            {/* Sparkle effect */}
            <motion.div
              className="absolute top-2 right-2"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 180 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4 text-pink-400/70" />
            </motion.div>
          </>
        )}

        {/* Hover gradient effect */}
        <motion.div 
          className="absolute inset-0 rounded-[calc(var(--radius)-2px)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 217, 223, 0.3), rgba(244, 208, 217, 0.1))',
            border: '1px solid rgba(244, 208, 217, 0.3)'
          }}
        />

        <div className="flex items-start gap-3 w-full min-w-0 relative z-10">
          {isSelected && (
            <motion.div 
              variants={heartVariants}
              initial="initial"
              animate="animate"
              className="flex-shrink-0 mt-0.5"
            >
              <div className="relative">
                <CheckCircle className="h-5 w-5 text-pink-500" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5] }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
                </motion.div>
              </div>
            </motion.div>
          )}
          
          <div className={`${isSelected ? "flex-1" : "w-full"} min-w-0`}>
            <motion.p 
              className={`${isMobile ? "text-base sm:text-lg" : "text-lg sm:text-xl"} font-medium ${
                isSelected ? 'text-pink-600' : isHovered ? 'text-pink-500' : ''
              } whitespace-normal break-words leading-relaxed transition-colors duration-200`}
              animate={isSelected ? { scale: [1, 1.02] } : {}}
              transition={{ duration: 0.3, repeatType: "reverse" }}
            >
              {option.label}
            </motion.p>
            
            {isSelected && option.description && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="text-xs text-pink-500/70 mt-2 italic"
              >
                {option.description}
              </motion.p>
            )}
          </div>
        </div>

        {/* Subtle pulse effect when hovering */}
        {isHovered && !isSelected && (
          <motion.div
            className="absolute inset-0 bg-pink-200/10 rounded-[calc(var(--radius)-2px)]"
            animate={{ opacity: [0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </Button>
    </motion.div>
  );
};
