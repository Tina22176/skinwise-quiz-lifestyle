
import { useState, useEffect } from "react";
import { useQuiz } from "../QuizContext";
import { ResultsLoading } from "./ResultsLoading";
import { ResultsContent } from "./ResultsContent";
import { AnimatePresence } from "framer-motion";
import { useEmailSubscription } from "./EmailSubscriptionHandler";

export const Results = ({ onResetQuiz }: { onResetQuiz: () => void }) => {
  const { state } = useQuiz();
  const [showResults, setShowResults] = useState(false);
  const instagramUrl = "https://www.instagram.com/majolie_peau/";
  
  // Get subscription handling logic from the custom hook
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
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showResults ? (
        <ResultsLoading />
      ) : (
        <ResultsContent 
          skinType={state.result || "normal"}
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
          instagramUrl={instagramUrl}
        />
      )}
    </AnimatePresence>
  );
};
