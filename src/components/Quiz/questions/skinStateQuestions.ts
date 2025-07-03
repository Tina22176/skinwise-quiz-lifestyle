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
  },
  {
    id: "rougeurs_frequentes",
    question: "As-tu souvent des rougeurs sur le visage ?",
    options: [
      {
        value: "sensible",
        label: "Oui, souvent après le nettoyage ou l'application de produits",
        description: "Les rougeurs sont fréquentes et réactives"
      },
      {
        value: "normal",
        label: "Rarement, seulement en cas d'irritation ponctuelle",
        description: "Les rougeurs sont rares et ponctuelles"
      }
    ]
  },
  {
    id: "reaction_environnement",
    question: "Ta peau réagit-elle aux changements d'environnement ?",
    options: [
      {
        value: "sensible",
        label: "Oui, au froid, au chaud, au vent ou à la pollution",
        description: "Ta peau est sensible aux facteurs environnementaux"
      },
      {
        value: "normal",
        label: "Non, ma peau reste stable dans différents environnements",
        description: "Ta peau est stable face aux changements"
      }
    ]
  }
];
