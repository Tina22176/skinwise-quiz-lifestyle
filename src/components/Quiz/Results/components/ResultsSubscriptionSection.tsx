
import { motion } from "framer-motion";
import { SubscriptionForm } from "../SubscriptionForm";
import { SubscribedActions } from "../SubscribedActions";

interface ResultsSubscriptionSectionProps {
  isSubscribed: boolean;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleShare: () => void;
  visitInstagram: () => void;
  onResetQuiz: () => void;
  itemVariants: any;
}

export const ResultsSubscriptionSection = ({
  isSubscribed,
  email,
  setEmail,
  firstName,
  setFirstName,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  handleShare,
  visitInstagram,
  onResetQuiz,
  itemVariants
}: ResultsSubscriptionSectionProps) => {
  return (
    <motion.div variants={itemVariants}>
      {!isSubscribed ? (
        <SubscriptionForm
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          isLoading={isLoading}
          gdprConsent={gdprConsent}
          setGdprConsent={setGdprConsent}
          handleSubmit={handleSubmit}
          variants={itemVariants}
        />
      ) : (
        <SubscribedActions 
          handleShare={handleShare}
          visitInstagram={visitInstagram}
          onResetQuiz={onResetQuiz}
          variants={itemVariants}
        />
      )}
    </motion.div>
  );
};
