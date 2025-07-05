// Test simple pour vérifier la logique de calcul des types de peau
const testAnswers = {
  // Test peau grasse
  "sensation_apres_nettoyage": "grasse",
  "fin_journee": "grasse", 
  "tiraillements_frequents": "grasse",
  "pores": "grasse",
  "imperfections": "grasse",
  "reaction_soleil": "grasse",
  "souci_principal": "grasse",
  "texture_creme": "grasse",
  "maquillage_journee": "grasse"
};

console.log("Test avec réponses peau grasse:", testAnswers);

// Simulation simple du calcul
const weights = {
  "sensation_apres_nettoyage": 3.0,
  "fin_journee": 2.5,
  "tiraillements_frequents": 1.8,
  "pores": 2.0,
  "imperfections": 2.0,
  "reaction_soleil": 1.5,
  "souci_principal": 1.5,
  "texture_creme": 1.2,
  "maquillage_journee": 0.8
};

const scores = {
  "seche": 3,
  "mixte": 1,
  "grasse": 0,
  "normale": 1
};

let totalScores = { seche: 0, mixte: 0, grasse: 0, normale: 0 };

Object.entries(testAnswers).forEach(([questionId, answer]) => {
  const weight = weights[questionId] || 1;
  const score = scores[answer] || 0;
  const weightedScore = score * weight;
  
  if (score >= 2.5) {
    totalScores.seche += weightedScore;
  } else if (score <= 0.5) {
    totalScores.grasse += (3 - score) * weight;
  } else if (score >= 1.5 && score < 2.5) {
    totalScores.mixte += weightedScore;
  } else {
    totalScores.normale += weightedScore;
  }
  
  console.log(`${questionId}: ${answer} (score: ${score}, poids: ${weight}, total: ${weightedScore})`);
});

console.log("\nScores finaux:", totalScores);
const maxScore = Math.max(...Object.values(totalScores));
const dominantType = Object.keys(totalScores).find(key => totalScores[key] === maxScore);
console.log(`Type dominant: ${dominantType} (score: ${maxScore})`); 