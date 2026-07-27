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
    name: "Mini Glow",
    price: "49€",
    slug: "/programmes/mini-glow",
    reason: "7 jours pour simplifier ta routine, retrouver des repères clairs et passer à l'action sans te surcharger.",
    reassurance: "7 jours · Format essentiel · Accès immédiat",
  },
  "skin-reboot": {
    id: "skin-reboot",
    name: "Skin Reboot",
    price: "99€",
    slug: "/programmes/skin-reboot",
    reason: "28 jours pour stabiliser ta peau, reconstruire une routine cohérente et apprendre à observer ses réactions.",
    reassurance: "28 jours · Approche In & Out · Accès immédiat",
  },
  "glow-and-cycle": {
    id: "glow-and-cycle",
    name: "Glow & Cycle",
    price: "299€",
    slug: "/programmes/glow-and-cycle",
    reason: "Un accompagnement sur plusieurs cycles pour anticiper les variations de ta peau, de ton énergie et de ton bien-être.",
    reassurance: "12 mois · Suivi cyclique · Garantie 30 jours",
  },
};

export const recommendProgram = (answers: Record<string, string>): ProgramRecommendation => {
  const scores: Record<ProgramId, number> = {
    "mini-glow": 0,
    "skin-reboot": 1,
    "glow-and-cycle": 0,
  };

  if (answers.primary_goal === "simplifier") scores["mini-glow"] += 5;
  if (answers.primary_goal === "stabiliser") scores["skin-reboot"] += 5;
  if (answers.primary_goal === "comprendre_cycle") scores["glow-and-cycle"] += 5;

  if (answers.support_level === "declic") scores["mini-glow"] += 4;
  if (answers.support_level === "mois") scores["skin-reboot"] += 4;
  if (answers.support_level === "plusieurs_cycles") scores["glow-and-cycle"] += 4;

  const cycleSignals = [answers.cycle, answers.boutons_pattern];
  if (["irregulier", "spm"].includes(answers.cycle)) scores["glow-and-cycle"] += 4;
  if (["avant_regles", "microkystes"].includes(answers.boutons_pattern)) scores["glow-and-cycle"] += 3;
  if (answers.skin_daily === "changeante") scores["glow-and-cycle"] += 2;

  if (["touche_pas", "changeante"].includes(answers.skin_daily)) scores["skin-reboot"] += 2;
  if (["explose", "rougit", "hypersensible"].includes(answers.skin_stress)) scores["skin-reboot"] += 2;
  if (answers.skin_daily === "brille" && answers.skin_stress === "rien") scores["mini-glow"] += 1;

  const ranked = (Object.entries(scores) as Array<[ProgramId, number]>).sort((a, b) => b[1] - a[1]);
  const [primary, secondary] = ranked;
  const cycleRelevance = cycleSignals.reduce((score, signal) => {
    return score + (["irregulier", "spm", "avant_regles", "microkystes"].includes(signal) ? 1 : 0);
  }, 0);

  return {
    ...PROGRAMS[primary[0]],
    secondaryId: secondary[0],
    leadTemperature: primary[1] >= 9 ? "hot" : primary[1] >= 6 ? "warm" : "discovery",
    cycleRelevance,
    scores,
  };
};

export const getProgram = (id: ProgramId) => PROGRAMS[id];
