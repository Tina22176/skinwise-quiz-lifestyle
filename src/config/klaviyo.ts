
// Configuration Klaviyo centralisée - VERSION CORRIGÉE
export const KLAVIYO_CONFIG = {
  // Clé publique pour le tracking côté client
  PUBLIC_API_KEY: "WMCz9t",
  
  // Configuration pour API v3
  LIST_ID: "YggmTr",
  BASE_URL: "https://a.klaviyo.com/api",
  PROFILES_URL: "https://a.klaviyo.com/api/profiles/",
  TRACK_URL: "https://a.klaviyo.com/api/track",
  LISTS_URL: "https://a.klaviyo.com/api/lists/",
  REVISION: "2024-02-15"
};

// Fonction pour valider la configuration
export const validateKlaviyoConfig = () => {
  if (!KLAVIYO_CONFIG.PUBLIC_API_KEY || KLAVIYO_CONFIG.PUBLIC_API_KEY === "YOUR_API_KEY") {
    console.warn("⚠️ Configuration Klaviyo manquante. Veuillez configurer votre clé API.");
    return false;
  }
  return true;
};

// Headers pour les appels côté client (tracking)
export const getKlaviyoTrackingHeaders = () => ({
  'Content-Type': 'application/json'
});

// Headers pour les appels serveur (avec clé privée)
export const getKlaviyoPrivateHeaders = (privateKey: string) => ({
  'Authorization': `Klaviyo-API-Key ${privateKey}`,
  'Content-Type': 'application/json',
  'revision': KLAVIYO_CONFIG.REVISION
});
