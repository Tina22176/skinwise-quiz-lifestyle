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
import { calculateConfidence, validateAnswers, getConfidenceRecommendations } from './skinTypeValidation';

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
  
  console.log("CALCUL TYPE DE PEAU - Réponses reçues:", answers);
  
  // Validation de cohérence des réponses
  const validation = validateAnswers(answers);
  if (!validation.isValid) {
    console.log("⚠️  Conflits détectés dans les réponses:", validation.conflicts);
  }
  
  // Calculer les scores pondérés par type et état
  Object.entries(answers).forEach(([questionId, answer]) => {
    const weight = QUESTION_WEIGHTS.find(w => w.questionId === questionId)?.weight || 1.0;
    const category = QUESTION_WEIGHTS.find(w => w.questionId === questionId)?.category || 'secondary';
    
    console.log(`📋 Question: ${questionId}, Réponse: "${answer}", Poids: ${weight}, Catégorie: ${category}`);
    
    if (category === 'state') {
      // Questions d'état (sensibilité)
      const stateMapping = STATE_MAPPING[questionId];
      if (stateMapping && stateMapping[answer] !== undefined) {
        const score = stateMapping[answer] * weight;
        if (stateMapping[answer] > 1.5) {
          stateScores["sensitive"] += score;
          console.log(`   ✅ Score sensible: +${score.toFixed(2)}`);
        } else {
          stateScores["normal"] += score;
          console.log(`   ✅ Score normal: +${score.toFixed(2)}`);
        }
      }
    } else {
      // Questions de type de peau
      const typeMapping = ANSWER_MAPPING[questionId];
      if (typeMapping && typeMapping[answer] !== undefined) {
        const baseScore = typeMapping[answer];
        const score = baseScore * weight;
        
        // Attribution intelligente des scores selon la réponse
        if (baseScore >= 2.5) {
          // Réponses indiquant une peau sèche
          typeScores["dry"] += score;
          console.log(`   ✅ Score peau sèche: +${score.toFixed(2)}`);
        } else if (baseScore <= 0.5) {
          // Réponses indiquant une peau grasse
          typeScores["oily"] += (3 - baseScore) * weight;
          console.log(`   ✅ Score peau grasse: +${((3 - baseScore) * weight).toFixed(2)}`);
        } else if (baseScore >= 1.5 && baseScore < 2.5) {
          // Réponses indiquant une peau mixte
          typeScores["combination"] += score;
          console.log(`   ✅ Score peau mixte: +${score.toFixed(2)}`);
        } else {
          // Réponses indiquant une peau normale
          typeScores["normal"] += score;
          console.log(`   ✅ Score peau normale: +${score.toFixed(2)}`);
        }
      } else {
        console.log(`   ❌ Réponse "${answer}" non mappée pour la question ${questionId}`);
      }
    }
  });
  
  console.log("\nSCORES FINAUX:");
  console.log("Types de peau:", typeScores);
  console.log("États de peau:", stateScores);
  
  // Déterminer le type dominant avec un seuil plus sensible
  const maxTypeScore = Math.max(...Object.values(typeScores));
  const totalPossibleScore = QUESTION_WEIGHTS
    .filter(w => w.category !== 'state')
    .reduce((sum, w) => sum + w.weight * 3, 0);
  const minThreshold = totalPossibleScore * 0.05; // Réduit à 5% pour plus de sensibilité
  
  let dominantType = "normal"; // Par défaut
  
  // Logique améliorée : toujours prendre le score le plus élevé si il y a une différence claire
  const sortedScores = Object.entries(typeScores).sort(([,a], [,b]) => b - a);
  const [highestType, highestScore] = sortedScores[0];
  const [secondType, secondScore] = sortedScores[1];
  
  // Si le score le plus élevé est significativement plus élevé que le second
  if (highestScore > secondScore * 1.2 || highestScore > minThreshold) {
    dominantType = highestType;
  } else {
    // Si les scores sont proches, analyser les réponses spécifiques
    const dryIndicators = ['Très sèche', 'Sèche', 'Tiraillements', 'Desquamation', 'seche'];
    const oilyIndicators = ['Grasse', 'Brillante', 'Huileuse', 'Sébum visible', 'grasse'];
    const combinationIndicators = ['Mixte', 'Zone T brillante', 'Contrastée', 'mixte'];
    
    const allAnswers = Object.values(answers);
    
    const dryCount = allAnswers.filter(a => dryIndicators.includes(a)).length;
    const oilyCount = allAnswers.filter(a => oilyIndicators.includes(a)).length;
    const combinationCount = allAnswers.filter(a => combinationIndicators.includes(a)).length;
    
    console.log(`🔍 Analyse des réponses: Sèche=${dryCount}, Grasse=${oilyCount}, Mixte=${combinationCount}`);
    
    if (dryCount > oilyCount && dryCount > combinationCount) {
      dominantType = "dry";
    } else if (oilyCount > dryCount && oilyCount > combinationCount) {
      dominantType = "oily";
    } else if (combinationCount > 0) {
      dominantType = "combination";
    } else {
      // Si aucune indication claire, prendre le score le plus élevé
      dominantType = highestType;
    }
  }
  
  // Déterminer l'état dominant (si applicable)
  const maxStateScore = Math.max(...Object.values(stateScores));
  const totalStateWeight = QUESTION_WEIGHTS.filter(w => w.category === 'state').reduce((sum, w) => sum + w.weight, 0);
  const sensitivityThreshold = totalStateWeight * 0.25; // 25% du score total possible
  const dominantState = maxStateScore > sensitivityThreshold ? Object.keys(stateScores).find(state => stateScores[state] === maxStateScore) : null;
  
  // Calculer le score de confiance amélioré
  const confidence = calculateConfidence(answers, typeScores);
  const confidenceRecommendations = getConfidenceRecommendations(confidence);
  
  console.log(`\nDIAGNOSTIC FINAL:`);
  console.log(`   Type: ${dominantType} (score: ${maxTypeScore.toFixed(2)}, seuil: ${minThreshold.toFixed(2)})`);
  console.log(`   État: ${dominantState || 'normal'} (seuil: ${sensitivityThreshold.toFixed(2)}, score: ${maxStateScore.toFixed(2)})`);
  console.log(`   Confiance: ${(confidence * 100).toFixed(1)}%`);
  
  if (confidence < 0.8) {
    console.log(`   ⚠️  Recommandations:`, confidenceRecommendations);
  }
  
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