
import { QuestionWeight } from './skinTypes';

// Pondération des questions - VERSION SIMPLIFIÉE
export const QUESTION_WEIGHTS: QuestionWeight[] = [
  // Questions primaires - Type de peau
  { questionId: "sensation_apres_nettoyage", weight: 3.0, category: 'primary' },
  { questionId: "fin_journee", weight: 2.5, category: 'primary' },
  { questionId: "pores", weight: 2.0, category: 'primary' },
  { questionId: "imperfections", weight: 2.0, category: 'primary' },
  
  // Questions secondaires - Type de peau
  { questionId: "reaction_soleil", weight: 1.5, category: 'secondary' },
  { questionId: "tiraillements_frequents", weight: 1.8, category: 'secondary' },
  { questionId: "maquillage_journee", weight: 1.2, category: 'secondary' },
  { questionId: "souci_principal", weight: 1.5, category: 'secondary' },
  { questionId: "texture_creme", weight: 1.0, category: 'secondary' },
  
  // Questions d'état - Sensibilité
  { questionId: "nouveaux_produits", weight: 2.0, category: 'state' },
  { questionId: "sensation_inconfort", weight: 1.8, category: 'state' },
  { questionId: "rougeurs_frequentes", weight: 1.5, category: 'state' },
  { questionId: "reaction_environnement", weight: 1.5, category: 'state' },
];

// Caractéristiques par type de peau
export const SKIN_CHARACTERISTICS: Record<string, string[]> = {
  "dry": [
    "Tiraillements fréquents",
    "Sensation de sécheresse",
    "Desquamation possible",
    "Rides plus visibles",
    "Texture rugueuse",
    "Pores très fins",
    "Manque d'éclat"
  ],
  "combination": [
    "Zone T brillante",
    "Joues normales à sèches",
    "Pores visibles sur le nez",
    "Contraste entre zones",
    "Imperfections localisées",
    "Gestion complexe",
    "Besoins différenciés"
  ],
  "oily": [
    "Brillance excessive",
    "Pores dilatés",
    "Imperfections fréquentes",
    "Texture épaisse",
    "Sébum abondant",
    "Maquillage qui bouge",
    "Points noirs"
  ],
  "normal": [
    "Équilibre optimal",
    "Texture lisse",
    "Pores discrets",
    "Hydratation équilibrée",
    "Peu d'imperfections",
    "Éclat naturel",
    "Confort quotidien"
  ]
};

// Caractéristiques par état de peau
export const SKIN_STATE_CHARACTERISTICS: Record<string, string[]> = {
  "sensitive": [
    "Réactions cutanées fréquentes",
    "Rougeurs et irritations",
    "Sensations d'inconfort",
    "Intolérance aux produits",
    "Réactivité aux stimuli",
    "Barrière cutanée fragile",
    "Picotements ou brûlures"
  ]
};

// Préoccupations par type de peau
export const SKIN_CONCERNS: Record<string, string[]> = {
  "dry": [
    "Hydratation insuffisante",
    "Perte d'élasticité",
    "Apparition de rides précoces",
    "Desquamation visible",
    "Sensations d'inconfort",
    "Manque d'éclat",
    "Absorption difficile des produits"
  ],
  "combination": [
    "Gestion des zones mixtes",
    "Équilibre hydratation/séborégulation",
    "Imperfections localisées",
    "Contraste entre zones",
    "Routine adaptée complexe",
    "Produits multi-zones",
    "Besoins contradictoires"
  ],
  "oily": [
    "Contrôle du sébum excessif",
    "Imperfections et acné",
    "Pores dilatés et obstrués",
    "Brillance excessive",
    "Texture irrégulière",
    "Points noirs récurrents",
    "Tenue du maquillage"
  ],
  "normal": [
    "Maintien de l'équilibre",
    "Prévention du vieillissement",
    "Protection solaire",
    "Préservation de la texture",
    "Équilibre hydratation",
    "Conservation de l'éclat",
    "Prévention des déséquilibres"
  ]
};

// Préoccupations par état de peau
export const SKIN_STATE_CONCERNS: Record<string, string[]> = {
  "sensitive": [
    "Réactivité cutanée excessive",
    "Rougeurs et inflammations",
    "Intolérance aux produits",
    "Sensations d'inconfort persistantes",
    "Barrière cutanée compromise",
    "Réactions allergiques",
    "Choix de produits limités"
  ]
};

// Fonction de debug simplifiée
export const debugSkinTypeCalculation = (answers: Record<string, string>) => {
  console.log("🔍 DEBUG CALCUL TYPE DE PEAU - VERSION CORRIGÉE");
  console.log("Réponses:", answers);

  const typeScores: Record<string, number> = {
    "dry": 0, "combination": 0, "oily": 0, "normal": 0
  };
  
  const sensitivityScore = { total: 0, questions: 0 };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionWeight = QUESTION_WEIGHTS.find(w => w.questionId === questionId);
    if (!questionWeight) return;

    const { weight, category } = questionWeight;
    
    if (category === 'state') {
      if (answer === "sensible") {
        sensitivityScore.total += 3 * weight;
        sensitivityScore.questions++;
      } else if (answer === "normal") {
        sensitivityScore.questions++;
      }
    } else {
      // Attribution directe des points
      if (answer === "seche") typeScores["dry"] += 3 * weight;
      else if (answer === "grasse") typeScores["oily"] += 3 * weight;
      else if (answer === "mixte") typeScores["combination"] += 3 * weight;
      else if (answer === "normale") typeScores["normal"] += 3 * weight;
    }
  });

  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore) || "normal";
  
  const maxSensitivityPossible = sensitivityScore.questions * 3 * 2;
  const sensitivityThreshold = maxSensitivityPossible * 0.4;
  const isSensitive = sensitivityScore.total > sensitivityThreshold;

  console.log(`🏆 RÉSULTAT: ${dominantType} ${isSensitive ? '+ sensible' : ''}`);

  return {
    type: dominantType,
    state: isSensitive ? 'sensitive' : null,
    typeScores,
    sensitivityScore: sensitivityScore.total,
    threshold: sensitivityThreshold
  };
};
