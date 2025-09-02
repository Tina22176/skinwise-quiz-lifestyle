import { QuizQuestion } from "./types";

export const hormonalQuestions: QuizQuestion[] = [
  {
    id: "age_range",
    question: "Tu as quel âge ?",
    options: [
      {
        value: "moins_25",
        label: "Moins de 25 ans",
        description: "Période d'instabilité hormonale post-adolescence"
      },
      {
        value: "25_35",
        label: "25-35 ans",
        description: "Pic d'activité hormonale reproductive"
      },
      {
        value: "35_45",
        label: "35-45 ans",
        description: "Début des fluctuations pré-ménopausiques"
      },
      {
        value: "45_plus",
        label: "45+ ans",
        description: "Période de transition hormonale majeure"
      }
    ]
  },
  {
    id: "skin_current_state",
    question: "Ta peau aujourd'hui, elle est plutôt… ?",
    options: [
      {
        value: "grasse_brillante",
        label: "Grasse et brillante",
        description: "Excès de sébum visible en surface"
      },
      {
        value: "seche_tiraille",
        label: "Sèche ou qui tiraille",
        description: "Manque d'hydratation et de sébum"
      },
      {
        value: "reactive",
        label: "Réactive (rougeurs, picotements…)",
        description: "Hypersensibilité aux stimuli externes"
      },
      {
        value: "mixte_imperfections",
        label: "Normale à mixte mais avec imperfections",
        description: "Déséquilibre localisé avec boutons"
      },
      {
        value: "changeante",
        label: "Changeante selon les jours ou les semaines",
        description: "Variations importantes selon les cycles"
      }
    ]
  },
  {
    id: "zone_t_condition",
    question: "Si tu as une peau mixte, ta zone T (front/nez/menton) :",
    options: [
      {
        value: "peu_grasse",
        label: "Juste un peu plus grasse, ça va",
        description: "Légère différence de séborrhée"
      },
      {
        value: "tres_grasse",
        label: "Très grasse avec points noirs/pores dilatés",
        description: "Hyperséborrhée marquée avec comédons"
      },
      {
        value: "grasse_boutons",
        label: "Grasse avec boutons récurrents",
        description: "Inflammation chronique de la zone T"
      }
    ]
  },
  {
    id: "boutons_pattern",
    question: "Tu as tendance à avoir des boutons… ?",
    options: [
      {
        value: "avant_regles",
        label: "Surtout avant les règles",
        description: "Pic inflammatoire pré-menstruel"
      },
      {
        value: "tout_temps",
        label: "Un peu tout le temps",
        description: "Inflammation chronique persistante"
      },
      {
        value: "stress",
        label: "Rarement, sauf en période de stress",
        description: "Réactivité au cortisol élevé"
      },
      {
        value: "rarement",
        label: "Pas vraiment",
        description: "Peau stable sans inflammation"
      },
      {
        value: "microkystes",
        label: "J'ai des microkystes chroniques",
        description: "Congestion profonde persistante"
      }
    ]
  },
  {
    id: "cycle_menstruel",
    question: "Et ton cycle menstruel ?",
    options: [
      {
        value: "regulier",
        label: "Régulier et sans souci",
        description: "Équilibre hormonal optimal"
      },
      {
        value: "irregulier",
        label: "Long ou irrégulier",
        description: "Déséquilibre hormonal possible (SOPK, thyroïde)"
      },
      {
        value: "spm_fort",
        label: "Avec SPM fort ou douloureux",
        description: "Dominance œstrogénique ou carence progestérone"
      },
      {
        value: "contraceptif",
        label: "Je prends un contraceptif hormonal",
        description: "Hormones synthétiques modifiant l'équilibre naturel"
      },
      {
        value: "regles_douloureuses",
        label: "J'ai des règles très abondantes/douloureuses",
        description: "Possible endométriose ou déséquilibre hormonal"
      },
      {
        value: "arret_regles",
        label: "Je n'ai plus mes règles / cycle arrêté",
        description: "Ménopause, aménorrhée ou autre condition"
      }
    ]
  },
  {
    id: "energie_quotidienne",
    question: "Ton énergie au quotidien, c'est plutôt…",
    options: [
      {
        value: "reveil_fatigue",
        label: "Je me réveille fatiguée",
        description: "Fatigue surrénalienne ou mauvaise récupération"
      },
      {
        value: "pics_chutes",
        label: "J'ai des pics et des chutes d'énergie",
        description: "Déséquilibre glycémique ou hormonal"
      },
      {
        value: "stresse",
        label: "Je suis stressée, j'ai du mal à ralentir",
        description: "Cortisol chroniquement élevé"
      },
      {
        value: "stable",
        label: "Assez stable dans l'ensemble",
        description: "Bon équilibre énergétique et hormonal"
      },
      {
        value: "epuisee",
        label: "Je suis vite épuisée après l'effort",
        description: "Fatigue surrénalienne ou thyroïdienne"
      }
    ]
  },
  {
    id: "reaction_stress",
    question: "Quand tu es stressée, ta peau réagit comment ?",
    options: [
      {
        value: "eruptions",
        label: "Éruptions de boutons",
        description: "Cortisol stimule la production de sébum"
      },
      {
        value: "rougeurs",
        label: "Rougeurs, plaques",
        description: "Inflammation cutanée liée au stress"
      },
      {
        value: "terne",
        label: "Elle devient terne et marquée",
        description: "Fatigue générale impactant l'éclat"
      },
      {
        value: "pas_reaction",
        label: "Elle ne réagit pas spécialement",
        description: "Bonne résistance au stress"
      },
      {
        value: "sensible",
        label: "Elle devient très sensible ou imprévisible",
        description: "Hypersensibilité neuro-cutanée"
      }
    ]
  },
  {
    id: "symptomes_associes",
    question: "Tu ressens souvent :",
    options: [
      {
        value: "fringales",
        label: "Des fringales sucrées ou salées",
        description: "Déséquilibre glycémique ou résistance insuline"
      },
      {
        value: "maux_tete",
        label: "Des maux de tête avant ou pendant les règles",
        description: "Chute œstrogénique pré-menstruelle"
      },
      {
        value: "envie_pleurer",
        label: "Une envie de pleurer ou de tout envoyer balader avant les règles",
        description: "Syndrome prémenstruel sévère"
      },
      {
        value: "insomnies",
        label: "Des insomnies ou réveils nocturnes",
        description: "Cortisol élevé ou déséquilibre hormonal"
      },
      {
        value: "ballonnements",
        label: "Des ballonnements, une digestion lente",
        description: "Impact hormonal sur le système digestif"
      }
    ]
  }
];