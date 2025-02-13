
import { useState } from "react";
import { QuizProvider } from "./QuizContext";
import { Welcome } from "./Welcome";
import { QuizQuestion } from "./QuizQuestion";
import { Results } from "./Results";
import { questions } from "./questions";
import { AnimatePresence } from "framer-motion";

export const Quiz = () => {
  const [stage, setStage] = useState<"welcome" | "questions" | "results">(
    "welcome"
  );

  return (
    <QuizProvider>
      <div className="min-h-screen py-12">
        <AnimatePresence mode="wait">
          {stage === "welcome" && (
            <Welcome onStart={() => setStage("questions")} />
          )}
          {stage === "questions" && <QuizQuestion />}
          {stage === "results" && <Results />}
        </AnimatePresence>
      </div>
    </QuizProvider>
  );
};
