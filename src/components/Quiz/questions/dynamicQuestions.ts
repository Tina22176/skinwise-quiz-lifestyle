// Questions dynamiques pour le quiz
export const dynamicQuestions = [
  {
    id: "sensible_detail",
    question: "Peux-tu préciser ce qui déclenche ta sensibilité ?",
    options: [
      { value: "froid", label: "Le froid ou le vent" },
      { value: "produits", label: "Certains produits cosmétiques" },
      { value: "stress", label: "Le stress ou la fatigue" },
      { value: "autre", label: "Autre" }
    ]
  },
  {
    id: "mixte_detail",
    question: "Ta zone T est-elle grasse toute la journée ou seulement le matin ?",
    options: [
      { value: "toute_journee", label: "Toute la journée" },
      { value: "matin", label: "Surtout le matin" },
      { value: "jamais", label: "Jamais" }
    ]
  }
]; 