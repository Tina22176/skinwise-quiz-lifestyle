// Contenu éditorial uniquement. Les offres sont définies dans programRecommendation.ts.

export interface HormoneProfileDetail {
  title: string;
  emoji: string;
  icon: string;
  tuEs: string;
  besoin: string;
  gestes: string[];
  colorTheme: 'red' | 'blue' | 'purple' | 'green' | 'pink';
}

export const HORMONE_PROFILE_DETAILS: Record<string, HormoneProfileDetail> = {
  "réactive_pression": {
    emoji: "🔥",
    icon: "flame",
    title: "La réactive sous pression",
    tuEs: "Tu observes davantage de boutons, rougeurs ou inconfort quand la pression monte. Ta peau semble réagir dans ces moments, sans que cela permette d’en déduire une cause hormonale.",
    besoin: "Moins de produits, plus de douceur. Quand la peau est inflammée, chaque geste en trop l'agresse. L'objectif : la calmer, pas la traiter.",
    gestes: [
      "Simplifie ta routine à 3 gestes max — nettoyant doux, hydratant, protection",
      "Quand ta peau réagit, évite d’ajouter un nouvel actif ; mets de côté ce qui l’irrite et observe son confort",
      "Le soir, prends 3 respirations lentes et confortables avant ta routine, pour t’accorder une pause"
    ],
    colorTheme: "red"
  },
  "fatiguée_survie": {
    emoji: "🌙",
    icon: "moon",
    title: "La fatiguée en mode survie",
    tuEs: "Tu décris un manque d’énergie, de confort ou d’éclat en ce moment. Une routine facile à tenir et un peu de repos peuvent t’aider à prendre soin de toi sans te surcharger.",
    besoin: "De l'hydratation (pas 12 sérums, juste la bonne), du repos, et une routine si simple que tu la fais même les soirs où t'en peux plus.",
    gestes: [
      "Le matin, rince si besoin puis applique ton hydratant habituel et une protection solaire adaptée à ton exposition",
      "Le soir, retire maquillage et protection solaire avec un nettoyage adapté, puis hydrate ; un double nettoyage n’est utile que si nécessaire",
      "Couche-toi 20 min plus tôt 3 soirs cette semaine — ta peau se répare la nuit"
    ],
    colorTheme: "blue"
  },
  "controlleuse_débordée": {
    emoji: "🧴",
    icon: "sparkles",
    title: "La contrôleuse débordée",
    tuEs: "Tu nous dis accumuler des produits ou changer souvent de routine. Difficile alors de repérer ce qui te convient et ce qui mérite d’être mis de côté.",
    besoin: "Un reset. Pas un produit de plus — un produit de moins. Ta peau a besoin de stabilité pour se réguler.",
    gestes: [
      "Compte tes produits skincare actuels — oui, tous",
      "Garde uniquement 1 nettoyant, 1 hydratant, 1 protection — le reste, tu ranges",
      "Observe cette base pendant 2 semaines si elle reste confortable ; mets de côté tout produit qui irrite"
    ],
    colorTheme: "green"
  },
  "cyclique_subit": {
    emoji: "📅",
    icon: "calendar",
    title: "La cyclique qui subit",
    tuEs: "Tu as remarqué des variations qui reviennent dans ta peau, ton énergie ou ton humeur. Noter leur moment et ton contexte peut t’aider à explorer ces récurrences, sans présumer leur cause.",
    besoin: "Une base douce et stable, et des observations au fil du temps. Les phases estimées peuvent servir de repères, mais c’est le confort de ta peau qui guide les ajustements.",
    gestes: [
      "Note chaque jour dans ton téléphone : jour du cycle + état de ta peau (3 mots suffisent)",
      "Autour des jours où tu notes un inconfort, garde une base douce et évite d’ajouter des actifs",
      "Ajuste selon la tolérance de ta peau, sans exfoliation automatique liée à une date du cycle"
    ],
    colorTheme: "purple"
  },
  "sensible_caméléon": {
    emoji: "🦎",
    icon: "heart",
    title: "La sensible caméléon",
    tuEs: "Imprévisible. Un jour ça va, le lendemain ta peau brûle avec le même produit. Tu ne sais jamais ce qui va fonctionner.",
    besoin: "De la constance, de la douceur, et surtout — apprendre à lire ta peau. Observer ses signaux peut t’aider à choisir plus sereinement tes prochains gestes.",
    gestes: [
      "Pendant 7 jours, simplifie autour d’un nettoyant doux, d’un hydratant toléré et d’une protection solaire adaptée à ton exposition",
      "Le matin, regarde ta peau 10 secondes — sans juger, juste observer",
      "Note ton confort cutané, ton stress, ton sommeil et, si utile, ton alimentation ; cherche des associations sans conclure à une cause"
    ],
    colorTheme: "pink"
  },
  "à_observer": {
    emoji: "🌿",
    icon: "heart",
    title: "Ta peau, à observer à ton rythme",
    tuEs: "Tes réponses ne font pas ressortir une tendance nette parmi les cinq profils. Tu peux partir de ce qui est confortable pour toi et observer sans chercher à tout changer.",
    besoin: "Des repères simples et une routine que tu tolères bien, sans ajouter de produits par défaut.",
    gestes: [
      "Garde une base douce : nettoyant adapté, hydratant toléré et protection solaire selon ton exposition",
      "Note brièvement ton confort cutané, sans obligation de trouver un problème",
      "Si tu testes un produit, introduis-le seul et observe ta tolérance"
    ],
    colorTheme: "green"
  }
};

export type CycleContext = "calendar" | "observations";

export const getHormoneProfileText = (profile: string): string => {
  const detail = HORMONE_PROFILE_DETAILS[profile];
  return detail ? detail.title : HORMONE_PROFILE_DETAILS["à_observer"].title;
};

export const getHormoneProfileDetails = (profile: string, cycleContext: CycleContext = "observations"): HormoneProfileDetail => {
  const detail = HORMONE_PROFILE_DETAILS[profile] || HORMONE_PROFILE_DETAILS["à_observer"];
  if (profile !== "cyclique_subit" || cycleContext === "calendar") return detail;
  return {
    ...detail,
    title: "La cyclique, à l’écoute de ses variations",
    tuEs: "Tu remarques des variations qui reviennent dans ta peau, ton énergie ou ton humeur. Avec une contraception, sans règles ou sans repère de cycle partagé, tes ressentis restent un point de départ utile.",
    besoin: "Une routine douce et stable, et un suivi de tes ressentis sans imposer un calendrier de 28 jours ni quatre phases.",
    gestes: [
      "Note la date, ton confort cutané et ton énergie en quelques mots, sans devoir renseigner un jour de cycle",
      "Quand tu notes un inconfort, garde une base douce et évite d’ajouter des actifs",
      "Observe ce qui revient au fil des semaines et ajuste selon ta tolérance, sans exfoliation programmée"
    ],
  };
};

// Teasers dérivés des mêmes conseils pour éviter des consignes contradictoires.
export interface HormoneProfileTeaser {
  routineSteps: string[];
  keyIngredients: string[];
  bonusTips: string[];
  colorTheme: HormoneProfileDetail["colorTheme"];
}

export const HORMONE_PROFILE_TEASERS: Record<string, HormoneProfileTeaser> = Object.fromEntries(
  Object.keys(HORMONE_PROFILE_DETAILS).map((id) => {
    const detail = getHormoneProfileDetails(id);
    return [id, {
      routineSteps: ["Nettoyage adapté", "Hydratation tolérée", "Protection solaire selon l’exposition"],
      keyIngredients: ["Douceur", "Constance", "Observation"],
      bonusTips: detail.gestes,
      colorTheme: detail.colorTheme,
    }];
  }),
);
