# Corrections du quiz — 11 novembre 2026

Référence commerciale : branche main de `Tina22176/holi-glow-shop`, fichiers `nextjs-app/src/data/products.ts`, `nextjs-app/src/data/glowCyclePricing.ts`, `nextjs-app/src/lib/skin-reboot-launch-pricing.ts` et `nextjs-app/src/data/faq.ts`.

- Glow Express : 49 €, 7 jours guidés et 12 mois d’accès ; identifiant `mini-glow` conservé pour les liens et les contacts.
- Skin Reboot : 149 €, 28 jours guidés et 12 mois d’accès. Le tarif de lancement à 99 € a expiré en juin 2026.
- Glow & Cycle : abonnement à 19,99 €/mois, 49 €/trimestre ou 149 €/an ; même contenu, renouvellement automatique, résiliation du renouvellement depuis l’espace personnel et accès jusqu’à la fin de la période payée. Aucun prérequis Skin Reboot, aucune promesse de garantie 30 jours.

Le questionnaire passe de 8 à 10 questions. L’âge est facultatif et ne contribue plus au profil. Le contexte du cycle et les variations observées sont séparés. La question sur les boutons porte sur leur temporalité, sans déduire un lien cyclique de leur localisation. Une question directe sur les habitudes permet d’étayer le profil « contrôleuse débordée ». Les questions peau et énergie demandent la situation principale ; les réponses de confort, d’incertitude et de non-réponse évitent de forcer un problème.

Les cinq profils éditoriaux restent distincts de la recommandation commerciale. Un résultat neutre `à_observer` évite d’attribuer un profil problématique sans signal. Le champ historique `confidence` est conservé comme part des points éditoriaux, sans plancher artificiel ni prétention de fiabilité clinique ; il vaut zéro sans signal et n’est pas affiché comme une probabilité.

L’objectif explicite prime sur le rythme et les indices : 8 points pour l’objectif, 4 pour le format, au plus 2 pour les signaux par programme. En cas d’égalité : objectif, format, puis ordre explicite Skin Reboot / Glow Express / Glow & Cycle. Les motifs reprennent l’objectif ou les observations. Une absence de règles n’exclut pas l’abonnement.

Les tarifs et programmes fixes ont été retirés des textes de profils. Les gestes affichés et le champ `lifestyle` utilisent le même contenu contextualisé. Sous contraception, sans règles ou sans contexte partagé, les conseils cycliques reposent sur les dates et ressentis, sans imposer quatre phases. Les conseils ne prescrivent plus d’exfoliation à une date du cycle, d’arrêt de protection solaire ni de maintien d’un produit irritant. Les routines de la personne fatiguée incluent hydratation et protection adaptée.

Le retour à une question permet de modifier une réponse : l’ancienne sélection est mise en évidence sans désactiver les boutons. La transition temporisée est annulée lors d’un retour en arrière.

## Validation

- Tests de logique : `npm test` ; exécution directe des deux fichiers pour confirmer les 12 cas : `node --experimental-strip-types tests/profileAudit.test.ts` et `node --experimental-strip-types tests/programRecommendation.test.ts`.
- `npx tsc -p tsconfig.app.json --noEmit`, `npm run lint`, `npm run build`, `git diff --check`.
- Le verrouillage npm a été synchronisé avec les deux plugins Lovable déjà déclarés dans package.json, pour permettre `npm ci`.

## Périmètre email

Le endpoint du quiz conserve les identifiants de programmes et reçoit les réponses, le profil et la recommandation. Les automatisations et modèles hébergés dans Brevo ne font pas partie de ce dépôt : leur texte et leurs branches (notamment `à_observer` et les variantes sans calendrier) restent à aligner dans Brevo. Les vérifications navigateur utilisent une réponse API simulée et n’envoient pas d’email.
