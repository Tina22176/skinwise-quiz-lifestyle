
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
        value: "sensible",
        label: "Rougeurs, picotements ou sensations de brûlure",
        description: "Ta peau réagit facilement aux stimuli externes"
      }
    ]
  },
  {
    id: "fin_journee",
    question: "Après une journée complète, comment se sent ta peau ?",
    options: [
      {
        value: "seche",
        label: "Encore plus sèche, parfois des squames (peaux mortes) sont visibles",
        description: "Le manque d'hydratation s'accentue durant la journée"
      },
      {
        value: "mixte",
        label: "Légèrement brillante sur la zone T, normale à sèche sur les joues",
        description: "Contraste entre différentes zones du visage"
      },
      {
        value: "grasse",
        label: "Très brillante, nécessite souvent de tamponner l'excès de sébum",
        description: "Production excessive de sébum au cours de la journée"
      },
      {
        value: "sensible",
        label: "Inconfortable, tendue ou irritée par moments",
        description: "Réactions cutanées qui évoluent durant la journée"
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
        value: "sensible",
        label: "Souvent des picotements, brûlures ou démangeaisons",
        description: "Les sensations d'inconfort sont fréquentes sur peaux sensibles"
      }
    ]
  }
];
