

# Plan : Corriger le mapping profils → programmes

## Probleme

Les 5 profils renvoient vers des programmes incorrects ou inexistants. Il faut aligner sur les 3 vrais produits : **Skin Reboot** (99€), **Mini Glow** (49€), **Glow & Cycle** (299€).

## Changements — fichier unique

**`src/components/Quiz/Results/utils/HormoneProfileDetails.ts`**

| Profil | Avant | Apres |
|--------|-------|-------|
| 🔥 Réactive sous pression | Mini Glow (49€) | **Skin Reboot** (99€), slug `/skin-reboot/paiement`, reason : "28 jours pour stabiliser ta routine et calmer ta peau durablement." |
| 🌙 Fatiguée en mode survie | Mini Glow (49€) | **Skin Reboot** (99€), slug `/skin-reboot/paiement`, reason : "28 jours pour reprendre le contrôle avec l'approche In & Out — peau + énergie." |
| 🧴 Contrôleuse débordée | Skin Reboot (99€) | **Mini Glow** (49€), slug `/mini-glow/paiement`, reason : "7 jours pour simplifier ta routine et poser les bases. Ensuite, Skin Reboot pour aller plus loin." |
| 📅 Cyclique qui subit | Glow & Cycle (299€) | **Skin Reboot** (99€), slug `/skin-reboot/paiement`, reason : "28 jours pour stabiliser ta peau — le premier pas avant Glow & Cycle." |
| 🦎 Sensible caméléon | Bundle (132€) | **Skin Reboot** (99€), slug `/skin-reboot/paiement`, reason : "28 jours pour apprendre à observer ta peau et trouver ta routine stable." |

## Detail technique

- Lignes 28-33 (réactive) : `program: "Skin Reboot"`, `programPrice: "99€"`, `programSlug: "/skin-reboot/paiement"`
- Lignes 46-49 (fatiguée) : idem Skin Reboot avec reason adaptée
- Lignes 63-66 (contrôleuse) : `program: "Mini Glow"`, `programPrice: "49€"`, `programSlug: "/mini-glow/paiement"`
- Lignes 80-83 (cyclique) : Skin Reboot au lieu de Glow & Cycle
- Lignes 97-101 (sensible) : Skin Reboot au lieu du bundle

1 fichier modifié, aucun changement de logique ou de structure.

