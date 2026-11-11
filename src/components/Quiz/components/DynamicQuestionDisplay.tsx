import { motion } from "framer-motion";
import { EnhancedAnswerOption } from "../EnhancedAnswerOption";
import { QuizQuestion } from "../questions/types";

interface DynamicQuestionDisplayProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  disabled?: boolean;
  onSelect: (answer: string) => void;
}

export const DynamicQuestionDisplay = ({ question, selectedAnswer, disabled = false, onSelect }: DynamicQuestionDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <div className="border-t border-foreground">
        {question.options.map((option, index) => (
          <EnhancedAnswerOption
            key={option.value}
            option={option}
            index={index}
            isSelected={selectedAnswer === option.value}
            disabled={disabled}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
};
