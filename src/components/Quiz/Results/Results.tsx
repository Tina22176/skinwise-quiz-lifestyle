import { useState, useEffect } from "react";
import { useQuiz } from "../QuizContext";
import { PremiumLoader } from "../PremiumLoader";
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

  useEffect(() => {
    if (isSubscribed) {
      setPhase("results");
    }
  }, [isSubscribed]);

  const handleSkipEmail = () => {
    setPhase("results");
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "loading" && (
        <PremiumLoader key="loading" />
      )}
      {phase === "email" && !state.hormoneProfile ? (
        <div key="no-profile" className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center px-6 max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Oops ! Aucun profil trouvé
            </h2>
            <p className="text-muted-foreground mb-6 font-body">
              Il semble que tu n'aies pas encore fait le quiz.
            </p>
            <button
              onClick={onResetQuiz}
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-colors font-body"
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
          onSkip={handleSkipEmail}
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
