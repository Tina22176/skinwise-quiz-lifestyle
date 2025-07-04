
import { debugSkinTypeCalculation } from './skinTypeConfig';

// Fonction de test pour vérifier les calculs
export const testSkinTypeCalculation = () => {
  console.log("🧪 TEST CALCUL TYPE DE PEAU");
  console.log("============================");
  
  // Test 1: Peau sèche + sensible
  console.log("\n📋 TEST 1: Peau sèche + sensible");
  const testAnswers1 = {
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
  
  const result1 = debugSkinTypeCalculation(testAnswers1);
  console.log("Résultat attendu: dry + sensitive");
  console.log("Résultat obtenu:", result1);
  
  // Test 2: Peau grasse + normale
  console.log("\n📋 TEST 2: Peau grasse + normale");
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
  
  const result2 = debugSkinTypeCalculation(testAnswers2);
  console.log("Résultat attendu: oily + normal");
  console.log("Résultat obtenu:", result2);
  
  // Test 3: Peau mixte + sensible
  console.log("\n📋 TEST 3: Peau mixte + sensible");
  const testAnswers3 = {
    "sensation_apres_nettoyage": "mixte",
    "fin_journee": "mixte",
    "tiraillements_frequents": "mixte",
    "pores": "mixte",
    "imperfections": "mixte",
    "nouveaux_produits": "sensible",
    "sensation_inconfort": "sensible",
    "rougeurs_frequentes": "sensible",
    "reaction_environnement": "sensible"
  };
  
  const result3 = debugSkinTypeCalculation(testAnswers3);
  console.log("Résultat attendu: combination + sensitive");
  console.log("Résultat obtenu:", result3);
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
  console.log(`   Score sensibilité: ${result.sensitivityScore.toFixed(2)}`);
  console.log(`   Seuil: ${result.threshold.toFixed(2)}`);
  
  return result;
}; 
