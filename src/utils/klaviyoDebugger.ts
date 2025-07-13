
import { KLAVIYO_CONFIG, KLAVIYO_ENDPOINTS } from "@/config/klaviyo";
import { logger } from "./logger";

export class KlaviyoDebugger {
  static async testConnection() {
    logger.log("🔍 TEST CONNEXION KLAVIYO");
    
    try {
      // Test simple avec un profil de test
      const testProfile = {
        data: {
          type: "profile",
          attributes: {
            email: "test@example.com",
            first_name: "Test",
            properties: {
              debug_test: true,
              test_timestamp: new Date().toISOString()
            }
          }
        }
      };

      const response = await fetch(KLAVIYO_ENDPOINTS.profiles, {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
          'Content-Type': 'application/json',
          'revision': KLAVIYO_CONFIG.apiVersion
        },
        body: JSON.stringify(testProfile)
      });

      const result = await response.text();
      
      logger.log("📊 RÉSULTAT TEST KLAVIYO:", {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        response: result
      });

      return {
        success: response.ok,
        status: response.status,
        data: result
      };
    } catch (error) {
      logger.error("❌ ERREUR TEST KLAVIYO:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async testSensitiveSkinFlow(email: string, skinType: string) {
    logger.log("🧪 TEST FLUX PEAU SENSIBLE:", { email, skinType });
    
    try {
      const sensitiveProfile = {
        data: {
          type: "profile",
          attributes: {
            email: email,
            first_name: "Test Sensible",
            properties: {
              skin_type: skinType,
              skin_state: 'sensitive',
              combined_skin_type: `${skinType}_sensitive`,
              is_sensitive_skin: true,
              flow_trigger: `quiz_completed_${skinType}_sensitive`,
              test_sensitive: true,
              debug_timestamp: new Date().toISOString()
            }
          }
        }
      };

      const response = await fetch(KLAVIYO_ENDPOINTS.profiles, {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
          'Content-Type': 'application/json',
          'revision': KLAVIYO_CONFIG.apiVersion
        },
        body: JSON.stringify(sensitiveProfile)
      });

      const result = await response.text();
      
      logger.log("📨 RÉSULTAT TEST PEAU SENSIBLE:", {
        email,
        skinType,
        status: response.status,
        success: response.ok,
        response: result
      });

      return response.ok;
    } catch (error) {
      logger.error("❌ ERREUR TEST PEAU SENSIBLE:", error);
      return false;
    }
  }

  static logCurrentConfig() {
    logger.log("⚙️ CONFIGURATION KLAVIYO ACTUELLE:", {
      publicKey: KLAVIYO_CONFIG.publicKey,
      privateKeyPrefix: KLAVIYO_CONFIG.privateKey.substring(0, 8) + "...",
      listId: KLAVIYO_CONFIG.listId,
      apiVersion: KLAVIYO_CONFIG.apiVersion,
      profilesEndpoint: KLAVIYO_ENDPOINTS.profiles,
      subscriptionsEndpoint: KLAVIYO_ENDPOINTS.subscriptions
    });
  }
}

// Fonction globale pour debug depuis la console
(window as any).testKlaviyo = async () => {
  KlaviyoDebugger.logCurrentConfig();
  const result = await KlaviyoDebugger.testConnection();
  console.log("Test Klaviyo result:", result);
  return result;
};

(window as any).testSensitiveSkin = async (email: string, skinType: string = 'dry') => {
  const result = await KlaviyoDebugger.testSensitiveSkinFlow(email, skinType);
  console.log("Test peau sensible result:", result);
  return result;
};
