// Configuration Klaviyo centralisée
export const KLAVIYO_CONFIG = {
  API_KEY: "WMCz9t", // Votre clé API publique Klaviyo
  LIST_ID: "YggmTr", // List ID Klaviyo configuré
  BASE_URL: "https://a.klaviyo.com/api",
  TRACK_URL: "https://a.klaviyo.com/api/track",
  PROFILES_URL: "https://a.klaviyo.com/api/profiles/",
  REVISION: "2024-02-15"
};

// Fonction pour valider la configuration
export const validateKlaviyoConfig = () => {
  if (!KLAVIYO_CONFIG.API_KEY || KLAVIYO_CONFIG.API_KEY === "YOUR_API_KEY") {
    console.warn("⚠️ Configuration Klaviyo manquante. Veuillez configurer votre clé API.");
    return false;
  }
  return true;
};

// Fonction pour obtenir les headers d'authentification
export const getKlaviyoHeaders = () => ({
  'Authorization': `Klaviyo-API-Key ${KLAVIYO_CONFIG.API_KEY}`,
  'Content-Type': 'application/json',
  'revision': KLAVIYO_CONFIG.REVISION
}); 