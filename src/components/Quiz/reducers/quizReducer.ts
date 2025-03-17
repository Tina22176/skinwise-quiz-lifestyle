
import { QuizState, QuizAction } from "../types/quizTypes";

export const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
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
      return {
        step: 0,
        currentQuestion: 0,
        result: null,
        answers: {},
        email: null,
        firstName: null,
      };
    default:
      return state;
  }
};
