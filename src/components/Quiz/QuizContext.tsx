
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { QuizContextType, QuizState, initialState } from "./types/quizTypes";
import { quizReducer } from "./reducers/quizReducer";

// Create the context with undefined as initial value
const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Function to reset the quiz
  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  return (
    <QuizContext.Provider value={{ state, dispatch, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

// Re-export the helper function from formatHelpers
export { getSkinTypeFormatted } from "./utils/formatHelpers";
