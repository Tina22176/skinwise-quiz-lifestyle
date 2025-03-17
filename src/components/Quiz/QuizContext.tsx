import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { questions } from "./questions/index";

export type QuizState = {
  step: number;
  currentQuestion: number;
  result: string | null;
  answers: Record<string, string>;
  email: string | null;
  firstName: string | null;
};

type QuizAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "NEXT_QUESTION" }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SET_ANSWER"; questionId: string; answer: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "RESET_QUIZ" };

type QuizContextType = {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  resetQuiz: () => void;
};

const initialState: QuizState = {
  step: 0,
  currentQuestion: 0,
  result: null,
  answers: {},
  email: null,
  firstName: null,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + 1,
      };
    case "PREV_STEP":
      return {
        ...state,
        step: Math.max(0, state.step - 1),
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload,
      };
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        },
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_FIRST_NAME":
      return {
        ...state,
        firstName: action.payload,
      };
    case "RESET_QUIZ":
      return initialState;
    default:
      return state;
  }
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Fonction dédiée pour réinitialiser le quiz
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

// Helper function to convert the result value to the exact format Klaviyo expects
export const getSkinTypeFormatted = (skinType: string | null): string => {
  if (!skinType) return "normal";
  return skinType.toLowerCase();
};
