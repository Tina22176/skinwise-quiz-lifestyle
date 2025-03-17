
export interface QuizOption {
  value: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}
