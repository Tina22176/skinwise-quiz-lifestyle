
export interface QuizOption {
  value: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}
