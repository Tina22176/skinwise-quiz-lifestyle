import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface EnhancedAnswerOptionProps {
  option: {
    value: string;
    label: string;
    description?: string;
  };
  index: number;
  isSelected: boolean;
  disabled?: boolean;
  onSelect: (answer: string) => void;
}

export const EnhancedAnswerOption = ({
  option,
  index,
  isSelected,
  disabled = false,
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

  const locked = disabled;
  const isOther = locked && !isSelected;

  return (
    <motion.div variants={itemVariants} className="w-full">
      <button
        onClick={() => !locked && onSelect(option.value)}
        disabled={locked}
        className={[
          "w-full text-left font-body text-[15px] font-medium text-foreground",
          "relative grid grid-cols-[2rem_1fr] gap-3 border-b border-border px-1 py-5",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:bg-secondary",
          isSelected ? "bg-secondary" : "hover:bg-secondary/60",
          isOther ? "opacity-40" : "opacity-100",
          locked ? "cursor-default" : "cursor-pointer",
        ].join(" ")}
      >
        <span className={`font-heading italic text-[17px] leading-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
          {String.fromCharCode(97 + index)}.
        </span>
        <span className="block pr-8">
          <span className="block text-[16px] leading-6">{option.label}</span>
          {option.description && (
            <span className="block mt-1 text-[13px] font-normal leading-relaxed text-muted-foreground">
              {option.description}
            </span>
          )}
        </span>
        {isSelected && (
          <Check className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" strokeWidth={2.5} />
        )}
      </button>
    </motion.div>
  );
};
