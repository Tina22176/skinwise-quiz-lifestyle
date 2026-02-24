
import { BREVO_CONFIG, BREVO_ENDPOINTS } from "@/config/brevo";
import { logger } from "./logger";

export class BrevoDebugger {
  static async testConnection() {
    logger.log("🔍 TEST CONNEXION BREVO");
    
    try {
      // Test simple : récupérer les infos du compte ou essayer de créer un contact test
      // On va essayer de créer/mettre à jour un contact de test
      const testEmail = "test_debug_skinwise@example.com";
      
      const payload = {
        email: testEmail,
        attributes: {
          FIRSTNAME: "Test Debug",
          ORIGIN: "debug_tool"
        },
        listIds: [BREVO_CONFIG.listId],
        updateEnabled: true
      };

      const response = await fetch(BREVO_ENDPOINTS.contacts, {
        method: 'POST',
        headers: {
          'api-key': BREVO_CONFIG.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      logger.log("📊 RÉSULTAT TEST BREVO:", {
        status: response.status,
        ok: response.ok,
        response: result
      });

      return {
        success: response.ok,
        status: response.status,
        data: result
      };
    } catch (error) {
      logger.error("❌ ERREUR TEST BREVO:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  static logCurrentConfig() {
    // Masquer la clé API pour la sécurité dans les logs
    const maskedKey = BREVO_CONFIG.apiKey 
      ? `${BREVO_CONFIG.apiKey.substring(0, 8)}...${BREVO_CONFIG.apiKey.substring(BREVO_CONFIG.apiKey.length - 4)}`
      : "NON DÉFINIE";

    logger.log("⚙️ CONFIGURATION BREVO ACTUELLE:", {
      apiKey: maskedKey,
      listId: BREVO_CONFIG.listId,
      contactsEndpoint: BREVO_ENDPOINTS.contacts
    });
  }
}

// Fonction globale pour debug depuis la console
(window as any).testBrevo = async () => {
  BrevoDebugger.logCurrentConfig();
  const result = await BrevoDebugger.testConnection();
  console.log("Test Brevo result:", result);
  return result;
};
