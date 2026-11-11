import { recommendProgram } from "./programRecommendation.ts";
import type { ProgramRecommendation } from "./programRecommendation.ts";
import { getHormoneProfileDetails } from "../Results/utils/HormoneProfileDetails.ts";
import type { CycleContext } from "../Results/utils/HormoneProfileDetails.ts";

// 5 profils éditoriaux + une recommandation commerciale indépendante.

export interface HormoneProfile {
  type: string;
  score: number;
  /** Part des points éditoriaux, pas une probabilité ni une fiabilité clinique. */
  confidence: number;
  cycleContext: CycleContext;
  characteristics: string[];
  concerns: string[];
  hormonalPattern: string;
  lifestyle: string[];
  recommendation: ProgramRecommendation;
}

// Pondération éditoriale : seuls les signaux rapportés contribuent au profil.
const HORMONE_SCORING_MATRIX: Record<string, Record<string, Record<string, number>>> = {
  // Q2 — skin_daily
  "skin_daily": {
    "brille": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "soif": {
      "réactive_pression": 0, "fatiguée_survie": 2, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "touche_pas": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "indecise": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
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
      "réactive_pression": 1, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "stress_fatigue": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "microkystes": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "pas_souci": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
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
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    }
  },
  // Le contexte du cycle ne constitue pas un symptôme.
  "cycle_signals": {
    "recurrent": { "cyclique_subit": 2 },
    "spm": { "cyclique_subit": 2 }
  },
  // Ce profil exige une réponse directe sur la routine.
  "routine": {
    "accumule_change": { "controlleuse_débordée": 5 }
  },
  // Q6 — energie
  "energie": {
    "fatiguee_reveil": {
      "réactive_pression": 0, "fatiguée_survie": 2, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "coups_barre": {
      "réactive_pression": 0, "fatiguée_survie": 1, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "speed": {
      "réactive_pression": 2, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
    },
    "stable": {
      "réactive_pression": 0, "fatiguée_survie": 0, "controlleuse_débordée": 0, "cyclique_subit": 0, "sensible_caméléon": 0
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
  const confidence = totalScore > 0 ? topScore / totalScore : 0;
  if (!totalScore) finalProfile = "à_observer";
  const cycleContext: CycleContext = ["regulier", "irregulier"].includes(answers.cycle)
    ? "calendar" : "observations";
  const detail = getHormoneProfileDetails(finalProfile, cycleContext);

  return {
    type: finalProfile,
    score: topScore,
    confidence,
    cycleContext,
    characteristics: getProfileCharacteristics(finalProfile),
    concerns: getProfileConcerns(finalProfile),
    hormonalPattern: getHormonalPattern(finalProfile),
    lifestyle: detail.gestes,
    recommendation: recommendProgram(answers),
  };
};

const getProfileCharacteristics = (profile: string): string[] => {
  const map: Record<string, string[]> = {
    "réactive_pression": ["Peau baromètre du stress", "Boutons et rougeurs sous pression", "Inflammation récurrente"],
    "fatiguée_survie": ["Teint terne et cernes", "Traits tirés", "Peau en mode économie"],
    "controlleuse_débordée": ["Trop de produits", "Routine instable", "Peau perturbée"],
    "cyclique_subit": ["Variations récurrentes rapportées", "Rythme à observer", "Contexte personnel à prendre en compte"],
    "sensible_caméléon": ["Réactivité imprévisible", "Sensibilité variable", "Peau changeante"]
  };
  return map[profile] || [];
};

const getProfileConcerns = (profile: string): string[] => {
  const map: Record<string, string[]> = {
    "réactive_pression": ["Calmer l'inflammation", "Simplifier la routine", "Gérer le stress cutané"],
    "fatiguée_survie": ["Retrouver l'éclat", "Hydrater en profondeur", "Routine ultra-simple"],
    "controlleuse_débordée": ["Reset produits", "Stabilité de routine", "Patience et observation"],
    "cyclique_subit": ["Observer les récurrences", "Garder une base stable", "Ajuster selon la tolérance"],
    "sensible_caméléon": ["Apprendre à lire sa peau", "Constance et douceur", "Identifier les triggers"]
  };
  return map[profile] || [];
};

const getHormonalPattern = (profile: string): string => {
  const map: Record<string, string> = {
    "réactive_pression": "Réactions rapportées lors de périodes de stress ; cause non déterminée",
    "fatiguée_survie": "Fatigue et récupération insuffisante → peau en manque d'éclat",
    "controlleuse_débordée": "Routine souvent modifiée ou produits accumulés, d’après tes réponses",
    "cyclique_subit": "Variations récurrentes rapportées ; lien hormonal non établi",
    "sensible_caméléon": "Sensibilité variable rapportée ; cause non déterminée"
  };
  return map[profile] || "";
};
