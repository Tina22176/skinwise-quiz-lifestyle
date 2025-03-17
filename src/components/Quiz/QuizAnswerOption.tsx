
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
    ? "w-full text-left justify-start p-3 sm:p-4 h-auto glass card-hover overflow-hidden relative"
    : "w-full text-left justify-start p-4 sm:p-5 h-auto glass card-hover overflow-hidden relative";

  return (
    <motion.div
      key={option.value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: isMobile ? 1 : 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full"
    >
      <Button
        variant="outline"
        className={`${buttonClasses} ${
          isSelected ? 'border-pink-400/70 bg-pink-50/50 shadow-lg' : ''
        }`}
        onClick={() => !selectedAnswer && onSelect(option.value)}
        disabled={selectedAnswer !== null}
      >
        {isSelected && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className="flex items-start gap-3 w-full min-w-0">
          {isSelected && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="flex-shrink-0 mt-0.5"
            >
              <CheckCircle className="h-4 w-4 text-pink-500" />
            </motion.div>
          )}
          <div className={`${isSelected ? "flex-1" : "w-full"} min-w-0`}>
            <p className={`${isMobile ? "text-sm sm:text-base" : "text-base sm:text-lg"} font-medium ${isSelected ? 'text-pink-600' : ''} break-words leading-relaxed`}>
              {option.label}
            </p>
            {option.description && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                {option.description}
              </p>
            )}
          </div>
        </div>
      </Button>
    </motion.div>
  );
};
