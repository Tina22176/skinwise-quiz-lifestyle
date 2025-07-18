import { useState, useEffect } from "react";
import { useQuiz } from "../QuizContext";
import { ResultsLoading } from "./ResultsLoading";
import { EnhancedResultsContent } from "./EnhancedResultsContent";
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
      ) : (
        <EnhancedResultsContent 
          skinType={state.skinTypeScore?.type || state.result || "normal"}
          skinState={state.skinTypeScore?.state || null}
          skinTypeScore={state.skinTypeScore}
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
