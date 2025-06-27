// Types pour les tests A/B
export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABVariant[];
  isActive: boolean;
  startDate: string;
  endDate?: string;
  metrics: ABMetric[];
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // Pourcentage de trafic (0-100)
  config: ABTestConfig;
}

export interface ABTestConfig {
  questionOrder?: string[];
  questionCount?: number;
  showTips?: boolean;
  tipDelay?: number;
  showConfidence?: boolean;
  algorithmVersion?: 'basic' | 'advanced';
  personalizationLevel?: 'basic' | 'intermediate' | 'advanced';
  uiVersion?: 'v1' | 'v2' | 'v3';
}

export interface ABMetric {
  name: string;
  type: 'conversion' | 'engagement' | 'completion' | 'confidence';
  target: number;
  currentValue: number;
}

// Tests A/B actifs
const ACTIVE_TESTS: ABTest[] = [
  {
    id: "algorithm-comparison",
    name: "Comparaison d'algorithmes",
    description: "Test de l'algorithme avancé vs basique",
    isActive: true,
    startDate: "2024-01-01",
    variants: [
      {
        id: "control",
        name: "Algorithme basique",
        weight: 50,
        config: {
          algorithmVersion: 'basic',
          showConfidence: false
        }
      },
      {
        id: "treatment",
        name: "Algorithme avancé",
        weight: 50,
        config: {
          algorithmVersion: 'advanced',
          showConfidence: true
        }
      }
    ],
    metrics: [
      {
        name: "Taux de completion",
        type: "completion",
        target: 85,
        currentValue: 0
      },
      {
        name: "Score de confiance moyen",
        type: "confidence",
        target: 0.8,
        currentValue: 0
      }
    ]
  },
  {
    id: "question-order",
    name: "Ordre des questions",
    description: "Test de différents ordres de questions",
    isActive: true,
    startDate: "2024-01-01",
    variants: [
      {
        id: "standard",
        name: "Ordre standard",
        weight: 33,
        config: {
          questionOrder: [
            "sensation_apres_nettoyage",
            "fin_journee",
            "pores",
            "imperfections",
            "reaction_soleil",
            "nouveaux_produits",
            "souci_principal",
            "texture_creme",
            "sensation_inconfort"
          ]
        }
      },
      {
        id: "priority-first",
        name: "Questions prioritaires en premier",
        weight: 33,
        config: {
          questionOrder: [
            "sensation_apres_nettoyage",
            "fin_journee",
            "pores",
            "imperfections",
            "reaction_soleil",
            "nouveaux_produits",
            "souci_principal",
            "texture_creme",
            "sensation_inconfort"
          ]
        }
      },
      {
        id: "engagement-first",
        name: "Questions engageantes en premier",
        weight: 34,
        config: {
          questionOrder: [
            "souci_principal",
            "texture_creme",
            "sensation_apres_nettoyage",
            "fin_journee",
            "pores",
            "imperfections",
            "reaction_soleil",
            "nouveaux_produits",
            "sensation_inconfort"
          ]
        }
      }
    ],
    metrics: [
      {
        name: "Taux de completion",
        type: "completion",
        target: 90,
        currentValue: 0
      },
      {
        name: "Temps de completion",
        type: "engagement",
        target: 180, // secondes
        currentValue: 0
      }
    ]
  },
  {
    id: "ui-optimization",
    name: "Optimisation UI",
    description: "Test de différentes versions d'interface",
    isActive: true,
    startDate: "2024-01-01",
    variants: [
      {
        id: "current",
        name: "Version actuelle",
        weight: 50,
        config: {
          uiVersion: 'v1',
          showTips: true,
          tipDelay: 10000
        }
      },
      {
        id: "enhanced",
        name: "Version améliorée",
        weight: 50,
        config: {
          uiVersion: 'v2',
          showTips: true,
          tipDelay: 5000
        }
      }
    ],
    metrics: [
      {
        name: "Taux de completion",
        type: "completion",
        target: 88,
        currentValue: 0
      },
      {
        name: "Temps moyen par question",
        type: "engagement",
        target: 15, // secondes
        currentValue: 0
      }
    ]
  }
];

// Service de tests A/B
export class ABTestingService {
  private static instance: ABTestingService;
  private userAssignments: Map<string, Record<string, string>> = new Map();

  private constructor() {}

  public static getInstance(): ABTestingService {
    if (!ABTestingService.instance) {
      ABTestingService.instance = new ABTestingService();
    }
    return ABTestingService.instance;
  }

  // Assigner un utilisateur à une variante
  assignUserToVariant(userId: string, testId: string): ABVariant {
    const test = ACTIVE_TESTS.find(t => t.id === testId && t.isActive);
    if (!test) {
      return this.getDefaultVariant();
    }

    // Vérifier si l'utilisateur a déjà été assigné
    const userAssignments = this.userAssignments.get(userId) || {};
    if (userAssignments[testId]) {
      const assignedVariant = test.variants.find(v => v.id === userAssignments[testId]);
      return assignedVariant || this.getDefaultVariant();
    }

    // Assigner selon les poids
    const random = Math.random() * 100;
    let cumulativeWeight = 0;
    
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        // Sauvegarder l'assignation
        userAssignments[testId] = variant.id;
        this.userAssignments.set(userId, userAssignments);
        
        // Sauvegarder dans localStorage pour persistance
        localStorage.setItem(`ab_test_${testId}`, variant.id);
        
        return variant;
      }
    }

    return test.variants[0] || this.getDefaultVariant();
  }

  // Récupérer l'assignation existante
  getUserVariant(userId: string, testId: string): ABVariant {
    const test = ACTIVE_TESTS.find(t => t.id === testId && t.isActive);
    if (!test) {
      return this.getDefaultVariant();
    }

    // Vérifier localStorage en premier
    const storedVariant = localStorage.getItem(`ab_test_${testId}`);
    if (storedVariant) {
      const variant = test.variants.find(v => v.id === storedVariant);
      if (variant) {
        return variant;
      }
    }

    // Sinon, assigner une nouvelle variante
    return this.assignUserToVariant(userId, testId);
  }

  // Tracker un événement pour les métriques
  trackEvent(userId: string, testId: string, eventName: string, value?: number): void {
    const test = ACTIVE_TESTS.find(t => t.id === testId);
    if (!test) return;

    const variant = this.getUserVariant(userId, testId);
    const event = {
      userId,
      testId,
      variantId: variant.id,
      eventName,
      value,
      timestamp: new Date().toISOString()
    };

    // Sauvegarder l'événement
    this.saveEvent(event);
    
    // Mettre à jour les métriques en temps réel
    this.updateMetrics(testId, eventName, value);
  }

  // Sauvegarder un événement
  private saveEvent(event: any): void {
    const events = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
    events.push(event);
    localStorage.setItem('ab_test_events', JSON.stringify(events.slice(-1000))); // Garder les 1000 derniers
  }

  // Mettre à jour les métriques
  private updateMetrics(testId: string, eventName: string, value?: number): void {
    const test = ACTIVE_TESTS.find(t => t.id === testId);
    if (!test) return;

    const metric = test.metrics.find(m => m.name.toLowerCase().includes(eventName.toLowerCase()));
    if (metric && value !== undefined) {
      metric.currentValue = value;
    }
  }

  // Obtenir les résultats des tests
  getTestResults(testId: string): any {
    const test = ACTIVE_TESTS.find(t => t.id === testId);
    if (!test) return null;

    const events = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
    const testEvents = events.filter((e: any) => e.testId === testId);

    const results = {
      testId,
      testName: test.name,
      variants: test.variants.map(variant => {
        const variantEvents = testEvents.filter((e: any) => e.variantId === variant.id);
        return {
          ...variant,
          events: variantEvents,
          metrics: this.calculateVariantMetrics(variantEvents, test.metrics)
        };
      }),
      totalEvents: testEvents.length,
      startDate: test.startDate,
      isActive: test.isActive
    };

    return results;
  }

  // Calculer les métriques par variante
  private calculateVariantMetrics(events: any[], metrics: ABMetric[]): any {
    const completionEvents = events.filter(e => e.eventName === 'quiz_completed');
    const confidenceEvents = events.filter(e => e.eventName === 'confidence_score');
    const timeEvents = events.filter(e => e.eventName === 'completion_time');

    return {
      completionRate: completionEvents.length / events.length * 100,
      averageConfidence: confidenceEvents.length > 0 
        ? confidenceEvents.reduce((sum, e) => sum + (e.value || 0), 0) / confidenceEvents.length 
        : 0,
      averageCompletionTime: timeEvents.length > 0
        ? timeEvents.reduce((sum, e) => sum + (e.value || 0), 0) / timeEvents.length
        : 0
    };
  }

  // Obtenir la configuration pour un utilisateur
  getUserConfig(userId: string): ABTestConfig {
    const configs: ABTestConfig[] = [];
    
    ACTIVE_TESTS.forEach(test => {
      if (test.isActive) {
        const variant = this.getUserVariant(userId, test.id);
        configs.push(variant.config);
      }
    });

    // Fusionner les configurations
    return this.mergeConfigs(configs);
  }

  // Fusionner plusieurs configurations
  private mergeConfigs(configs: ABTestConfig[]): ABTestConfig {
    return configs.reduce((merged, config) => ({
      ...merged,
      ...config
    }), {});
  }

  // Variante par défaut
  private getDefaultVariant(): ABVariant {
    return {
      id: "default",
      name: "Par défaut",
      weight: 100,
      config: {
        algorithmVersion: 'advanced',
        showTips: true,
        tipDelay: 10000,
        showConfidence: true,
        personalizationLevel: 'basic',
        uiVersion: 'v1'
      }
    };
  }

  // Obtenir tous les tests actifs
  getActiveTests(): ABTest[] {
    return ACTIVE_TESTS.filter(test => test.isActive);
  }

  // Désactiver un test
  deactivateTest(testId: string): void {
    const test = ACTIVE_TESTS.find(t => t.id === testId);
    if (test) {
      test.isActive = false;
      test.endDate = new Date().toISOString();
    }
  }

  // Activer un test
  activateTest(testId: string): void {
    const test = ACTIVE_TESTS.find(t => t.id === testId);
    if (test) {
      test.isActive = true;
      test.startDate = new Date().toISOString();
      test.endDate = undefined;
    }
  }
}

// Export de l'instance singleton
export const abTestingService = ABTestingService.getInstance();

// Hooks pour React
export const useABTesting = (userId: string) => {
  const getUserConfig = () => abTestingService.getUserConfig(userId);
  const trackEvent = (testId: string, eventName: string, value?: number) => 
    abTestingService.trackEvent(userId, testId, eventName, value);
  const getTestResults = (testId: string) => abTestingService.getTestResults(testId);

  return {
    getUserConfig,
    trackEvent,
    getTestResults,
    activeTests: abTestingService.getActiveTests()
  };
}; 