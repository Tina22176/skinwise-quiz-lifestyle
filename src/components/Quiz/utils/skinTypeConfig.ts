
import { QuestionWeight } from './skinTypes';

// Pondération des questions par importance - SIMPLIFIÉE
export const QUESTION_WEIGHTS: QuestionWeight[] = [
  // Questions primaires (poids élevé) - Type de peau
  { questionId: "sensation_apres_nettoyage", weight: 3.0, category: 'primary' },
  { questionId: "fin_journee", weight: 2.5, category: 'primary' },
  { questionId: "pores", weight: 2.0, category: 'primary' },
  { questionId: "imperfections", weight: 2.0, category: 'primary' },
  
  // Questions secondaires (poids moyen) - Type de peau
  { questionId: "reaction_soleil", weight: 1.5, category: 'secondary' },
  { questionId: "tiraillements_frequents", weight: 1.8, category: 'secondary' },
  { questionId: "maquillage_journee", weight: 1.2, category: 'secondary' },
  
  // Questions d'état (poids élevé) - Sensibilité
  { questionId: "nouveaux_produits", weight: 2.0, category: 'state' },
  { questionId: "sensation_inconfort", weight: 1.8, category: 'state' },
  { questionId: "rougeurs_frequentes", weight: 1.5, category: 'state' },
  { questionId: "reaction_environnement", weight: 1.5, category: 'state' },
];

// Mapping SIMPLIFIÉ des réponses vers les types de peau
export const SKIN_TYPE_SCORES: Record<string, Record<string, number>> = {
  "sensation_apres_nettoyage": {
    "seche": 3,    // Peau sèche
    "mixte": 1,    // Peau mixte
    "grasse": 0,   // Peau grasse
    "normale": 1   // Peau normale
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
    "normale": 0.5
  },
  
  "pores": {
    "seche": 0,    // Pores fins
    "mixte": 2,    // Pores moyens
    "grasse": 3,   // Pores larges
    "normale": 1   // Pores normaux
  },
  
  "imperfections": {
    "seche": 0,    // Peu d'imperfections
    "mixte": 2,    // Imperfections modérées
    "grasse": 3,   // Beaucoup d'imperfections
    "normale": 0.5 // Rares imperfections
  },
  
  "reaction_soleil": {
    "seche": 2,    // Brûle facilement
    "mixte": 1,    // Réaction modérée
    "grasse": 0,   // Bronze facilement
    "normale": 1   // Réaction normale
  },
  
  "maquillage_journee": {
    "seche": 2,    // Marque les ridules
    "mixte": 1,    // Tenue variable
    "grasse": 0,   // Glisse/fond
    "normale": 1   // Tient bien
  }
};

// Mapping des réponses vers les états de peau (sensibilité)
export const SENSITIVITY_SCORES: Record<string, Record<string, number>> = {
  "nouveaux_produits": {
    "sensible": 3,
    "normal": 0
  },
  
  "sensation_inconfort": {
    "sensible": 3,
    "normal": 0
  },
  
  "rougeurs_frequentes": {
    "sensible": 3,
    "normal": 0
  },
  
  "reaction_environnement": {
    "sensible": 3,
    "normal": 0
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

// Fonction de debug pour valider la configuration
export const debugSkinTypeCalculation = (answers: Record<string, string>) => {
  console.log("🔍 DEBUG CALCUL TYPE DE PEAU - VERSION SIMPLIFIÉE");
  console.log("Réponses reçues:", answers);
  console.log("=====================================");

  const typeScores: Record<string, number> = {
    "dry": 0, "combination": 0, "oily": 0, "normal": 0
  };
  
  const sensitivityScore = { total: 0, questions: 0 };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionWeight = QUESTION_WEIGHTS.find(w => w.questionId === questionId);
    if (!questionWeight) {
      console.log(`⚠️ Question non trouvée dans QUESTION_WEIGHTS: ${questionId}`);
      return;
    }

    const { weight, category } = questionWeight;
    console.log(`\n📋 Question: ${questionId}`);
    console.log(`   Réponse: "${answer}"`);
    console.log(`   Catégorie: ${category}`);
    console.log(`   Poids: ${weight}`);

    if (category === 'state') {
      // Questions de sensibilité
      const scoreMapping = SENSITIVITY_SCORES[questionId];
      if (scoreMapping && scoreMapping[answer] !== undefined) {
        const score = scoreMapping[answer] * weight;
        sensitivityScore.total += score;
        sensitivityScore.questions++;
        console.log(`   ✅ Score sensibilité: +${score.toFixed(2)}`);
      } else {
        console.log(`   ❌ Réponse "${answer}" non mappée pour la sensibilité`);
      }
    } else {
      // Questions de type de peau
      const scoreMapping = SKIN_TYPE_SCORES[questionId];
      if (scoreMapping && scoreMapping[answer] !== undefined) {
        const baseScore = scoreMapping[answer];
        
        // Attribution directe des scores selon la réponse
        if (answer === "seche") {
          typeScores["dry"] += baseScore * weight;
          console.log(`   ✅ Score peau sèche: +${(baseScore * weight).toFixed(2)}`);
        } else if (answer === "grasse") {
          typeScores["oily"] += baseScore * weight;
          console.log(`   ✅ Score peau grasse: +${(baseScore * weight).toFixed(2)}`);
        } else if (answer === "mixte") {
          typeScores["combination"] += baseScore * weight;
          console.log(`   ✅ Score peau mixte: +${(baseScore * weight).toFixed(2)}`);
        } else if (answer === "normale") {
          typeScores["normal"] += baseScore * weight;
          console.log(`   ✅ Score peau normale: +${(baseScore * weight).toFixed(2)}`);
        }
      } else {
        console.log(`   ❌ Réponse "${answer}" non mappée pour le type de peau`);
      }
    }
  });

  console.log("\n📊 SCORES FINAUX:");
  console.log("=================");
  console.log("Types de peau:");
  Object.entries(typeScores).forEach(([type, score]) => {
    console.log(`   ${type}: ${score.toFixed(2)}`);
  });
  
  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore);
  
  // Seuil de sensibilité plus bas (50% du score maximum possible)
  const maxSensitivityPossible = sensitivityScore.questions * 3 * 2; // max questions * max score * max weight
  const sensitivityThreshold = maxSensitivityPossible * 0.5;
  const isSensitive = sensitivityScore.total > sensitivityThreshold;

  console.log(`\n🏆 DIAGNOSTIC FINAL:`);
  console.log(`   Type: ${dominantType} (score: ${maxTypeScore.toFixed(2)})`);
  console.log(`   Sensibilité: ${isSensitive ? 'OUI' : 'NON'} (score: ${sensitivityScore.total.toFixed(2)}, seuil: ${sensitivityThreshold.toFixed(2)})`);

  return {
    type: dominantType,
    state: isSensitive ? 'sensitive' : null,
    typeScores,
    sensitivityScore: sensitivityScore.total,
    threshold: sensitivityThreshold
  };
};
