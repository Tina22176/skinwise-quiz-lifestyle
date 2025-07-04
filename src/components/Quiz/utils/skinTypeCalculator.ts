
import { SkinTypeScore } from './skinTypes';
import { 
  QUESTION_WEIGHTS, 
  SKIN_CHARACTERISTICS, 
  SKIN_STATE_CHARACTERISTICS, 
  SKIN_CONCERNS, 
  SKIN_STATE_CONCERNS
} from './skinTypeConfig';
import { calculateConfidence } from './skinTypeValidation';

export const calculateSkinType = (answers: Record<string, string>): SkinTypeScore => {
  console.log("🚀 NOUVEAU CALCUL DE TYPE DE PEAU - VERSION CORRIGÉE");
  console.log("Réponses reçues:", answers);
  
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
  
  // Calculer les scores avec logique DIRECTE
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionWeight = QUESTION_WEIGHTS.find(w => w.questionId === questionId);
    if (!questionWeight) {
      console.log(`⚠️ Question non trouvée: ${questionId}`);
      return;
    }
    
    const { weight, category } = questionWeight;
    console.log(`📋 Question: ${questionId}, Réponse: ${answer}, Poids: ${weight}`);
    
    if (category === 'state') {
      // Questions de sensibilité
      if (answer === "sensible") {
        sensitivityScore += 3 * weight;
        sensitivityQuestions++;
        console.log(`   ✅ +${(3 * weight).toFixed(1)} points sensibilité`);
      } else if (answer === "normal") {
        sensitivityQuestions++;
        console.log(`   ✅ +0 points sensibilité (réponse normale)`);
      }
    } else {
      // Questions de type de peau - Attribution DIRECTE
      if (answer === "seche") {
        typeScores["dry"] += 3 * weight;
        console.log(`   ✅ +${(3 * weight).toFixed(1)} points PEAU SÈCHE`);
      } else if (answer === "grasse") {
        typeScores["oily"] += 3 * weight;
        console.log(`   ✅ +${(3 * weight).toFixed(1)} points PEAU GRASSE`);
      } else if (answer === "mixte") {
        typeScores["combination"] += 3 * weight;
        console.log(`   ✅ +${(3 * weight).toFixed(1)} points PEAU MIXTE`);
      } else if (answer === "normale") {
        typeScores["normal"] += 3 * weight;
        console.log(`   ✅ +${(3 * weight).toFixed(1)} points PEAU NORMALE`);
      }
    }
  });
  
  console.log("📊 SCORES FINAUX:", typeScores);
  
  // Déterminer le type dominant
  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore) || "normal";
  
  // Si tous les scores sont à 0, forcer "normal"
  if (maxTypeScore === 0) {
    typeScores["normal"] = 1;
    console.log("⚠️ Aucun score détecté, attribution par défaut: normal");
  }
  
  // Déterminer si la peau est sensible
  const maxSensitivityPossible = sensitivityQuestions * 3 * 2; // questions * score max * poids max
  const sensitivityThreshold = maxSensitivityPossible * 0.4; // Seuil à 40%
  const isSensitive = sensitivityScore > sensitivityThreshold;
  
  console.log("🎯 SENSIBILITÉ:", {
    score: sensitivityScore,
    threshold: sensitivityThreshold,
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
  
  console.log("🏆 DIAGNOSTIC FINAL:", result);
  
  return result;
};

// Re-export everything for backward compatibility
export * from './skinTypes';
export * from './skinTypeValidation';
export * from './skinTypeRecommendations';
