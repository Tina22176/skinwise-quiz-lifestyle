
import { useState, useEffect } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { Welcome } from "./Welcome";
import { EnhancedQuizQuestion } from "./EnhancedQuizQuestion";
import { Results } from "./Results";
import { questions } from "./questions/index";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { InstallPWA } from "../PWA/InstallPWA";
import { useAnalytics } from "@/hooks/useAnalytics";

const QuizContent = () => {
  console.log('🎯 QuizContent rendering...');
  
  const { state, resetQuiz } = useQuiz();
  const [stage, setStage] = useState<"welcome" | "questions" | "results">("welcome");
  const isMobile = useIsMobile();
  const { trackQuizStart, trackQuizComplete } = useAnalytics();

  console.log('📊 Quiz state:', { stage, currentQuestion: state.currentQuestion, questionsLength: questions.length });

  useEffect(() => {
    if (state.currentQuestion >= questions.length) {
      console.log('🏁 Quiz completed, showing results');
      setStage("results");
      // Track quiz completion with hormone profile if available
      if (state.hormoneProfile?.type) {
        trackQuizComplete(state.hormoneProfile.type);
      } else if (state.result) {
        trackQuizComplete(state.result);
      }
    }
  }, [state.currentQuestion, state.hormoneProfile, state.result, trackQuizComplete]);

  const handleStartQuiz = () => {
    console.log('▶️ Starting quiz...');
    trackQuizStart();
    setStage("questions");
  };

  const handleResetQuiz = () => {
    console.log('🔄 Resetting quiz...');
    resetQuiz();
    setStage("welcome");
  };

  const containerClasses = isMobile 
    ? "min-h-screen py-4 sm:py-6" 
    : "min-h-screen py-6 sm:py-8 lg:py-10";

  return (
    <div className={containerClasses}>
      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <Welcome onStart={handleStartQuiz} />
        )}
        {stage === "questions" && state.currentQuestion < questions.length && (
          <EnhancedQuizQuestion />
        )}
        {(stage === "results" || state.currentQuestion >= questions.length) && (
          <Results onResetQuiz={handleResetQuiz} />
        )}
      </AnimatePresence>
    </div>
  );
};

export const Quiz = () => {
  console.log('🎮 Quiz component rendering...');
  
  return (
    <QuizProvider>
      <QuizContent />
      <InstallPWA />
    </QuizProvider>
  );
};
