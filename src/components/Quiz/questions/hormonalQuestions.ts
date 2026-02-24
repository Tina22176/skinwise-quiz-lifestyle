import { QuizQuestion } from "./types";

export const hormonalQuestions: QuizQuestion[] = [
  {
    id: "age_range",
    question: "On commence doucement 😊",
    subtitle: "Tu as quel âge ?",
    options: [
      { value: "moins_25", label: "Moins de 25 ans", description: "" },
      { value: "25_34", label: "25–34 ans", description: "" },
      { value: "35_44", label: "35–44 ans", description: "" },
      { value: "45_plus", label: "45 ans et plus", description: "" }
    ]
  },
  {
    id: "skin_daily",
    question: "Si ta peau pouvait parler, elle dirait plutôt…",
    subtitle: "Ta peau au quotidien ?",
    options: [
      { value: "brille", label: "« Je brille pour deux »", description: "Grasse, pores visibles" },
      { value: "soif", label: "« J'ai soif »", description: "Sèche, tiraillements, inconfort" },
      { value: "touche_pas", label: "« Touche-moi pas »", description: "Réactive, rougeurs, irritation" },
      { value: "indecise", label: "« Faut que je me décide »", description: "Mixte — grasse ici, sèche là" },
      { value: "changeante", label: "« Un jour ça va, le lendemain non »", description: "Changeante, imprévisible" }
    ]
  },
  {
    id: "boutons_pattern",
    question: "On en parle sans tabou.",
    subtitle: "Tes boutons, c'est quoi le schéma ?",
    options: [
      { value: "avant_regles", label: "Ils débarquent surtout avant mes règles", description: "" },
      { value: "permanents", label: "Ils sont là en permanence, fidèles au poste", description: "" },
      { value: "stress_fatigue", label: "Seulement quand je suis stressée ou fatiguée", description: "" },
      { value: "microkystes", label: "Des microkystes sous la peau, surtout mâchoire/menton", description: "" },
      { value: "pas_souci", label: "Franchement, pas trop de souci de ce côté", description: "" }
    ]
  },
  {
    id: "skin_stress",
    question: "Quand la pression monte, ta peau fait quoi ?",
    subtitle: "Ta peau et le stress",
    options: [
      { value: "explose", label: "Elle explose (boutons, éruptions)", description: "" },
      { value: "rougit", label: "Elle rougit ou fait des plaques", description: "" },
      { value: "ternit", label: "Elle se ternit (teint gris, traits tirés)", description: "" },
      { value: "hypersensible", label: "Elle devient hypersensible au moindre produit", description: "" },
      { value: "rien", label: "Elle ne bronche pas trop", description: "" }
    ]
  },
  {
    id: "cycle",
    question: "Pas de jugement, c'est entre nous.",
    subtitle: "Ton cycle, il te complique la vie ?",
    options: [
      { value: "regulier", label: "Non, il est régulier et tranquille", description: "" },
      { value: "irregulier", label: "Oui, il est irrégulier ou imprévisible", description: "" },
      { value: "spm", label: "Oui, j'ai un SPM costaud (humeur, douleurs, fatigue)", description: "" },
      { value: "contraceptif", label: "Je prends un contraceptif hormonal", description: "" },
      { value: "plus_cycle", label: "Je n'ai plus de cycle (ménopause, aménorrhée, autre)", description: "" }
    ]
  },
  {
    id: "energie",
    question: "Dernière question, promis.",
    subtitle: "Ton énergie en ce moment",
    options: [
      { value: "fatiguee_reveil", label: "Je me réveille déjà fatiguée", description: "" },
      { value: "coups_barre", label: "J'ai des coups de barre dans la journée (14h, 17h…)", description: "" },
      { value: "speed", label: "Je suis speed non-stop, dur de ralentir", description: "" },
      { value: "stable", label: "Plutôt stable, ça va", description: "" },
      { value: "dort_mal", label: "Je dors mal (insomnies, réveils nocturnes)", description: "" }
    ]
  }
];
