import { QuizQuestion } from "./types";

export const skinStateQuestions: QuizQuestion[] = [
  {
    id: "nouveaux_produits",
    question: "Comment réagit ta peau face aux nouveaux produits ?",
    options: [
      {
        value: "sensible",
        label: "Souvent des rougeurs, picotements ou réactions",
        description: "Ta peau est réactive aux nouveaux ingrédients"
      },
      {
        value: "normal",
        label: "Généralement bien, quelques ajustements parfois",
        description: "Ta peau tolère bien la plupart des produits"
      }
    ]
  },
  {
    id: "sensation_inconfort",
    question: "Ressens-tu souvent des sensations d'inconfort cutané ?",
    options: [
      {
        value: "sensible",
        label: "Souvent des picotements, brûlures ou démangeaisons",
        description: "Les sensations d'inconfort sont fréquentes"
      },
      {
        value: "normal",
        label: "Rarement, ma peau est généralement confortable",
        description: "Les sensations d'inconfort sont rares"
      }
    ]
  }
];
