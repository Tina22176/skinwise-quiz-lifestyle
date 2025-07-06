
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuiz, getSkinTypeFormatted } from "../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "./SkinTypeDetails";
import { KLAVIYO_CONFIG, KLAVIYO_ENDPOINTS } from "@/config/klaviyo";

export const useEmailSubscription = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Merci d'accepter les conditions pour recevoir ta routine personnalisée.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("🚀 Envoi des données à Klaviyo avec la nouvelle configuration");

    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      const formattedSkinType = getSkinTypeFormatted(state.result);
      const skinTypeInFrench = getSkinTypeText(formattedSkinType);

      // Créer le profil avec l'API v3 de Klaviyo
      const profileData = {
        data: {
          type: "profile",
          attributes: {
            email: email,
            first_name: firstName,
            properties: {
              skin_type: formattedSkinType,
              skin_type_french: skinTypeInFrench,
              quiz_completed: true,
              quiz_completion_date: new Date().toISOString(),
              subscription_source: "skin_quiz_premium",
              consent_given: gdprConsent,
              quiz_answers: state.answers,
              skin_details: getSkinTypeDetails(state.result || "normal"),
            }
          }
        }
      };

      console.log("📤 Création du profil Klaviyo:", profileData);

      // Appel API pour créer le profil
      const profileResponse = await fetch(KLAVIYO_ENDPOINTS.profiles, {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
          "Content-Type": "application/json",
          "revision": KLAVIYO_CONFIG.apiVersion,
        },
        body: JSON.stringify(profileData),
      });

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error("❌ Erreur lors de la création du profil:", errorText);
        throw new Error(`Erreur API Klaviyo: ${profileResponse.status}`);
      }

      const profileResult = await profileResponse.json();
      console.log("✅ Profil créé avec succès:", profileResult);

      // Ajouter à la liste spécifique
      const subscriptionData = {
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email: email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED"
                        }
                      }
                    }
                  }
                }
              ]
            }
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: KLAVIYO_CONFIG.listId
              }
            }
          }
        }
      };

      console.log("📤 Ajout à la liste Klaviyo:", subscriptionData);

      const subscriptionResponse = await fetch(KLAVIYO_ENDPOINTS.subscriptions, {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_CONFIG.privateKey}`,
          "Content-Type": "application/json",
          "revision": KLAVIYO_CONFIG.apiVersion,
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!subscriptionResponse.ok) {
        const errorText = await subscriptionResponse.text();
        console.error("⚠️ Erreur lors de l'ajout à la liste:", errorText);
        // On continue quand même car le profil a été créé
      } else {
        const subscriptionResult = await subscriptionResponse.json();
        console.log("✅ Ajouté à la liste avec succès:", subscriptionResult);
      }

      setIsSubscribed(true);
      toast({
        title: "Parfait ! 💝",
        description: "Ta routine personnalisée arrive dans ta boîte mail 💌",
      });

    } catch (error) {
      console.error("❌ Erreur lors de l'envoi à Klaviyo:", error);
      toast({
        title: "Oups !",
        description: "Une erreur est survenue. Merci de réessayer dans quelques instants.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    isSubscribed,
    isLoading,
    gdprConsent,
    setGdprConsent,
    handleSubmit
  };
};
