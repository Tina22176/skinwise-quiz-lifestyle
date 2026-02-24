import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const isOther = selectedAnswer !== null && !isSelected;

  return (
    <motion.div variants={itemVariants} className="w-full">
      <button
        onClick={() => !selectedAnswer && onSelect(option.value)}
        disabled={selectedAnswer !== null}
        className="w-full text-left font-body transition-all duration-250 relative overflow-hidden"
        style={{
          fontSize: isMobile ? 15 : 16,
          fontWeight: 500,
          padding: isMobile ? '14px 18px' : '16px 20px',
          borderRadius: 14,
          border: `2px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--input))'}`,
          background: isSelected
            ? 'linear-gradient(135deg, hsl(330 30% 96%) 0%, hsl(270 40% 97%) 100%)'
            : 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
          cursor: selectedAnswer !== null ? 'default' : 'pointer',
          opacity: isOther ? 0.4 : 1,
          transform: isSelected ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isSelected
            ? '0 4px 16px rgba(212, 100, 154, 0.15)'
            : '0 1px 4px rgba(61, 43, 69, 0.04)',
        }}
        onMouseOver={(e) => {
          if (selectedAnswer === null) {
            e.currentTarget.style.borderColor = 'hsl(280 30% 85%)'; // lilas
            e.currentTarget.style.background = 'hsl(270 40% 97%)'; // lilasWhisper
          }
        }}
        onMouseOut={(e) => {
          if (selectedAnswer === null) {
            e.currentTarget.style.borderColor = 'hsl(var(--input))';
            e.currentTarget.style.background = 'hsl(var(--card))';
          }
        }}
      >
        {isSelected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold"
          >
            ✓
          </motion.span>
        )}
        {option.label}
      </button>
    </motion.div>
  );
};
