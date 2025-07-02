import { SkinTypeScore } from './skinTypes';

// Fonction pour obtenir des recommandations basées sur le score
export const getRecommendations = (skinTypeScore: SkinTypeScore): string[] => {
  const { type, state, confidence } = skinTypeScore;
  
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