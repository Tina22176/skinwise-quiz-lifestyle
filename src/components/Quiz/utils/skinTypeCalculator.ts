import { SkinTypeScore } from './skinTypes';
import { 
  QUESTION_WEIGHTS, 
  ANSWER_MAPPING, 
  STATE_MAPPING, 
  SKIN_CHARACTERISTICS, 
  SKIN_STATE_CHARACTERISTICS, 
  SKIN_CONCERNS, 
  SKIN_STATE_CONCERNS 
} from './skinTypeConfig';
import { calculateConfidence, convertToEnglish } from './skinTypeValidation';

export const calculateSkinType = (answers: Record<string, string>): SkinTypeScore => {
  // Initialiser les scores pondérés pour les types de peau
  const typeScores: Record<string, number> = {
    "dry": 0,
    "combination": 0,
    "oily": 0,
    "normal": 0
  };
  
  // Initialiser les scores pour les états de peau
  const stateScores: Record<string, number> = {
    "sensitive": 0,
    "normal": 0
  };
  
  // Calculer les scores pondérés par type et état
  Object.entries(answers).forEach(([questionId, answer]) => {
    const weight = QUESTION_WEIGHTS.find(w => w.questionId === questionId)?.weight || 1.0;
    const category = QUESTION_WEIGHTS.find(w => w.questionId === questionId)?.category || 'secondary';
    
    if (category === 'state') {
      // Questions d'état (sensibilité)
      const stateMapping = STATE_MAPPING[questionId];
      if (stateMapping && stateMapping[answer] !== undefined) {
        const englishAnswer = convertToEnglish(answer);
        if (englishAnswer && stateScores[englishAnswer] !== undefined) {
          stateScores[englishAnswer] += stateMapping[answer] * weight;
        }
      }
    } else {
      // Questions de type de peau
      const typeMapping = ANSWER_MAPPING[questionId];
      if (typeMapping && typeMapping[answer] !== undefined) {
        const englishAnswer = convertToEnglish(answer);
        if (englishAnswer && typeScores[englishAnswer] !== undefined) {
          typeScores[englishAnswer] += typeMapping[answer] * weight;
        }
      }
    }
  });
  
  // Déterminer le type dominant
  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore) || "normal";
  
  // Déterminer l'état dominant (si applicable) - seuil plus précis
  const maxStateScore = Math.max(...Object.values(stateScores));
  const totalStateWeight = QUESTION_WEIGHTS.filter(w => w.category === 'state').reduce((sum, w) => sum + w.weight, 0);
  const sensitivityThreshold = totalStateWeight * 0.3; // 30% du score total possible (seuil abaissé)
  const dominantState = maxStateScore > sensitivityThreshold ? Object.keys(stateScores).find(state => stateScores[state] === maxStateScore) : null;
  
  // Debug logs pour la sensibilité
  console.log('🔍 Debug Sensibilité:', {
    stateScores,
    maxStateScore,
    totalStateWeight,
    sensitivityThreshold,
    dominantState,
    answers: Object.entries(answers).filter(([id]) => QUESTION_WEIGHTS.find(w => w.questionId === id)?.category === 'state')
  });
  
  // Calculer le score de confiance
  const confidence = calculateConfidence(answers, typeScores);
  
  // Obtenir les caractéristiques et préoccupations
  let characteristics = [...(SKIN_CHARACTERISTICS[dominantType] || [])];
  let concerns = [...(SKIN_CONCERNS[dominantType] || [])];
  
  // Ajouter les caractéristiques d'état si applicable
  if (dominantState && dominantState !== 'normal') {
    characteristics = [...characteristics, ...(SKIN_STATE_CHARACTERISTICS[dominantState] || [])];
    concerns = [...concerns, ...(SKIN_STATE_CONCERNS[dominantState] || [])];
  }
  
  return {
    type: dominantType,
    state: dominantState,
    score: maxTypeScore,
    confidence,
    characteristics,
    concerns
  };
};

// Re-export everything for backward compatibility
export * from './skinTypes';
export * from './skinTypeValidation';
export * from './skinTypeRecommendations';