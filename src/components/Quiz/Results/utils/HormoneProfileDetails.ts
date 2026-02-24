// Hormone Profile Details v2 — 5 profiles

export interface HormoneProfileDetail {
  title: string;
  emoji: string;
  icon: string;
  tuEs: string;
  besoin: string;
  gestes: string[];
  program: string;
  programPrice: string;
  programReason: string;
  colorTheme: 'red' | 'blue' | 'purple' | 'green' | 'pink';
}

export const HORMONE_PROFILE_DETAILS: Record<string, HormoneProfileDetail> = {
  "réactive_pression": {
    emoji: "🔥",
    icon: "flame",
    title: "La réactive sous pression",
    tuEs: "Une peau qui absorbe ton stress et te le rend au centuple. Boutons, rougeurs, irritations — ta peau est le baromètre de ta vie.",
    besoin: "Moins de produits, plus de douceur. Quand la peau est inflammée, chaque geste en trop l'agresse. L'objectif, c'est de la calmer — pas de la \"traiter\".",
    gestes: [
      "Simplifie ta routine à 3 gestes maximum (nettoyant doux, hydratant, protection)",
      "Quand ta peau réagit, résiste à l'envie d'ajouter un produit — attends 48h",
      "Le soir, 3 respirations profondes avant ta routine — ça change la circulation et l'absorption"
    ],
    program: "Mini Glow",
    programPrice: "49€",
    programReason: "Pour poser les bases d'une routine apaisante sans te surcharger.",
    colorTheme: "red"
  },
  "fatiguée_survie": {
    emoji: "🌙",
    icon: "moon",
    title: "La fatiguée en mode survie",
    tuEs: "Teint terne, cernes installées, traits tirés. Ta peau reflète ton niveau d'énergie — et en ce moment, elle est en mode économie.",
    besoin: "De l'hydratation (pas 12 sérums, juste la bonne), du repos, et une routine si simple que tu la fais même les soirs où t'en peux plus.",
    gestes: [
      "Le matin, de l'eau fraîche sur le visage + crème hydratante — 1 minute, pas plus",
      "Le soir, un nettoyage doux (pas de double nettoyage, pas de gommage)",
      "Couche-toi 20 minutes plus tôt 3 soirs cette semaine — ta peau se répare la nuit"
    ],
    program: "Mini Glow",
    programPrice: "49€",
    programReason: "Pour repartir de zéro avec une routine tenable, même fatiguée.",
    colorTheme: "blue"
  },
  "controlleuse_débordée": {
    emoji: "🧴",
    icon: "sparkles",
    title: "La controlleuse débordée",
    tuEs: "Tu as trop de produits, trop d'étapes, trop d'exigence envers ta peau. Tu changes de routine dès que ça ne marche pas en 3 jours. Résultat : ta peau ne sait plus où elle en est.",
    besoin: "Un reset. Pas un produit de plus — un produit de moins. Ta peau a besoin de stabilité pour se réguler.",
    gestes: [
      "Compte tes produits skincare actuels (oui, tous)",
      "Garde uniquement : 1 nettoyant, 1 hydratant, 1 protection solaire — le reste, tu ranges",
      "Tiens cette routine minimum 2 semaines sans rien changer — observe, note, résiste"
    ],
    program: "Skin Reboot",
    programPrice: "99€",
    programReason: "Pour faire un vrai reset structuré et comprendre ce dont ta peau a réellement besoin.",
    colorTheme: "green"
  },
  "cyclique_subit": {
    emoji: "📅",
    icon: "calendar",
    title: "La cyclique qui subit",
    tuEs: "Ta peau change selon ton cycle. Nickel en semaine 2, catastrophe en semaine 4. Tu as l'impression de recommencer à zéro chaque mois.",
    besoin: "Pas d'une routine fixe — d'une routine qui bouge avec toi. Comprendre les 4 phases de ton cycle pour anticiper au lieu de subir.",
    gestes: [
      "Commence à noter dans ton téléphone : jour du cycle + état de ta peau (3 mots suffisent)",
      "La semaine avant tes règles, allège ta routine — moins de produits actifs",
      "Après tes règles, c'est le moment d'exfolier doucement — ta peau est plus réceptive"
    ],
    program: "Glow & Cycle",
    programPrice: "299€",
    programReason: "Pour adapter ta routine à chaque phase de ton cycle et arrêter de subir les montagnes russes.",
    colorTheme: "purple"
  },
  "sensible_caméléon": {
    emoji: "🦎",
    icon: "heart",
    title: "La sensible caméléon",
    tuEs: "Imprévisible. Un jour ça va, le lendemain ta peau brûle avec le même produit. Tu ne sais jamais ce qui va fonctionner. Et ça te fatigue.",
    besoin: "De la constance, de la douceur, et surtout — d'apprendre à la lire. Quand tu comprendras ses signaux, tu arrêteras de réagir dans la panique.",
    gestes: [
      "Pendant 7 jours, utilise UNIQUEMENT un nettoyant doux et un hydratant simple — rien d'autre",
      "Le matin, regarde ta peau 10 secondes dans le miroir — sans juger, juste observer",
      "Note ce que tu manges, ton stress, ton sommeil — les patterns vont apparaître"
    ],
    program: "Skin Reboot + Mini Glow",
    programPrice: "~130€",
    programReason: "Pour commencer en douceur avec un reset structuré. Bundle -16€.",
    colorTheme: "pink"
  }
};

export const getHormoneProfileText = (profile: string): string => {
  const detail = HORMONE_PROFILE_DETAILS[profile];
  return detail ? detail.title : "Profil Équilibré";
};

export const getHormoneProfileDetails = (profile: string): HormoneProfileDetail => {
  return HORMONE_PROFILE_DETAILS[profile] || HORMONE_PROFILE_DETAILS["réactive_pression"];
};

// Teaser content for email
export interface HormoneProfileTeaser {
  routineSteps: string[];
  keyIngredients: string[];
  bonusTips: string[];
  colorTheme: 'red' | 'blue' | 'purple' | 'green' | 'pink';
}

export const HORMONE_PROFILE_TEASERS: Record<string, HormoneProfileTeaser> = {
  "réactive_pression": {
    routineSteps: ["Nettoyant doux", "Hydratant apaisant", "Protection solaire"],
    keyIngredients: ["Douceur", "Simplicité", "Patience"],
    bonusTips: ["Respiration 4-7-8", "Attendre 48h", "3 gestes max"],
    colorTheme: "red"
  },
  "fatiguée_survie": {
    routineSteps: ["Eau fraîche le matin", "Crème hydratante", "Nettoyage doux le soir"],
    keyIngredients: ["Hydratation", "Repos", "Simplicité"],
    bonusTips: ["Se coucher plus tôt", "Eau fraîche au réveil", "Pas de double nettoyage"],
    colorTheme: "blue"
  },
  "controlleuse_débordée": {
    routineSteps: ["Nettoyant", "Hydratant", "Protection solaire"],
    keyIngredients: ["Minimalisme", "Stabilité", "Observation"],
    bonusTips: ["Compter ses produits", "Reset 2 semaines", "Observer et noter"],
    colorTheme: "green"
  },
  "cyclique_subit": {
    routineSteps: ["Routine phase 1-2", "Routine phase 3", "Routine phase 4"],
    keyIngredients: ["Adaptation", "Anticipation", "Observation"],
    bonusTips: ["Journal cycle + peau", "Alléger avant les règles", "Exfolier après les règles"],
    colorTheme: "purple"
  },
  "sensible_caméléon": {
    routineSteps: ["Nettoyant doux uniquement", "Hydratant simple", "Observation quotidienne"],
    keyIngredients: ["Constance", "Douceur", "Écoute"],
    bonusTips: ["7 jours minimalistes", "10s miroir chaque matin", "Noter alimentation/stress/sommeil"],
    colorTheme: "pink"
  }
};
