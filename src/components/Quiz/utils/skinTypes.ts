// Types pour l'algorithme avancé de calcul du type de peau
export interface SkinTypeScore {
  type: string;
  state: string | null; // État secondaire (sensible, déshydratée, etc.)
  score: number;
  confidence: number;
  characteristics: string[];
  concerns: string[];
}

export interface QuestionWeight {
  questionId: string;
  weight: number;
  category: 'primary' | 'secondary' | 'validation' | 'state';
}