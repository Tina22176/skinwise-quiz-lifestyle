
export interface SkinCharacteristic {
  characteristic: string;
  value: number;
  fullMark: number;
  explanation: string;
}

export const calculateSkinCharacteristics = (answers: Record<string, string>): SkinCharacteristic[] => {
  let scores = {
    hydratation: 50,
    sensibilite: 30,
    sebum: 40,
    reactivite: 25,
    tolerance: 60,
    protection: 45
  };

  // Analyze answers with more precision based on question context
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Questions liées à l'hydratation
    if (['sensation_apres_nettoyage', 'fin_journee', 'tiraillements_frequents'].includes(questionId)) {
      switch (answer) {
        case "seche":
          scores.hydratation = Math.max(10, scores.hydratation - 30);
          scores.protection = Math.min(85, scores.protection + 10);
          break;
        case "grasse":
          scores.hydratation = Math.min(80, scores.hydratation + 15);
          scores.sebum = Math.min(90, scores.sebum + 25);
          break;
        case "mixte":
          scores.hydratation = Math.max(30, scores.hydratation - 10);
          scores.sebum = Math.min(70, scores.sebum + 15);
          break;
        case "normale":
          scores.hydratation = Math.min(85, scores.hydratation + 10);
          break;
      }
    }

    // Questions liées à la sensibilité
    if (['nouveaux_produits', 'sensation_inconfort'].includes(questionId)) {
      if (answer === "sensible") {
        scores.sensibilite = Math.min(95, scores.sensibilite + 45);
        scores.reactivite = Math.min(90, scores.reactivite + 40);
        scores.tolerance = Math.max(10, scores.tolerance - 30);
      } else {
        scores.tolerance = Math.min(90, scores.tolerance + 15);
        scores.sensibilite = Math.max(10, scores.sensibilite - 10);
      }
    }

    // Questions spécifiques au sébum
    if (['pores', 'imperfections'].includes(questionId)) {
      switch (answer) {
        case "grasse":
          scores.sebum = Math.min(95, scores.sebum + 30);
          scores.tolerance = Math.min(85, scores.tolerance + 10);
          break;
        case "seche":
          scores.sebum = Math.max(5, scores.sebum - 25);
          scores.protection = Math.min(90, scores.protection + 10);
          break;
        case "mixte":
          scores.sebum = Math.min(75, scores.sebum + 10);
          break;
      }
    }
  });

  return [
    { 
      characteristic: 'Hydratation', 
      value: Math.round(scores.hydratation), 
      fullMark: 100,
      explanation: 'Capacité de ta peau à retenir l\'eau'
    },
    { 
      characteristic: 'Sensibilité', 
      value: Math.round(scores.sensibilite), 
      fullMark: 100,
      explanation: 'Réaction aux produits et agressions'
    },
    { 
      characteristic: 'Sébum', 
      value: Math.round(scores.sebum), 
      fullMark: 100,
      explanation: 'Production d\'huile naturelle'
    },
    { 
      characteristic: 'Réactivité', 
      value: Math.round(scores.reactivite), 
      fullMark: 100,
      explanation: 'Tendance aux rougeurs et irritations'
    },
    { 
      characteristic: 'Tolérance', 
      value: Math.round(scores.tolerance), 
      fullMark: 100,
      explanation: 'Résistance aux ingrédients actifs'
    },
    { 
      characteristic: 'Protection', 
      value: Math.round(scores.protection), 
      fullMark: 100,
      explanation: 'Barrière naturelle de la peau'
    },
  ];
};

export const getScoreColor = (score: number): string => {
  if (score >= 70) return "#10b981"; // vert
  if (score >= 40) return "#f59e0b"; // orange
  return "#ef4444"; // rouge
};

export const getScoreText = (score: number): string => {
  if (score >= 70) return "Optimal";
  if (score >= 40) return "Modéré";
  return "À améliorer";
};
