import { KLAVIYO_CONFIG } from "@/config/klaviyo";

export const testKlaviyoIntegration = async () => {
  console.log("🧪 Test de l'intégration Klaviyo...");
  
  try {
    // Test 1: Vérifier la configuration
    console.log("📋 Configuration Klaviyo:");
    console.log("- API Key:", KLAVIYO_CONFIG.API_KEY);
    console.log("- List ID:", KLAVIYO_CONFIG.LIST_ID);
    console.log("- Track URL:", KLAVIYO_CONFIG.TRACK_URL);
    
    // Test 2: Test de connexion à l'API Klaviyo via tracking
    const testData = {
      token: KLAVIYO_CONFIG.API_KEY,
      event: "Test Integration",
      customer_properties: {
        $email: "test@example.com",
        $first_name: "Test",
        $consent: "email",
        $consent_timestamp: new Date().toISOString()
      },
      properties: {
        test_mode: true,
        test_timestamp: new Date().toISOString(),
        list_id: KLAVIYO_CONFIG.LIST_ID
      }
    };
    
    console.log("📤 Test d'envoi de données via tracking API...");
    
    const response = await fetch(KLAVIYO_CONFIG.TRACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log("📥 Réponse Klaviyo:", response.status, response.statusText);
    
    if (response.ok) {
      const result = await response.json();
      console.log("✅ Test réussi ! Réponse:", result);
      return { success: true, message: "Intégration Klaviyo fonctionnelle" };
    } else {
      const errorText = await response.text();
      console.error("❌ Test échoué:", errorText);
      return { success: false, message: `Erreur ${response.status}: ${errorText}` };
    }
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
    return { success: false, message: `Erreur: ${error}` };
  }
};

// Fonction pour tester l'ajout à une liste spécifique via tracking
export const testKlaviyoListSubscription = async (email: string, firstName: string) => {
  console.log("📧 Test d'ajout à la liste Klaviyo via tracking...");
  
  try {
    const trackingData = {
      token: KLAVIYO_CONFIG.API_KEY,
      event: "List Subscription",
      customer_properties: {
        $email: email,
        $first_name: firstName,
        $consent: "email",
        $consent_timestamp: new Date().toISOString()
      },
      properties: {
        list_id: KLAVIYO_CONFIG.LIST_ID,
        subscription_source: "skinwise-quiz-test",
        test_mode: true,
        test_timestamp: new Date().toISOString()
      }
    };
    
    const response = await fetch(KLAVIYO_CONFIG.TRACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingData)
    });
    
    console.log("📥 Réponse tracking Klaviyo:", response.status, response.statusText);
    
    if (response.ok) {
      const result = await response.json();
      console.log("✅ Tracking réussi ! Réponse:", result);
      return { success: true, message: "Tracking Klaviyo réussi" };
    } else {
      const errorText = await response.text();
      console.error("❌ Échec du tracking:", errorText);
      return { success: false, message: `Erreur ${response.status}: ${errorText}` };
    }
    
  } catch (error) {
    console.error("❌ Erreur lors du tracking:", error);
    return { success: false, message: `Erreur: ${error}` };
  }
}; 