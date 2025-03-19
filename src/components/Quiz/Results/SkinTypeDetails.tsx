
interface SkinTypeDetail {
  description: string;
  characteristics: string[];
  factors: string[];
  routineRecommendation: string;
}

export const getSkinTypeText = (skinType: string) => {
  const texts: Record<string, string> = {
    "combination": "Mixte",
    "dry": "Sèche",
    "oily": "Grasse",
    "sensitive": "Sensible",
    "normal": "Normale"
  };
  return texts[skinType] || texts["normal"];
};

export const getSkinTypeDetails = (skinType: string): SkinTypeDetail => {
  const details: Record<string, SkinTypeDetail> = {
    "combination": {
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
    "sensitive": {
      description: "Ta peau réagit facilement aux stimuli externes (climat, produits, stress) par des rougeurs, irritations ou inconfort.",
      characteristics: [
        "Réactivité cutanée aux stimuli externes",
        "Rougeurs fréquentes ou permanentes",
        "Sensations d'inconfort (picotements, tiraillements)"
      ],
      factors: [
        "Barrière cutanée fragilisée",
        "Réactivité aux ingrédients cosmétiques",
        "Facteurs environnementaux et stress"
      ],
      routineRecommendation: "Ta routine devra être particulièrement douce avec des actifs apaisants, en introduisant progressivement les actifs plus puissants en petites quantités."
    },
    "normal": {
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
