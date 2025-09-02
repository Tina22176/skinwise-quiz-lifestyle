import { QuizState, QuizAction } from "../types/quizTypes";
import { HormoneProfile } from "../utils/hormoneProfileCalculator";

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
    case "SET_HORMONE_PROFILE":
      return {
        ...state,
        hormoneProfile: action.payload,
        result: action.payload.type,
        confidence: action.payload.confidence,
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
    case "SET_VALIDATION_ERRORS":
      return {
        ...state,
        validationErrors: action.payload,
      };
    case "SET_CONFIDENCE":
      return {
        ...state,
        confidence: action.payload,
      };
    case "SET_PERSONALIZATION_LEVEL":
      return {
        ...state,
        personalizationLevel: action.payload,
      };
    case "ADD_DYNAMIC_QUESTION":
      return {
        ...state,
        dynamicQuestions: [...state.dynamicQuestions, action.payload],
      };
    case "RESET_QUIZ":
      return {
        step: 0,
        currentQuestion: 0,
        result: null,
        hormoneProfile: null,
        answers: {},
        email: null,
        firstName: null,
        validationErrors: [],
        confidence: 0,
        personalizationLevel: 'basic',
        dynamicQuestions: [],
      };
    default:
      return state;
  }
};
