

# Plan : Retirer la mention du PDF des résultats

## Changement

**Fichier** : `src/components/Quiz/Results/components/SimpleHormoneResults.tsx`

**Ligne 124** : Remplacer la liste `["Ton profil en PDF", "3 conseils adaptés", "Ressources gratuites"]` par `["Ton profil détaillé", "3 conseils adaptés", "Ressources gratuites"]`

Cela retire la promesse d'un PDF (qui n'est pas généré) tout en gardant le bloc cohérent — le profil sera envoyé dans le corps de l'email Brevo,