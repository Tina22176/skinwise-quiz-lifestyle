// Configuration des questions avec coefficients d'importance
interface QuestionConfig {
  id: string;
  weight: number; // Coefficient d'importance (1-5)
  primaryImpact: string[]; // Caractéristiques principalement affectées
  secondaryImpact?: string[]; // Caractéristiques secondairement affectées
}

const QUESTION_CONFIGS: QuestionConfig[] = [
  {
    id: 'sensation_apres_nettoyage',
    weight: 3.0, // Question très diagnostique
    primaryImpact: ['hydratation', 'sebum'],
    secondaryImpact: ['protection']
  },
  {
    id: 'fin_journee',
    weight: 2.5, // Question importante
    primaryImpact: ['hydratation', 'sebum'],
    secondaryImpact: ['tolerance']
  },
  {
    id: 'tiraillements_frequents', 
    weight: 1.5, // Question de validation
    primaryImpact: ['hydratation'],
    secondaryImpact: ['sensibilite']
  },
  {
    id: 'pores',
    weight: 2.0, // Question diagnostique importante
    primaryImpact: ['sebum'],
    secondaryImpact: ['protection']
  },
  {
    id: 'imperfections',
    weight: 2.0, // Question diagnostique importante
    primaryImpact: ['sebum'],
    secondaryImpact: ['tolerance']
  },
  {
    id: 'maquillage_journee',
    weight: 1.2, // Question de validation
    primaryImpact: ['sebum'],
    secondaryImpact: ['hydratation']
  },
  {
    id: 'nouveaux_produits',
    weight: 4.0, // Très importante pour sensibilité
    primaryImpact: ['sensibilite', 'tolerance'],
    secondaryImpact: ['reactivite']
  },
  {
    id: 'sensation_inconfort',
    weight: 3.5, // Très importante pour sensibilité
    primaryImpact: ['sensibilite', 'reactivite'],
    secondaryImpact: ['tolerance']
  },
  {
    id: 'reaction_soleil',
    weight: 1.8, // Question secondaire
    primaryImpact: ['protection'],
    secondaryImpact: ['sensibilite']
  }
];

// Matrice de corrélations dermatologiques
const SKIN_CORRELATIONS = {
  // Si hydratation baisse, sensibilité augmente
  hydratation: {
    sensibilite: -0.6,  // Corrélation négative forte
    protection: 0.7,    // Corrélation positive forte
    reactivite: -0.4    // Corrélation négative modérée
  },
  // Si sébum augmente, tolérance augmente
  sebum: {
    tolerance: 0.5,
    protection: 0.3,
    sensibilite: -0.3
  },
  // Sensibilité et réactivité très liées
  sensibilite: {
    reactivite: 0.8,    // Corrélation très forte
    tolerance: -0.7     // Corrélation négative forte
  }
};

export interface ImprovedSkinCharacteristic {
  characteristic: string;
  value: number;
  fullMark: number;
  confidence: number; // Niveau de confiance du diagnostic (0-100)
  explanation: string;
  recommendations: string[];
}

export class ImprovedSkinScoreCalculator {
  private baseScores = {
    hydratation: 50,
    sensibilite: 50,
    sebum: 50,
    reactivite: 50,
    tolerance: 50,
    protection: 50
  };

  calculateSkinCharacteristics(answers: Record<string, string>): ImprovedSkinCharacteristic[] {
    let scores = { ...this.baseScores };
    let questionAnswered = 0;
    let totalWeight = 0;

    // Phase 1: Application des réponses avec pondération
    Object.entries(answers).forEach(([questionId, answer]) => {
      const config = QUESTION_CONFIGS.find(q => q.id === questionId);
      if (!config) {
        console.warn(`Question non configurée: ${questionId}`);
        return;
      }

      const impact = this.calculateQuestionImpact(questionId, answer);
      
      // Application sur caractéristiques principales
      config.primaryImpact.forEach(characteristic => {
        if (scores[characteristic] !== undefined) {
          scores[characteristic] = this.applySafeScoreChange(
            scores[characteristic], 
            impact * config.weight
          );
        }
      });

      // Application sur caractéristiques secondaires (impact réduit)
      config.secondaryImpact?.forEach(characteristic => {
        if (scores[characteristic] !== undefined) {
          scores[characteristic] = this.applySafeScoreChange(
            scores[characteristic], 
            impact * config.weight * 0.5
          );
        }
      });

      questionAnswered++;
      totalWeight += config.weight;
    });

    // Phase 2: Application des corrélations dermatologiques
    scores = this.applyDermatologicalCorrelations(scores);

    // Phase 3: Calcul du niveau de confiance
    const confidence = this.calculateConfidence(questionAnswered, totalWeight);

    // Phase 4: Génération des recommandations
    return this.generateCharacteristics(scores, confidence);
  }

  private calculateQuestionImpact(questionId: string, answer: string): number {
    // Logique spécifique par type de question
    switch (questionId) {
      case 'sensation_apres_nettoyage':
      case 'fin_journee':
        switch (answer) {
          case 'seche': return -30;
          case 'grasse': return +25;
          case 'mixte': return -10;
          case 'normale': return +10;
          default: return 0;
        }
      
      case 'tiraillements_frequents':
        switch (answer) {
          case 'seche': return -35;
          case 'grasse': return +20;
          case 'mixte': return -15;
          case 'normale': return +5;
          default: return 0;
        }

      case 'pores':
      case 'imperfections':
        switch (answer) {
          case 'seche': return -20;
          case 'grasse': return +30;
          case 'mixte': return +10;
          case 'normale': return 0;
          default: return 0;
        }

      case 'maquillage_journee':
        switch (answer) {
          case 'seche': return -15;
          case 'grasse': return +20;
          case 'mixte': return +5;
          case 'normale': return 0;
          default: return 0;
        }
      
      case 'nouveaux_produits':
      case 'sensation_inconfort':
        switch (answer) {
          case 'sensible': return +45;
          case 'normal': return -20;
          default: return 0;
        }

      case 'reaction_soleil':
        switch (answer) {
          case 'seche': return -25;
          case 'grasse': return +15;
          case 'mixte': return 0;
          case 'normale': return +5;
          default: return 0;
        }
      
      default:
        return 0;
    }
  }

  private applyDermatologicalCorrelations(scores: typeof this.baseScores): typeof this.baseScores {
    const correlatedScores = { ...scores };

    Object.entries(SKIN_CORRELATIONS).forEach(([sourceChar, correlations]) => {
      const sourceValue = scores[sourceChar];
      const deviation = sourceValue - 50; // Écart par rapport à la normale

      Object.entries(correlations).forEach(([targetChar, correlation]) => {
        if (correlatedScores[targetChar] !== undefined) {
          const impact = deviation * correlation * 0.3; // Facteur d'atténuation
          correlatedScores[targetChar] = this.applySafeScoreChange(
            correlatedScores[targetChar], 
            impact
          );
        }
      });
    });

    return correlatedScores;
  }

  private applySafeScoreChange(currentScore: number, change: number): number {
    return Math.max(0, Math.min(100, Math.round(currentScore + change)));
  }

  private calculateConfidence(questionsAnswered: number, totalWeight: number): number {
    const maxQuestions = QUESTION_CONFIGS.length;
    const maxWeight = QUESTION_CONFIGS.reduce((sum, q) => sum + q.weight, 0);
    
    const questionRatio = questionsAnswered / maxQuestions;
    const weightRatio = totalWeight / maxWeight;
    
    return Math.round((questionRatio * 0.4 + weightRatio * 0.6) * 100);
  }

  private generateCharacteristics(scores: Record<string, number>, confidence: number): ImprovedSkinCharacteristic[] {
    return [
      {
        characteristic: 'Hydratation',
        value: scores.hydratation,
        fullMark: 100,
        confidence,
        explanation: 'Capacité de ta peau à retenir l\'eau',
        recommendations: this.getHydratationRecommendations(scores.hydratation)
      },
      {
        characteristic: 'Sensibilité',
        value: scores.sensibilite,
        fullMark: 100,
        confidence,
        explanation: 'Réaction aux produits et agressions',
        recommendations: this.getSensibilityRecommendations(scores.sensibilite)
      },
      {
        characteristic: 'Sébum',
        value: scores.sebum,
        fullMark: 100,
        confidence,
        explanation: 'Production d\'huile naturelle',
        recommendations: this.getSebumRecommendations(scores.sebum)
      },
      {
        characteristic: 'Réactivité',
        value: scores.reactivite,
        fullMark: 100,
        confidence,
        explanation: 'Tendance aux rougeurs et irritations',
        recommendations: this.getReactivityRecommendations(scores.reactivite)
      },
      {
        characteristic: 'Tolérance',
        value: scores.tolerance,
        fullMark: 100,
        confidence,
        explanation: 'Résistance aux ingrédients actifs',
        recommendations: this.getToleranceRecommendations(scores.tolerance)
      },
      {
        characteristic: 'Protection',
        value: scores.protection,
        fullMark: 100,
        confidence,
        explanation: 'Barrière naturelle de la peau',
        recommendations: this.getProtectionRecommendations(scores.protection)
      }
    ];
  }

  private getHydratationRecommendations(score: number): string[] {
    if (score < 30) return ['Crème hydratante riche matin et soir', 'Sérum à l\'acide hyaluronique', 'Éviter les nettoyants agressifs', 'Masque hydratant 2-3 fois/semaine'];
    if (score > 70) return ['Maintenir la routine actuelle', 'Hydratation légère suffisante', 'Texture gel ou émulsion'];
    return ['Crème hydratante quotidienne', 'Sérum hydratant le soir', 'Adapter selon les saisons'];
  }

  private getSensibilityRecommendations(score: number): string[] {
    if (score > 70) return ['Produits hypoallergéniques uniquement', 'Tests patch obligatoires', 'Routine minimaliste', 'Éviter parfums et alcools'];
    if (score > 40) return ['Introduction progressive des nouveaux produits', 'Surveiller les réactions', 'Privilégier formules douces'];
    return ['Peau tolérante', 'Peut utiliser des actifs plus concentrés'];
  }

  private getSebumRecommendations(score: number): string[] {
    if (score > 70) return ['Nettoyant purifiant 2x/jour', 'Crème légère non-comédogène', 'Masque purifiant hebdomadaire', 'Éviter surlavage'];
    if (score < 30) return ['Nettoyant doux et nourrissant', 'Crème riche nourrissante', 'Éviter les actifs desséchants'];
    return ['Routine équilibrée', 'Nettoyant doux', 'Hydratation adaptée'];
  }

  private getReactivityRecommendations(score: number): string[] {
    if (score > 70) return ['Produits apaisants (centella, aloe)', 'Éviter les parfums et colorants', 'Protection solaire haute', 'Routine anti-inflammatoire'];
    if (score > 40) return ['Surveiller les réactions', 'Introduction douce des actifs', 'Produits testés dermatologiquement'];
    return ['Peau peu réactive', 'Peut tolérer des actifs variés'];
  }

  private getToleranceRecommendations(score: number): string[] {
    if (score > 70) return ['Actifs anti-âge possibles (rétinol, AHA)', 'Exfoliation régulière', 'Concentration élevée tolérée', 'Routine complète possible'];
    if (score < 40) return ['Introduction très progressive des actifs', 'Concentration faible d\'abord', 'Privilégier formules douces', 'Surveillance étroite'];
    return ['Introduction modérée des actifs', 'Concentration moyenne', 'Adapter selon les réactions'];
  }

  private getProtectionRecommendations(score: number): string[] {
    if (score < 40) return ['Crème barrière réparatrice', 'SPF 50+ quotidien obligatoire', 'Éviter agressions externes', 'Renforcer la barrière cutanée'];
    if (score > 70) return ['SPF quotidien recommandé', 'Barrière cutanée saine', 'Protection normale suffisante'];
    return ['SPF quotidien recommandé', 'Soins protecteurs en hiver', 'Maintenir l\'équilibre'];
  }
}