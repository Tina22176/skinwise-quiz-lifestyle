interface SkinTypeDetail {
  title: string;
  description: string;
  characteristics: string[];
  factors: string[];
  routineRecommendation: string;
}

interface SkinStateDetail {
  title: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

interface SkinTypeTeaser {
  morningRoutine: string[];
  eveningRoutine: string[];
  keyIngredients: string[];
  bonusTips: string[];
  colorTheme: 'blue' | 'green' | 'purple' | 'pink';
}

// Configuration des teasers personnalisés par type de peau
export const SKIN_TYPE_TEASERS: Record<string, SkinTypeTeaser> = {
  "combination": {
    morningRoutine: [
      "Gel nettoyant équilibrant",
      "Tonique sans alcool",
      "Sérum hydratant léger",
      "Crème matifiante zone T",
      "SPF 50+ non comédogène"
    ],
    eveningRoutine: [
      "Baume démaquillant doux",
      "Gel nettoyant purifiant",
      "Essence hydratante",
      "Sérum anti-imperfections",
      "Crème de nuit équilibrante"
    ],
    keyIngredients: [
      "Niacinamide",
      "Acide salicylique",
      "Acide hyaluronique",
      "Zinc PCA",
      "Extrait de thé vert",
      "Céramides"
    ],
    bonusTips: [
      "Technique du double nettoyage",
      "Masque argile zone T uniquement",
      "Geste SOS brillance"
    ],
    colorTheme: 'green'
  },
  "dry": {
    morningRoutine: [
      "Lait nettoyant ultra-doux",
      "Eau thermale réparatrice",
      "Sérum lipidique intensif",
      "Crème riche nourrissante",
      "SPF crème minérale"
    ],
    eveningRoutine: [
      "Baume démaquillant nourrissant",
      "Lait nettoyant doux",
      "Essence hydratante",
      "Sérum réparateur intensif",
      "Baume de nuit réparateur"
    ],
    keyIngredients: [
      "Céramides",
      "Acide hyaluronique",
      "Squalane",
      "Beurre de karité",
      "Panthenol",
      "Allantoïne"
    ],
    bonusTips: [
      "Technique du layering hydratant",
      "Geste SOS tiraillements",
      "Masque cocooning hebdomadaire"
    ],
    colorTheme: 'blue'
  },
  "oily": {
    morningRoutine: [
      "Gel nettoyant purifiant",
      "Tonique astringent doux",
      "Sérum matifiant",
      "Gel hydratant léger",
      "SPF gel non gras"
    ],
    eveningRoutine: [
      "Huile démaquillante",
      "Gel nettoyant profond",
      "Essence purifiante",
      "Sérum anti-imperfections",
      "Gel de nuit régulateur"
    ],
    keyIngredients: [
      "Acide salicylique",
      "Niacinamide",
      "Zinc PCA",
      "Extrait de saule",
      "Argile kaolin",
      "Probiotiques"
    ],
    bonusTips: [
      "Technique du triple nettoyage",
      "Masque argile purifiant",
      "Geste SOS brillance"
    ],
    colorTheme: 'purple'
  },
  "normal": {
    morningRoutine: [
      "Gel nettoyant doux",
      "Tonique équilibrant",
      "Sérum antioxydant",
      "Crème hydratante",
      "SPF 30+ quotidien"
    ],
    eveningRoutine: [
      "Baume démaquillant",
      "Gel nettoyant doux",
      "Essence hydratante",
      "Sérum réparateur",
      "Crème de nuit"
    ],
    keyIngredients: [
      "Vitamine C",
      "Acide hyaluronique",
      "Peptides",
      "Antioxydants",
      "Céramides",
      "Vitamine E"
    ],
    bonusTips: [
      "Technique du massage facial",
      "Masque éclat hebdomadaire",
      "Geste SOS fatigue"
    ],
    colorTheme: 'pink'
  }
};

export const getSkinTypeText = (skinType: string) => {
  const texts: Record<string, string> = {
    "combination": "Mixte",
    "dry": "Sèche",
    "oily": "Grasse",
    "normal": "Normale"
  };
  return texts[skinType] || texts["normal"];
};

export const getSkinStateText = (state: string | null) => {
  if (!state || state === "normal") return null;
  
  const texts: Record<string, string> = {
    "sensitive": "Sensible"
  };
  return texts[state];
};

export const getSkinStateDetails = (state: string | null): SkinStateDetail | null => {
  if (!state || state === "normal") return null;
  
  const details: Record<string, SkinStateDetail> = {
    "sensitive": {
      title: "État Sensible",
      description: "Ta peau présente une réactivité accrue aux stimuli externes, nécessitant des soins particuliers.",
      characteristics: [
        "Réactivité cutanée aux stimuli externes",
        "Rougeurs fréquentes ou permanentes",
        "Sensations d'inconfort (picotements, tiraillements)",
        "Intolérance à certains ingrédients cosmétiques"
      ],
      recommendations: [
        "Privilégier les produits hypoallergéniques",
        "Tester toujours avant utilisation",
        "Éviter les parfums et alcools",
        "Utiliser des produits apaisants",
        "Protéger des agressions extérieures"
      ]
    }
  };

  return details[state] || null;
};

export const getSkinTypeDetails = (skinType: string): SkinTypeDetail => {
  const details: Record<string, SkinTypeDetail> = {
    "combination": {
      title: "Peau Mixte",
      description: "Ta peau présente deux comportements distincts : plus grasse sur la zone T (front, nez, menton) et normale à sèche sur les joues.",
      characteristics: [
        "Zone T grasse, joues plus sèches",
        "Pores visibles principalement sur le nez et le front",
        "Brillance modérée qui se développe en cours de journée"
      ],
      factors: [
        "Déséquilibre hormonal",
        "Utilisation de produits inadaptés",
        "Facteurs environnementaux"
      ],
      routineRecommendation: "Ta routine devra équilibrer les différentes zones avec des actifs adaptés, en utilisant des produits plus légers sur la zone T et plus nourrissants sur les zones sèches."
    },
    "dry": {
      title: "Peau Sèche",
      description: "Ta peau manque de sébum et d'hydratation. Elle peut paraître terne, tiraillée et présenter des squames.",
      characteristics: [
        "Sensation de tiraillement fréquente",
        "Teint parfois terne ou manquant d'éclat",
        "Tendance aux ridules de déshydratation"
      ],
      factors: [
        "Production insuffisante de sébum",
        "Barrière cutanée fragilisée",
        "Facteurs environnementaux (chauffage, climatisation)"
      ],
      routineRecommendation: "Ta routine devra privilégier l'hydratation profonde et limiter les actifs exfoliants trop puissants qui pourraient accentuer la sécheresse."
    },
    "oily": {
      title: "Peau Grasse",
      description: "Ta peau produit un excès de sébum qui lui donne un aspect brillant. Les pores sont souvent dilatés et les imperfections fréquentes.",
      characteristics: [
        "Brillance excessive tout au long de la journée",
        "Pores dilatés visibles",
        "Tendance aux imperfections (points noirs, comédons)"
      ],
      factors: [
        "Surproduction de sébum",
        "Facteurs hormonaux",
        "Prédisposition génétique"
      ],
      routineRecommendation: "Ta routine mettra l'accent sur la régulation du sébum tout en maintenant une bonne hydratation, car même les peaux grasses ont besoin d'être hydratées."
    },
    "normal": {
      title: "Peau Normale",
      description: "Ta peau est équilibrée, ni trop grasse ni trop sèche. Elle présente peu d'imperfections et ne réagit pas excessivement aux facteurs externes.",
      characteristics: [
        "Teint uniforme et lumineux",
        "Texture lisse avec des pores peu visibles",
        "Bonne tolérance aux produits cosmétiques"
      ],
      factors: [
        "Équilibre naturel de la production de sébum",
        "Bonne hydratation naturelle",
        "Barrière cutanée intacte"
      ],
      routineRecommendation: "Ta routine peut être adaptée à tes objectifs spécifiques (anti-âge, éclat, etc.) tout en maintenant l'équilibre naturel de ta peau."
    }
  };

  return details[skinType] || details["normal"];
};
