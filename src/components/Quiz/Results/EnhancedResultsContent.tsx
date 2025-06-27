import { ResultsContainer } from "./components/ResultsContainer";
import { ResultsMainContent } from "./components/ResultsMainContent";
import { ResultsSubscriptionSection } from "./components/ResultsSubscriptionSection";
import { useResultsActions } from "./hooks/useResultsActions";
import { useResultsAnimations } from "./hooks/useResultsAnimations";
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
  const { state } = useQuiz();
  const { containerVariants, itemVariants } = useResultsAnimations();
  const { handleShare, handleDownload } = useResultsActions(skinType);

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <ResultsContainer containerVariants={containerVariants}>
      <ResultsMainContent
        skinType={skinType}
        skinState={skinState}
        skinTypeScore={skinTypeScore}
        answers={state.answers}
        itemVariants={itemVariants}
        onShare={handleShare}
        onDownload={handleDownload}
        onResetQuiz={onResetQuiz}
      />
      
      <ResultsSubscriptionSection
        isSubscribed={isSubscribed}
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        isLoading={isLoading}
        gdprConsent={gdprConsent}
        setGdprConsent={setGdprConsent}
        handleSubmit={handleSubmit}
        handleShare={handleShare}
        visitInstagram={visitInstagram}
        onResetQuiz={onResetQuiz}
        itemVariants={itemVariants}
      />
    </ResultsContainer>
  );
};
