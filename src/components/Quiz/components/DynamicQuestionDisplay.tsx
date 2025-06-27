import { motion } from "framer-motion";
import { EnhancedAnswerOption } from "../EnhancedAnswerOption";

interface DynamicQuestionDisplayProps {
  question: any;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}

export const DynamicQuestionDisplay = ({ question, selectedAnswer, onSelect }: DynamicQuestionDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <div className="space-y-4">
        {question.options.map((option: any, index: number) => (
          <EnhancedAnswerOption
            key={option.value}
            option={option}
            index={index}
            isSelected={selectedAnswer === option.value}
            selectedAnswer={selectedAnswer}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}; 