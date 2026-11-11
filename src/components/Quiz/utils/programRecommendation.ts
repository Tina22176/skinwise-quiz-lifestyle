export type ProgramId = "mini-glow" | "skin-reboot" | "glow-and-cycle";

export interface ProgramRecommendation {
  id: ProgramId;
  name: string;
  price: string;
  slug: string;
  reason: string;
  reassurance: string;
  secondaryId: ProgramId;
  leadTemperature: "discovery" | "warm" | "hot";
  cycleRelevance: number;
  scores: Record<ProgramId, number>;
}

const PROGRAMS: Record<ProgramId, Omit<ProgramRecommendation, "secondaryId" | "leadTemperature" | "cycleRelevance" | "scores">> = {
  "mini-glow": {
    id: "mini-glow",
    name: "Glow Express",
    price: "49 € · paiement unique",
    slug: "/programmes/mini-glow",
    reason: "7 jours pour simplifier ta routine, retrouver des repères clairs et passer à l'action sans te surcharger.",
    reassurance: "7 jours guidés · Programme digital · Accès 12 mois",
  },
  "skin-reboot": {
    id: "skin-reboot",
    name: "Skin Reboot",
    price: "149 € · paiement unique",
    slug: "/programmes/skin-reboot",
    reason: "28 jours pour stabiliser ta peau, reconstruire une routine cohérente et apprendre à observer ses réactions.",
    reassurance: "28 jours guidés · Programme digital · Accès 12 mois",
  },
  "glow-and-cycle": {
    id: "glow-and-cycle",
    name: "Glow & Cycle",
    price: "19,99 €/mois",
    slug: "/programmes/glow-and-cycle",
    reason: "Un compagnon quotidien pour observer ce qui revient dans ta peau, ton énergie, ton sommeil et tes envies. Un geste adapté à tes observations, des idées de repas, des rituels et The Glow Edit.",
    reassurance: "Également 49 €/trimestre ou 149 €/an. Même contenu dans les trois formules. Renouvellement automatique, résiliable depuis ton espace ; accès conservé jusqu’à la fin de la période payée.",
  },
};

// Les choix exprimés priment sur les symptômes. En cas d'égalité :
// objectif, puis rythme choisi, puis ordre explicite ci-dessous.
const GOALS: Record<string, ProgramId> = {
  simplifier: "mini-glow", stabiliser: "skin-reboot", comprendre_cycle: "glow-and-cycle",
};
const SUPPORT: Record<string, ProgramId> = {
  declic: "mini-glow", mois: "skin-reboot", plusieurs_cycles: "glow-and-cycle",
};
const ORDER: ProgramId[] = ["skin-reboot", "mini-glow", "glow-and-cycle"];

export const recommendProgram = (answers: Record<string, string>): ProgramRecommendation => {
  const goal = GOALS[answers.primary_goal];
  const support = SUPPORT[answers.support_level];
  const scores: Record<ProgramId, number> = {
    "mini-glow": 0, "skin-reboot": 0, "glow-and-cycle": 0,
  };
  if (goal) scores[goal] += 8;
  if (support) scores[support] += 4;

  // Irrégularité et localisation des boutons ne prouvent pas une récurrence.
  // Conserver spm pour les réponses de l'ancien questionnaire.
  const cycleRelevance = Number(answers.boutons_pattern === "avant_regles") +
    Number(["recurrent", "spm"].includes(answers.cycle_signals) || answers.cycle === "spm");
  scores["glow-and-cycle"] += cycleRelevance;
  if (["touche_pas", "changeante"].includes(answers.skin_daily)) scores["skin-reboot"] += 1;
  if (["explose", "rougit", "hypersensible"].includes(answers.skin_stress)) scores["skin-reboot"] += 1;

  const ranked = [...ORDER].sort((a, b) =>
    scores[b] - scores[a] || Number(b === goal) - Number(a === goal) ||
    Number(b === support) - Number(a === support) || ORDER.indexOf(a) - ORDER.indexOf(b));
  const [primary, secondary] = ranked;
  const reasons: string[] = [];
  if (goal === primary) reasons.push({
    "mini-glow": "Tu souhaites simplifier ta routine : un cadre de 7 jours te permet de poser des bases claires.",
    "skin-reboot": "Tu souhaites stabiliser ta routine : 28 jours guidés te donnent un cadre pour observer, tester et ancrer tes habitudes.",
    "glow-and-cycle": "Tu souhaites explorer les liens entre peau, cycle et énergie : le suivi quotidien t’aide à observer ce qui revient chez toi.",
  }[primary]);
  if (support === primary) reasons.push({
    "mini-glow": "Le format court correspond au déclic que tu recherches.",
    "skin-reboot": "Le format sur un mois correspond au rythme que tu as choisi.",
    "glow-and-cycle": "L’abonnement correspond à ton souhait d’observer tes ressentis dans la durée.",
  }[primary]);
  if (!reasons.length && primary === "glow-and-cycle") reasons.push("Tu as signalé des variations récurrentes : un suivi peut t’aider à voir si elles se répètent, sans présumer leur cause.");
  if (!reasons.length && primary === "skin-reboot" && scores[primary] > 0) reasons.push("Tu décris une peau réactive ou changeante : un cadre progressif peut t’aider à observer ses réactions et ajuster ta routine.");

  return {
    ...PROGRAMS[primary],
    reason: reasons.join(" ") || PROGRAMS[primary].reason,
    secondaryId: secondary,
    leadTemperature: scores[primary] >= 12 ? "hot" : scores[primary] >= 8 ? "warm" : "discovery",
    cycleRelevance,
    scores,
  };
};

export const getProgram = (id: ProgramId) => PROGRAMS[id];
