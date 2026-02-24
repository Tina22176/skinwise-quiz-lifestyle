

# Refonte visuelle complete -- Du "tons sur tons" au premium moderne

## Diagnostic visuel (captures prises)

Voici ce que j'ai constate sur chaque ecran :

### Accueil (Welcome)
- Fond quasi-blanc, cartes blanches, header blanc = tout se fond
- Le rose actuel (`hsl(330 55% 52%)` = `#C44B85`) tire vers le **bordeaux/framboise**, pas un vrai rose frais
- Le badge "Diagnostic gratuit" est bien contraste mais le reste est plat
- L'image placeholder coeur disparait avant le chargement
- Aucune section ne se distingue visuellement d'une autre

### Quiz (Questions)
- Fond blanc, cartes blanches, header blanc = zero separation
- Les options sont des rectangles blancs avec bordure gris clair = plat
- L'emoji dans le titre (😊) melange avec les icones Lucide = pas pro
- Le texte "Question 1/6" et "17%" sont en gris trop clair
- Pas de distinction visuelle entre la zone de progression et la zone de contenu

### Email Capture
- Grand espace vide en haut (le gradient est invisible)
- L'emoji ✨ jaune claque avec la palette rose = incoherent
- Les inputs n'ont quasiment pas de bordure visible

### Resultats
- Cards blanches sur fond blanc = aucun relief
- L'emoji 🌙 dans le titre melange avec l'icone SVG = double emploi
- La section "Pour aller plus loin" (gradient lilas/rose) est la seule zone qui sort du lot
- Les coches "✓" sont du texte brut, pas des icones

---

## Causes racines

| Probleme | Cause technique |
|----------|----------------|
| Rose = bordeaux | `hsl(330 55% 52%)` a trop de saturation basse et pas assez de luminosite. Un "vrai rose" = `hsl(340 65% 58%)` (#D4649A) |
| Tout blanc | `--background: 330 20% 98%` = quasi-blanc. `--card: 0 0% 100%` = blanc pur. Aucune differenciation |
| Pas de profondeur | Les cards ont `shadow-md` mais le fond est identique donc invisible |
| Emojis + icones | Melange de 😊✨🌙💌 avec des icones Lucide SVG = incoherent, pas premium |
| Header invisible | Glass effect sur fond blanc = transparent sur transparent |

---

## Solution en 3 axes

### Axe 1 — Palette corrigee (vrai rose + surfaces differenciees)

**Tokens CSS (`src/index.css`)** :

```text
Actuel                              Nouveau
--primary: 330 55% 52%        -->   340 65% 58%    (#D4649A — vrai rose, pas bordeaux)
--background: 330 20% 98%    -->   330 15% 97%    (un poil plus chaud)
--card: 0 0% 100%            -->   330 20% 99.5%  (blanc casse, pas blanc pur)
--muted: 290 12% 92%         -->   330 18% 94%    (rose-grise, pas violet-gris)
--border: 280 15% 90%        -->   330 15% 88%    (plus visible, ton rose)
```

Et dans **tailwind.config.ts**, ajuster `primary-hover` a `#C45589` (plus fonce que le nouveau rose).

### Axe 2 — Suppression emojis, coherence icones

**Supprimer tous les emojis** et les remplacer par des icones Lucide ou rien :

| Fichier | Emoji actuel | Remplacement |
|---------|-------------|--------------|
| `hormonalQuestions.ts` | 😊 dans les titres | Supprimer (le titre suffit) |
| `EmailCaptureScreen.tsx` | ✨ (div text-5xl) | Icone `Sparkles` de Lucide, en `text-primary` |
| `SimpleHormoneResults.tsx` | Emoji dans `{profile.emoji}` | Supprimer du titre, garder uniquement l'icone SVG `HormoneIcon` |
| `SimpleHormoneResults.tsx` | ✓ texte brut | Icone `Check` de Lucide |
| `SimpleHormoneResults.tsx` | 💌 dans le texte | Supprimer |
| `ResultsLoading.tsx` | ✨ dans le texte | Supprimer (l'icone Sparkles est deja la) |

### Axe 3 — Hierarchie visuelle & profondeur

**Header (`Index.tsx`)** :
- Fond : `bg-white/95 backdrop-blur-lg` avec une **bordure basse plus visible** (`border-rose-soft/40`)
- Le header doit se distinguer du contenu

**Welcome (`Welcome.tsx`)** :
- Ajouter un fond subtil derriere la zone de contenu : une card avec `bg-white rounded-2xl shadow-lg p-8` pour creer une zone delimitee au centre
- Ou bien : un fond de section legerement plus sombre (`bg-rose-whisper/30`) pour delimiter

**Quiz questions (`EnhancedQuizQuestion.tsx`)** :
- Le titre principal en `text-foreground` (pas violet-deep qui est trop sombre quand le fond est clair)
- Les options : ajouter un **left-border accent** au hover (`border-l-4 border-primary`) pour donner du caractere
- Separer visuellement la barre de progression du contenu avec un `border-b border-border`

**Options (`EnhancedAnswerOption.tsx`)** :
- Au repos : `bg-white border border-border shadow-sm` (ombre legere)
- Au hover : `border-primary bg-rose-whisper/30 shadow-md` + `border-l-4 border-l-primary`
- Selectionnee : `bg-rose-whisper border-primary shadow-glow border-l-4 border-l-primary`

**Email Capture (`EmailCaptureScreen.tsx`)** :
- Remplacer le fond gradient (invisible) par un vrai container : card blanche centree avec `shadow-lg rounded-2xl p-8`
- Inputs : `border-2 border-border` au lieu de `border border-border`

**Results (`SimpleHormoneResults.tsx`)** :
- Fond de page : `bg-rose-whisper/20` au lieu de `bg-background` pour que les cards blanches se detachent
- Cards : garder `bg-white shadow-md border border-border`
- La premiere card (description du profil) : `bg-gradient-to-br from-rose-whisper to-white` pour la differencier
- Les numeros des gestes : deja bien en `bg-primary text-white`

**Loading (`ResultsLoading.tsx`)** :
- Supprimer les emojis ✨ du texte
- Le texte "La magie opere" --> "Analyse en cours..." (plus pro)

---

## Fichiers modifies (9 fichiers)

1. **`src/index.css`** — tokens palette corrigee (vrai rose, surfaces differenciees)
2. **`tailwind.config.ts`** — primary-hover ajuste
3. **`src/pages/Index.tsx`** — header avec bordure visible
4. **`src/components/Quiz/Welcome.tsx`** — container central, suppression coeur placeholder
5. **`src/components/Quiz/EnhancedQuizQuestion.tsx`** — separation visuelle progression/contenu
6. **`src/components/Quiz/EnhancedAnswerOption.tsx`** — left-border accent, ombres renforcees
7. **`src/components/Quiz/Results/components/EmailCaptureScreen.tsx`** — card container, icone Lucide, inputs renforces
8. **`src/components/Quiz/Results/components/SimpleHormoneResults.tsx`** — fond rose-whisper, suppression emojis, icones Check
9. **`src/components/Quiz/Results/ResultsLoading.tsx`** — suppression emojis, texte pro
10. **`src/components/Quiz/questions/hormonalQuestions.ts`** — suppression emojis des titres

## Principe

Passer de "tout est rose clair sur blanc" a "cards blanches sur fond rose subtil, avec des accents rose vif et des ombres qui creent de la profondeur". Supprimer les emojis pour un look coherent et premium.

