import { SkinTypeScore } from "../components/Quiz/utils/skinTypeCalculator";

// Types pour les données Klaviyo enrichies
export interface KlaviyoData {
  email: string;
  firstName?: string;
  skinType: string;
  skinState?: string | null;
  skinTypeScore: number;
  confidence: number;
  characteristics: string[];
  concerns: string[];
  personalizationLevel: string;
  validationErrors: string[];
  quizCompletionTime?: number;
  answers: Record<string, string>;
  recommendations: string[];
  source: string;
  timestamp: string;
}

// Configuration Klaviyo
const KLAVIYO_LIST_ID = process.env.VITE_KLAVIYO_LIST_ID || "YOUR_LIST_ID";
const KLAVIYO_API_KEY = process.env.VITE_KLAVIYO_API_KEY || "YOUR_API_KEY";

// Service Klaviyo enrichi
export class KlaviyoService {
  private static instance: KlaviyoService;
  private baseUrl = "https://a.klaviyo.com/api/v2";

  private constructor() {}

  public static getInstance(): KlaviyoService {
    if (!KlaviyoService.instance) {
      KlaviyoService.instance = new KlaviyoService();
    }
    return KlaviyoService.instance;
  }

  // Souscrire un utilisateur avec données enrichies
  async subscribeUser(data: KlaviyoData): Promise<boolean> {
    try {
      const profileData = {
        email: data.email,
        $first_name: data.firstName,
        $source: data.source,
        $consent: "email",
        $consent_timestamp: new Date().toISOString(),
        
        // Données de peau enrichies (nouveau système)
        skin_type: data.skinType,
        skin_state: data.skinState || "none",
        skin_type_score: data.skinTypeScore,
        confidence_level: data.confidence,
        skin_characteristics: data.characteristics.join(", "),
        skin_concerns: data.concerns.join(", "),
        personalization_level: data.personalizationLevel,
        has_validation_errors: data.validationErrors.length > 0,
        validation_error_count: data.validationErrors.length,
        
        // Données de comportement
        quiz_completion_time: data.quizCompletionTime,
        total_questions_answered: Object.keys(data.answers).length,
        
        // Réponses détaillées
        ...this.formatAnswers(data.answers),
        
        // Recommandations
        recommended_products_count: data.recommendations.length,
        recommendations: data.recommendations.join(" | "),
        
        // Métadonnées
        subscription_date: data.timestamp,
        quiz_version: "3.0",
        algorithm_version: "advanced_with_states"
      };

      const response = await fetch(`${this.baseUrl}/list/${KLAVIYO_LIST_ID}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        },
        body: JSON.stringify({
          profiles: [profileData]
        })
      });

      if (!response.ok) {
        throw new Error(`Klaviyo API error: ${response.status}`);
      }

      // Envoyer un événement personnalisé
      await this.trackEvent(data.email, "Quiz Completed", {
        skin_type: data.skinType,
        skin_state: data.skinState || "none",
        confidence: data.confidence,
        personalization_level: data.personalizationLevel,
        has_validation_errors: data.validationErrors.length > 0
      });

      return true;
    } catch (error) {
      console.error("Erreur lors de l'inscription Klaviyo:", error);
      return false;
    }
  }

  // Tracker un événement personnalisé
  async trackEvent(email: string, eventName: string, properties: Record<string, any>): Promise<void> {
    try {
      const eventData = {
        token: KLAVIYO_API_KEY,
        event: eventName,
        customer_properties: {
          $email: email
        },
        properties: {
          ...properties,
          timestamp: new Date().toISOString()
        }
      };

      await fetch("https://a.klaviyo.com/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData)
      });
    } catch (error) {
      console.error("Erreur lors du tracking d'événement:", error);
    }
  }

  // Formater les réponses pour Klaviyo
  private formatAnswers(answers: Record<string, string>): Record<string, string> {
    const formatted: Record<string, string> = {};
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const key = `answer_${questionId}`;
      formatted[key] = answer;
    });
    
    return formatted;
  }

  // Créer des segments basés sur les données enrichies
  async createSegments(): Promise<void> {
    const segments = [
      {
        name: "High Confidence Users",
        condition: "confidence_level >= 0.8"
      },
      {
        name: "Low Confidence Users", 
        condition: "confidence_level < 0.6"
      },
      {
        name: "Dry Skin Users",
        condition: "skin_type = 'dry'"
      },
      {
        name: "Sensitive Skin Users",
        condition: "skin_state = 'sensitive'"
      },
      {
        name: "Users with Validation Errors",
        condition: "has_validation_errors = true"
      },
      {
        name: "Advanced Personalization Users",
        condition: "personalization_level = 'advanced'"
      },
      {
        name: "Normal Skin Users",
        condition: "skin_type = 'normal' AND skin_state = 'none'"
      },
      {
        name: "Combination Skin Users",
        condition: "skin_type = 'combination'"
      },
      {
        name: "Oily Skin Users",
        condition: "skin_type = 'oily'"
      }
    ];

    // Note: L'implémentation complète nécessiterait l'API Klaviyo pour créer des segments
    console.log("Segments suggérés:", segments);
  }

  // Analyser les performances du quiz
  async analyzeQuizPerformance(): Promise<any> {
    try {
      // Récupérer les données de performance depuis Klaviyo
      const response = await fetch(`${this.baseUrl}/metrics/export`, {
        method: "GET",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Klaviyo API error: ${response.status}`);
      }

      const data = await response.json();
      return this.processPerformanceData(data);
    } catch (error) {
      console.error("Erreur lors de l'analyse des performances:", error);
      return null;
    }
  }

  // Traiter les données de performance
  private processPerformanceData(data: any): any {
    return {
      totalSubscribers: data.total_subscribers || 0,
      averageConfidence: data.average_confidence || 0,
      mostCommonSkinType: data.most_common_skin_type || "unknown",
      mostCommonSkinState: data.most_common_skin_state || "none",
      validationErrorRate: data.validation_error_rate || 0,
      personalizationDistribution: data.personalization_distribution || {},
      conversionRate: data.conversion_rate || 0
    };
  }
}

// Fonction utilitaire pour créer les données Klaviyo
export const createKlaviyoData = (
  email: string,
  firstName: string,
  skinTypeScore: SkinTypeScore,
  answers: Record<string, string>,
  personalizationLevel: string,
  validationErrors: string[],
  recommendations: string[],
  quizCompletionTime?: number
): KlaviyoData => {
  return {
    email,
    firstName,
    skinType: skinTypeScore.type,
    skinState: skinTypeScore.state,
    skinTypeScore: skinTypeScore.score,
    confidence: skinTypeScore.confidence,
    characteristics: skinTypeScore.characteristics,
    concerns: skinTypeScore.concerns,
    personalizationLevel,
    validationErrors,
    quizCompletionTime,
    answers,
    recommendations,
    source: "skinwise-quiz",
    timestamp: new Date().toISOString()
  };
};

// Export de l'instance singleton
export const klaviyoService = KlaviyoService.getInstance();
