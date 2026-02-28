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
      <motion.button
        onClick={() => !selectedAnswer && onSelect(option.value)}
        disabled={selectedAnswer !== null}
        className="w-full text-left font-body relative overflow-hidden"
        style={{
          fontSize: isMobile ? 15 : 15,
          fontWeight: 500,
          padding: '16px 20px',
          borderRadius: 14,
          border: `2px solid ${isSelected ? '#D4649A' : '#F0EAF3'}`,
          background: isSelected
            ? 'rgba(251, 234, 242, 0.95)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          color: '#2E2233',
          cursor: selectedAnswer !== null ? 'default' : 'pointer',
          opacity: isOther ? 0.4 : 1,
          boxShadow: isSelected
            ? '0 4px 20px rgba(212, 100, 154, 0.18), inset 0 1px 0 rgba(255,255,255,0.7)'
            : '0 1px 4px rgba(61, 43, 69, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
          transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, opacity 0.3s',
        }}
        whileHover={selectedAnswer === null ? {
          scale: 1.01,
          boxShadow: '0 4px 16px rgba(155, 107, 163, 0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
        } : {}}
        whileTap={selectedAnswer === null ? { scale: 0.985 } : {}}
        animate={isSelected ? { scale: 1.015 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Hover highlight */}
        {!isSelected && selectedAnswer === null && (
          <motion.span
            className="absolute inset-0 rounded-[12px]"
            style={{ background: 'linear-gradient(135deg, rgba(216, 196, 236, 0.15) 0%, rgba(245, 240, 250, 0.1) 100%)' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Selected background shimmer */}
        {isSelected && (
          <motion.span
            className="absolute inset-0 rounded-[12px]"
            style={{ background: 'linear-gradient(135deg, rgba(212, 100, 154, 0.08) 0%, rgba(155, 107, 163, 0.06) 100%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <span className="relative z-10 pr-8">{option.label}</span>

        {/* Checkmark indicator */}
        {isSelected && (
          <motion.span
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #D4649A 0%, #9B6BA3 100%)' }}
          >
            ✓
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
};