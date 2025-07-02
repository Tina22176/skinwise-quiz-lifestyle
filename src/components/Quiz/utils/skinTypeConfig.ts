import { QuestionWeight } from './skinTypes';

// Pondération des questions par importance
export const QUESTION_WEIGHTS: QuestionWeight[] = [
  // Questions primaires (poids élevé) - Type de peau
  { questionId: "sensation_apres_nettoyage", weight: 3.0, category: 'primary' },
  { questionId: "fin_journee", weight: 2.5, category: 'primary' },
  { questionId: "pores", weight: 2.0, category: 'primary' },
  { questionId: "imperfections", weight: 2.0, category: 'primary' },
  
  // Questions secondaires (poids moyen) - Type de peau
  { questionId: "reaction_soleil", weight: 1.5, category: 'secondary' },
  { questionId: "souci_principal", weight: 1.5, category: 'secondary' },
  { questionId: "texture_creme", weight: 1.2, category: 'secondary' },
  { questionId: "tiraillements_frequents", weight: 1.0, category: 'secondary' },
  
  // Questions d'état (poids élevé) - Sensibilité
  { questionId: "nouveaux_produits", weight: 2.0, category: 'state' },
  { questionId: "sensation_inconfort", weight: 1.8, category: 'state' },
  
  // Questions de validation (poids faible)
  { questionId: "maquillage_journee", weight: 0.8, category: 'validation' }
];

// Mapping des réponses vers les types de peau avec scores (sans sensible)
export const ANSWER_MAPPING: Record<string, Record<string, number>> = {
  "sensation_apres_nettoyage": {
    "seche": 3, "mixte": 1, "grasse": 0, "normale": 1
  },
  "fin_journee": {
    "seche": 3, "mixte": 1, "grasse": 0, "normale": 1
  },
  "tiraillements_frequents": {
    "seche": 3, "mixte": 1, "grasse": 0, "normale": 1
  },
  "pores": {
    "seche": 0, "mixte": 2, "grasse": 3, "normale": 1
  },
  "imperfections": {
    "seche": 1, "mixte": 2, "grasse": 3, "normale": 1
  },
  "reaction_soleil": {
    "seche": 2, "mixte": 1, "grasse": 0, "normale": 1
  },
  "souci_principal": {
    "seche": 3, "mixte": 2, "grasse": 1, "normale": 1
  },
  "texture_creme": {
    "seche": 3, "mixte": 2, "grasse": 0, "normale": 1
  },
  "maquillage_journee": {
    "seche": 2, "mixte": 1, "grasse": 0, "normale": 1
  }
};

// Mapping des réponses vers les états de peau
export const STATE_MAPPING: Record<string, Record<string, number>> = {
  "nouveaux_produits": {
    "sensible": 3, "normal": 1
  },
  "sensation_inconfort": {
    "sensible": 3, "normal": 1
  },
  // Ajout d'une question de validation pour la sensibilité
  "tiraillements_frequents": {
    "sensible": 1, "normal": 2 // Tiraillements peuvent indiquer sensibilité
  }
};

// Caractéristiques par type de peau
export const SKIN_CHARACTERISTICS: Record<string, string[]> = {
  "dry": [
    "Tiraillements fréquents",
    "Sensation de sécheresse",
    "Desquamation possible",
    "Rides plus visibles",
    "Texture rugueuse"
  ],
  "combination": [
    "Zone T brillante",
    "Joues normales à sèches",
    "Pores visibles sur le nez",
    "Contraste entre zones",
    "Imperfections localisées"
  ],
  "oily": [
    "Brillance excessive",
    "Pores dilatés",
    "Imperfections fréquentes",
    "Texture épaisse",
    "Sébum abondant"
  ],
  "normal": [
    "Équilibre optimal",
    "Texture lisse",
    "Pores discrets",
    "Hydratation équilibrée",
    "Peu d'imperfections"
  ]
};

// Caractéristiques par état de peau
export const SKIN_STATE_CHARACTERISTICS: Record<string, string[]> = {
  "sensitive": [
    "Réactions cutanées",
    "Rougeurs fréquentes",
    "Sensations d'inconfort",
    "Intolérance aux produits",
    "Réactivité aux stimuli"
  ]
};

// Préoccupations par type de peau
export const SKIN_CONCERNS: Record<string, string[]> = {
  "dry": [
    "Hydratation insuffisante",
    "Perte d'élasticité",
    "Apparition de rides",
    "Desquamation",
    "Sensations d'inconfort"
  ],
  "combination": [
    "Gestion des zones mixtes",
    "Équilibre hydratation/séborégulation",
    "Imperfections localisées",
    "Contraste entre zones",
    "Routine adaptée"
  ],
  "oily": [
    "Contrôle du sébum",
    "Imperfections",
    "Pores dilatés",
    "Brillance excessive",
    "Texture irrégulière"
  ],
  "normal": [
    "Maintien de l'équilibre",
    "Prévention du vieillissement",
    "Protection solaire",
    "Préservation de la texture",
    "Équilibre hydratation"
  ]
};

// Préoccupations par état de peau
export const SKIN_STATE_CONCERNS: Record<string, string[]> = {
  "sensitive": [
    "Réactivité cutanée",
    "Rougeurs",
    "Intolérance aux produits",
    "Sensations d'inconfort",
    "Barrière cutanée fragile"
  ]
};