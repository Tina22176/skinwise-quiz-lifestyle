
// Configuration Klaviyo avec les nouvelles clés
export const KLAVIYO_CONFIG = {
  publicKey: "WMCz9t", // Clé publique pour le tracking côté client
  privateKey: "pk_491b35e628eda613e8c86a0cba55cade55", // Clé privée pour les API calls
  listId: "YggmTr", // ID de la liste cible
  apiVersion: "2024-02-15" // Version API v3
};

export const KLAVIYO_ENDPOINTS = {
  profiles: "https://a.klaviyo.com/api/profiles/",
  subscriptions: "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/"
};
