
// Configuration Klaviyo avec les vraies clés
export const KLAVIYO_CONFIG = {
  publicKey: "WMCz9t", // Clé publique pour le tracking côté client
  privateKey: "pk_69cb1244f5613b40c8a535b34e67633d6f", // Clé privée pour les API calls
  listId: "YggmTr", // ID de la liste cible
  apiVersion: "2024-02-15" // Version API v3
};

export const KLAVIYO_ENDPOINTS = {
  profiles: "https://a.klaviyo.com/api/profiles/",
  subscriptions: "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/"
};
