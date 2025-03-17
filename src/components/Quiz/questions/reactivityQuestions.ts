
import { QuizQuestion } from "./types";

export const reactivityQuestions: QuizQuestion[] = [
  {
    id: "reaction_soleil",
    question: "Comment réagit ta peau face au soleil ?",
    options: [
      {
        value: "seche",
        label: "Rougit facilement, brûle souvent, se dessèche",
        description: "Les peaux sèches sont souvent plus sensibles au soleil"
      },
      {
        value: "mixte",
        label: "Bronze progressivement, peut brûler si exposition prolongée",
        description: "Réaction équilibrée au soleil"
      },
      {
        value: "grasse",
        label: "Bronze facilement, brûle rarement",
        description: "Les peaux grasses ont souvent une meilleure tolérance au soleil"
      },
      {
        value: "sensible",
        label: "Réaction imprévisible, souvent avec des rougeurs ou éruptions",
        description: "Les peaux sensibles réagissent fortement aux UV"
      }
    ]
  },
  {
    id: "nouveaux_produits",
    question: "Comment ta peau réagit-elle aux nouveaux produits ?",
    options: [
      {
        value: "seche",
        label: "Peut se déshydrater davantage si le produit n'est pas assez nourrissant",
        description: "Les peaux sèches requièrent des produits riches"
      },
      {
        value: "mixte",
        label: "Généralement bien, sauf si le produit est trop riche pour ma zone T",
        description: "Réaction variable selon les zones du visage"
      },
      {
        value: "grasse",
        label: "Peut devenir plus grasse ou développer des imperfections si le produit est trop riche",
        description: "L'excès de sébum peut s'aggraver avec des produits trop riches"
      },
      {
        value: "sensible",
        label: "Souvent par des rougeurs, démangeaisons ou irritations",
        description: "Forte réactivité aux ingrédients nouveaux"
      }
    ]
  }
];
