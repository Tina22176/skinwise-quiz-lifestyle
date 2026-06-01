import { motion } from "framer-motion";

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
  onSelect,
}: EnhancedAnswerOptionProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 },
    },
  };

  const locked = selectedAnswer !== null;
  const isOther = locked && !isSelected;

  return (
    <motion.div variants={itemVariants} className="w-full">
      <button
        onClick={() => !locked && onSelect(option.value)}
        disabled={locked}
        className={[
          "w-full text-left font-body text-[15px] font-medium text-foreground",
          "relative overflow-hidden rounded-md border-2 px-5 py-4",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25",
          isSelected
            ? "border-primary bg-brand-soft scale-[1.02] shadow-[0_4px_16px_rgba(212,100,154,0.18)]"
            : "border-secondary bg-card shadow-sm hover:border-lilas hover:bg-surface-soft",
          isOther ? "opacity-40" : "opacity-100",
          locked ? "cursor-default" : "cursor-pointer",
        ].join(" ")}
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
        <span className="block pr-8">{option.label}</span>
      </button>
    </motion.div>
  );
};
