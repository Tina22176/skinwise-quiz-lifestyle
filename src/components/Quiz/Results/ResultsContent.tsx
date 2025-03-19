
import { motion } from "framer-motion";
import { SkinTypeHeader } from "./SkinTypeHeader";
import { SkinProfileCard } from "./SkinProfileCard";
import { SkinCharacteristicsGrid } from "./SkinCharacteristicsGrid";
import { RoutineRecommendation } from "./RoutineRecommendation";
import { SubscriptionForm } from "./SubscriptionForm";
import { SubscribedActions } from "./SubscribedActions";
import { UnsubscribedActions } from "./UnsubscribedActions";
import { getSkinTypeText, getSkinTypeDetails } from "./Results";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 24
    }
  }
};

interface ResultsContentProps {
  skinType: string;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onResetQuiz: () => void;
  instagramUrl: string;
}

export const ResultsContent = ({
  skinType,
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
  instagramUrl
}: ResultsContentProps) => {
  const details = getSkinTypeDetails(skinType);
  
  const handleShare = () => {
    const shareText = `Je viens de découvrir mon type de peau avec Majoliepeau ! 💖 Mon diagnostic : Peau ${getSkinTypeText(skinType)}`;
    window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto px-4"
    >
      <motion.div 
        className="glass rounded-3xl p-8 md:p-12 mb-8 bg-gradient-to-br from-pink-50/95 to-white/95 shadow-[0_8px_32px_rgba(255,192,203,0.2)] relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/10 to-pink-200/15 pointer-events-none" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-10 relative"
        >
          <SkinTypeHeader skinType={skinType} variants={itemVariants} />
          
          <SkinProfileCard description={details.description} variants={itemVariants} />
          
          <SkinCharacteristicsGrid 
            characteristics={details.characteristics} 
            factors={details.factors} 
            variants={itemVariants} 
          />
          
          <RoutineRecommendation 
            recommendation={details.routineRecommendation} 
            variants={itemVariants} 
          />

          {!isSubscribed ? (
            <SubscriptionForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              gdprConsent={gdprConsent}
              setGdprConsent={setGdprConsent}
              isLoading={isLoading}
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

          {!isSubscribed && (
            <UnsubscribedActions
              visitInstagram={visitInstagram}
              onResetQuiz={onResetQuiz}
              variants={itemVariants}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
