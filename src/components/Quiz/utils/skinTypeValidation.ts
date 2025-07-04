// Validation de cohérence des réponses
export const validateAnswers = (answers: Record<string, string>): { isValid: boolean; conflicts: string[] } => {
  const conflicts: string[] = [];
  
  // Fonction helper pour normaliser les réponses
  const normalizeAnswer = (answer: string): string => {
    return answer.toLowerCase().replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a');
  };

  // Vérifier les contradictions évidentes avec normalisation
  const sensation = normalizeAnswer(answers.sensation_apres_nettoyage || '');
  const finJournee = normalizeAnswer(answers.fin_journee || '');
  const pores = normalizeAnswer(answers.pores || '');
  const nouveauxProduits = normalizeAnswer(answers.nouveaux_produits || '');
  const inconfort = normalizeAnswer(answers.sensation_inconfort || '');

  if ((sensation.includes('grasse') || sensation.includes('brillante')) && 
      (finJournee.includes('seche') || finJournee.includes('tiraillements'))) {
    conflicts.push("Contradiction entre sensation après nettoyage et fin de journée");
  }

  if ((pores.includes('grasse') || pores.includes('visibles') || pores.includes('dilates')) && 
      (sensation.includes('seche') || sensation.includes('tiraillements'))) {
    conflicts.push("Contradiction entre visibilité des pores et sensation de sécheresse");
  }

  if ((nouveauxProduits.includes('sensible') || nouveauxProduits.includes('oui') || nouveauxProduits.includes('souvent')) && 
      (inconfort.includes('grasse') || inconfort.includes('jamais'))) {
    conflicts.push("Contradiction entre réactivité aux produits et sensations d'inconfort");
  }

  return {
    isValid: conflicts.length === 0,
    conflicts
  };
};

// Calcul du score de confiance
export const calculateConfidence = (answers: Record<string, string>, scores: Record<string, number>): number => {
  const totalQuestions = Object.keys(answers).length;
  const answeredQuestions = Object.keys(answers).filter(q => answers[q]).length;
  const completionRate = answeredQuestions / totalQuestions;
  
  // Score de cohérence basé sur la validation
  const validation = validateAnswers(answers);
  const consistencyScore = validation.isValid ? 1.0 : 0.8;
  
  // Écart entre le score dominant et les autres
  const maxScore = Math.max(...Object.values(scores));
  const otherScores = Object.values(scores).filter(s => s !== maxScore);
  const scoreGap = otherScores.length > 0 ? (maxScore - Math.max(...otherScores)) / maxScore : 1.0;
  
  return Math.min(1.0, (completionRate * 0.4 + consistencyScore * 0.4 + scoreGap * 0.2));
};

// Fonction utilitaire pour convertir les réponses françaises vers anglaises
export const convertToEnglish = (frenchAnswer: string): string | null => {
  if (!frenchAnswer) return null;
  
  const answer = frenchAnswer.toLowerCase().replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a');
  
  // Mapping simple
  const simpleMapping: Record<string, string> = {
    "seche": "dry",
    "mixte": "combination", 
    "grasse": "oily",
    "sensible": "sensitive",
    "normale": "normal"
  };
  
  // Si c'est une réponse simple, l'utiliser directement
  if (simpleMapping[answer]) {
    return simpleMapping[answer];
  }
  
  // Mapping pour les réponses détaillées - Type de peau
  if (answer.includes("seche") || answer.includes("tiraillements") || 
      answer.includes("desquamation") || answer.includes("rugueuse") || answer.includes("inconfort")) {
    return "dry";
  }
  
  if (answer.includes("grasse") || answer.includes("brillante") || answer.includes("huileuse") || 
      answer.includes("sebum") || answer.includes("tres brillante")) {
    return "oily";
  }
  
  if (answer.includes("mixte") || answer.includes("zone t") || answer.includes("contrastee") || 
      answer.includes("different") || answer.includes("joues seches")) {
    return "combination";
  }
  
  if (answer.includes("normale") || answer.includes("equilibree") || 
      answer.includes("confortable") || answer.includes("douce") || answer.includes("normaux") || 
      answer.includes("equilibres") || answer.includes("peu visibles")) {
    return "normal";
  }
  
  // Mapping pour les réponses détaillées - État de peau (sensibilité)
  if (answer.includes("sensible") || answer.includes("oui") || answer.includes("souvent") || 
      answer.includes("tres souvent") || answer.includes("regulierement") || 
      answer.includes("toujours") || answer.includes("frequemment") ||
      answer.includes("rougeurs") || answer.includes("brule") || answer.includes("brule facilement") ||
      answer.includes("rougit") || answer.includes("rougit vite")) {
    return "sensitive";
  }
  
  if (answer.includes("non") || answer.includes("jamais") || answer.includes("rarement") || 
      answer.includes("occasionnellement") || answer.includes("parfois") || answer.includes("bronze") ||
      answer.includes("resistante") || answer.includes("peu sensible")) {
    return "normal";
  }
  
  // Réponses spécifiques pour les pores et imperfections
  if (answer.includes("tres visibles") || answer.includes("dilates") || 
      answer.includes("obstrues") || answer.includes("nombreux") ||
      answer.includes("larges") || answer.includes("points noirs") || answer.includes("beaucoup") ||
      answer.includes("frequentes") || answer.includes("acne") ||
      answer.includes("boutons") || answer.includes("comedons") ||
      answer.includes("nombreuses")) {
    return "oily";
  }
  
  if (answer.includes("tres fins") || answer.includes("invisibles") || answer.includes("discrets") || 
      answer.includes("fermes") || answer.includes("aucune") ||
      answer.includes("tres rares") || answer.includes("quasi-inexistantes")) {
    return "dry";
  }
  
  if (answer.includes("zone t visible") || answer.includes("moyens") || answer.includes("quelques zones") ||
      answer.includes("mixtes") || answer.includes("occasionnelles") || answer.includes("localisees") ||
      answer.includes("quelques unes") || answer.includes("quelques-unes")) {
    return "combination";
  }
  
  // Réponses pour les textures de crème
  if (answer.includes("riche") || answer.includes("nourrissante") || answer.includes("epaisse") || 
      answer.includes("huile")) {
    return "dry";
  }
  
  if (answer.includes("legere") || answer.includes("fluide") || 
      answer.includes("gel") || answer.includes("sans huile")) {
    return "oily";
  }
  
  if (answer.includes("modulable") || answer.includes("adaptable")) {
    return "combination";
  }
  
  // Réponses pour le maquillage
  if (answer.includes("disparait") || answer.includes("s'effrite") || 
      answer.includes("accroche mal")) {
    return "dry";
  }
  
  if (answer.includes("glisse") || answer.includes("devient brillant") || answer.includes("file")) {
    return "oily";
  }
  
  // Par défaut, retourner null si aucune correspondance n'est trouvée
  console.warn(`⚠️ Réponse non reconnue: "${frenchAnswer}"`);
  return null;
};