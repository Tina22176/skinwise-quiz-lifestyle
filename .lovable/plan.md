

# Plan : Alignement pixel-perfect avec le mockup de reference

Conservation de toutes les ameliorations existantes (animations, Brevo, logique quiz). Seuls les ecarts visuels sont corriges.

---

## Modifications par fichier

### 1. `src/components/Quiz/EnhancedQuizQuestion.tsx`

**Ecarts corriges** : display text manquant, font-weight, centrage, animation, max-width

- Inverser l'affichage des champs : `question` = petit texte emotionnel (italic, 15px, `#9B8FA3`), `subtitle` = titre principal (Cormorant, 22px, bold)
- Changer `font-semibold` en `font-bold` sur le titre
- Changer `text-center` en `text-left`
- Changer `max-w-xl` en `max-w-[480px]`
- Uniformiser padding en `px-6`
- Changer animation d'entree de `x: 40` (horizontal) en `y: 16, opacity: 0` (fadeUp vertical)
- Conserver le bouton "Retour" et le message "Parfait !" (ameliorations UX a garder)

### 2. `src/components/Quiz/Welcome.tsx`

**Ecarts corriges** : max-width, hover CTA

- Changer `max-w-lg` en `max-w-[480px]`
- Uniformiser padding en `px-6`
- Corriger hover CTA : remplacer `whileHover={{ scale: 1.02 }}` par `whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(212,100,154,0.35), 0 4px 12px rgba(212,100,154,0.2)" }}`

### 3. `src/components/Quiz/Results/components/SimpleHormoneResults.tsx`

**Ecarts corriges** : titre trop grand, max-width, emoji manquant, footer absent, emoji taille

- Changer titre `text-3xl sm:text-4xl` en `text-[28px]` fixe
- Changer emoji `text-4xl` (36px) en `text-[32px]`
- Changer `max-w-xl` en `max-w-[480px]`
- Uniformiser padding en `px-6`
- Ajouter emoji coeur a la fin du texte reminder : "...dans ta boite. (coeur-lettre)"
- Ajouter un footer en bas : copyright 2025 + liens Boutique/Instagram (meme style que Index.tsx)

### 4. `src/components/Quiz/Results/components/EmailCaptureScreen.tsx`

**Ecarts corriges** : card/ombre, max-width, border-radius inputs

- Supprimer le conteneur carte : retirer `bg-card rounded-2xl shadow-lg border border-border` du div wrapper. Le contenu s'affiche directement sur le fond de page
- Changer `max-w-md` en `max-w-[480px]`
- Uniformiser padding en `px-6`
- Corriger `rounded-xl` des inputs en `rounded-[12px]` (le mockup dit 12px, pas 28px)

### 5. `src/components/Quiz/Results/Results.tsx`

**Ecart corrige** : fond uni

- S'assurer que le fond est `bg-background` (`#F8F3FC`) uni, sans gradient

### 6. `src/pages/Index.tsx`

**Ecart corrige** : animation header

- Retirer l'animation d'entree du header (`initial={{ y: -100 }}`) : le header apparait directement, sans slide

### 7. `tailwind.config.ts`

- Ajouter couleur `gold: "#C9A87C"` dans `extend.colors`

---

## Recapitulatif

| Fichier | Changements |
|---------|-------------|
| `EnhancedQuizQuestion.tsx` | Display text italic + titre bold text-left + fadeUp + max-w-[480px] + px-6 |
| `Welcome.tsx` | max-w-[480px] + px-6 + hover translateY |
| `SimpleHormoneResults.tsx` | titre 28px + emoji 32px + max-w-[480px] + px-6 + footer + emoji lettre |
| `EmailCaptureScreen.tsx` | Supprimer carte/ombre + max-w-[480px] + px-6 + inputs rounded-[12px] |
| `Results.tsx` | Fond uni bg-background |
| `Index.tsx` | Retirer animation header |
| `tailwind.config.ts` | Ajouter gold |

Aucun changement sur la logique quiz, les profils hormonaux, ou l'integration Brevo.

