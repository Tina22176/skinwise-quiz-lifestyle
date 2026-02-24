

# Plan : Migration Klaviyo vers Brevo

## Perimetre

Remplacer toute l'integration Klaviyo par Brevo (ex-Sendinblite) pour l'envoi des contacts et le tracking des evenements du quiz.

## Fichiers Klaviyo actuels (a supprimer/remplacer)

| Fichier | Role |
|---------|------|
| `src/config/klaviyo.ts` | Cles API + endpoints Klaviyo |
| `src/components/Quiz/Results/hooks/useKlaviyoIntegration.ts` | Hook principal : creation profil + tracking evenement |
| `src/components/Quiz/Results/EmailSubscriptionHandler.tsx` | Orchestre la soumission du formulaire, appelle le hook Klaviyo |
| `src/services/klaviyo.ts` | Service singleton Klaviyo (ancien, non utilise activement) |
| `src/utils/klaviyoDebugger.ts` | Debug console Klaviyo |
| `src/main.tsx` | Import conditionnel du debugger Klaviyo |

## Modifications

### 1. Nouveau fichier : `src/config/brevo.ts`

Configuration Brevo avec :
- `apiKey` : ta cle API Brevo (a fournir)
- `listId` : l'ID de ta liste Brevo (a fournir, un nombre)
- Endpoints : `https://api.brevo.com/v3/contacts` et `https://api.brevo.com/v3/smtp/email`

### 2. Nouveau fichier : `src/components/Quiz/Results/hooks/useBrevoIntegration.ts`

Remplace `useKlaviyoIntegration.ts`. Meme interface (`subscribeToNewsletter`, `trackCustomEvent`) mais appelle l'API Brevo v3 :

- **Creation contact** : `POST https://api.brevo.com/v3/contacts` avec header `api-key`, body `{ email, attributes: { FIRSTNAME, SKIN_TYPE, ... }, listIds: [ID], updateEnabled: true }`
- **Tracking evenement** : `POST https://api.brevo.com/v3/events` (ou ignore si pas utilise cote Brevo)
- Les attributs de contact Brevo seront en MAJUSCULES (convention Brevo) : `FIRSTNAME`, `SKIN_TYPE`, `SKIN_STATE`, `COMBINED_SKIN_TYPE`, `QUIZ_COMPLETED`, etc.

### 3. Modifier : `src/components/Quiz/Results/EmailSubscriptionHandler.tsx`

- Remplacer `import { useKlaviyoIntegration }` par `import { useBrevoIntegration }`
- Remplacer `useKlaviyoIntegration()` par `useBrevoIntegration()`
- Mettre a jour les logs (`KLAVIYO` -> `BREVO`)

### 4. Supprimer : `src/services/klaviyo.ts`

Service ancien non utilise (le hook actif est `useKlaviyoIntegration`). Supprime.

### 5. Remplacer : `src/utils/klaviyoDebugger.ts` -> `src/utils/brevoDebugger.ts`

Meme principe mais avec l'API Brevo pour tester la connexion.

### 6. Modifier : `src/main.tsx`

Remplacer `import('./utils/klaviyoDebugger')` par `import('./utils/brevoDebugger')`.

### 7. Supprimer : `src/config/klaviyo.ts`

Plus necessaire.

---

## Ce qui ne change PAS

- `EmailSubscriptionHandler.tsx` garde la meme interface (email, firstName, skinType, etc.)
- Le formulaire d'email, le GDPR consent, les toasts — tout reste identique
- `useAnalytics.ts` (Google Analytics) n'est pas touche
- Aucun composant UI n'est modifie

## Information requise

Avant d'implementer, il faudra que tu me donnes :
1. **Ta cle API Brevo** (commence par `xkeysib-...`)
2. **L'ID de ta liste Brevo** (un nombre, ex: `3`)

Je les mettrai dans `src/config/brevo.ts` (meme approche que l'actuel `klaviyo.ts`).

## Resume : 7 operations sur 5 fichiers

1. Creer `src/config/brevo.ts`
2. Creer `src/components/Quiz/Results/hooks/useBrevoIntegration.ts`
3. Modifier `src/components/Quiz/Results/EmailSubscriptionHandler.tsx`
4. Creer `src/utils/brevoDebugger.ts`
5. Modifier `src/main.tsx`
6. Supprimer `src/config/klaviyo.ts`, `src/services/klaviyo.ts`, `src/utils/klaviyoDebugger.ts`, `src/components/Quiz/Results/hooks/useKlaviyoIntegration.ts`

