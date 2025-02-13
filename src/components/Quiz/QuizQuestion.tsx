
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { questions } from "./questions";

export const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const currentQuestion = questions[state.currentQuestion];

  const handleAnswer = (answer: string) => {
    dispatch({
      type: "SET_ANSWER",
      payload: { questionId: currentQuestion.id, answer },
    });
    dispatch({ type: "NEXT_QUESTION" });
  };

  return (
    <motion.div
      key={state.currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="mb-8">
        <div className="h-1 w-full bg-secondary rounded-full">
          <div
            className="h-1 bg-primary rounded-full transition-all duration-300"
            style={{
              width: `${((state.currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Question {state.currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-balance">
        {currentQuestion.question}
      </h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="w-full text-left justify-start p-4 h-auto card-hover"
            onClick={() => handleAnswer(option.value)}
          >
            <div>
              <p className="font-medium mb-1">{option.label}</p>
              {option.description && (
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              )}
            </div>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};
