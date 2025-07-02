// Types pour l'algorithme avancé
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

  // Pondération des questions par importance
const QUESTION_WEIGHTS: QuestionWeight[] = [
  // Questions primaires (poids élevé) - Type de peau
  { questionId: "sensation_apres_nettoyage", weight: 3.0, category: 'primary' },
  { questionId: "fin_journee", weight: 2.5, category: 'primary' },
  { questionId: "pores", weight: 2.0, category: 'primary' },
  { questionId: "imperfections", weight: 2.0, category: 'primary' },
  
  // Questions secondaires (poids moyen) - Type de peau
  { questionId: "reaction_soleil", weight: 1.5, category: 'secondary' },
  { questionId: "souci_principal", weight: 1.5, category: 'secondary' },
  { questionId: "texture_creme", weight: 1.2, category: 'secondary' },
  { questionId: "tiraillements_frequents", weight: 1.0, category: 'secondary' },
  
  // Questions d'état (poids élevé) - Sensibilité
  { questionId: "nouveaux_produits", weight: 2.0, category: 'state' },
  { questionId: "sensation_inconfort", weight: 1.8, category: 'state' },
  
  // Questions de validation (poids faible)
  { questionId: "maquillage_journee", weight: 0.8, category: 'validation' }
];

// Mapping des réponses vers les types de peau avec scores (sans sensible)
const ANSWER_MAPPING: Record<string, Record<string, number>> = {
  "sensation_apres_nettoyage": {
    "seche": 3, "mixte": 1, "grasse": 0, "normale": 1
  },
  "fin_journee": {
    "seche": 3, "mixte": 1, "grasse": 0, "normale": 1
  },
  "tiraillements_frequents": {
    "seche": 3, "mixte": 1, "grasse": 0, "normale": 1
  },
  "pores": {
    "seche": 0, "mixte": 2, "grasse": 3, "normale": 1
  },
  "imperfections": {
    "seche": 1, "mixte": 2, "grasse": 3, "normale": 1
  },
  "reaction_soleil": {
    "seche": 2, "mixte": 1, "grasse": 0, "normale": 1
  },
  "souci_principal": {
    "seche": 3, "mixte": 2, "grasse": 1, "normale": 1
  },
  "texture_creme": {
    "seche": 3, "mixte": 2, "grasse": 0, "normale": 1
  },
  "maquillage_journee": {
    "seche": 2, "mixte": 1, "grasse": 0, "normale": 1
  }
};

// Mapping des réponses vers les états de peau
const STATE_MAPPING: Record<string, Record<string, number>> = {
  "nouveaux_produits": {
    "sensible": 3, "normal": 1
  },
  "sensation_inconfort": {
    "sensible": 3, "normal": 1
  },
  // Ajout d'une question de validation pour la sensibilité
  "tiraillements_frequents": {
    "sensible": 1, "normal": 2 // Tiraillements peuvent indiquer sensibilité
  }
};

// Caractéristiques par type de peau
const SKIN_CHARACTERISTICS: Record<string, string[]> = {
  "dry": [
    "Tiraillements fréquents",
    "Sensation de sécheresse",
    "Desquamation possible",
    "Rides plus visibles",
    "Texture rugueuse"
  ],
  "combination": [
    "Zone T brillante",
    "Joues normales à sèches",
    "Pores visibles sur le nez",
    "Contraste entre zones",
    "Imperfections localisées"
  ],
  "oily": [
    "Brillance excessive",
    "Pores dilatés",
    "Imperfections fréquentes",
    "Texture épaisse",
    "Sébum abondant"
  ],
  "normal": [
    "Équilibre optimal",
    "Texture lisse",
    "Pores discrets",
    "Hydratation équilibrée",
    "Peu d'imperfections"
  ]
};

// Caractéristiques par état de peau
const SKIN_STATE_CHARACTERISTICS: Record<string, string[]> = {
  "sensitive": [
    "Réactions cutanées",
    "Rougeurs fréquentes",
    "Sensations d'inconfort",
    "Intolérance aux produits",
    "Réactivité aux stimuli"
  ]
};

// Préoccupations par type de peau
const SKIN_CONCERNS: Record<string, string[]> = {
  "dry": [
    "Hydratation insuffisante",
    "Perte d'élasticité",
    "Apparition de rides",
    "Desquamation",
    "Sensations d'inconfort"
  ],
  "combination": [
    "Gestion des zones mixtes",
    "Équilibre hydratation/séborégulation",
    "Imperfections localisées",
    "Contraste entre zones",
    "Routine adaptée"
  ],
  "oily": [
    "Contrôle du sébum",
    "Imperfections",
    "Pores dilatés",
    "Brillance excessive",
    "Texture irrégulière"
  ],
  "normal": [
    "Maintien de l'équilibre",
    "Prévention du vieillissement",
    "Protection solaire",
    "Préservation de la texture",
    "Équilibre hydratation"
  ]
};

// Préoccupations par état de peau
const SKIN_STATE_CONCERNS: Record<string, string[]> = {
  "sensitive": [
    "Réactivité cutanée",
    "Rougeurs",
    "Intolérance aux produits",
    "Sensations d'inconfort",
    "Barrière cutanée fragile"
  ]
};

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
const calculateConfidence = (answers: Record<string, string>, scores: Record<string, number>): number => {
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
  const sensitivityThreshold = totalStateWeight * 0.4; // 40% du score total possible
  const dominantState = maxStateScore > sensitivityThreshold ? Object.keys(stateScores).find(state => stateScores[state] === maxStateScore) : null;
  
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

// Fonction utilitaire pour convertir les réponses françaises vers anglaises
const convertToEnglish = (frenchAnswer: string): string | null => {
  const mapping: Record<string, string> = {
    "seche": "dry",
    "mixte": "combination", 
    "grasse": "oily",
    "sensible": "sensitive",
    "normale": "normal"
  };
  return mapping[frenchAnswer] || null;
};

// Fonction pour obtenir des recommandations basées sur le score
export const getRecommendations = (skinTypeScore: SkinTypeScore): string[] => {
  const { type, state, confidence, concerns } = skinTypeScore;
  
  const baseRecommendations: Record<string, string[]> = {
    "dry": [
      "Utilisez des produits hydratants riches",
      "Évitez les nettoyants détergents",
      "Appliquez une crème hydratante matin et soir",
      "Protégez votre peau du soleil",
      "Utilisez des masques hydratants 2-3 fois par semaine"
    ],
    "combination": [
      "Adaptez vos produits selon les zones",
      "Utilisez des produits équilibrants",
      "Nettoyez en douceur la zone T",
      "Hydratez les zones sèches",
      "Évitez les produits trop riches sur la zone T"
    ],
    "oily": [
      "Utilisez des produits séborégulateurs",
      "Nettoyez matin et soir",
      "Évitez les produits comédogènes",
      "Utilisez des masques purifiants",
      "Hydratez avec des textures légères"
    ],
    "normal": [
      "Maintenez une routine équilibrée",
      "Protégez votre peau du soleil quotidiennement",
      "Hydratez avec des textures adaptées",
      "Nettoyez en douceur matin et soir",
      "Utilisez des produits polyvalents"
    ]
  };
  
  const stateRecommendations: Record<string, string[]> = {
    "sensitive": [
      "Privilégiez les produits hypoallergéniques",
      "Testez toujours avant utilisation",
      "Évitez les parfums et alcools",
      "Utilisez des produits apaisants",
      "Protégez des agressions extérieures"
    ]
  };
  
  let recommendations = [...(baseRecommendations[type] || [])];
  
  // Ajouter les recommandations d'état si applicable
  if (state && state !== 'normal') {
    recommendations = [...recommendations, ...(stateRecommendations[state] || [])];
  }
  
  // Ajouter des recommandations basées sur la confiance
  if (confidence < 0.7) {
    recommendations.push("Consultez un dermatologue pour confirmer votre type de peau");
  }
  
  return recommendations;
};
