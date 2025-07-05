import { QuestionWeight } from './skinTypes';

// Pondération des questions par importance
export const QUESTION_WEIGHTS: QuestionWeight[] = [
  // Questions primaires (poids élevé) - Type de peau
  { questionId: "sensation_apres_nettoyage", weight: 3.0, category: 'primary' },
  { questionId: "fin_journee", weight: 2.5, category: 'primary' },
  { questionId: "pores", weight: 2.0, category: 'primary' },
  { questionId: "imperfections", weight: 2.0, category: 'primary' },
  
  // Questions secondaires (poids moyen) - Type de peau
  { questionId: "reaction_soleil", weight: 1.5, category: 'secondary' },
  { questionId: "souci_principal", weight: 1.5, category: 'secondary' },
  { questionId: "texture_creme", weight: 1.2, category: 'secondary' },
  { questionId: "tiraillements_frequents", weight: 1.8, category: 'secondary' },
  
  // Questions d'état (poids élevé) - Sensibilité
  { questionId: "nouveaux_produits", weight: 2.0, category: 'state' },
  { questionId: "sensation_inconfort", weight: 1.8, category: 'state' },
  { questionId: "rougeurs_frequentes", weight: 1.5, category: 'state' },
  { questionId: "reaction_environnement", weight: 1.5, category: 'state' },
  
  // Questions de validation (poids faible)
  { questionId: "maquillage_journee", weight: 0.8, category: 'validation' }
];

// Mapping des réponses vers les types de peau avec scores (sans sensible)
export const ANSWER_MAPPING: Record<string, Record<string, number>> = {
  "sensation_apres_nettoyage": {
    "seche": 3,
    "mixte": 1, 
    "grasse": 0,
    "normale": 1
  },
  
  "fin_journee": {
    "seche": 3,
    "mixte": 1,
    "grasse": 0,
    "normale": 1
  },
  
  "tiraillements_frequents": {
    "seche": 3,
    "mixte": 1,
    "grasse": 0,
    "normale": 1
  },
  
  "pores": {
    "seche": 0,
    "mixte": 2,
    "grasse": 3,
    "normale": 1
  },
  
  "imperfections": {
    "seche": 1,
    "mixte": 2,
    "grasse": 3,
    "normale": 1
  },
  
  "reaction_soleil": {
    "seche": 2,
    "mixte": 1,
    "grasse": 0,
    "normale": 1
  },
  
  "souci_principal": {
    "seche": 3,
    "mixte": 2,
    "grasse": 1,
    "normale": 1
  },
  
  "texture_creme": {
    "seche": 3,
    "mixte": 2,
    "grasse": 0,
    "normale": 1
  },
  
  "maquillage_journee": {
    "seche": 2,
    "mixte": 1,
    "grasse": 0,
    "normale": 1
  }
};

// Mapping des réponses vers les états de peau
export const STATE_MAPPING: Record<string, Record<string, number>> = {
  "nouveaux_produits": {
    "sensible": 3,
    "normal": 1
  },
  
  "sensation_inconfort": {
    "sensible": 3,
    "normal": 1
  },
  
  "rougeurs_frequentes": {
    "sensible": 3,
    "normal": 1
  },
  
  "reaction_environnement": {
    "sensible": 3,
    "normal": 1
  }
};

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

// ✅ FONCTIONS DE DEBUG ET VALIDATION
export const debugSkinTypeCalculation = (answers: Record<string, string>) => {
  const typeScores: Record<string, number> = {
    "dry": 0, "combination": 0, "oily": 0, "normal": 0
  };
  const stateScores: Record<string, number> = {
    "sensitive": 0, "normal": 0
  };

  console.log("🔍 DEBUG CALCUL TYPE DE PEAU");
  console.log("Réponses reçues:", answers);
  console.log("=====================================");

  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionWeight = QUESTION_WEIGHTS.find(w => w.questionId === questionId);
    if (!questionWeight) {
      console.log(`⚠️ Question non trouvée: ${questionId}`);
      return;
    }

    const { weight, category } = questionWeight;

    console.log(`\n📋 Question: ${questionId}`);
    console.log(`   Réponse: "${answer}"`);
    console.log(`   Catégorie: ${category}`);
    console.log(`   Poids: ${weight}`);

    if (category === 'state') {
      // Questions de sensibilité
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
      } else {
        console.log(`   ❌ Réponse non mappée dans STATE_MAPPING`);
      }
    } else {
      // Questions de type de peau
      const typeMapping = ANSWER_MAPPING[questionId];
      if (typeMapping) {
        if (typeMapping[answer] !== undefined) {
          // Réponse directe trouvée
          const baseScore = typeMapping[answer];
          const score = baseScore * weight;
          
          // Attribution intelligente des scores
          if (baseScore >= 2.5) {
            typeScores["dry"] += score;
            console.log(`   ✅ Score peau sèche: +${score.toFixed(2)}`);
          } else if (baseScore <= 0.5) {
            typeScores["oily"] += (3 - baseScore) * weight;
            console.log(`   ✅ Score peau grasse: +${((3 - baseScore) * weight).toFixed(2)}`);
          } else if (baseScore >= 1.5 && baseScore < 2.5) {
            typeScores["combination"] += score;
            console.log(`   ✅ Score peau mixte: +${score.toFixed(2)}`);
          } else {
            typeScores["normal"] += score;
            console.log(`   ✅ Score peau normale: +${score.toFixed(2)}`);
          }
        } else {
          console.log(`   ❌ Réponse "${answer}" non mappée`);
          console.log(`   Mappings disponibles:`, Object.keys(typeMapping));
        }
      } else {
        console.log(`   ❌ Aucun mapping trouvé pour cette question`);
      }
    }
  });

  console.log("\n📊 SCORES FINAUX:");
  console.log("=================");
  console.log("Types de peau:");
  Object.entries(typeScores).forEach(([type, score]) => {
    console.log(`   ${type}: ${score.toFixed(2)}`);
  });
  console.log("États de peau:");
  Object.entries(stateScores).forEach(([state, score]) => {
    console.log(`   ${state}: ${score.toFixed(2)}`);
  });

  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore);

  const totalStateWeight = QUESTION_WEIGHTS.filter(w => w.category === 'state').reduce((sum, w) => sum + w.weight, 0);
  const sensitivityThreshold = totalStateWeight * 0.25; // ✅ Seuil réduit à 25%
  const isSensitive = stateScores["sensitive"] > sensitivityThreshold;

  console.log(`\n🏆 DIAGNOSTIC FINAL:`);
  console.log(`   Type: ${dominantType} (score: ${maxTypeScore.toFixed(2)})`);
  console.log(`   État: ${isSensitive ? 'sensitive' : 'normal'} (seuil: ${sensitivityThreshold.toFixed(2)}, score: ${stateScores["sensitive"].toFixed(2)})`);

  return {
    type: dominantType,
    state: isSensitive ? 'sensitive' : null,
    typeScores,
    stateScores,
    threshold: sensitivityThreshold
  };
};

export const validateConfiguration = () => {
  console.log("🔍 VALIDATION DE LA CONFIGURATION");
  console.log("===================================");

  let errors = 0;

  // Vérifier que toutes les questions ont un mapping
  QUESTION_WEIGHTS.forEach(({ questionId, category }) => {
    if (category === 'state') {
      if (!STATE_MAPPING[questionId]) {
        console.error(`❌ STATE_MAPPING manquant: ${questionId}`);
        errors++;
      } else {
        console.log(`✅ STATE_MAPPING OK: ${questionId}`);
      }
    } else {
      if (!ANSWER_MAPPING[questionId]) {
        console.error(`❌ ANSWER_MAPPING manquant: ${questionId}`);
        errors++;
      } else {
        console.log(`✅ ANSWER_MAPPING OK: ${questionId}`);
      }
    }
  });

  console.log(`\n📈 RÉSUMÉ:`);
  console.log(`   Questions totales: ${QUESTION_WEIGHTS.length}`);
  console.log(`   Questions type: ${QUESTION_WEIGHTS.filter(q => q.category !== 'state').length}`);
  console.log(`   Questions état: ${QUESTION_WEIGHTS.filter(q => q.category === 'state').length}`);
  console.log(`   Erreurs: ${errors}`);

  if (errors === 0) {
    console.log(`✅ Configuration valide !`);
  } else {
    console.log(`❌ ${errors} erreur(s) à corriger`);
  }

  return errors === 0;
};