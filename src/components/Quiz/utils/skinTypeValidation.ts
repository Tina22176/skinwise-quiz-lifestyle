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
  
  // Nouvelles validations de cohérence
  if (answers.tiraillements_frequents === "seche" && answers.fin_journee === "grasse") {
    conflicts.push("Contradiction entre tiraillements fréquents et peau grasse en fin de journée");
  }
  
  if (answers.imperfections === "grasse" && answers.sensation_apres_nettoyage === "seche") {
    conflicts.push("Contradiction entre imperfections (peau grasse) et sensation sèche après nettoyage");
  }
  
  if (answers.texture_creme === "Riche" && answers.fin_journee === "grasse") {
    conflicts.push("Contradiction entre préférence pour textures riches et peau grasse en fin de journée");
  }
  
  if (answers.maquillage_journee === "Glisse" && answers.sensation_apres_nettoyage === "seche") {
    conflicts.push("Contradiction entre maquillage qui glisse (peau grasse) et sensation sèche après nettoyage");
  }
  
  return {
    isValid: conflicts.length === 0,
    conflicts
  };
};

// Calcul du score de confiance amélioré
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

  // Facteur de cohérence des réponses
  const skinTypeIndicators = {
    dry: ['seche', 'Très sèche', 'Sèche', 'Tiraillements', 'Desquamation'],
    oily: ['grasse', 'Grasse', 'Brillante', 'Huileuse', 'Sébum visible'],
    combination: ['mixte', 'Mixte', 'Zone T brillante', 'Contrastée'],
    normal: ['normale', 'Normale', 'Équilibrée', 'Confortable']
  };

  let consistencyCount = 0;
  let totalIndicators = 0;

  Object.entries(skinTypeIndicators).forEach(([type, indicators]) => {
    const matchingAnswers = Object.values(answers).filter(answer => 
      indicators.some(indicator => 
        answer.toLowerCase().includes(indicator.toLowerCase())
      )
    ).length;
    
    if (matchingAnswers > 0) {
      consistencyCount += matchingAnswers;
      totalIndicators += indicators.length;
    }
  });

  const answerConsistency = totalIndicators > 0 ? consistencyCount / totalIndicators : 0.5;

  // Calcul final du score de confiance
  const finalConfidence = (
    completionRate * 0.3 + 
    consistencyScore * 0.3 + 
    scoreGap * 0.2 + 
    answerConsistency * 0.2
  );

  console.log(`🔍 CALCUL CONFIANCE:`);
  console.log(`   Taux de completion: ${(completionRate * 100).toFixed(1)}%`);
  console.log(`   Score de cohérence: ${(consistencyScore * 100).toFixed(1)}%`);
  console.log(`   Écart des scores: ${(scoreGap * 100).toFixed(1)}%`);
  console.log(`   Cohérence des réponses: ${(answerConsistency * 100).toFixed(1)}%`);
  console.log(`   Confiance finale: ${(finalConfidence * 100).toFixed(1)}%`);

  if (!validation.isValid) {
    console.log(`⚠️  Conflits détectés:`, validation.conflicts);
  }

  return Math.min(1.0, Math.max(0.0, finalConfidence));
};

// Fonction pour convertir les réponses en anglais (si nécessaire)
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

// Fonction pour obtenir des recommandations basées sur la confiance
export const getConfidenceRecommendations = (confidence: number): string[] => {
  const recommendations: string[] = [];

  if (confidence < 0.6) {
    recommendations.push("Consultez un dermatologue pour confirmer votre type de peau");
    recommendations.push("Répondez à plus de questions pour améliorer la précision");
  } else if (confidence < 0.8) {
    recommendations.push("Testez différents produits pour valider le diagnostic");
    recommendations.push("Observez votre peau sur plusieurs semaines");
  } else {
    recommendations.push("Diagnostic fiable - vous pouvez suivre les recommandations");
  }

  return recommendations;
};