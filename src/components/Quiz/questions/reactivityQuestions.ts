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
        value: "normale",
        label: "Bronze progressivement et de manière uniforme",
        description: "Les peaux normales ont une bonne tolérance au soleil"
      }
    ]
  }
];
