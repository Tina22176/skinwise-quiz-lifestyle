
import { QuizQuestion } from "./types";

export const preferenceQuestions: QuizQuestion[] = [
  {
    id: "souci_principal",
    question: "Quel est ton principal souci de peau ?",
    options: [
      {
        value: "seche",
        label: "Manque d'éclat, tiraillements, ridules de déshydratation",
        description: "Problématiques liées au manque d'hydratation"
      },
      {
        value: "mixte",
        label: "Gérer l'équilibre entre zones grasses et zones sèches",
        description: "Difficulté à équilibrer les différentes zones"
      },
      {
        value: "grasse",
        label: "Excès de sébum, brillance, imperfections",
        description: "Problématiques liées à l'excès de sébum"
      },
      {
        value: "sensible",
        label: "Rougeurs, réactivité, intolérances à certains ingrédients",
        description: "Problématiques liées à la sensibilité cutanée"
      }
    ]
  },
  {
    id: "texture_creme",
    question: "Quelle texture de crème préfères-tu instinctivement ?",
    options: [
      {
        value: "seche",
        label: "Riche et nourrissante",
        description: "Les textures riches conviennent aux peaux déshydratées"
      },
      {
        value: "mixte",
        label: "Légère sur la zone T, plus riche sur les joues",
        description: "Préférence pour des textures adaptées selon les zones"
      },
      {
        value: "grasse",
        label: "Très légère, gel ou fluide",
        description: "Les textures légères évitent de surcharger les peaux grasses"
      },
      {
        value: "sensible",
        label: "Sans parfum, hypoallergénique, apaisante",
        description: "Les formules minimalistes conviennent aux peaux réactives"
      }
    ]
  }
];
