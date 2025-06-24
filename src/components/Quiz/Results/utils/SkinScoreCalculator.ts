
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

  // Analyze answers more precisely
  Object.values(answers).forEach(answer => {
    switch (answer) {
      case "seche":
        scores.hydratation = Math.max(10, scores.hydratation - 25);
        scores.sebum = Math.max(5, scores.sebum - 20);
        scores.protection = Math.min(90, scores.protection + 15);
        break;
      case "grasse":
        scores.sebum = Math.min(95, scores.sebum + 35);
        scores.hydratation = Math.min(80, scores.hydratation + 10);
        scores.tolerance = Math.min(85, scores.tolerance + 15);
        break;
      case "mixte":
        scores.sebum = Math.min(75, scores.sebum + 15);
        scores.hydratation = scores.hydratation + 5;
        scores.reactivite = Math.min(70, scores.reactivite + 10);
        break;
      case "sensible":
        scores.sensibilite = Math.min(90, scores.sensibilite + 40);
        scores.reactivite = Math.min(85, scores.reactivite + 35);
        scores.tolerance = Math.max(15, scores.tolerance - 25);
        break;
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
