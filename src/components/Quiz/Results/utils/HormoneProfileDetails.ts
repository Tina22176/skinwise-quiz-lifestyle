// Hormone Profile Details - Complete information for each hormonal profile

export interface HormoneProfileDetail {
  title: string;
  emoji: string;
  description: string;
  hormonalExplanation: string;
  skincareRecommendations: string[];
  lifestyleBonus: string;
  colorTheme: 'red' | 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  program: string;
  programDescription: string;
  cta: string;
}

export const HORMONE_PROFILE_DETAILS: Record<string, HormoneProfileDetail> = {
  "stressée_inflammée": {
    emoji: "🔥",
    title: "La stressée inflammée",
    description: "Ta peau parle à ta place quand tu vis une période tendue. Rougeurs, petits boutons, sensations d'échauffement… Il te faut du calme et de la douceur.",
    hormonalExplanation: "Ton cortisol élevé crée de l'inflammation dans ta peau. Tes nerfs sont à vif, et ça se voit !",
    skincareRecommendations: [
      "Des soins ultra-apaisants sans agresser",
      "Une routine simplifiée anti-stress",
      "La respiration 4-7-8 pour faire chuter ton cortisol"
    ],
    lifestyleBonus: "La respiration 4-7-8 : inspire 4s, retiens 7s, expire 8s pour calmer instantanément ton système nerveux.",
    colorTheme: "red" as const,
    program: "Mini Glow",
    programDescription: "Un reset express parfait pour ta peau sensibilisée",
    cta: "J'en profite"
  },
  "fatiguée_tension": {
    emoji: "😴",
    title: "La fatiguée sous tension",
    description: "Ta peau reflète ta fatigue intérieure. Teint terne, traits tirés, cernes marqués… Tes surrénales ont besoin d'un break et ta peau d'un réveil en douceur.",
    hormonalExplanation: "Tes surrénales sont épuisées après trop de stress. Ta peau manque d'énergie vitale.",
    skincareRecommendations: [
      "Des actifs énergisants comme la vitamine C",
      "Un boost hydratation + massage quotidien", 
      "Un smoothie vert pour soutenir tes surrénales"
    ],
    lifestyleBonus: "Un smoothie vert quotidien : épinards, pomme, gingembre pour recharger tes surrénales fatiguées.",
    colorTheme: "blue" as const,
    program: "Skin Reboot",
    programDescription: "28 jours pour retrouver ton énergie et ton glow",
    cta: "J'en profite"
  },
  "cyclique_congestionnée": {
    emoji: "🌙", 
    title: "La cyclique congestionnée",
    description: "Ta peau suit les montagnes russes de tes hormones. Jolie une semaine, boutonneuse la suivante… Il te faut une approche qui s'adapte à ton cycle.",
    hormonalExplanation: "Tes hormones jouent aux montagnes russes et ta peau suit le mouvement !",
    skincareRecommendations: [
      "Une routine qui suit tes fluctuations hormonales",
      "Des actifs anti-inflammatoires en phase pré-menstruelle",
      "Une tisane gattilier pour équilibrer tes hormones"
    ],
    lifestyleBonus: "Une tisane de gattilier quotidienne pour équilibrer naturellement ton cycle hormonal.",
    colorTheme: "purple" as const,
    program: "Glow & Cycle",
    programDescription: "L'app skincare qui suit vraiment ton cycle",
    cta: "J'en profite"
  },
  "brillante_déséquilibrée": {
    emoji: "✨",
    title: "La brillante déséquilibrée", 
    description: "Ta peau produit du sébum comme si elle préparait un stock pour l'hiver ! Il faut canaliser tes androgènes et réguler cette production sans assécher.",
    hormonalExplanation: "Tes androgènes sont en mode turbo ! Tes glandes sébacées travaillent à fond.",
    skincareRecommendations: [
      "Des actifs régulateurs de sébum (niacinamide + zinc)",
      "Un nettoyage efficace mais non décapant",
      "Du thé vert anti-androgène naturel"
    ],
    lifestyleBonus: "Du thé vert quotidien : ses antioxydants régulent naturellement tes androgènes hyperactifs.",
    colorTheme: "green" as const,
    program: "Glow & Cycle",
    programDescription: "Programme Acné avec approche hormonale ciblée", 
    cta: "J'en profite"
  },
  "sèche_instable": {
    emoji: "🏜️",
    title: "La sèche instable",
    description: "Ta peau tire, picote et semble avoir perdu sa souplesse naturelle. Direction mode cocooning intensif avec une approche ultra-nourrissante.",
    hormonalExplanation: "Tes œstrogènes baissent et ta peau perd sa capacité naturelle à s'hydrater.",
    skincareRecommendations: [
      "Une routine nutrition intense multi-couches",
      "Des huiles et sérums ultra-hydratants",
      "Des oméga-3 pour nourrir de l'intérieur"
    ],
    lifestyleBonus: "Des oméga-3 quotidiens : huile de colza, noix, petits poissons gras pour nourrir ta peau de l'intérieur.",
    colorTheme: "pink" as const,
    program: "Bundle Skin Reboot + Mini Glow",
    programDescription: "28 jours de cocooning avec soutien hormonal - 36€ au lieu de 52€",
    cta: "J'en profite (-16€)"
  },
  "sensible_caméléon": {
    emoji: "🦋",
    title: "La sensible caméléon",
    description: "Ta peau change d'humeur plus souvent que la météo ! Il te faut une approche minimaliste et beaucoup d'observation pour identifier tes triggers.",
    hormonalExplanation: "Ton terrain hormonal est hypersensible aux moindres variations environnementales.",
    skincareRecommendations: [
      "Une routine ultra-douce et adaptable",
      "Un journal peau-humeur pour comprendre tes réactions", 
      "Des actifs apaisants sans risque d'allergie"
    ],
    lifestyleBonus: "Un journal peau-humeur quotidien pour décoder les messages de ta peau ultra-réactive.",
    colorTheme: "purple" as const,
    program: "Glow & Cycle",
    programDescription: "Programme Stress pour gérer les fluctuations",
    cta: "J'en profite"
  }
};

export const getHormoneProfileText = (profile: string): string => {
  const texts: Record<string, string> = {
    "stressée_inflammée": "Stressée Inflammée",
    "fatiguée_tension": "Fatiguée Sous Tension",
    "cyclique_congestionnée": "Cyclique Congestionnée",
    "brillante_déséquilibrée": "Brillante Déséquilibrée", 
    "sèche_instable": "Sèche Instable",
    "sensible_caméléon": "Sensible Caméléon"
  };
  return texts[profile] || "Profil Équilibré";
};

export const getHormoneProfileDetails = (profile: string): HormoneProfileDetail => {
  return HORMONE_PROFILE_DETAILS[profile] || {
    title: "Profil Équilibré",
    emoji: "✨", 
    description: "Ta peau présente un équilibre hormonal optimal avec peu de déséquilibres notables.",
    hormonalExplanation: "Tes hormones semblent bien équilibrées dans l'ensemble.",
    skincareRecommendations: [
      "Routine de base avec nettoyant doux",
      "Hydratant quotidien adapté", 
      "Protection solaire systématique"
    ],
    lifestyleBonus: "Maintenir tes bonnes habitudes actuelles",
    colorTheme: "pink" as const,
    program: "Glow & Cycle",
    programDescription: "Routine de maintien personnalisée",
    cta: "J'en profite"
  };
};

// Teaser content for email subscription
export interface HormoneProfileTeaser {
  routineSteps: string[];
  keyIngredients: string[];
  bonusTips: string[];
  colorTheme: 'red' | 'blue' | 'purple' | 'green' | 'orange' | 'pink';
}

export const HORMONE_PROFILE_TEASERS: Record<string, HormoneProfileTeaser> = {
  "stressée_inflammée": {
    routineSteps: [
      "Nettoyage ultra-doux matin/soir",
      "Sérum apaisant anti-rougeurs", 
      "Crème barrière réparatrice",
      "SPF minéral non-irritant"
    ],
    keyIngredients: [
      "Niacinamide 5%",
      "Centella Asiatica", 
      "Céramides",
      "Allantoïne"
    ],
    bonusTips: [
      "Technique cohérence cardiaque",
      "Éviter sur-stimulation",
      "Masque SOS inflammation"
    ],
    colorTheme: "red"
  },
  "fatiguée_tension": {
    routineSteps: [
      "Nettoyant énergisant vitaminé",
      "Sérum éclat vitamine C",
      "Crème peptides anti-fatigue", 
      "Masque boost hebdomadaire"
    ],
    keyIngredients: [
      "Vitamine C stabilisée",
      "Peptides énergisants",
      "Coenzyme Q10",
      "Ginseng"
    ],
    bonusTips: [
      "Lumière naturelle réveil",
      "Massage activateur",
      "Routine réveil cellulaire"
    ],
    colorTheme: "blue"
  },
  "cyclique_congestionnée": {
    routineSteps: [
      "Adaptation selon phase cycle",
      "Sérum équilibrant prébiotiques",
      "Traitement ciblé imperfections",
      "Masque purifiant cyclique"
    ],
    keyIngredients: [
      "Prébiotiques cutanés",
      "Acide salicylique 2%",
      "Zinc PCA",
      "Extrait gattilier"
    ],
    bonusTips: [
      "Calendrier hormonal",
      "Graines de courge",
      "Adaptation routine cycle"
    ],
    colorTheme: "purple"
  },
  "brillante_déséquilibrée": {
    routineSteps: [
      "Double nettoyage purifiant",
      "Sérum matifiant régulateur",
      "Hydratant gel non-comédogène",
      "Masque argile bi-hebdomadaire"
    ],
    keyIngredients: [
      "Niacinamide 10%",
      "Acide azélaïque",
      "Zinc PCA", 
      "Probiotiques"
    ],
    bonusTips: [
      "Thé vert menthe verte",
      "Index glycémique bas",
      "Technique matification"
    ],
    colorTheme: "green"
  },
  "sèche_instable": {
    routineSteps: [
      "Layering hydratation intense",
      "Sérum multi-hyaluronique",
      "Crème barrière lipidique",
      "Huile nourrissante nocturne"
    ],
    keyIngredients: [
      "Acide hyaluronique",
      "Céramides complexes",
      "Squalane",
      "Oméga 3-6-9"
    ],
    bonusTips: [
      "Avocat quotidien",
      "Vérification thyroïde", 
      "Technique layering"
    ],
    colorTheme: "orange"
  },
  "sensible_caméléon": {
    routineSteps: [
      "Routine modulaire adaptable",
      "Base minimaliste stable",
      "Produits SOS réactivité",
      "Ajustements quotidiens"
    ],
    keyIngredients: [
      "Complexe adaptogène",
      "Multi-antioxydants",
      "Eau thermale",
      "Actifs apaisants"
    ],
    bonusTips: [
      "Journal peau-émotion",
      "Écoute quotidienne",
      "Routine évolutive"
    ],
    colorTheme: "pink"
  }
};