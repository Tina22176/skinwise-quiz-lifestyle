

# Plan : Refonte visuelle — Contraste, hierarchie & modernite

## Diagnostic

La capture d'ecran confirme le probleme : tout est pale rose sur fond quasi-blanc. Voici les causes precises :

| Probleme | Cause dans le code |
|----------|-------------------|
| Titre "Tu connais vraiment" quasi invisible | `text-primary` = rose pastel (330 50% 62%) sur fond blanc |
| Sous-titre a peine lisible | `text-muted-foreground` = gris tres clair (280 10% 55%) |
| Badge "Diagnostic gratuit" se confond avec le fond | `bg-rose-whisper` (#FBEAF2) sur fond #FBF7F8 — quasi identique |
| Fond monotone | `from-pink-50/30 via-white to-pink-50/20` = tout est blanc |
| Pas de hierarchie | Titre rose + sous-titre gris + corps gris = tout se ressemble |
| Image ne charge pas | L'image est la mais le placeholder coeur disparait, l'image met du temps |
| Header fade | `text-pink-600/80` avec opacite = delave |

## Solution

### 1. Tokens CSS plus contrastes (`src/index.css`)

Renforcer les contrastes sans changer la palette :

```text
Avant                              Apres
--foreground: 280 20% 17%    -->   280 25% 12%  (plus fonce, #1E1525)
--muted-foreground: 280 10% 55%   -->  280 12% 42%  (lisible, #6B5B73)
--primary: 330 50% 62%       -->   330 55% 52%  (rose plus intense, #C44B85)
--accent-foreground: 280 30% 40%  -->  280 35% 30%  (violet profond)
```

### 2. Page Index (`src/pages/Index.tsx`)

- Remplacer le fond `from-pink-50/30 via-white` par un vrai gradient visible : `from-rose-whisper via-background to-lilas-whisper`
- Header : couleurs pleines au lieu de `text-pink-600/80`
- Particules : plus visibles (`bg-rose-soft/50` au lieu de `bg-pink-200/30`)
- Footer : bordure et textes plus contrastes

### 3. Welcome page (`src/components/Quiz/Welcome.tsx`)

- Titre : **"Tu connais vraiment"** en `text-violet-deep` (fonce) au lieu de `text-primary` (rose clair). **"ta peau ?"** en `text-primary` (rose) = hierarchie claire
- Sous-titre : `text-foreground/70` au lieu de `text-muted-foreground`
- Badge : `bg-primary text-white` au lieu de `bg-rose-whisper text-rose` (invisible)
- CTA : ajouter une ombre glow plus forte + padding plus genereux
- Blobs decoratifs : opacite plus haute (60-50% au lieu de 40-30%)

### 4. Quiz questions (`src/components/Quiz/EnhancedQuizQuestion.tsx`)

- Titre question (display) : `text-violet-deep` au lieu de `text-primary` — le titre doit etre fonce et lisible
- Sous-titre : `text-foreground/70` au lieu de `text-muted-foreground`

### 5. Options de reponse (`src/components/Quiz/EnhancedAnswerOption.tsx`)

- Bordure au repos : `border-border/80` avec une legere ombre
- Hover : `border-primary` (pas juste `border-rose-soft`) + `bg-rose-whisper/50`
- Texte : `text-foreground` (deja OK mais s'assurer du contraste)

### 6. Progress bar (`src/components/Quiz/QuizProgressBar.tsx`)

- Fond barre : `bg-muted` au lieu de `bg-lilas-soft` (trop proche du fond)
- Texte : deja OK

### 7. Email capture (`src/components/Quiz/Results/components/EmailCaptureScreen.tsx`)

- Fond : gradient subtil au lieu de `bg-background` plat
- Titre : `text-violet-deep` pour le contraste
- Inputs : bordure plus visible

### 8. Results page (`src/components/Quiz/Results/components/SimpleHormoneResults.tsx`)

- Cards : ajouter `shadow-md` au lieu de `shadow-sm` — plus de relief
- Section programme : `bg-gradient-to-br from-lilas-whisper to-rose-whisper` au lieu de `bg-lilas-whisper` plat
- Numeros des gestes : `bg-primary text-white` au lieu de `bg-rose-whisper text-primary`

### 9. Loading screen (`src/components/Quiz/Results/ResultsLoading.tsx`)

- Titre plus visible : `text-violet-deep` au lieu de `text-primary`

---

## Recapitulatif des fichiers modifies (9 fichiers)

1. `src/index.css` — tokens CSS plus contrastes
2. `tailwind.config.ts` — shadow-glow plus fort
3. `src/pages/Index.tsx` — fond gradient, header, particules, footer
4. `src/components/Quiz/Welcome.tsx` — hierarchie titre, badge, CTA
5. `src/components/Quiz/EnhancedQuizQuestion.tsx` — couleurs titres
6. `src/components/Quiz/EnhancedAnswerOption.tsx` — bordures et hover
7. `src/components/Quiz/QuizProgressBar.tsx` — fond barre
8. `src/components/Quiz/Results/components/EmailCaptureScreen.tsx` — fond + titres
9. `src/components/Quiz/Results/components/SimpleHormoneResults.tsx` — cards, relief, numeros
10. `src/components/Quiz/Results/ResultsLoading.tsx` — couleur titre

## Principe directeur

On ne change PAS la palette Majoliepeau. On renforce les contrastes, on cree de la hierarchie (fonce pour les titres, rose pour les accents, gris moyen pour le secondaire), et on ajoute du relief (ombres, gradients) pour que la page ait de la profondeur au lieu d'etre plate.

