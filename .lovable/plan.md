

# Plan : Degrade rose sur le fond de page, options en blanc

Le degrade rose subtil doit etre sur le **fond de la page** du quiz (pas sur les boutons d'options). Les options restent sur fond **blanc pur**.

---

## Fichiers a modifier

### 1. `src/components/Quiz/EnhancedAnswerOption.tsx`

- **Ligne 49** : Remettre le fond par defaut des options a `#FFFFFF` (blanc pur) au lieu du degrade actuel `linear-gradient(180deg, #FFFFFF 0%, #FDF2F7 100%)`
- **Ligne 62** (onMouseOut) : Le fond reste `#FFFFFF` (deja correct)

### 2. `src/components/Quiz/Quiz.tsx`

- **Ligne 53** : Ajouter un fond degrade rose subtil au conteneur principal du quiz. Remplacer le `div` simple par un div avec un style de fond :
  - `background: linear-gradient(180deg, #F8F3FC 0%, #FDF2F7 60%, #FBEAF2 100%)`
  - Cela donne un fond qui part du mauve clair (`#F8F3FC`, la couleur `background` actuelle) et descend vers un rose doux en bas de page

---

## Resume

| Fichier | Changement |
|---------|------------|
| `EnhancedAnswerOption.tsx` | Fond options : blanc pur (`#FFFFFF`) au lieu du degrade |
| `Quiz.tsx` | Fond page : degrade vertical mauve-vers-rose |

2 fichiers modifies. Aucun changement sur la logique, les animations, ou Brevo.

