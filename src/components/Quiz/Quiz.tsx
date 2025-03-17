
import { useState, useEffect } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { Welcome } from "./Welcome";
import { QuizQuestion } from "./QuizQuestion";
import { Results } from "./Results";
import { questions } from "./questions";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const QuizContent = () => {
  const { state, resetQuiz } = useQuiz();
  const [stage, setStage] = useState<"welcome" | "questions" | "results">("welcome");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Passer aux résultats quand toutes les questions sont répondues
    if (state.currentQuestion >= questions.length) {
      setStage("results");
    }
  }, [state.currentQuestion]);

  // Fonction pour gérer la réinitialisation du quiz
  const handleResetQuiz = () => {
    resetQuiz();
    setStage("welcome");
  };

  // Ajuster le padding pour les appareils mobiles
  const containerClasses = isMobile 
    ? "min-h-screen py-4" 
    : "min-h-screen py-8 sm:py-12";

  return (
    <div className={containerClasses}>
      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <Welcome onStart={() => setStage("questions")} />
        )}
        {stage === "questions" && state.currentQuestion < questions.length && (
          <QuizQuestion />
        )}
        {(stage === "results" || state.currentQuestion >= questions.length) && (
          <Results onResetQuiz={handleResetQuiz} />
        )}
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
