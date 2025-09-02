// Hormone Profile Details - Complete information for each hormonal profile

export interface HormoneProfileDetail {
  title: string;
  emoji: string;
  description: string;
  hormonalExplanation: string;
  skincareRecommendations: string[];
  lifestyleBonus: string;
  routineRecommendation: string;
  colorTheme: 'red' | 'blue' | 'purple' | 'green' | 'orange' | 'pink';
}

export const HORMONE_PROFILE_DETAILS: Record<string, HormoneProfileDetail> = {
  "stressée_inflammée": {
    title: "La Stressée Inflammée",
    emoji: "🔥",
    description: "Ta peau réagit intensément au stress et présente des signes d'inflammation chronique. Les rougeurs et éruptions sont tes compagnons indésirables lors des périodes intenses.",
    hormonalExplanation: "Ton cortisol (hormone du stress) est chroniquement élevé, créant un état inflammatoire qui se reflète directement sur ta peau. Cette hyperactivation du système nerveux sympathique stimule la production de sébum et déclenche des réactions cutanées.",
    skincareRecommendations: [
      "Nettoyant ultra-doux sans sulfates pour ne pas aggraver l'inflammation",
      "Sérum apaisant à la niacinamide (5%) pour réduire rougeurs et inflammation",
      "Crème réparatrice aux céramides et centella asiatica pour renforcer la barrière"
    ],
    lifestyleBonus: "🧘‍♀️ Technique de cohérence cardiaque : 5 minutes matin et soir, inspire 5 sec, expire 5 sec. Cela régule ton système nerveux et diminue la production de cortisol.",
    routineRecommendation: "Ta routine doit être ultra-minimaliste et apaisante. Moins c'est mieux ! Focus sur la réparation de ta barrière cutanée et l'apaisement de l'inflammation.",
    colorTheme: "red"
  },
  "fatiguée_tension": {
    title: "La Fatiguée Sous Tension",
    emoji: "😴",
    description: "Ta peau reflète ta fatigue : terne, relâchée, avec des cernes marqués. Elle manque d'éclat et semble avoir perdu sa vitalité naturelle.",
    hormonalExplanation: "Tes glandes surrénales sont épuisées (fatigue surrénalienne), ton cortisol est trop bas le matin et peut grimper le soir. Cette dysrégulation affecte la régénération cellulaire et l'éclat de ta peau.",
    skincareRecommendations: [
      "Sérum énergisant à la vitamine C stabilisée pour redonner de l'éclat",
      "Crème riche aux peptides stimulants et coenzyme Q10 pour booster l'énergie cellulaire",
      "Masque éclat hebdomadaire aux AHA doux pour stimuler le renouvellement"
    ],
    lifestyleBonus: "🌅 Exposition à la lumière naturelle dès le réveil : 10 minutes dehors ou devant une fenêtre pour réguler ton rythme circadien et stimuler la production naturelle de cortisol.",
    routineRecommendation: "Ta peau a besoin d'être réveillée en douceur. Privilégie des actifs énergisants le matin et réparateurs le soir pour optimiser la régénération nocturne.",
    colorTheme: "blue"
  },
  "cyclique_congestionnée": {
    title: "La Cyclique Congestionnée",
    emoji: "🌙",
    description: "Ta peau suit le rythme de tes hormones : boutons avant les règles, microkystes récurrents, variations d'éclat selon les phases de ton cycle.",
    hormonalExplanation: "Tu présentes probablement une dominance œstrogénique ou une faiblesse en progestérone. Ces déséquilibres créent des fluctuations importantes qui se manifestent par des congestions cutanées cycliques.",
    skincareRecommendations: [
      "Sérum régulateur aux prébiotiques pour équilibrer le microbiome cutané",
      "Traitement localisé à l'acide salicylique (2%) pour les zones à imperfections",
      "Masque purifiant à l'argile 2x/semaine pendant la phase pré-menstruelle"
    ],
    lifestyleBonus: "🌱 Graines de courge : 1 poignée/jour en 2ème partie de cycle. Riches en zinc, elles soutiennent la production de progestérone et réduisent l'inflammation hormonale.",
    routineRecommendation: "Adapte tes soins selon ton cycle : phase folliculaire = douceur, phase lutéale = purification ciblée. Tiens un calendrier peau-hormones pour identifier tes patterns.",
    colorTheme: "purple"
  },
  "brillante_déséquilibrée": {
    title: "La Brillante Déséquilibrée",
    emoji: "✨",
    description: "Ta peau produit un excès de sébum quasi-permanent : brillance, pores dilatés, imperfections chroniques. L'équilibre semble difficile à atteindre.",
    hormonalExplanation: "Tes androgènes (testostérone, DHEA) sont probablement élevés, souvent associés à une résistance à l'insuline ou un SOPK. Cette hyperandrogénie stimule excessivement les glandes sébacées.",
    skincareRecommendations: [
      "Nettoyant purifiant au zinc PCA pour réguler la production de sébum",
      "Sérum matifiant à la niacinamide (10%) + acide azélaïque pour contrôler brillance et inflammation",
      "Crème gel hydratante non-comédogène aux probiotiques pour maintenir l'équilibre"
    ],
    lifestyleBonus: "🍃 Thé vert à la menthe verte : 2 tasses/jour. La menthe verte réduit naturellement les androgènes libres, tandis que les catéchines du thé vert régulent l'insuline.",
    routineRecommendation: "Focus sur la régulation sans assécher. Hydrate toujours après avoir purifié pour éviter l'effet rebond. Intègre des actifs sébo-régulateurs progressivement.",
    colorTheme: "green"
  },
  "sèche_instable": {
    title: "La Sèche Instable",
    emoji: "🏜️",
    description: "Ta peau tiraille, manque d'hydratation et d'élasticité. Inconfort permanent, sensations de sécheresse, barrière cutanée fragilisée.",
    hormonalExplanation: "Tes œstrogènes sont probablement en baisse (pré-ménopause, post-pilule) ou tu présentes un déséquilibre thyroïdien. Ces hormones sont essentielles pour maintenir l'hydratation et l'élasticité cutanée.",
    skincareRecommendations: [
      "Sérum hydratant intensif à l'acide hyaluronique multi-poids moléculaire",
      "Crème barrière aux céramides, cholestérol et acides gras essentiels",
      "Huile visage nourrissante aux oméga 3-6-9 pour restaurer le film lipidique"
    ],
    lifestyleBonus: "🥑 Avocat quotidien : riche en bonnes graisses et vitamine E, il nourrit ta peau de l'intérieur et soutient la production d'hormones stéroïdiennes.",
    routineRecommendation: "Layering hydratant : eau thermale + sérum + crème + huile si besoin. Évite tous les actifs desséchants et privilégie la réparation intensive de ta barrière cutanée.",
    colorTheme: "orange"
  },
  "sensible_caméléon": {
    title: "La Sensible Caméléon",
    emoji: "🦋",
    description: "Ta peau change constamment : tantôt grasse, tantôt sèche, parfois réactive. Cette imprévisibilité rend difficile l'établissement d'une routine stable.",
    hormonalExplanation: "Tu présentes une sensibilité hormonale extrême avec des récepteurs cutanés hyperréactifs. Stress, cycle, environnement... tout impact tes hormones et se reflète immédiatement sur ta peau.",
    skincareRecommendations: [
      "Sérum adaptogène multi-fonctions : niacinamide + acide hyaluronique + antioxydants",
      "Crème modulable : texture légère hydratante que tu peux superposer selon tes besoins",
      "SOS kit : eau thermale + sérum apaisant pour les pics de sensibilité"
    ],
    lifestyleBonus: "📝 Journal peau-émotion : note quotidiennement l'état de ta peau et tes émotions/stress. Cela t'aidera à identifier tes déclencheurs et anticiper les besoins.",
    routineRecommendation: "Routine modulaire et évolutive. Base minimaliste stable + produits à ajuster selon l'état du jour. L'écoute de ta peau est primordiale.",
    colorTheme: "pink"
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
    routineRecommendation: "Continue avec une routine simple et préventive.",
    colorTheme: "pink"
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