// Hormone Profile Calculator - New system based on hormonal imbalances

export interface HormoneProfile {
  type: string;
  score: number;
  confidence: number;
  characteristics: string[];
  concerns: string[];
  hormonalPattern: string;
  lifestyle: string[];
}

// Scoring matrix based on the provided specification
const HORMONE_SCORING_MATRIX: Record<string, Record<string, Record<string, number>>> = {
  "age_range": {
    "moins_25": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 0,
      "sensible_caméléon": 1
    },
    "25_35": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 3,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "35_45": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 2,
      "sensible_caméléon": 3
    },
    "45_plus": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 3,
      "cyclique_congestionnée": 0,
      "brillante_déséquilibrée": 0,
      "sèche_instable": 3,
      "sensible_caméléon": 2
    }
  },
  "skin_current_state": {
    "grasse_brillante": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 0,
      "sensible_caméléon": 1
    },
    "seche_tiraille": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 0,
      "brillante_déséquilibrée": 0,
      "sèche_instable": 3,
      "sensible_caméléon": 2
    },
    "reactive": {
      "stressée_inflammée": 3,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 0,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "mixte_imperfections": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "changeante": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 2,
      "sensible_caméléon": 3
    }
  },
  "zone_t_condition": {
    "peu_grasse": {
      "stressée_inflammée": 0,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 0,
      "sensible_caméléon": 1
    },
    "tres_grasse": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 0,
      "sensible_caméléon": 1
    },
    "grasse_boutons": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 0,
      "sensible_caméléon": 2
    }
  },
  "boutons_pattern": {
    "avant_regles": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 3,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 0,
      "sensible_caméléon": 2
    },
    "tout_temps": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 0,
      "sensible_caméléon": 1
    },
    "stress": {
      "stressée_inflammée": 3,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 0,
      "sensible_caméléon": 2
    },
    "rarement": {
      "stressée_inflammée": 0,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 0,
      "brillante_déséquilibrée": 0,
      "sèche_instable": 2,
      "sensible_caméléon": 1
    },
    "microkystes": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 0,
      "sensible_caméléon": 1
    }
  },
  "cycle_menstruel": {
    "regulier": {
      "stressée_inflammée": 0,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 0,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 1,
      "sensible_caméléon": 0
    },
    "irregulier": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "spm_fort": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 3,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "contraceptif": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 1,
      "sensible_caméléon": 1
    },
    "regles_douloureuses": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 3,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "arret_regles": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 3,
      "cyclique_congestionnée": 0,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 3,
      "sensible_caméléon": 1
    }
  },
  "energie_quotidienne": {
    "reveil_fatigue": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 3,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 2,
      "sensible_caméléon": 2
    },
    "pics_chutes": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 3
    },
    "stresse": {
      "stressée_inflammée": 3,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "stable": {
      "stressée_inflammée": 0,
      "fatiguée_tension": 0,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 1,
      "sensible_caméléon": 0
    },
    "epuisee": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 3,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 2,
      "sensible_caméléon": 2
    }
  },
  "reaction_stress": {
    "eruptions": {
      "stressée_inflammée": 3,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 0,
      "sensible_caméléon": 2
    },
    "rougeurs": {
      "stressée_inflammée": 3,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 0,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "terne": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 3,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 2,
      "sensible_caméléon": 1
    },
    "pas_reaction": {
      "stressée_inflammée": 0,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 1,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 1,
      "sensible_caméléon": 0
    },
    "sensible": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 2,
      "sensible_caméléon": 3
    }
  },
  "symptomes_associes": {
    "fringales": {
      "stressée_inflammée": 2,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 3,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "maux_tete": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 3,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "envie_pleurer": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 1,
      "cyclique_congestionnée": 3,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "insomnies": {
      "stressée_inflammée": 3,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 1,
      "sèche_instable": 1,
      "sensible_caméléon": 2
    },
    "ballonnements": {
      "stressée_inflammée": 1,
      "fatiguée_tension": 2,
      "cyclique_congestionnée": 2,
      "brillante_déséquilibrée": 2,
      "sèche_instable": 3,
      "sensible_caméléon": 2
    }
  }
};

export const calculateHormoneProfile = (answers: Record<string, string>): HormoneProfile => {
  console.log("🧬 CALCUL PROFIL HORMONAL - Réponses reçues:", answers);
  
  // Initialize scores for each hormone profile
  const profileScores: Record<string, number> = {
    "stressée_inflammée": 0,
    "fatiguée_tension": 0,
    "cyclique_congestionnée": 0,
    "brillante_déséquilibrée": 0,
    "sèche_instable": 0,
    "sensible_caméléon": 0
  };

  // Calculate scores based on answers
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionMatrix = HORMONE_SCORING_MATRIX[questionId];
    if (questionMatrix && questionMatrix[answer]) {
      const answerScores = questionMatrix[answer];
      Object.entries(answerScores).forEach(([profile, score]) => {
        profileScores[profile] += score;
        console.log(`📋 Question: ${questionId}, Réponse: "${answer}", Profile: ${profile}, Score: +${score}`);
      });
    }
  });

  console.log("\n🧬 SCORES FINAUX PAR PROFIL:", profileScores);

  // Special rules handling
  const hasContraceptive = answers.cycle_menstruel === "contraceptif";
  const hasMenopause = answers.cycle_menstruel === "arret_regles";
  
  if (hasContraceptive) {
    // Reduce cycle-related scores by 50% for contraceptive users
    profileScores["cyclique_congestionnée"] *= 0.5;
    console.log("⚠️ Contraceptif détecté - score cyclique réduit de 50%");
  }
  
  if (hasMenopause) {
    // Bonus for fatigue and dryness profiles
    profileScores["fatiguée_tension"] += 2;
    profileScores["sèche_instable"] += 2;
    console.log("⚠️ Ménopause détectée - bonus fatigue et sèche");
  }

  // Determine winning profile
  const sortedProfiles = Object.entries(profileScores).sort(([,a], [,b]) => b - a);
  const [winningProfile, winningScore] = sortedProfiles[0];
  const [secondProfile, secondScore] = sortedProfiles[1];

  console.log(`\n🏆 PROFIL GAGNANT: ${winningProfile} (${winningScore} pts)`);
  console.log(`🥈 SECOND: ${secondProfile} (${secondScore} pts)`);

  // Handle ties with hybrid profiles
  let finalProfile = winningProfile;
  if (Math.abs(winningScore - secondScore) <= 1 && winningScore > 0) {
    console.log("⚖️ Égalité détectée - profil hybride possible");
    // Priority order: stress > cycle > fatigue
    const priorityOrder = ["stressée_inflammée", "cyclique_congestionnée", "fatiguée_tension"];
    for (const priority of priorityOrder) {
      if ([winningProfile, secondProfile].includes(priority)) {
        finalProfile = priority;
        break;
      }
    }
  }

  // Calculate confidence based on score distribution
  const totalQuestions = Object.keys(answers).length;
  const maxPossibleScore = totalQuestions * 3;
  const actualScore = winningScore;
  const scoreSpread = winningScore - secondScore;
  
  let confidence = Math.min(0.95, (actualScore / maxPossibleScore) * 0.7 + (scoreSpread / maxPossibleScore) * 0.3);
  
  // Minimum confidence floor
  if (confidence < 0.6) confidence = 0.6;

  console.log(`\n📊 DIAGNOSTIC FINAL:`);
  console.log(`   Profil: ${finalProfile}`);
  console.log(`   Score: ${winningScore}/${maxPossibleScore}`);
  console.log(`   Confiance: ${(confidence * 100).toFixed(1)}%`);

  return {
    type: finalProfile,
    score: winningScore,
    confidence,
    characteristics: getProfileCharacteristics(finalProfile),
    concerns: getProfileConcerns(finalProfile),
    hormonalPattern: getHormonalPattern(finalProfile),
    lifestyle: getLifestyleRecommendations(finalProfile)
  };
};

const getProfileCharacteristics = (profile: string): string[] => {
  const characteristics: Record<string, string[]> = {
    "stressée_inflammée": [
      "Peau réactive aux stimuli externes",
      "Rougeurs fréquentes ou localisées",
      "Éruptions en période de stress",
      "Sensibilité accrue aux produits",
      "Inflammation cutanée récurrente"
    ],
    "fatiguée_tension": [
      "Peau terne et manquant d'éclat",
      "Texture relâchée ou affaissée",
      "Cernes marqués persistants",
      "Récupération cutanée lente",
      "Signes de fatigue visible"
    ],
    "cyclique_congestionnée": [
      "Boutons pré-menstruels récurrents",
      "Microkystes sur certaines zones",
      "Variations selon le cycle",
      "Congestion cutanée périodique",
      "Inflammation hormonale cyclique"
    ],
    "brillante_déséquilibrée": [
      "Production excessive de sébum",
      "Pores dilatés visibles",
      "Imperfections chroniques",
      "Brillance persistante",
      "Texture irrégulière"
    ],
    "sèche_instable": [
      "Déshydratation chronique",
      "Tiraillements fréquents",
      "Inconfort cutané",
      "Barrière cutanée fragilisée",
      "Manque d'élasticité"
    ],
    "sensible_caméléon": [
      "Réactivité cutanée variable",
      "Sensibilité selon les conditions",
      "Changements fréquents d'état",
      "Imprévisibilité des réactions",
      "Adaptation difficile aux produits"
    ]
  };
  
  return characteristics[profile] || [];
};

const getProfileConcerns = (profile: string): string[] => {
  const concerns: Record<string, string[]> = {
    "stressée_inflammée": [
      "Gestion de l'inflammation",
      "Apaisement des rougeurs",
      "Réduction du stress oxydatif",
      "Renforcement de la barrière cutanée"
    ],
    "fatiguée_tension": [
      "Stimulation de l'éclat",
      "Amélioration de la fermeté",
      "Réduction des signes de fatigue",
      "Boost énergétique cellulaire"
    ],
    "cyclique_congestionnée": [
      "Régulation hormonale",
      "Prévention des éruptions",
      "Équilibre du cycle cutané",
      "Réduction des microkystes"
    ],
    "brillante_déséquilibrée": [
      "Contrôle du sébum",
      "Resserrement des pores",
      "Prévention des imperfections",
      "Matification durable"
    ],
    "sèche_instable": [
      "Hydratation intensive",
      "Réparation de la barrière",
      "Apaisement des tiraillements",
      "Restauration de l'équilibre"
    ],
    "sensible_caméléon": [
      "Stabilisation de la sensibilité",
      "Adaptation aux variations",
      "Renforcement de la tolérance",
      "Harmonisation de l'état cutané"
    ]
  };
  
  return concerns[profile] || [];
};

const getHormonalPattern = (profile: string): string => {
  const patterns: Record<string, string> = {
    "stressée_inflammée": "Cortisol chroniquement élevé",
    "fatiguée_tension": "Cortisol bas / Fatigue surrénalienne",
    "cyclique_congestionnée": "Progestérone faible / Œstrogènes en dents de scie",
    "brillante_déséquilibrée": "Androgènes élevés (style SOPK)",
    "sèche_instable": "Baisse d'œstrogènes / Déséquilibre thyroïdien",
    "sensible_caméléon": "Terrain instable + Sensibilité hormonale forte"
  };
  
  return patterns[profile] || "Pattern hormonal non identifié";
};

const getLifestyleRecommendations = (profile: string): string[] => {
  const recommendations: Record<string, string[]> = {
    "stressée_inflammée": [
      "Techniques de gestion du stress (méditation, yoga)",
      "Éviter les stimulants (caféine excessive)",
      "Privilégier les oméga-3 anti-inflammatoires"
    ],
    "fatiguée_tension": [
      "Optimiser le sommeil (7-8h minimum)",
      "Intégrer des adaptogènes (ashwagandha, rhodiola)",
      "Réduire l'exposition aux écrans le soir"
    ],
    "cyclique_congestionnée": [
      "Suivre son cycle pour adapter les soins",
      "Équilibrer les hormones via l'alimentation",
      "Considérer le gattilier ou l'onagre"
    ],
    "brillante_déséquilibrée": [
      "Réduire les sucres rapides et l'index glycémique",
      "Intégrer le thé vert et la menthe verte",
      "Surveiller la résistance à l'insuline"
    ],
    "sèche_instable": [
      "Augmenter les bonnes graisses (avocat, noix)",
      "Vérifier la fonction thyroïdienne",
      "Privilégier une hydratation optimale"
    ],
    "sensible_caméléon": [
      "Tenir un journal peau-hormone-stress",
      "Adapter l'alimentation selon les phases",
      "Technique de respiration cohérence cardiaque"
    ]
  };
  
  return recommendations[profile] || [];
};