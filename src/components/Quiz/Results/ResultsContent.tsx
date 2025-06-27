import React, { useState } from "react";
import { SkinTypeHeader } from "./SkinTypeHeader";
import { SubscriptionForm } from "./SubscriptionForm";
import { SkinProfileCard } from "./SkinProfileCard";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";
import { DetailedResultsChart } from "./DetailedResultsChart";
import { SubscribedActions } from "./SubscribedActions";
import { UnsubscribedActions } from "./UnsubscribedActions";
import { QuizContext } from "../QuizContext";

export const ResultsContent: React.FC = () => {
  const { quizState } = React.useContext(QuizContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDetailedResults, setShowDetailedResults ] = useState(false);

  const handleSubscriptionSuccess = () => {
    setIsSubscribed(true);
    setShowDetailedResults(true);
  };

  const handleShowDetailedResults = () => {
    setShowDetailedResults(true);
  };

  if (!quizState.results) {
    return <div>Chargement des résultats...</div>;
  }

  const { skinType, skinState, scores, characteristics, concerns, recommendations } = quizState.results;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-4xl">
        {/* Header avec type de peau */}
        <SkinTypeHeader skinType={skinType} skinState={skinState} />

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
              skinType={skinType}
              skinState={skinState}
              onSubscriptionSuccess={handleSubscriptionSuccess}
              className="max-w-md mx-auto"
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
            Ton type de peau : {skinType}
            {skinState && skinState !== "none" && ` (${skinState})`}
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Ta peau présente des caractéristiques uniques qui nécessitent des soins adaptés. 
            Notre analyse révèle que tu as besoin d'une approche personnalisée pour optimiser 
            la santé et l'apparence de ta peau.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="mb-6 sm:mb-8">
          {isSubscribed ? (
            <SubscribedActions 
              skinType={skinType}
              onShowDetailedResults={handleShowDetailedResults}
            />
          ) : (
            <UnsubscribedActions 
              skinType={skinType}
              onShowDetailedResults={handleShowDetailedResults}
            />
          )}
        </div>

        {/* Résultats détaillés (seulement après inscription ou clic) */}
        {showDetailedResults && (
          <div className="space-y-6 sm:space-y-8">
            {/* Profil cutané */}
            <SkinProfileCard 
              skinType={skinType}
              skinState={skinState}
              characteristics={characteristics}
              concerns={concerns}
            />

            {/* Recommandations personnalisées */}
            <PersonalizedRecommendations 
              recommendations={recommendations}
              skinType={skinType}
            />

            {/* Graphiques détaillés */}
            <DetailedResultsChart 
              scores={scores}
              skinType={skinType}
            />
          </div>
        )}
      </div>
    </div>
  );
};
