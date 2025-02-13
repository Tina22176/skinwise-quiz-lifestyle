
export const questions = [
  {
    id: "brillance",
    question: "À quelle fréquence ta peau présente-t-elle une brillance excessive ?",
    options: [
      {
        value: "constamment",
        label: "Constamment",
        description: "La peau est brillante tout au long de la journée"
      },
      {
        value: "apres_heures",
        label: "Après quelques heures",
        description: "La brillance apparaît au fil de la journée"
      },
      {
        value: "rarement",
        label: "Rarement",
        description: "La peau reste mate la plupart du temps"
      },
      {
        value: "jamais",
        label: "Jamais",
        description: "La peau est toujours mate"
      }
    ]
  },
  {
    id: "hydratant",
    question: "Comment réagit ta peau après l'application d'un produit hydratant ?",
    options: [
      {
        value: "grasse",
        label: "Elle semble grasse",
        description: "La peau devient huileuse après application"
      },
      {
        value: "absorbe",
        label: "Absorbe rapidement l'hydratant",
        description: "Le produit pénètre facilement"
      },
      {
        value: "peu_changement",
        label: "Peu de changement",
        description: "L'effet est minimal"
      },
      {
        value: "irritations",
        label: "Provoque des irritations",
        description: "La peau réagit négativement"
      }
    ]
  },
  {
    id: "secheresse",
    question: "As-tu des zones de sécheresse ou des desquamations visibles ?",
    options: [
      {
        value: "souvent",
        label: "Oui, souvent",
        description: "Présence régulière de zones sèches"
      },
      {
        value: "parfois",
        label: "Parfois autour du nez ou des joues",
        description: "Zones sèches occasionnelles"
      },
      {
        value: "rarement",
        label: "Rarement",
        description: "Peu de zones sèches"
      },
      {
        value: "jamais",
        label: "Jamais",
        description: "Aucune zone sèche"
      }
    ]
  },
  {
    id: "rougeurs",
    question: "Quelle est la fréquence des rougeurs ou des réactions allergiques sur ta peau ?",
    options: [
      {
        value: "tres_frequent",
        label: "Très fréquemment",
        description: "Réactions régulières"
      },
      {
        value: "temps_en_temps",
        label: "De temps en temps",
        description: "Réactions occasionnelles"
      },
      {
        value: "rarement",
        label: "Rarement",
        description: "Peu de réactions"
      },
      {
        value: "jamais",
        label: "Jamais",
        description: "Aucune réaction"
      }
    ]
  },
  {
    id: "nettoyage",
    question: "Ta peau semble-t-elle tendue ou inconfortable après le nettoyage ?",
    options: [
      {
        value: "toujours",
        label: "Toujours",
        description: "Sensation constante de tension"
      },
      {
        value: "parfois",
        label: "Parfois",
        description: "Tension occasionnelle"
      },
      {
        value: "rarement",
        label: "Rarement",
        description: "Peu de tension"
      },
      {
        value: "jamais",
        label: "Jamais",
        description: "Aucune tension"
      }
    ]
  },
  {
    id: "pores",
    question: "Quelle est la taille de tes pores dans les zones comme le nez ou les joues ?",
    options: [
      {
        value: "tres_visibles",
        label: "Très visibles",
        description: "Pores dilatés et apparents"
      },
      {
        value: "moyennement",
        label: "Moyennement visibles",
        description: "Pores modérément visibles"
      },
      {
        value: "peu_visibles",
        label: "Peu visibles",
        description: "Pores fins"
      },
      {
        value: "invisibles",
        label: "Invisibles",
        description: "Pores très fins"
      }
    ]
  },
  {
    id: "climat",
    question: "Comment ta peau réagit-elle aux variations climatiques ?",
    options: [
      {
        value: "tres_reactive",
        label: "Elle devient très sèche ou très grasse",
        description: "Forte réaction aux changements"
      },
      {
        value: "legerement",
        label: "Elle est légèrement affectée",
        description: "Réaction modérée"
      },
      {
        value: "stable",
        label: "Pas de changement notable",
        description: "Peau stable"
      },
      {
        value: "irritations",
        label: "Elle réagit avec des irritations",
        description: "Réactions sensibles"
      }
    ]
  },
  {
    id: "hydratation",
    question: "Évalue ta consommation quotidienne de liquides.",
    options: [
      {
        value: "eau_pure",
        label: "Majoritairement de l'eau",
        description: "Consommation principale d'eau"
      },
      {
        value: "equilibre",
        label: "Équilibré entre eau et autres",
        description: "Mix de boissons varié"
      },
      {
        value: "autres_boissons",
        label: "Principalement des boissons non aqueuses",
        description: "Peu d'eau pure"
      },
      {
        value: "non_surveille",
        label: "Je ne surveille pas",
        description: "Pas d'attention particulière"
      }
    ]
  },
  {
    id: "alimentation_bio",
    question: "Quelle importance accordes-tu à l'origine biologique de tes aliments ?",
    options: [
      {
        value: "tres_important",
        label: "Très importante, je choisis bio quand c'est possible",
        description: "Préférence forte pour le bio"
      },
      {
        value: "assez_important",
        label: "Assez importante",
        description: "Attention modérée au bio"
      },
      {
        value: "peu_important",
        label: "Pas très importante",
        description: "Peu d'attention au bio"
      },
      {
        value: "aucune_attention",
        label: "Je n'y prête pas attention",
        description: "Pas de préférence particulière"
      }
    ]
  },
  {
    id: "saisons",
    question: "Comment ta peau réagit-elle aux changements saisonniers et à l'exposition au soleil ?",
    options: [
      {
        value: "tres_sensible",
        label: "Très sensible et réactive",
        description: "Forte réactivité aux changements"
      },
      {
        value: "legerement_sensible",
        label: "Légèrement sensible",
        description: "Sensibilité modérée"
      },
      {
        value: "stable",
        label: "Stabilité avec peu de changements",
        description: "Bonne adaptation"
      },
      {
        value: "aucune_sensibilite",
        label: "Aucune sensibilité notable",
        description: "Très bonne adaptation"
      }
    ]
  },
  {
    id: "sommeil",
    question: "Quel est l'impact de ton sommeil sur ton bien-être général et l'apparence de ta peau ?",
    options: [
      {
        value: "impact_direct",
        label: "Impact direct et notable",
        description: "Forte influence du sommeil"
      },
      {
        value: "quelque_impact",
        label: "Quelque impact",
        description: "Influence modérée"
      },
      {
        value: "peu_impact",
        label: "Peu d'impact",
        description: "Faible influence"
      },
      {
        value: "aucun_impact",
        label: "Aucun impact apparent",
        description: "Pas d'influence visible"
      }
    ]
  },
  {
    id: "activite_physique",
    question: "Décris ton niveau d'activité physique en considérant à la fois l'exercice et les mouvements quotidiens.",
    options: [
      {
        value: "tres_actif",
        label: "Très actif",
        description: "Exercice régulier et mode de vie actif"
      },
      {
        value: "moderement",
        label: "Modérément actif",
        description: "Activité physique modérée"
      },
      {
        value: "peu_actif",
        label: "Peu actif",
        description: "Activité limitée"
      },
      {
        value: "sedentaire",
        label: "Sédentaire",
        description: "Très peu d'activité physique"
      }
    ]
  },
  {
    id: "stress",
    question: "Comment gères-tu le stress au quotidien ? Quelles techniques utilises-tu ?",
    options: [
      {
        value: "meditation",
        label: "Méditation et relaxation",
        description: "Pratiques régulières de bien-être"
      },
      {
        value: "activite_physique",
        label: "Activité physique",
        description: "Gestion par le sport"
      },
      {
        value: "aucune_technique",
        label: "Aucune technique particulière",
        description: "Pas de pratique spécifique"
      },
      {
        value: "difficulte",
        label: "Je ne gère pas bien le stress",
        description: "Difficultés à gérer le stress"
      }
    ]
  },
  {
    id: "alimentation_grasse",
    question: "Comment réagis-tu aux aliments riches en graisses et en sucre ?",
    options: [
      {
        value: "aucun_probleme",
        label: "Aucun problème",
        description: "Bonne tolérance"
      },
      {
        value: "reactions_digestives",
        label: "Petites réactions digestives",
        description: "Légère sensibilité"
      },
      {
        value: "reactions_inflammatoires",
        label: "Réactions inflammatoires visibles",
        description: "Réactions cutanées"
      },
      {
        value: "evitement",
        label: "Je les évite pour des raisons de santé",
        description: "Évitement préventif"
      }
    ]
  }
];
