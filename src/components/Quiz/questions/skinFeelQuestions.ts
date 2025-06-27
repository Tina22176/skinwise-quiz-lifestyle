import { QuizQuestion } from "./types";

export const skinFeelQuestions: QuizQuestion[] = [
  {
    id: "sensation_apres_nettoyage",
    question: "Comment se sent ta peau 2 heures après l'avoir nettoyée (sans appliquer de produits) ?",
    options: [
      {
        value: "seche",
        label: "Tiraillements, sensation d'inconfort et de sécheresse",
        description: "Ta peau manque d'hydratation"
      },
      {
        value: "mixte",
        label: "Brillance sur la zone T (front, nez, menton), normale ailleurs",
        description: "Ta peau présente deux comportements différents"
      },
      {
        value: "grasse",
        label: "Brillante et luisante sur tout le visage",
        description: "Ta peau produit un excès de sébum"
      },
      {
        value: "normale",
        label: "Confortable, ni sèche ni grasse",
        description: "Ta peau a un équilibre optimal"
      }
    ]
  },
  {
    id: "fin_journee",
    question: "Comment se sent ta peau en fin de journée ?",
    options: [
      {
        value: "seche",
        label: "Tiraillements, sensation de sécheresse",
        description: "Ta peau manque d'hydratation"
      },
      {
        value: "mixte",
        label: "Brillance sur la zone T, normale sur les joues",
        description: "Ta peau présente des zones différentes"
      },
      {
        value: "grasse",
        label: "Brillante et grasse sur tout le visage",
        description: "Ta peau produit beaucoup de sébum"
      },
      {
        value: "normale",
        label: "Confortable, équilibre maintenu",
        description: "Ta peau garde son équilibre naturel"
      }
    ]
  },
  {
    id: "sensation_inconfort",
    question: "Ressens-tu souvent des sensations d'inconfort cutané ?",
    options: [
      {
        value: "seche",
        label: "Sensation de tiraillement fréquente",
        description: "Les tiraillements sont typiques des peaux déshydratées"
      },
      {
        value: "mixte",
        label: "Parfois des inconforts sur certaines zones, pas sur d'autres",
        description: "Sensations variables selon les zones du visage"
      },
      {
        value: "grasse",
        label: "Rarement, sauf si ma peau est trop nettoyée",
        description: "Les peaux grasses tolèrent bien la plupart des produits"
      },
      {
        value: "normale",
        label: "Rarement, ma peau est généralement confortable",
        description: "Les peaux normales sont rarement inconfortables"
      }
    ]
  }
];
