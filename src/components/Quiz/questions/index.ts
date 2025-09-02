import { hormonalQuestions } from "./hormonalQuestions";
import { QuizQuestion } from "./types";

// New hormone-based quiz questions
export const questions: QuizQuestion[] = [
  ...hormonalQuestions
];

// Re-export types
export type { QuizQuestion, QuizOption } from "./types";
