import { debugSkinTypeCalculation, validateConfiguration } from './skinTypeConfig';

// Fonction de test pour vérifier les calculs
export const testSkinTypeCalculation = () => {
  console.log("🧪 TEST CALCUL TYPE DE PEAU");
  console.log("============================");
  
  // Test 1: Peau sèche + sensible
  console.log("\n📋 TEST 1: Peau sèche + sensible");
  const testAnswers1 = {
    "sensation_apres_nettoyage": "Très sèche",
    "fin_journee": "Sèche",
    "tiraillements_frequents": "Oui",
    "pores": "Très fins",
    "imperfections": "Aucune",
    "nouveaux_produits": "Oui",
    "sensation_inconfort": "Souvent",
    "rougeurs_frequentes": "Oui",
    "reaction_environnement": "Oui"
  };
  
  const result1 = debugSkinTypeCalculation(testAnswers1);
  console.log("Résultat attendu: dry + sensitive");
  console.log("Résultat obtenu:", result1);
  
  // Test 2: Peau grasse + normale
  console.log("\n📋 TEST 2: Peau grasse + normale");
  const testAnswers2 = {
    "sensation_apres_nettoyage": "Grasse",
    "fin_journee": "Brillante",
    "tiraillements_frequents": "Non",
    "pores": "Très visibles",
    "imperfections": "Beaucoup",
    "nouveaux_produits": "Non",
    "sensation_inconfort": "Jamais",
    "rougeurs_frequentes": "Non",
    "reaction_environnement": "Non"
  };
  
  const result2 = debugSkinTypeCalculation(testAnswers2);
  console.log("Résultat attendu: oily + normal");
  console.log("Résultat obtenu:", result2);
  
  // Test 3: Peau mixte + sensible
  console.log("\n📋 TEST 3: Peau mixte + sensible");
  const testAnswers3 = {
    "sensation_apres_nettoyage": "Mixte",
    "fin_journee": "Zone T brillante",
    "tiraillements_frequents": "Parfois",
    "pores": "Zone T visible",
    "imperfections": "Zone T seulement",
    "nouveaux_produits": "Souvent",
    "sensation_inconfort": "Parfois",
    "rougeurs_frequentes": "Parfois",
    "reaction_environnement": "Parfois"
  };
  
  const result3 = debugSkinTypeCalculation(testAnswers3);
  console.log("Résultat attendu: combination + sensitive");
  console.log("Résultat obtenu:", result3);
  
  // Validation de la configuration
  console.log("\n🔍 VALIDATION CONFIGURATION");
  validateConfiguration();
};

// Fonction pour tester avec vos réponses réelles
export const testUserAnswers = (userAnswers: Record<string, string>) => {
  console.log("👤 TEST AVEC VOS RÉPONSES");
  console.log("==========================");
  console.log("Vos réponses:", userAnswers);
  
  const result = debugSkinTypeCalculation(userAnswers);
  console.log("\n🏆 DIAGNOSTIC FINAL:");
  console.log(`   Type: ${result.type}`);
  console.log(`   État: ${result.state || 'normal'}`);
  console.log(`   Score sensible: ${result.stateScores.sensitive.toFixed(2)}`);
  console.log(`   Seuil: ${result.threshold.toFixed(2)}`);
  
  return result;
}; 