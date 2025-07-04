
import { calculateSkinType } from './skinTypeCalculator';
import { debugSkinTypeCalculation } from './skinTypeConfig';

// Tests de validation du nouveau système de calcul
export const runSkinTypeTests = () => {
  console.log("🧪 TESTS DE VALIDATION - NOUVEAU SYSTÈME");
  console.log("=====================================");

  // Test 1: Peau sèche pure
  console.log("\n📋 TEST 1: Peau sèche");
  const dryAnswers = {
    "sensation_apres_nettoyage": "seche",
    "fin_journee": "seche",
    "tiraillements_frequents": "seche",
    "pores": "seche",
    "imperfections": "seche"
  };
  
  const dryResult = calculateSkinType(dryAnswers);
  console.log("✅ Résultat attendu: dry");
  console.log("✅ Résultat obtenu:", dryResult.type);
  console.log("✅ Test réussi:", dryResult.type === "dry" ? "OUI" : "NON");

  // Test 2: Peau grasse pure
  console.log("\n📋 TEST 2: Peau grasse");
  const oilyAnswers = {
    "sensation_apres_nettoyage": "grasse",
    "fin_journee": "grasse",
    "tiraillements_frequents": "grasse",
    "pores": "grasse",
    "imperfections": "grasse"
  };
  
  const oilyResult = calculateSkinType(oilyAnswers);
  console.log("✅ Résultat attendu: oily");
  console.log("✅ Résultat obtenu:", oilyResult.type);
  console.log("✅ Test réussi:", oilyResult.type === "oily" ? "OUI" : "NON");

  // Test 3: Peau mixte
  console.log("\n📋 TEST 3: Peau mixte");
  const combinationAnswers = {
    "sensation_apres_nettoyage": "mixte",
    "fin_journee": "mixte",
    "tiraillements_frequents": "mixte",
    "pores": "mixte",
    "imperfections": "mixte"
  };
  
  const combinationResult = calculateSkinType(combinationAnswers);
  console.log("✅ Résultat attendu: combination");
  console.log("✅ Résultat obtenu:", combinationResult.type);
  console.log("✅ Test réussi:", combinationResult.type === "combination" ? "OUI" : "NON");

  // Test 4: Peau sèche + sensible
  console.log("\n📋 TEST 4: Peau sèche + sensible");
  const drySensitiveAnswers = {
    "sensation_apres_nettoyage": "seche",
    "fin_journee": "seche",
    "pores": "seche",
    "nouveaux_produits": "sensible",
    "sensation_inconfort": "sensible",
    "rougeurs_frequentes": "sensible"
  };
  
  const drySensitiveResult = calculateSkinType(drySensitiveAnswers);
  console.log("✅ Résultat attendu: dry + sensitive");
  console.log("✅ Résultat obtenu:", `${drySensitiveResult.type} + ${drySensitiveResult.state || 'none'}`);
  console.log("✅ Test réussi:", drySensitiveResult.type === "dry" && drySensitiveResult.state === "sensitive" ? "OUI" : "NON");

  console.log("\n🏆 TESTS TERMINÉS - Vérifiez les résultats ci-dessus");
};

// Fonction pour tester avec de vraies réponses
export const testWithRealAnswers = (answers: Record<string, string>) => {
  console.log("👤 TEST AVEC RÉPONSES RÉELLES");
  console.log("=============================");
  console.log("Réponses:", answers);
  
  const result = calculateSkinType(answers);
  console.log("\n🏆 DIAGNOSTIC:");
  console.log(`Type: ${result.type}`);
  console.log(`État: ${result.state || 'normal'}`);
  console.log(`Score: ${result.score}`);
  console.log(`Confiance: ${result.confidence}`);
  
  return result;
};
