

# Plan : Alignement pixel-perfect avec la maquette de reference

## Ecarts identifies (mockup vs code actuel)

J'ai compare chaque detail du composant de reference fourni avec le code actuel. Voici tous les ecarts :

---

### 1. WELCOME SCREEN — 8 ecarts

| Detail | Maquette | Code actuel |
|--------|----------|-------------|
| Badge | `bg: #FBEAF2` (rose-whisper) + `color: #D4649A` (rose) | `bg-primary text-primary-foreground` (rose plein + blanc) |
| Badge padding | `padding: 6px 18px`, `fontSize: 13`, `fontWeight: 600` | `px-5 py-1.5`, `text-sm font-semibold` (trop gros) |
| Titre taille | `fontSize: 2.5rem`, `lineHeight: 1.15` | `text-4xl sm:text-5xl md:text-6xl` (trop grand) |
| CTA button | `linear-gradient(135deg, rose, roseHover)`, `borderRadius: 99`, `padding: 18px 44px`, `fontSize: 17` | `bg-primary` (flat, pas de gradient), `rounded-full` ok, mais tailles differentes |
| CTA text | "Commencer le diagnostic" + fleche texte (pas icone) | Utilise `ArrowRight` icone Lucide |
| Ligne decorative | `width: 60px`, `height: 1px`, `bg: #E6DCE9` | `w-16 h-px bg-border` (close mais verifier) |
| Blobs decoratifs | 3 blobs avec animation `float` specifique et couleurs exactes | Deux blobs statiques avec des couleurs differentes |
| Texte "Gratuit..." | `fontSize: 13`, `color: #9B8FA3` (textMuted) | `text-sm text-muted-foreground` (presque ok) |

### 2. QUIZ QUESTION SCREEN — 6 ecarts

| Detail | Maquette | Code actuel |
|--------|----------|-------------|
| Hierarchie texte INVERSEE | Display = GRAND titre (Cormorant, 22px, bold, `#2E2233`) / Question = petit sous-titre (DM Sans, 16px, `#665A70`) | Display est le PETIT texte, question est le GRAND -- c'est inverse |
| Pas de card container | Le contenu est affiche directement sur le fond `#F8F3FC`, PAS dans une card blanche | Enveloppe dans `bg-card rounded-2xl shadow-md border` |
| Options border | `2px solid #F0EAF3` (lineSoft) | `2px solid hsl(var(--input))` (similaire mais verifier le rendu) |
| Options hover | `borderColor: #D8C4EC` (lilas), `background: #F5F0FA` (lilasWhisper) | Hover en `hsl(280 30% 85%)` et `hsl(270 40% 97%)` (approximatif) |
| Options selected | `border: 2px solid #D4649A`, gradient `roseWhisper -> lilasWhisper`, checkmark rose circle | Checkmark avec "check" texte, gradient different |
| Progress bar | `height: 4px`, `bg: #F0EAF3` (lineSoft), fill = gradient `rose -> roseBright` | `h-2` (8px, trop epais), `bg-secondary` |

### 3. EMAIL CAPTURE SCREEN — 5 ecarts

| Detail | Maquette | Code actuel |
|--------|----------|-------------|
| Icone | Emoji "sparkle" en `fontSize: 2.5rem` dans un cercle `bg: #F5F0FA` (lilasWhisper), `72x72px` | Icone Lucide `Sparkles` dans cercle `bg-secondary`, `56x56px` (14x14) |
| Titre | `fontFamily: Cormorant Garamond`, `fontSize: 1.8rem`, `color: #3D2B45` (violetDeep) | `text-foreground` (`#2E2233`) — couleur presque ok, taille a verifier |
| Inputs background | `background: #F5F0FA` (lilasWhisper), `border: 1.5px solid #E6DCE9` (line) | `bg-accent border-[1.5px] border-border` — `accent` = `#F0EAF3`, pas `#F5F0FA` |
| Input focus | `borderColor: #D4649A` (rose) | `focus:border-primary` — ok si primary = rose |
| Skip button | `fontSize: 14`, `color: #9B8FA3` (textMuted), `textDecoration: underline` | `text-sm text-muted-foreground underline` — muted-foreground = `#665A70` pas `#9B8FA3` |

### 4. RESULTS SCREEN — 7 ecarts

| Detail | Maquette | Code actuel |
|--------|----------|-------------|
| "Ton profil peau" label | `fontSize: 13`, `color: #9B8FA3`, `textTransform: uppercase`, `letterSpacing: 1.5px` | `text-sm text-muted-foreground uppercase tracking-wide` — muted-foreground trop fonce |
| Profile emoji | Affiche l'emoji (`profile.emoji`) en grand, pas d'icone SVG | Utilise `HormoneIcon` (SVG Lucide) |
| Cards | `border: 1px solid #E6DCE9` (line), `borderRadius: 20px`, PAS de shadow | `shadow-md border border-border` — shadow en trop |
| Product CTA section | `background: linear-gradient(135deg, #F5F0FA, #FBEAF2)` (lilasWhisper -> roseWhisper) | `bg-card` (blanc) — pas de gradient |
| Checkmarks email | Emoji "check" vert (texte `color: #D4649A`) | Icone Lucide `Check` dans cercle `bg-primary/15` |
| Texte "Pas prete..." | Contient emoji "boite mail" a la fin | Pas d'emoji (ok si choix delibere) |
| "Refaire le quiz" | `color: #9B8FA3` (textMuted), pas de couleur primaire | `text-primary` (rose) — devrait etre gris |

### 5. HEADER — 2 ecarts

| Detail | Maquette | Code actuel |
|--------|----------|-------------|
| Logo | Texte "Majoliepeau" en `fontSize: 20`, `fontWeight: 700`, `fontFamily: Cormorant Garamond`, `color: #3D2B45` | Image PNG du logo Shopify |
| Style | `background: #FFFFFF`, `borderBottom: 1px solid #E6DCE9` | `bg-card border-b border-border` — similaire |

### 6. FOOTER — 1 ecart

| Detail | Maquette | Code actuel |
|--------|----------|-------------|
| Links | `color: #D4649A` (rose), `textDecoration: none` | `text-primary` — ok mais font-weight et style a verifier |

### 7. COULEUR CSS MANQUANTE — `textMuted`

La maquette utilise 3 niveaux de texte :
- `text` = `#2E2233` (foreground) -- OK
- `textSecondary` = `#665A70` (muted-foreground) -- OK
- `textMuted` = `#9B8FA3` (plus clair, pour labels, meta) -- MANQUANT

Le code n'a que 2 niveaux. `textMuted` (#9B8FA3) n'est pas defini comme token.

---

## Modifications a effectuer

### Fichier 1 : `src/index.css`
- Pas de changement de tokens (ils correspondent deja a la maquette)

### Fichier 2 : `tailwind.config.ts`
- Ajouter une couleur `textMuted: "#9B8FA3"` dans la palette pour le 3e niveau de texte

### Fichier 3 : `src/components/Quiz/Welcome.tsx`
- Badge : `bg-rose-whisper text-primary` au lieu de `bg-primary text-primary-foreground`
- Badge : `px-4 py-1 rounded-full text-[13px] font-semibold`
- Titre : reduire a `text-[2.5rem]` avec `leading-[1.15]`
- CTA : ajouter `style={{ background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)' }}` au lieu de `bg-primary`
- CTA : texte "Commencer le diagnostic" suivi de la fleche texte `->` (pas l'icone ArrowRight, ou garder l'icone c'est ok)
- CTA : `px-11 py-[18px] text-[17px]`
- Ajouter un 3e blob decoratif

### Fichier 4 : `src/components/Quiz/EnhancedQuizQuestion.tsx`
- **INVERSER** l'ordre : Display text (`question`) = le GRAND titre en `font-heading text-[22px] font-semibold text-foreground`, subtitle = le PETIT texte en `text-base text-muted-foreground font-body`
- Retirer le container card (`bg-card rounded-2xl shadow-md border`) — afficher directement sur le fond de page

### Fichier 5 : `src/components/Quiz/EnhancedAnswerOption.tsx`
- Border au repos : `2px solid #F0EAF3` (lineSoft) — utiliser `hsl(var(--input))` c'est presque ca
- Hover : `borderColor: '#D8C4EC'` (lilas), `background: '#F5F0FA'` (lilasWhisper) — utiliser les noms Tailwind `lilas` et `lilas-whisper`
- Selected gradient : `linear-gradient(135deg, #FBEAF2 0%, #F5F0FA 100%)` (roseWhisper -> lilasWhisper)
- Selected checkmark : cercle `w-6 h-6 rounded-full bg-primary text-white` avec check texte "check"

### Fichier 6 : `src/components/Quiz/QuizProgressBar.tsx`
- Hauteur barre : `h-1` (4px) au lieu de `h-2` (8px)
- Fond barre : `bg-[#F0EAF3]` (lineSoft) au lieu de `bg-secondary`
- Texte : `text-[13px] text-[#9B8FA3]` (textMuted) au lieu de `text-xs text-muted-foreground`

### Fichier 7 : `src/components/Quiz/Results/components/EmailCaptureScreen.tsx`
- Icone cercle : `w-[72px] h-[72px] bg-lilas-whisper` au lieu de `w-14 h-14 bg-secondary`
- Garder Sparkles Lucide (coherent avec le reste du design)
- Titre : `text-violet-deep` au lieu de `text-foreground`
- Titre taille : `text-[1.8rem]`
- Skip bouton : `text-[#9B8FA3]` au lieu de `text-muted-foreground`

### Fichier 8 : `src/components/Quiz/Results/components/SimpleHormoneResults.tsx`
- Label "Ton profil peau" : `text-[13px] text-[#9B8FA3] tracking-[1.5px]`
- Icone profil : remplacer `HormoneIcon` par l'emoji du profil (`profile.emoji`) en `text-4xl`
- Cards : retirer `shadow-md`, garder uniquement `border border-border rounded-[20px]`
- Section "Pour aller plus loin" : `bg-gradient-to-br from-lilas-whisper to-rose-whisper` au lieu de `bg-card`
- Checkmarks : `text-primary` simple (pas cercle bg)
- "Refaire le quiz" : `text-[#9B8FA3]` au lieu de `text-primary`

### Fichier 9 : `src/components/Quiz/Results/ResultsLoading.tsx`
- Pas de changement majeur (deja correct)

---

## Resume : 8 fichiers modifies

1. `tailwind.config.ts` — ajout couleur textMuted
2. `src/components/Quiz/Welcome.tsx` — badge, titre, CTA, blobs
3. `src/components/Quiz/EnhancedQuizQuestion.tsx` — inverser hierarchie, retirer card
4. `src/components/Quiz/EnhancedAnswerOption.tsx` — hover/selected exact
5. `src/components/Quiz/QuizProgressBar.tsx` — hauteur, couleurs
6. `src/components/Quiz/Results/components/EmailCaptureScreen.tsx` — icone, titre, skip
7. `src/components/Quiz/Results/components/SimpleHormoneResults.tsx` — cards, emoji, gradient, check
8. `src/pages/Index.tsx` — ajustements mineurs header/footer si necessaire

## Principe

Chaque valeur (couleur, taille, padding, border, shadow) est alignee sur les valeurs exactes du composant de reference. Pas d'interpretation — copie fidele des specs.

