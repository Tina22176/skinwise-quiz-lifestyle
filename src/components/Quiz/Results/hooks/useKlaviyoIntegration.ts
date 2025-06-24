
import { useCallback } from "react";

export const useKlaviyoIntegration = () => {
  const klaviyoApiKey = "WMCz9t";

  const subscribeToNewsletter = useCallback(async (email: string, firstName: string, skinType: string) => {
    try {
      const profileData = {
        data: {
          type: "profile",
          attributes: {
            email: email,
            first_name: firstName,
            properties: {
              skin_type: skinType,
              quiz_completed: true,
              subscription_source: "skin_quiz"
            }
          }
        }
      };

      const response = await fetch('https://a.klaviyo.com/api/profiles/', {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
          'Content-Type': 'application/json',
          'revision': '2024-02-15'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Profile créé/mis à jour avec succès:', result);
      return { success: true, data: result };
    } catch (error) {
      console.error('Erreur lors de la création du profil Klaviyo:', error);
      return { success: false, error };
    }
  }, [klaviyoApiKey]);

  return {
    subscribeToNewsletter
  };
};
