import { SkinTypeScore } from "../utils/skinTypeCalculator";

// Types for the Quiz context and state management

export type QuizState = {
  step: number;
  currentQuestion: number;
  result: string | null;
  skinTypeScore: SkinTypeScore | null;
  answers: Record<string, string>;
  email: string | null;
  firstName: string | null;
  validationErrors: string[];
  confidence: number;
  personalizationLevel: 'basic' | 'intermediate' | 'advanced';
  dynamicQuestions: string[];
};

export type QuizAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "NEXT_QUESTION" }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SET_SKIN_TYPE_SCORE"; payload: SkinTypeScore }
  | { type: "SET_ANSWER"; questionId: string; answer: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_VALIDATION_ERRORS"; payload: string[] }
  | { type: "SET_CONFIDENCE"; payload: number }
  | { type: "SET_PERSONALIZATION_LEVEL"; payload: 'basic' | 'intermediate' | 'advanced' }
  | { type: "ADD_DYNAMIC_QUESTION"; payload: string }
  | { type: "RESET_QUIZ" };

export type QuizContextType = {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  resetQuiz: () => void;
};

export const initialState: QuizState = {
  step: 0,
  currentQuestion: 0,
  result: null,
  skinTypeScore: null,
  answers: {},
  email: null,
  firstName: null,
  validationErrors: [],
  confidence: 0,
  personalizationLevel: 'basic',
  dynamicQuestions: [],
};
