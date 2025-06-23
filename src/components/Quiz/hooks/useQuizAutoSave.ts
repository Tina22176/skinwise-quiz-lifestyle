
import { useEffect } from "react";
import { useQuiz } from "../QuizContext";

export const useQuizAutoSave = () => {
  const { state } = useQuiz();

  useEffect(() => {
    // Sauvegarder automatiquement les réponses dans localStorage
    const quizState = {
      answers: state.answers,
      currentQuestion: state.currentQuestion,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem("quiz_autosave", JSON.stringify(quizState));
  }, [state.answers, state.currentQuestion]);

  const loadSavedQuiz = () => {
    try {
      const saved = localStorage.getItem("quiz_autosave");
      if (saved) {
        const parsedState = JSON.parse(saved);
        // Vérifier si la sauvegarde est récente (moins de 24h)
        const savedTime = new Date(parsedState.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          return parsedState;
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la sauvegarde:", error);
    }
    return null;
  };

  const clearSavedQuiz = () => {
    localStorage.removeItem("quiz_autosave");
  };

  return { loadSavedQuiz, clearSavedQuiz };
};
