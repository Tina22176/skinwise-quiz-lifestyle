import { QuizQuestion } from "./types";

export const hormonalQuestions: QuizQuestion[] = [
  {
    id: "age_range",
    display: "On commence doucement",
    question: "Tu as quel âge ?",
    options: [
      { value: "moins_25", label: "Moins de 25 ans", description: "" },
      { value: "25_34", label: "25–34 ans", description: "" },
      { value: "35_44", label: "35–44 ans", description: "" },
      { value: "45_plus", label: "45 ans et plus", description: "" },
      { value: "sans_reponse", label: "Je préfère ne pas répondre", description: "" }
    ]
  },
  {
    id: "skin_daily",
    display: "Choisis ce qui te gêne le plus, même si plusieurs réponses te ressemblent.",
    question: "Qu’est-ce qui décrit le mieux ta peau en ce moment ?",
    options: [
      { value: "brille", label: "« Je brille pour deux »", description: "Grasse, pores visibles" },
      { value: "soif", label: "« J'ai soif »", description: "Sèche, tiraillements, inconfort" },
      { value: "touche_pas", label: "« Touche-moi pas »", description: "Réactive, rougeurs, irritation" },
      { value: "indecise", label: "« Faut que je me décide »", description: "Mixte — grasse ici, sèche là" },
      { value: "changeante", label: "« Un jour ça va, le lendemain non »", description: "Changeante, imprévisible" },
      { value: "confortable", label: "« Tout va plutôt bien »", description: "Confortable, sans gêne particulière" }
    ]
  },
  {
    id: "boutons_pattern",
    display: "On en parle sans tabou.",
    question: "Quand tes boutons apparaissent-ils le plus souvent ?",
    options: [
      { value: "avant_regles", label: "Ils débarquent surtout avant mes règles", description: "" },
      { value: "permanents", label: "Ils sont là en permanence, fidèles au poste", description: "" },
      { value: "stress_fatigue", label: "Seulement quand je suis stressée ou fatiguée", description: "" },
      { value: "inconnu", label: "Je n’ai pas repéré de moment particulier", description: "" },
      { value: "pas_souci", label: "Franchement, pas trop de souci de ce côté", description: "" }
    ]
  },
  {
    id: "skin_stress",
    display: "Quand la pression monte…",
    question: "Ta peau fait quoi ?",
    options: [
      { value: "explose", label: "Elle explose (boutons, éruptions)", description: "" },
      { value: "rougit", label: "Elle rougit ou fait des plaques", description: "" },
      { value: "ternit", label: "Elle se ternit (teint gris, traits tirés)", description: "" },
      { value: "hypersensible", label: "Elle devient hypersensible au moindre produit", description: "" },
      { value: "rien", label: "Elle ne bronche pas trop", description: "" },
      { value: "inconnu", label: "Je ne sais pas, je n’ai pas observé de lien", description: "" }
    ]
  },
  {
    id: "cycle",
    display: "Pas de jugement, c'est entre nous.",
    question: "Quel est ton contexte de cycle aujourd’hui ?",
    options: [
      { value: "regulier", label: "J’ai des règles plutôt régulières, sans contraception hormonale", description: "" },
      { value: "irregulier", label: "J’ai des règles irrégulières, sans contraception hormonale", description: "" },
      { value: "contraceptif", label: "J’utilise une contraception hormonale", description: "Avec ou sans saignements" },
      { value: "plus_cycle", label: "Je n’ai pas de règles actuellement", description: "Ménopause, aménorrhée ou autre contexte" },
      { value: "sans_reponse", label: "Je préfère ne pas répondre", description: "" }
    ]
  },
  {
    id: "cycle_signals",
    display: "Avec ou sans règles, pars de ce que tu observes.",
    question: "As-tu remarqué des variations qui reviennent au fil du mois ?",
    options: [
      { value: "recurrent", label: "Oui, ma peau, mon énergie ou mon humeur suivent un rythme qui revient", description: "" },
      { value: "spm", label: "Surtout avant mes règles : humeur, douleurs ou fatigue", description: "" },
      { value: "non", label: "Non, pas de rythme particulier observé", description: "" },
      { value: "inconnu", label: "Je ne sais pas encore", description: "" },
      { value: "sans_reponse", label: "Je préfère ne pas répondre", description: "" }
    ]
  },
  {
    id: "energie",
    display: "Ton rythme compte aussi.",
    question: "Qu’est-ce qui pèse le plus sur ton énergie en ce moment ?",
    options: [
      { value: "fatiguee_reveil", label: "Je me réveille déjà fatiguée", description: "" },
      { value: "coups_barre", label: "J'ai des coups de barre dans la journée (14h, 17h…)", description: "" },
      { value: "speed", label: "Je suis speed non-stop, dur de ralentir", description: "" },
      { value: "stable", label: "Plutôt stable, ça va", description: "" },
      { value: "dort_mal", label: "Je dors mal (insomnies, réveils nocturnes)", description: "" },
      { value: "inconnu", label: "Difficile à dire en ce moment", description: "" }
    ]
  },
  {
    id: "routine",
    display: "Quelques repères sur tes habitudes.",
    question: "Quelle situation décrit le mieux ta routine actuelle ?",
    options: [
      { value: "accumule_change", label: "J’accumule les produits ou je change souvent de routine", description: "J’ai du mal à savoir quoi garder" },
      { value: "simple_stable", label: "J’utilise peu de produits et ma routine est stable", description: "" },
      { value: "sans_routine", label: "Je n’ai pas encore de routine régulière", description: "" },
      { value: "inconnu", label: "Je ne sais pas bien comment la décrire", description: "" }
    ]
  },
  {
    id: "primary_goal",
    display: "On passe à ce dont tu as vraiment besoin.",
    question: "Aujourd'hui, tu aimerais surtout…",
    options: [
      { value: "simplifier", label: "Simplifier rapidement ma routine", description: "Retrouver des bases claires sans me surcharger" },
      { value: "stabiliser", label: "Observer et stabiliser ma routine", description: "Comprendre ses réactions et construire une routine durable" },
      { value: "comprendre_cycle", label: "Comprendre le lien peau, cycle et énergie", description: "Anticiper mes variations au lieu de les subir" }
    ]
  },
  {
    id: "support_level",
    display: "Dernière question, promis.",
    question: "Quel format de programme digital te conviendrait le mieux ?",
    options: [
      { value: "declic", label: "Un déclic simple sur quelques jours", description: "Je veux commencer léger" },
      { value: "mois", label: "Un cadre guidé pendant un mois", description: "J'ai besoin d'une vraie remise à plat" },
      { value: "plusieurs_cycles", label: "Un suivi dans la durée, par abonnement", description: "Je veux observer ce qui revient au fil des semaines et des cycles" }
    ]
  }
];
