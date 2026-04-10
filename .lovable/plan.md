

# Plan : Mettre a jour les URLs des programmes

## Fichier unique : `src/components/Quiz/Results/utils/HormoneProfileDetails.ts`

Les slugs actuels (`/skin-reboot/paiement`, `/mini-glow/paiement`) produisent des URLs incorrectes. Il faut les remplacer par les vrais chemins.

| Profil | Slug actuel | Nouveau slug |
|--------|------------|-------------|
| Réactive sous pression | `/skin-reboot/paiement` | `/programmes/skin-reboot` |
| Fatiguée en mode survie | `/skin-reboot/paiement` | `/programmes/skin-reboot` |
| Contrôleuse débordée | `/mini-glow/paiement` | `/programmes/mini-glow` |
| Cyclique qui subit | `/skin-reboot/paiement` | `/programmes/skin-reboot` |
| Sensible caméléon | `/skin-reboot/paiement` | `/programmes/skin-reboot` |

Les URLs finales seront du type `https://majoliepeau.com/programmes/skin-reboot` (la concaténation se fait déjà dans `SimpleHormoneResults.tsx` ligne 31).

5 lignes modifiées, aucun changement structurel.

