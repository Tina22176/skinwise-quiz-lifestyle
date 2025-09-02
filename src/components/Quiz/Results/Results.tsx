import { useState, useEffect } from "react";
import { useQuiz } from "../QuizContext";
import { ResultsLoading } from "./ResultsLoading";
import { HormoneResultsWrapper } from "./components/HormoneResultsWrapper";
import { SimpleHormoneResults } from "./components/SimpleHormoneResults";
import { AnimatePresence } from "framer-motion";
import { useEmailSubscription } from "./EmailSubscriptionHandler";

export const Results = ({ onResetQuiz }: { onResetQuiz: () => void }) => {
  const { state } = useQuiz();
  const [showResults, setShowResults] = useState(false);
  const instagramUrl = "https://www.instagram.com/majolie_peau/";
  
  const {
    email, 
    setEmail,
    firstName, 
    setFirstName,
    isSubscribed,
    isLoading,
    gdprConsent,
    setGdprConsent,
    handleSubmit
  } = useEmailSubscription();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 3000); // Increased loading time for better suspense
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showResults ? (
        <ResultsLoading />
      ) : !state.hormoneProfile ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Oops ! Aucun profil trouvé
            </h2>
            <p className="text-gray-600 mb-6">
              Il semble que tu n'aies pas encore fait le quiz ou que tes résultats aient expiré.
            </p>
            <button
              onClick={onResetQuiz}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Faire le quiz →
            </button>
          </div>
        </div>
      ) : (
        <SimpleHormoneResults
          hormoneProfile={state.hormoneProfile}
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          isSubscribed={isSubscribed}
          isLoading={isLoading}
          gdprConsent={gdprConsent}
          setGdprConsent={setGdprConsent}
          handleSubmit={handleSubmit}
          onResetQuiz={onResetQuiz}
        />
      )}
    </AnimatePresence>
  );
};
