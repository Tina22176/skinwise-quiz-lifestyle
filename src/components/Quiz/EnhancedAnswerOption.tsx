import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }
    }
  };

  return (
    <motion.div variants={itemVariants} className="w-full">
      <button
        onClick={() => !selectedAnswer && onSelect(option.value)}
        disabled={selectedAnswer !== null}
        className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 font-body ${
          isSelected 
            ? 'bg-rose-whisper border-primary shadow-glow' 
            : 'bg-card border-border/80 hover:border-primary hover:bg-rose-whisper/50 shadow-sm hover:shadow-md'
        } ${selectedAnswer !== null && !isSelected ? 'opacity-40' : ''} ${
          selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <div className="flex items-center gap-3 w-full">
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex-shrink-0"
            >
              <CheckCircle className="h-5 w-5 text-primary" />
            </motion.div>
          )}
          
          <p className={`${isMobile ? "text-base" : "text-lg"} font-medium leading-relaxed ${
            isSelected ? 'text-foreground' : 'text-foreground'
          }`}>
            {option.label}
          </p>
        </div>
        
        {isSelected && option.description && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-xs text-muted-foreground mt-2 ml-8 italic"
          >
            {option.description}
          </motion.p>
        )}
      </button>
    </motion.div>
  );
};
