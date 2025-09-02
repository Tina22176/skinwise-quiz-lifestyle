
import { ConversionOptimizedResults } from "./components/ConversionOptimizedResults";
import { useQuiz } from "../QuizContext";
import { HormoneProfile } from "../utils/hormoneProfileCalculator";

interface EnhancedResultsContentProps {
  skinType: string;
  skinState?: string | null;
  hormoneProfile?: HormoneProfile | null;
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
  hormoneProfile,
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
    <ConversionOptimizedResults
      skinType={skinType}
      skinState={skinState}
      hormoneProfile={hormoneProfile}
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
