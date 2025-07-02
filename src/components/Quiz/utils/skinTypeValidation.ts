// Validation de cohérence des réponses
export const validateAnswers = (answers: Record<string, string>): { isValid: boolean; conflicts: string[] } => {
  const conflicts: string[] = [];
  
  // Vérifier les contradictions évidentes
  if (answers.sensation_apres_nettoyage === "grasse" && answers.fin_journee === "seche") {
    conflicts.push("Contradiction entre sensation après nettoyage et fin de journée");
  }
  
  if (answers.pores === "grasse" && answers.sensation_apres_nettoyage === "seche") {
    conflicts.push("Contradiction entre visibilité des pores et sensation de sécheresse");
  }
  
  if (answers.nouveaux_produits === "sensible" && answers.sensation_inconfort === "grasse") {
    conflicts.push("Contradiction entre réactivité aux produits et sensations d'inconfort");
  }
  
  return {
    isValid: conflicts.length === 0,
    conflicts
  };
};

// Calcul du score de confiance
export const calculateConfidence = (answers: Record<string, string>, scores: Record<string, number>): number => {
  const totalQuestions = Object.keys(answers).length;
  const answeredQuestions = Object.keys(answers).filter(q => answers[q]).length;
  const completionRate = answeredQuestions / totalQuestions;
  
  // Score de cohérence basé sur la validation
  const validation = validateAnswers(answers);
  const consistencyScore = validation.isValid ? 1.0 : 0.7;
  
  // Écart entre le score dominant et les autres
  const maxScore = Math.max(...Object.values(scores));
  const otherScores = Object.values(scores).filter(s => s !== maxScore);
  const scoreGap = otherScores.length > 0 ? (maxScore - Math.max(...otherScores)) / maxScore : 1.0;
  
  return Math.min(1.0, (completionRate * 0.4 + consistencyScore * 0.4 + scoreGap * 0.2));
};

// Fonction utilitaire pour convertir les réponses françaises vers anglaises
export const convertToEnglish = (frenchAnswer: string): string | null => {
  const mapping: Record<string, string> = {
    "seche": "dry",
    "mixte": "combination", 
    "grasse": "oily",
    "sensible": "sensitive",
    "normale": "normal"
  };
  return mapping[frenchAnswer] || null;
};