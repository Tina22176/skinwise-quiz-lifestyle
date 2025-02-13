
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal';

interface QuizState {
  currentQuestion: number;
  answers: Record<string, string>;
  result: SkinType | null;
  email: string;
}

type QuizAction =
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: string } }
  | { type: 'SET_RESULT'; payload: SkinType }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'RESET' };

const initialState: QuizState = {
  currentQuestion: 0,
  answers: {},
  result: null,
  email: '',
};

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | null>(null);

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case 'PREVIOUS_QUESTION':
      return { ...state, currentQuestion: Math.max(0, state.currentQuestion - 1) };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.questionId]: action.payload.answer },
      };
    case 'SET_RESULT':
      return { ...state, result: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
