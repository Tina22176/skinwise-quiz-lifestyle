import { QuizQuestion } from "./types";

export const skinAppearanceQuestions: QuizQuestion[] = [
  {
    id: "pores",
    question: "Comment décrirais-tu tes pores ?",
    options: [
      {
        value: "seche",
        label: "Pratiquement invisibles",
        description: "Caractéristique des peaux sèches avec peu de sébum"
      },
      {
        value: "mixte",
        label: "Visibles sur la zone T, discrets sur les joues",
        description: "Typique des peaux mixtes"
      },
      {
        value: "grasse",
        label: "Larges et visibles sur la majorité du visage",
        description: "Caractéristique des peaux à forte production de sébum"
      },
      {
        value: "normale",
        label: "Discrets et uniformes sur tout le visage",
        description: "Caractéristique des peaux équilibrées"
      }
    ]
  },
  {
    id: "imperfections",
    question: "As-tu tendance à avoir des imperfections ?",
    options: [
      {
        value: "seche",
        label: "Rarement ou jamais",
        description: "Les peaux sèches produisent peu de sébum"
      },
      {
        value: "mixte",
        label: "Occasionnellement sur la zone T, surtout avant les règles",
        description: "Imperfections localisées, souvent hormonales"
      },
      {
        value: "grasse",
        label: "Régulièrement, surtout des points noirs et comédons",
        description: "L'excès de sébum favorise les imperfections"
      },
      {
        value: "normale",
        label: "Occasionnellement, mais pas de problème majeur",
        description: "Les peaux normales ont peu d'imperfections"
      }
    ]
  },
  {
    id: "maquillage_journee",
    question: "Comment se comporte ton maquillage au cours de la journée ?",
    options: [
      {
        value: "seche",
        label: "A tendance à marquer les ridules ou zones sèches",
        description: "Le maquillage peut accentuer les zones déshydratées"
      },
      {
        value: "mixte",
        label: "Tient bien sur les joues mais peut glisser sur la zone T",
        description: "Tenue variable selon les zones du visage"
      },
      {
        value: "grasse",
        label: "A tendance à \"fondre\" ou devenir brillant rapidement",
        description: "L'excès de sébum peut altérer la tenue du maquillage"
      },
      {
        value: "normale",
        label: "Tient bien et reste naturel tout au long de la journée",
        description: "Les peaux normales offrent une bonne tenue du maquillage"
      }
    ]
  }
];
