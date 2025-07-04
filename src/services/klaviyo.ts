
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
  answers: Record<string, string>;
  source: string;
  timestamp: string;
}

// Configuration Klaviyo
const KLAVIYO_PUBLIC_KEY = "WMCz9t";

// Service Klaviyo simplifié pour l'API v3
export class KlaviyoService {
  private static instance: KlaviyoService;

  private constructor() {}

  public static getInstance(): KlaviyoService {
    if (!KlaviyoService.instance) {
      KlaviyoService.instance = new KlaviyoService();
    }
    return KlaviyoService.instance;
  }

  // Souscrire un utilisateur via le serveur backend
  async subscribeUser(data: KlaviyoData): Promise<boolean> {
    try {
      console.log("📤 Envoi vers serveur Klaviyo:", data);

      const response = await fetch('/api/klaviyo-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          skinType: data.skinType,
          skinState: data.skinState,
          skinTypeScore: data.skinTypeScore,
          confidence: data.confidence,
          characteristics: data.characteristics.join(", "),
          concerns: data.concerns.join(", "),
          answers: JSON.stringify(data.answers),
          timestamp: data.timestamp
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erreur serveur Klaviyo:", errorData);
        throw new Error(`Klaviyo error: ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log("✅ Utilisateur ajouté à Klaviyo:", result);

      // Envoyer événement de tracking
      await this.trackQuizCompletion(data);

      return true;
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription Klaviyo:", error);
      return false;
    }
  }

  // Tracker la completion du quiz
  async trackQuizCompletion(data: KlaviyoData): Promise<void> {
    try {
      const trackingData = {
        token: KLAVIYO_PUBLIC_KEY,
        event: "Quiz Completed",
        customer_properties: {
          $email: data.email,
          $first_name: data.firstName
        },
        properties: {
          skin_type: data.skinType,
          skin_state: data.skinState || "none",
          confidence: data.confidence,
          characteristics_count: data.characteristics.length,
          concerns_count: data.concerns.length,
          timestamp: data.timestamp
        }
      };

      await fetch("https://a.klaviyo.com/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingData)
      });

      console.log("✅ Événement Quiz Completed tracké");
    } catch (error) {
      console.error("❌ Erreur lors du tracking:", error);
    }
  }
}

// Fonction utilitaire pour créer les données Klaviyo
export const createKlaviyoData = (
  email: string,
  firstName: string,
  skinTypeScore: SkinTypeScore,
  answers: Record<string, string>
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
    answers,
    source: "skinwise-quiz",
    timestamp: new Date().toISOString()
  };
};

// Export de l'instance singleton
export const klaviyoService = KlaviyoService.getInstance();
