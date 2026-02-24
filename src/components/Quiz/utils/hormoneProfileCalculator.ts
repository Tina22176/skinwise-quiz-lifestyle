// Hormone Profile Calculator v2 — 5 profiles scoring system

export interface HormoneProfile {
  type: string;
  score: number;
  confidence: number;
  characteristics: string[];
  concerns: string[];
  hormonalPattern: string;
  lifestyle: string[];
}

// 5 profiles
const PROFILES = [
  "réactive_pression",
  "fatiguée_survie",
  "controlleuse_débordée",
  "cyclique_subit",
  "sensible_caméléon"
] as const;

// Scoring matrix v2
const HORMONE_SCORING_MATRIX: Record<string, Record<string, Record<string, number>>> = {
  // Q1 — age (now contributes to scoring)
  "age_range": {
    "moins_25": {
      "réactive_pression": 1, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "25_34": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 1, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "35_44": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "45_plus": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 1
    }
  },
  // Q2 — skin_daily
  "skin_daily": {
    "brille": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 2, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "soif": {
      "réactive_pression": 0, "fatiguée_survie": 2, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "touche_pas": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "indecise": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 1, "cyclique_subit": 1, "sensible_caméléon": 0
    },
    "changeante": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 2
    }
  },
  // Q3 — boutons_pattern
  "boutons_pattern": {
    "avant_regles": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 2, "sensible_caméléon": 0
    },
    "permanents": {
      "réactive_pression": 1, "fatiguée_survie": 0, "controlleuse_débordée": 1, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "stress_fatigue": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "microkystes": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 2, "sensible_caméléon": 0
    },
    "pas_souci": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    }
  },
  // Q4 — skin_stress
  "skin_stress": {
    "explose": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "rougit": {
      "réactive_pression": 1, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 1
    },
    "ternit": {
      "réactive_pression": 0, "fatiguée_survie": 2, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "hypersensible": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 2
    },
    "rien": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 1, "cyclique_subit": 0, "sensible_caméléon": 0
    }
  },
  // Q5 — cycle
  "cycle": {
    "regulier": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "irregulier": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 2, "sensible_caméléon": 0
    },
    "spm": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 2, "sensible_caméléon": 0
    },
    "contraceptif": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 1, "cyclique_subit": 0, "sensible_caméléon": 1
    },
    "plus_cycle": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 1
    }
  },
  // Q6 — energie
  "energie": {
    "fatiguee_reveil": {
      "réactive_pression": 0, "fatiguée_survie": 2, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "coups_barre": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 1, "sensible_caméléon": 0
    },
    "speed": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "stable": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 1, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "dort_mal": {
      "réactive_pression": 1, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    }
  }
};

// Tie-breaking priority: Réactive > Cyclique > Fatiguée > Caméléon > Controlleuse
const PRIORITY_ORDER = [
  "réactive_pression",
  "cyclique_subit",
  "fatiguée_survie",
  "sensible_caméléon",
  "controlleuse_débordée"
];

export const calculateHormoneProfile = (answers: Record<string, string>): HormoneProfile => {
  const profileScores: Record<string, number> = {
    "réactive_pression": 0,
    "fatiguée_survie": 0,
    "controlleuse_débordée": 0,
    "cyclique_subit": 0,
    "sensible_caméléon": 0
  };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionMatrix = HORMONE_SCORING_MATRIX[questionId];
    if (questionMatrix && questionMatrix[answer]) {
      Object.entries(questionMatrix[answer]).forEach(([profile, score]) => {
        profileScores[profile] += score;
      });
    }
  });

  const sortedProfiles = Object.entries(profileScores).sort(([,a], [,b]) => b - a);
  const [topProfile, topScore] = sortedProfiles[0];
  const [, secondScore] = sortedProfiles[1];

  let finalProfile = topProfile;
  if (topScore === secondScore && topScore > 0) {
    const tiedProfiles = sortedProfiles.filter(([, s]) => s === topScore).map(([p]) => p);
    for (const priority of PRIORITY_ORDER) {
      if (tiedProfiles.includes(priority)) {
        finalProfile = priority;
        break;
      }
    }
  }

  const totalScore = Object.values(profileScores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 
    ? Math.min(0.95, Math.max(0.6, topScore / totalScore + (topScore - secondScore) * 0.1))
    : 0.6;

  return {
    type: finalProfile,
    score: topScore,
    confidence,
    characteristics: getProfileCharacteristics(finalProfile),
    concerns: getProfileConcerns(finalProfile),
    hormonalPattern: getHormonalPattern(finalProfile),
    lifestyle: getLifestyleRecommendations(finalProfile)
  };
};

const getProfileCharacteristics = (profile: string): string[] => {
  const map: Record<string, string[]> = {
    "réactive_pression": ["Peau baromètre du stress", "Boutons et rougeurs sous pression", "Inflammation récurrente"],
    "fatiguée_survie": ["Teint terne et cernes", "Traits tirés", "Peau en mode économie"],
    "controlleuse_débordée": ["Trop de produits", "Routine instable", "Peau perturbée"],
    "cyclique_subit": ["Variations selon le cycle", "Boutons pré-menstruels", "Imprévisibilité mensuelle"],
    "sensible_caméléon": ["Réactivité imprévisible", "Sensibilité variable", "Peau changeante"]
  };
  return map[profile] || [];
};

const getProfileConcerns = (profile: string): string[] => {
  const map: Record<string, string[]> = {
    "réactive_pression": ["Calmer l'inflammation", "Simplifier la routine", "Gérer le stress cutané"],
    "fatiguée_survie": ["Retrouver l'éclat", "Hydrater en profondeur", "Routine ultra-simple"],
    "controlleuse_débordée": ["Reset produits", "Stabilité de routine", "Patience et observation"],
    "cyclique_subit": ["Anticiper les phases", "Adapter la routine au cycle", "Prévenir les éruptions"],
    "sensible_caméléon": ["Apprendre à lire sa peau", "Constance et douceur", "Identifier les triggers"]
  };
  return map[profile] || [];
};

const getHormonalPattern = (profile: string): string => {
  const map: Record<string, string> = {
    "réactive_pression": "Cortisol élevé → inflammation cutanée",
    "fatiguée_survie": "Épuisement surrénalien → peau en mode économie",
    "controlleuse_débordée": "Sur-stimulation cutanée → barrière fragilisée",
    "cyclique_subit": "Fluctuations hormonales cycliques → peau en montagnes russes",
    "sensible_caméléon": "Hypersensibilité neuro-cutanée → réactions imprévisibles"
  };
  return map[profile] || "";
};

const getLifestyleRecommendations = (profile: string): string[] => {
  const map: Record<string, string[]> = {
    "réactive_pression": ["Simplifier à 3 gestes max", "Attendre 48h avant d'ajouter un produit", "3 respirations profondes avant la routine"],
    "fatiguée_survie": ["Eau fraîche + crème le matin", "Nettoyage doux le soir", "Se coucher 20 min plus tôt"],
    "controlleuse_débordée": ["Compter tous ses produits", "Garder 3 produits max", "Tenir 2 semaines sans changer"],
    "cyclique_subit": ["Noter jour du cycle + état peau", "Alléger la routine avant les règles", "Exfolier doucement après les règles"],
    "sensible_caméléon": ["7 jours nettoyant + hydratant seulement", "Observer sa peau 10s chaque matin", "Noter alimentation, stress, sommeil"]
  };
  return map[profile] || [];
};
