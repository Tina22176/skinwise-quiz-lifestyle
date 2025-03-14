
export const questions = [
  {
    id: "sensation_apres_nettoyage",
    question: "Comment se sent ta peau 2 heures après l'avoir nettoyée (sans appliquer de produits) ?",
    options: [
      {
        value: "seche",
        label: "Tiraillements, sensation d'inconfort et de sécheresse",
        description: "Ta peau manque d'hydratation"
      },
      {
        value: "mixte",
        label: "Brillance sur la zone T (front, nez, menton), normale ailleurs",
        description: "Ta peau présente deux comportements différents"
      },
      {
        value: "grasse",
        label: "Brillante et luisante sur tout le visage",
        description: "Ta peau produit un excès de sébum"
      },
      {
        value: "sensible",
        label: "Rougeurs, picotements ou sensations de brûlure",
        description: "Ta peau réagit facilement aux stimuli externes"
      }
    ]
  },
  {
    id: "pores",
    question: "Comment décrirais-tu tes pores ?",
    options: [
      {
        value: "seche",
        label: "Pratiquement invisibles",
        description: "Caractéristique des peaux sèches avec peu de sébum"
      },
      {
        value: "mixte",
        label: "Visibles sur la zone T, discrets sur les joues",
        description: "Typique des peaux mixtes"
      },
      {
        value: "grasse",
        label: "Larges et visibles sur la majorité du visage",
        description: "Caractéristique des peaux à forte production de sébum"
      },
      {
        value: "sensible",
        label: "Variables, parfois dilatés, parfois resserrés selon les réactions de ma peau",
        description: "Caractéristique d'une peau réactive"
      }
    ]
  },
  {
    id: "reaction_soleil",
    question: "Comment réagit ta peau face au soleil ?",
    options: [
      {
        value: "seche",
        label: "Rougit facilement, brûle souvent, se dessèche",
        description: "Les peaux sèches sont souvent plus sensibles au soleil"
      },
      {
        value: "mixte",
        label: "Bronze progressivement, peut brûler si exposition prolongée",
        description: "Réaction équilibrée au soleil"
      },
      {
        value: "grasse",
        label: "Bronze facilement, brûle rarement",
        description: "Les peaux grasses ont souvent une meilleure tolérance au soleil"
      },
      {
        value: "sensible",
        label: "Réaction imprévisible, souvent avec des rougeurs ou éruptions",
        description: "Les peaux sensibles réagissent fortement aux UV"
      }
    ]
  },
  {
    id: "imperfections",
    question: "As-tu tendance à avoir des imperfections ?",
    options: [
      {
        value: "seche",
        label: "Rarement ou jamais",
        description: "Les peaux sèches produisent peu de sébum"
      },
      {
        value: "mixte",
        label: "Occasionnellement sur la zone T, surtout avant les règles",
        description: "Imperfections localisées, souvent hormonales"
      },
      {
        value: "grasse",
        label: "Régulièrement, surtout des points noirs et comédons",
        description: "L'excès de sébum favorise les imperfections"
      },
      {
        value: "sensible",
        label: "Parfois, souvent sous forme de boutons inflammatoires ou réactionnels",
        description: "Imperfections liées aux réactions cutanées"
      }
    ]
  },
  {
    id: "nouveaux_produits",
    question: "Comment ta peau réagit-elle aux nouveaux produits ?",
    options: [
      {
        value: "seche",
        label: "Peut se déshydrater davantage si le produit n'est pas assez nourrissant",
        description: "Les peaux sèches requièrent des produits riches"
      },
      {
        value: "mixte",
        label: "Généralement bien, sauf si le produit est trop riche pour ma zone T",
        description: "Réaction variable selon les zones du visage"
      },
      {
        value: "grasse",
        label: "Peut devenir plus grasse ou développer des imperfections si le produit est trop riche",
        description: "L'excès de sébum peut s'aggraver avec des produits trop riches"
      },
      {
        value: "sensible",
        label: "Souvent par des rougeurs, démangeaisons ou irritations",
        description: "Forte réactivité aux ingrédients nouveaux"
      }
    ]
  },
  {
    id: "fin_journee",
    question: "Après une journée complète, comment se sent ta peau ?",
    options: [
      {
        value: "seche",
        label: "Encore plus sèche, parfois des squames (peaux mortes) sont visibles",
        description: "Le manque d'hydratation s'accentue durant la journée"
      },
      {
        value: "mixte",
        label: "Légèrement brillante sur la zone T, normale à sèche sur les joues",
        description: "Contraste entre différentes zones du visage"
      },
      {
        value: "grasse",
        label: "Très brillante, nécessite souvent de tamponner l'excès de sébum",
        description: "Production excessive de sébum au cours de la journée"
      },
      {
        value: "sensible",
        label: "Inconfortable, tendue ou irritée par moments",
        description: "Réactions cutanées qui évoluent durant la journée"
      }
    ]
  },
  {
    id: "souci_principal",
    question: "Quel est ton principal souci de peau ?",
    options: [
      {
        value: "seche",
        label: "Manque d'éclat, tiraillements, ridules de déshydratation",
        description: "Problématiques liées au manque d'hydratation"
      },
      {
        value: "mixte",
        label: "Gérer l'équilibre entre zones grasses et zones sèches",
        description: "Difficulté à équilibrer les différentes zones"
      },
      {
        value: "grasse",
        label: "Excès de sébum, brillance, imperfections",
        description: "Problématiques liées à l'excès de sébum"
      },
      {
        value: "sensible",
        label: "Rougeurs, réactivité, intolérances à certains ingrédients",
        description: "Problématiques liées à la sensibilité cutanée"
      }
    ]
  },
  {
    id: "texture_creme",
    question: "Quelle texture de crème préfères-tu instinctivement ?",
    options: [
      {
        value: "seche",
        label: "Riche et nourrissante",
        description: "Les textures riches conviennent aux peaux déshydratées"
      },
      {
        value: "mixte",
        label: "Légère sur la zone T, plus riche sur les joues",
        description: "Préférence pour des textures adaptées selon les zones"
      },
      {
        value: "grasse",
        label: "Très légère, gel ou fluide",
        description: "Les textures légères évitent de surcharger les peaux grasses"
      },
      {
        value: "sensible",
        label: "Sans parfum, hypoallergénique, apaisante",
        description: "Les formules minimalistes conviennent aux peaux réactives"
      }
    ]
  },
  {
    id: "maquillage_journee",
    question: "Comment se comporte ton maquillage au cours de la journée ?",
    options: [
      {
        value: "seche",
        label: "A tendance à marquer les ridules ou zones sèches",
        description: "Le maquillage peut accentuer les zones déshydratées"
      },
      {
        value: "mixte",
        label: "Tient bien sur les joues mais peut glisser sur la zone T",
        description: "Tenue variable selon les zones du visage"
      },
      {
        value: "grasse",
        label: "A tendance à \"fondre\" ou devenir brillant rapidement",
        description: "L'excès de sébum peut altérer la tenue du maquillage"
      },
      {
        value: "sensible",
        label: "Peut accentuer les rougeurs ou créer des irritations",
        description: "Les peaux sensibles peuvent réagir aux produits de maquillage"
      }
    ]
  },
  {
    id: "sensation_inconfort",
    question: "Ressens-tu souvent des sensations d'inconfort cutané ?",
    options: [
      {
        value: "seche",
        label: "Sensation de tiraillement fréquente",
        description: "Les tiraillements sont typiques des peaux déshydratées"
      },
      {
        value: "mixte",
        label: "Parfois des inconforts sur certaines zones, pas sur d'autres",
        description: "Sensations variables selon les zones du visage"
      },
      {
        value: "grasse",
        label: "Rarement, sauf si ma peau est trop nettoyée",
        description: "Les peaux grasses tolèrent bien la plupart des produits"
      },
      {
        value: "sensible",
        label: "Souvent des picotements, brûlures ou démangeaisons",
        description: "Les sensations d'inconfort sont fréquentes sur peaux sensibles"
      }
    ]
  }
];
