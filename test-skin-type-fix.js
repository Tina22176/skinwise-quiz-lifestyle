// Test du calcul du type de peau
const testAnswers = {
  "sensation_apres_nettoyage": "seche",
  "fin_journee": "seche", 
  "tiraillements_frequents": "seche",
  "pores": "seche",
  "imperfections": "seche",
  "nouveaux_produits": "sensible",
  "sensation_inconfort": "sensible",
  "rougeurs_frequentes": "sensible",
  "reaction_environnement": "sensible"
};

console.log("🧪 Test avec réponses peau sèche + sensible:");
console.log("Réponses:", testAnswers);

// Simuler le calcul
const QUESTION_WEIGHTS = [
  { questionId: "sensation_apres_nettoyage", weight: 3.0, category: 'primary' },
  { questionId: "fin_journee", weight: 2.5, category: 'primary' },
  { questionId: "pores", weight: 2.0, category: 'primary' },
  { questionId: "imperfections", weight: 2.0, category: 'primary' },
  { questionId: "nouveaux_produits", weight: 2.0, category: 'state' },
  { questionId: "sensation_inconfort", weight: 1.8, category: 'state' },
  { questionId: "rougeurs_frequentes", weight: 1.5, category: 'state' },
  { questionId: "reaction_environnement", weight: 1.5, category: 'state' },
  { questionId: "tiraillements_frequents", weight: 1.8, category: 'secondary' }
];

const ANSWER_MAPPING = {
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
  }
};

const STATE_MAPPING = {
  "nouveaux_produits": {
    "sensible": 3, "normal": 1
  },
  "sensation_inconfort": {
    "sensible": 3, "normal": 1
  },
  "rougeurs_frequentes": {
    "sensible": 3, "normal": 1
  },
  "reaction_environnement": {
    "sensible": 3, "normal": 1
  }
};

function calculateSkinType(answers) {
  const typeScores = { "dry": 0, "combination": 0, "oily": 0, "normal": 0 };
  const stateScores = { "sensitive": 0, "normal": 0 };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const weight = QUESTION_WEIGHTS.find(w => w.questionId === questionId)?.weight || 1.0;
    const category = QUESTION_WEIGHTS.find(w => w.questionId === questionId)?.category || 'secondary';
    
    if (category === 'state') {
      const stateMapping = STATE_MAPPING[questionId];
      if (stateMapping && stateMapping[answer] !== undefined) {
        const englishAnswer = answer === 'sensible' ? 'sensitive' : answer;
        if (englishAnswer && stateScores[englishAnswer] !== undefined) {
          stateScores[englishAnswer] += stateMapping[answer] * weight;
        }
      }
    } else {
      const typeMapping = ANSWER_MAPPING[questionId];
      if (typeMapping && typeMapping[answer] !== undefined) {
        const englishAnswer = answer === 'seche' ? 'dry' : 
                             answer === 'mixte' ? 'combination' : 
                             answer === 'grasse' ? 'oily' : 
                             answer === 'normale' ? 'normal' : answer;
        if (englishAnswer && typeScores[englishAnswer] !== undefined) {
          typeScores[englishAnswer] += typeMapping[answer] * weight;
        }
      }
    }
  });

  const maxTypeScore = Math.max(...Object.values(typeScores));
  const dominantType = Object.keys(typeScores).find(type => typeScores[type] === maxTypeScore) || "normal";

  const maxStateScore = Math.max(...Object.values(stateScores));
  const totalStateWeight = QUESTION_WEIGHTS.filter(w => w.category === 'state').reduce((sum, w) => sum + w.weight, 0);
  const sensitivityThreshold = totalStateWeight * 0.25;
  const dominantState = maxStateScore > sensitivityThreshold ? Object.keys(stateScores).find(state => stateScores[state] === maxStateScore) : null;

  return { typeScores, stateScores, dominantType, dominantState, maxTypeScore, maxStateScore, sensitivityThreshold };
}

// Test 1: Peau sèche + sensible
const result1 = calculateSkinType(testAnswers);
console.log("📊 Scores de type:", result1.typeScores);
console.log("📊 Scores d'état:", result1.stateScores);
console.log("🎯 Résultat:");
console.log("- Type dominant:", result1.dominantType);
console.log("- État dominant:", result1.dominantState);
console.log("- Score type max:", result1.maxTypeScore);
console.log("- Score état max:", result1.maxStateScore);
console.log("- Seuil sensibilité:", result1.sensitivityThreshold);

console.log("\n" + "=".repeat(50) + "\n");

// Test 2: Peau grasse + normale
const testAnswers2 = {
  "sensation_apres_nettoyage": "grasse",
  "fin_journee": "grasse", 
  "tiraillements_frequents": "grasse",
  "pores": "grasse",
  "imperfections": "grasse",
  "nouveaux_produits": "normal",
  "sensation_inconfort": "normal",
  "rougeurs_frequentes": "normal",
  "reaction_environnement": "normal"
};

console.log("🧪 Test avec réponses peau grasse + normale:");
console.log("Réponses:", testAnswers2);

const result2 = calculateSkinType(testAnswers2);
console.log("📊 Scores de type:", result2.typeScores);
console.log("📊 Scores d'état:", result2.stateScores);
console.log("🎯 Résultat:");
console.log("- Type dominant:", result2.dominantType);
console.log("- État dominant:", result2.dominantState);
console.log("- Score type max:", result2.maxTypeScore);
console.log("- Score état max:", result2.maxStateScore);
console.log("- Seuil sensibilité:", result2.sensitivityThreshold); 