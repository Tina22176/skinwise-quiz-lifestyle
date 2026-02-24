

# Plan : Corrections visuelles pour correspondre aux screenshots

Plusieurs ecarts entre l'app et les screenshots de reference. Voici les corrections.

---

## Ecarts identifies

### 1. Logo "Majoliepeau" : italic, pas bold
Dans les screenshots, le logo est en *italique* (Cormorant Garamond italic). Le code actuel utilise `font-bold`.

### 2. Display text : centre et en rose
Le petit texte emotionnel ("Si ta peau pouvait parler...") doit etre :
- **Centre** (pas text-left)
- **Couleur rose** (`#D4649A` / text-primary), pas gris `#9B8FA3`

### 3. Titre question : centre et plus grand
Le titre principal ("Elle dirait plutot...") doit etre :
- **Centre** (pas text-left)
- Cormorant Garamond, plus grand, style elegant

### 4. Structure des donnees des questions
Le mockup separe les textes differemment de nos champs actuels. Par exemple pour la question 2 :
- Mockup : display = "Si ta peau pouvait parler...", question = "Elle dirait plutot..."
- Code actuel : question = "Si ta peau pouvait parler, elle dirait plutot...", subtitle = "Ta peau au quotidien ?"

Il faut ajouter un champ `display` aux questions et reorganiser les textes pour coller au mockup.

### 5. Options : fond degrade rose
Les options dans le screenshot montrent un fond avec un leger degrade rose vers le bas de la page (pas un fond blanc pur).

---

## Fichiers a modifier

### 1. `src/pages/Index.tsx`
- Logo : changer `font-bold` en `italic` (retirer le gras, ajouter l'italique)

### 2. `src/components/Quiz/questions/types.ts`
- Ajouter le champ optionnel `display?: string` a l'interface `QuizQuestion`

### 3. `src/components/Quiz/questions/hormonalQuestions.ts`
- Ajouter le champ `display` a chaque question avec le texte emotionnel du mockup :
  - Q1 : display = "On commence doucement", question = "Tu as quel age ?"
  - Q2 : display = "Si ta peau pouvait parler...", question = "Elle dirait plutot..."
  - Q3 : display = "On en parle sans tabou.", question = "Tes boutons, c'est quoi le schema ?"
  - Q4 : display = "Quand la pression monte...", question = "Ta peau fait quoi ?"
  - Q5 : display = "Pas de jugement, c'est entre nous.", question = "Ton cycle, il te complique la vie ?"
  - Q6 : display = "Derniere question, promis", question = "Ton energie en ce moment ?"

### 4. `src/components/Quiz/EnhancedQuizQuestion.tsx`
- Changer `text-left` en `text-center` pour le bloc question
- Afficher `currentQuestion.display` (si present) comme petit texte rose centre : `text-[15px] italic text-primary text-center`
- Afficher `currentQuestion.question` comme titre principal : `font-heading text-[22px] lg:text-[26px] font-bold text-center`
- Ne plus utiliser `subtitle` pour l'affichage (ou l'utiliser en fallback)

### 5. `src/components/Quiz/EnhancedAnswerOption.tsx`
- Changer le fond par defaut des options de `#FFFFFF` (blanc pur) a un leger degrade rose : `linear-gradient(180deg, #FFFFFF 0%, #FDF2F7 100%)` pour reproduire l'aspect des screenshots

---

## Resume

| Fichier | Changement |
|---------|------------|
| `Index.tsx` | Logo : italic au lieu de bold |
| `types.ts` | Ajouter champ `display?: string` |
| `hormonalQuestions.ts` | Ajouter `display` + reorganiser question/subtitle |
| `EnhancedQuizQuestion.tsx` | text-center + display en rose + question comme titre |
| `EnhancedAnswerOption.tsx` | Fond options avec degrade rose subtil |

Aucun changement sur la logique quiz, les animations, ou Brevo.

