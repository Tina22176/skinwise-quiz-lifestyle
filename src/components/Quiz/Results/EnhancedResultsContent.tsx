import { MobileOptimizedResults } from "./components/MobileOptimizedResults";
import { useQuiz } from "../QuizContext";
import { SkinTypeScore } from "../utils/skinTypeCalculator";

interface EnhancedResultsContentProps {
  skinType: string;
  skinState?: string | null;
  skinTypeScore?: SkinTypeScore | null;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onResetQuiz: () => void;
  instagramUrl: string;
}

export const EnhancedResultsContent = ({
  skinType,
  skinState,
  skinTypeScore,
  email,
  setEmail,
  firstName,
  setFirstName,
  isSubscribed,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  onResetQuiz,
  instagramUrl,
}: EnhancedResultsContentProps) => {
  return (
    <MobileOptimizedResults
      skinType={skinType}
      skinState={skinState}
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
  );
};
