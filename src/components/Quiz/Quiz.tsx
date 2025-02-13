
import { useState, useEffect } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { Welcome } from "./Welcome";
import { QuizQuestion } from "./QuizQuestion";
import { Results } from "./Results";
import { questions } from "./questions";
import { AnimatePresence } from "framer-motion";

const QuizContent = () => {
  const { state } = useQuiz();
  const [stage, setStage] = useState<"welcome" | "questions" | "results">("welcome");

  useEffect(() => {
    if (state.currentQuestion >= questions.length) {
      setStage("results");
    }
  }, [state.currentQuestion]);

  return (
    <div className="min-h-screen py-12">
      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <Welcome onStart={() => setStage("questions")} />
        )}
        {stage === "questions" && <QuizQuestion />}
        {stage === "results" && <Results />}
      </AnimatePresence>
    </div>
  );
};

export const Quiz = () => {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
};
