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
    id: "tiraillements_frequents",
    question: "Ressens-tu des tiraillements après le nettoyage ?",
    options: [
      {
        value: "seche",
        label: "Immédiatement et intensément",
        description: "Tiraillements forts caractéristiques des peaux sèches"
      },
      {
        value: "mixte", 
        label: "Sur certaines zones seulement",
        description: "Tiraillements localisés sur les zones sèches"
      },
      {
        value: "grasse",
        label: "Rarement ou jamais",
        description: "Les peaux grasses ne tiraillent généralement pas"
      },
      {
        value: "normale",
        label: "Très légers et temporaires",
        description: "Sensations minimales et passagères"
      }
    ]
  }
];
