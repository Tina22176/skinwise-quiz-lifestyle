
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { questions } from "./questions";

export const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const currentQuestion = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    dispatch({
      type: "SET_ANSWER",
      payload: { questionId: currentQuestion.id, answer },
    });
    dispatch({ type: "NEXT_QUESTION" });
  };

  const motivationalTexts = [
    "Prenez soin de vous...",
    "Votre peau mérite le meilleur...",
    "En route vers une peau rayonnante...",
    "Découvrons ensemble votre routine idéale..."
  ];

  return (
    <motion.div
      key={state.currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="mb-10">
        <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
          <motion.div
            className="progress-bar h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-muted-foreground">
            Question {state.currentQuestion + 1} sur {questions.length}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm italic text-pink-400/80"
          >
            {motivationalTexts[state.currentQuestion % motivationalTexts.length]}
          </motion.p>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-semibold mb-8 text-balance text-center"
      >
        {currentQuestion.question}
      </motion.h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Button
              variant="outline"
              className="w-full text-left justify-start p-6 h-auto glass card-hover"
              onClick={() => handleAnswer(option.value)}
            >
              <div>
                <p className="font-medium mb-2">{option.label}</p>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
