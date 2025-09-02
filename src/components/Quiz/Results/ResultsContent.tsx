
import React, { useState } from "react";
import { SkinTypeHeader } from "./SkinTypeHeader";
import { SubscriptionForm } from "./SubscriptionForm";
import { SubscribedActions } from "./SubscribedActions";
import { UnsubscribedActions } from "./UnsubscribedActions";
import { useQuiz } from "../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "./SkinTypeDetails";

export const ResultsContent: React.FC = () => {
  const { state } = useQuiz();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscriptionSuccess = () => {
    setIsSubscribed(true);
  };

  const handleShowDetailedResults = () => {
    // TODO: Implement detailed results view
    console.log("Show detailed results");
  };

  const visitInstagram = () => {
    window.open("https://www.instagram.com/majolie_peau/", "_blank");
  };

  if (!state.hormoneProfile && !state.result) {
    return <div>Chargement des résultats...</div>;
  }

  const skinType = state.hormoneProfile?.type || state.result || "normal";
  const skinState = null;
  const profileDetails = state.hormoneProfile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-4xl">
        {/* Header avec type de peau */}
        <SkinTypeHeader 
          skinType={skinType} 
          skinState={skinState}
          variants={{}}
        />
        
        {/* Section d'inscription en premier */}
        <div className="glass-strong rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-center">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              🌟 PROCHAINE ÉTAPE 🌟
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
              Reçois ta routine personnalisée gratuite adaptée à tes besoins spécifiques !
            </p>
          </div>
          {!isSubscribed ? (
            <SubscriptionForm
              email=""
              setEmail={() => {}}
              firstName=""
              setFirstName={() => {}}
              isLoading={false}
              gdprConsent={false}
              setGdprConsent={() => {}}
              handleSubmit={async () => {}}
              variants={{}}
            />
          ) : (
            <div className="text-center">
              <div className="text-green-600 text-2xl mb-3 sm:mb-4">✅</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Merci ! Ta routine personnalisée arrive bientôt
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Vérifie tes emails pour recevoir tes recommandations détaillées
              </p>
            </div>
          )}
        </div>

        {/* Description simple du type de peau */}
        <div className="glass rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Ton profil hormonal : {getSkinTypeText(skinType)}
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {state.hormoneProfile?.characteristics?.join(", ") || "Profil en cours d'analyse..."}
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="mb-6 sm:mb-8">
          {isSubscribed ? (
            <SubscribedActions 
              handleShare={() => {}}
              visitInstagram={visitInstagram}
              onResetQuiz={() => {}}
              variants={{}}
            />
          ) : (
            <UnsubscribedActions 
              visitInstagram={visitInstagram}
              onResetQuiz={() => {}}
              onShowDetailedResults={handleShowDetailedResults}
              variants={{}}
            />
          )}
        </div>
      </div>
    </div>
  );
};
