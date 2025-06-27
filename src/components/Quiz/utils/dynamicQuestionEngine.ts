// Moteur de questions dynamiques pour le quiz
export class DynamicQuestionEngine {
  private baseQuestions: any[];
  private userAnswers: Record<string, string>;

  constructor(baseQuestions: any[], userAnswers: Record<string, string>) {
    this.baseQuestions = baseQuestions;
    this.userAnswers = userAnswers;
  }

  // Génère la liste des questions à poser selon les réponses
  generateQuestions(): any[] {
    let questions = [...this.baseQuestions];

    // Exemple : si la personne répond "sensible", on ajoute une question spécifique
    if (this.userAnswers["sensation_apres_nettoyage"] === "sensible" || this.userAnswers["nouveaux_produits"] === "sensible") {
      questions.push({
        id: "sensible_detail",
        question: "Peux-tu préciser ce qui déclenche ta sensibilité ?",
        options: [
          { value: "froid", label: "Le froid ou le vent" },
          { value: "produits", label: "Certains produits cosmétiques" },
          { value: "stress", label: "Le stress ou la fatigue" },
          { value: "autre", label: "Autre" }
        ]
      });
    }

    // Exemple : approfondir la mixité
    if (this.userAnswers["sensation_apres_nettoyage"] === "mixte") {
      questions.push({
        id: "mixte_detail",
        question: "Ta zone T est-elle grasse toute la journée ou seulement le matin ?",
        options: [
          { value: "toute_journee", label: "Toute la journée" },
          { value: "matin", label: "Surtout le matin" },
          { value: "jamais", label: "Jamais" }
        ]
      });
    }

    // On peut ajouter d'autres règles dynamiques ici

    return questions;
  }
} 