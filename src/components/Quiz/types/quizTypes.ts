
// Types for the Quiz context and state management

export type QuizState = {
  step: number;
  currentQuestion: number;
  result: string | null;
  answers: Record<string, string>;
  email: string | null;
  firstName: string | null;
};

export type QuizAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "NEXT_QUESTION" }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SET_ANSWER"; questionId: string; answer: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
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
  answers: {},
  email: null,
  firstName: null,
};
