

# Plan : Sous-titres manquants + Bouton retour

## Probleme 1 — Sous-titres manquants

Actuellement le type `QuizQuestion` n'a qu'un seul champ `question` qui sert de titre d'affichage (la phrase conversationnelle). Mais la spec prevoit **deux lignes** :
- **display** : phrase conversationnelle ("On commence doucement", "On en parle sans tabou.")
- **subtitle** : la vraie question ("Tu as quel age ?", "Tes boutons, c'est quoi le schema ?")

Sans le sous-titre, certaines questions n'ont aucun sens (ex: "On en parle sans tabou." suivi directement des reponses sur les boutons).

### Correspondance spec :

| Question | Display (actuel `question`) | Subtitle (manquant) |
|----------|---------------------------|---------------------|
| Q1 age | "On commence doucement" | "Tu as quel age ?" |
| Q2 skin | "Si ta peau pouvait parler..." | "Ta peau au quotidien ?" |
| Q3 boutons | "On en parle sans tabou." | "Tes boutons, c'est quoi le schema ?" |
| Q4 stress | "Quand la pression monte..." | "Ta peau et le stress" |
| Q5 cycle | "Pas de jugement, c'est entre nous." | "Ton cycle, il te complique la vie ?" |
| Q6 energie | "Derniere question, promis." | "Ton energie en ce moment" |

### Modifications :

**Fichier `src/components/Quiz/questions/types.ts`**
- Ajouter un champ optionnel `subtitle?: string` au type `QuizQuestion`

**Fichier `src/components/Quiz/questions/hormonalQuestions.ts`**
- Ajouter le `subtitle` a chaque question

**Fichier `src/components/Quiz/EnhancedQuizQuestion.tsx`**
- Afficher le `subtitle` sous le titre principal (en texte plus petit, style `text-muted-foreground`)

---

## Probleme 2 — Bouton retour a la question precedente

Actuellement il n'y a **aucun moyen** de revenir en arriere. L'auto-avance apres selection (800ms + 400ms) rend impossible la correction d'une erreur.

### Modifications :

**Fichier `src/components/Quiz/types/quizTypes.ts`**
- Ajouter l'action `PREV_QUESTION` au type `QuizAction`

**Fichier `src/components/Quiz/reducers/quizReducer.ts`**
- Ajouter le case `PREV_QUESTION` qui decremente `currentQuestion` (minimum 0)

**Fichier `src/components/Quiz/EnhancedQuizQuestion.tsx`**
- Ajouter un bouton "Retour" (fleche gauche + texte) en haut a gauche, visible uniquement si `currentQuestion > 0`
- Au clic : `dispatch({ type: "PREV_QUESTION" })` et reset de `selectedAnswer`

---

## Details techniques

### Type mis a jour

```text
QuizQuestion {
  id: string
  question: string       // phrase conversationnelle (display)
  subtitle?: string      // vraie question explicative
  options: QuizOption[]
}
```

### Bouton retour — placement

```text
+----------------------------------------------+
|  <- Retour          Question 3/6        75%  |
|  ============ barre progression ============ |
|                                              |
|       "On en parle sans tabou."              |
|    "Tes boutons, c'est quoi le schema ?"     |
|                                              |
|  [ Option 1 ]                                |
|  [ Option 2 ]                                |
|  [ Option 3 ]                                |
+----------------------------------------------+
```

Le bouton retour est discret (icone + texte petit) et n'apparait pas sur la premiere question.

### Fichiers modifies (5 fichiers)

1. `src/components/Quiz/questions/types.ts` — ajout `subtitle`
2. `src/components/Quiz/questions/hormonalQuestions.ts` — ajout des sous-titres
3. `src/components/Quiz/EnhancedQuizQuestion.tsx` — affichage subtitle + bouton retour
4. `src/components/Quiz/types/quizTypes.ts` — ajout action `PREV_QUESTION`
5. `src/components/Quiz/reducers/quizReducer.ts` — handler `PREV_QUESTION`

