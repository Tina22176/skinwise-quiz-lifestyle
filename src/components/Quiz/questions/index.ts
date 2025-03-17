
import { skinFeelQuestions } from "./skinFeelQuestions";
import { skinAppearanceQuestions } from "./skinAppearanceQuestions";
import { reactivityQuestions } from "./reactivityQuestions";
import { preferenceQuestions } from "./preferenceQuestions";
import { QuizQuestion } from "./types";

// Combine all questions from different categories
export const questions: QuizQuestion[] = [
  ...skinFeelQuestions,
  ...skinAppearanceQuestions,
  ...reactivityQuestions,
  ...preferenceQuestions
];

// Re-export types
export type { QuizQuestion, QuizOption } from "./types";
