

# Plan : Layout responsive pour tablette et desktop

Le contenu s'elargit progressivement selon la taille de l'ecran, tout en restant fidele au mockup sur mobile. Aucun changement sur la logique quiz, Brevo, ou les animations.

---

## Principe

Remplacer le `max-w-[480px]` fixe par des breakpoints progressifs :

```text
Mobile (< 768px)   : max-w-[480px]  (identique au mockup)
Tablette (768px+)   : max-w-[600px]  (un peu plus large)
Desktop (1024px+)   : max-w-[720px]  (occupe mieux l'espace)
```

Le contenu reste centre (`mx-auto`) mais occupe plus de place sur les grands ecrans. Le padding horizontal reste `px-6` partout.

---

## Fichiers a modifier

### 1. `src/components/Quiz/EnhancedQuizQuestion.tsx`

**Ligne 79** : Remplacer `max-w-[480px]` par `max-w-[480px] md:max-w-[600px] lg:max-w-[720px]`

### 2. `src/components/Quiz/Welcome.tsx`

**Ligne 29** : Remplacer `max-w-[480px]` par `max-w-[480px] md:max-w-[600px] lg:max-w-[720px]`

### 3. `src/components/Quiz/Results/components/SimpleHormoneResults.tsx`

**Ligne 41** : Remplacer `max-w-[480px]` par `max-w-[480px] md:max-w-[600px] lg:max-w-[720px]`

### 4. `src/components/Quiz/Results/components/EmailCaptureScreen.tsx`

**Ligne 35** : Remplacer `max-w-[480px]` par `max-w-[480px] md:max-w-[600px] lg:max-w-[720px]`

### 5. `src/components/Quiz/Results/Results.tsx`

**Ligne 45** : Le div "Oops ! Aucun profil" utilise `px-6` mais n'a pas de max-width. Ajouter `max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto` au conteneur texte.

---

## Ajustements typographiques pour grands ecrans

En plus de l'elargissement, on augmente legerement la taille de certains textes sur desktop pour que le contenu ne paraisse pas "petit" dans un conteneur plus large.

### `src/components/Quiz/EnhancedQuizQuestion.tsx`
- Titre question : `text-[22px]` devient `text-[22px] lg:text-[26px]`
- Texte emotionnel : `text-[15px]` reste identique (taille de lecture fine)

### `src/components/Quiz/Welcome.tsx`
- Titre h1 : `text-[2.5rem]` devient `text-[2.5rem] lg:text-[3rem]`
- Sous-titre : `text-base` devient `text-base lg:text-lg`

### `src/components/Quiz/Results/components/SimpleHormoneResults.tsx`
- Titre profil : `text-[28px]` devient `text-[28px] lg:text-[32px]`
- Sous-titres cards : `text-xl` reste identique

### `src/components/Quiz/Results/components/EmailCaptureScreen.tsx`
- Titre : `text-[1.8rem]` devient `text-[1.8rem] lg:text-[2.2rem]`

---

## Resume

| Fichier | Changement |
|---------|------------|
| `EnhancedQuizQuestion.tsx` | max-w responsive + titre lg:text-[26px] |
| `Welcome.tsx` | max-w responsive + h1 lg:text-[3rem] + subtitle lg:text-lg |
| `SimpleHormoneResults.tsx` | max-w responsive + titre lg:text-[32px] |
| `EmailCaptureScreen.tsx` | max-w responsive + titre lg:text-[2.2rem] |
| `Results.tsx` | max-w responsive sur le fallback "aucun profil" |

5 fichiers modifies. Aucun changement sur la logique, les animations, ou Brevo.

