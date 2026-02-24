import { useState, useEffect } from "react";
import { useQuiz } from "../QuizContext";
import { ResultsLoading } from "./ResultsLoading";
import { SimpleHormoneResults } from "./components/SimpleHormoneResults";
import { EmailCaptureScreen } from "./components/EmailCaptureScreen";
import { AnimatePresence } from "framer-motion";
import { useEmailSubscription } from "./EmailSubscriptionHandler";

export const Results = ({ onResetQuiz }: { onResetQuiz: () => void }) => {
  const { state } = useQuiz();
  const [phase, setPhase] = useState<"loading" | "email" | "results">("loading");
  
  const {
    email, setEmail,
    firstName, setFirstName,
    isSubscribed, isLoading,
    gdprConsent, setGdprConsent,
    handleSubmit
  } = useEmailSubscription();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("email");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // After email submission, show results
  useEffect(() => {
    if (isSubscribed) {
      setPhase("results");
    }
  }, [isSubscribed]);

  return (
    <AnimatePresence mode="wait">
      {phase === "loading" && (
        <ResultsLoading key="loading" />
      )}
      {phase === "email" && !state.hormoneProfile ? (
        <div key="no-profile" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="text-center px-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Oops ! Aucun profil trouvé
            </h2>
            <p className="text-gray-600 mb-6">
              Il semble que tu n'aies pas encore fait le quiz.
            </p>
            <button
              onClick={onResetQuiz}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Faire le quiz →
            </button>
          </div>
        </div>
      ) : phase === "email" ? (
        <EmailCaptureScreen
          key="email"
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          isLoading={isLoading}
          gdprConsent={gdprConsent}
          setGdprConsent={setGdprConsent}
          handleSubmit={handleSubmit}
        />
      ) : phase === "results" && state.hormoneProfile ? (
        <SimpleHormoneResults
          key="results"
          hormoneProfile={state.hormoneProfile}
          onResetQuiz={onResetQuiz}
        />
      ) : null}
    </AnimatePresence>
  );
};
