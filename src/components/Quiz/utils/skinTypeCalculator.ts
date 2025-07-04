
import { SkinTypeScore } from './skinTypes';
import { 
  QUESTION_WEIGHTS, 
  SKIN_TYPE_SCORES,
  SENSITIVITY_SCORES,
  SKIN_CHARACTERISTICS, 
  SKIN_STATE_CHARACTERISTICS, 
  SKIN_CONCERNS, 
  SKIN_STATE_CONCERNS,
  debugSkinTypeCalculation
} from './skinTypeConfig';
import { calculateConfidence } from './skinTypeValidation';

export const calculateSkinType = (answers: Record<string, string>): SkinTypeScore => {
  console.log("🚀 NOUVEAU CALCUL DE TYPE DE PEAU");
  console.log("Réponses reçues:", answers);
  
  // Debug avec la nouvelle fonction
  const debugResult = debugSkinTypeCalculation(answers);
  
  // Initialiser les scores pour les types de peau
  const typeScores: Record<string, number> = {
    "dry": 0,
    "combination": 0,
    "oily": 0,
    "normal": 0
  };
  
  // Score de sensibilité
  let sensitivityScore = 0;
  let sensitivityQuestions = 0;
  
  // Calculer les scores
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionWeight = QUESTION_WEIGHTS.find(w => w.questionId === questionId);
    if (!questionWeight) return;
    
    const { weight, category } = questionWeight;
    
    if (category === 'state') {
      // Questions de sensibilité
      const scoreMapping = SENSITIVITY_SCORES[questionId];
      if (scoreMapping && scoreMapping[answer] !== undefined) {
        sensitivityScore += scoreMapping[answer] * weight;
        sensitivityQuestions++;
      }
    } else {
      // Questions de type de peau
      const scoreMapping = SKIN_TYPE_SCORES[questionId];
      if (scoreMapping && scoreMapping[answer] !== undefined) {
        const baseScore = scoreMapping[answer];
        
        // Attribution directe selon la réponse
        switch (answer) {
          case "seche":
            typeScores["dry"] += baseScore * weight;
            break;
          case "grasse":
            typeScores["oily"] += baseScore * weight;
            break;
          case "mixte":
            typeScores["combination"] += baseScore * weight;
            break;
          case "normale":
            typeScores["normal"] += baseScore * weight;
            break;
        }
      }
    }
  });
  
  // Déterminer le type dominant
  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore) || "normal";
  
  // Déterminer si la peau est sensible (seuil abaissé)
  const maxSensitivityPossible = sensitivityQuestions * 3 * 2; // questions * score max * poids max
  const sensitivityThreshold = maxSensitivityPossible * 0.4; // Seuil à 40%
  const isSensitive = sensitivityScore > sensitivityThreshold;
  
  console.log("📊 RÉSULTATS FINAUX:", {
    typeScores,
    dominantType,
    sensitivityScore,
    sensitivityThreshold,
    isSensitive
  });
  
  // Calculer le score de confiance
  const confidence = calculateConfidence(answers, typeScores);
  
  // Obtenir les caractéristiques et préoccupations
  let characteristics = [...(SKIN_CHARACTERISTICS[dominantType] || [])];
  let concerns = [...(SKIN_CONCERNS[dominantType] || [])];
  
  // Ajouter les caractéristiques d'état si applicable
  if (isSensitive) {
    characteristics = [...characteristics, ...(SKIN_STATE_CHARACTERISTICS["sensitive"] || [])];
    concerns = [...concerns, ...(SKIN_STATE_CONCERNS["sensitive"] || [])];
  }
  
  const result = {
    type: dominantType,
    state: isSensitive ? "sensitive" : null,
    score: maxTypeScore,
    confidence,
    characteristics,
    concerns
  };
  
  console.log("🎯 DIAGNOSTIC FINAL:", result);
  
  return result;
};

// Re-export everything for backward compatibility
export * from './skinTypes';
export * from './skinTypeValidation';
export * from './skinTypeRecommendations';
