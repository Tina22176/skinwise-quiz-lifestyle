
import { motion } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { OptimizedSubscriptionSection } from "./OptimizedSubscriptionSection";
import { TeaserSection } from "./TeaserSection";
import { SocialProofBanner } from "./SocialProofBanner";
import { UrgencyBadge } from "./UrgencyBadge";
import { useQuiz } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "../SkinTypeDetails";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 350,
      damping: 25
    }
  }
};

interface ConversionOptimizedResultsProps {
  skinType: string;
  skinState?: string | null;
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

export const ConversionOptimizedResults = ({
  skinType,
  skinState,
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
}: ConversionOptimizedResultsProps) => {
  const { state } = useQuiz();
  const details = getSkinTypeDetails(skinType);
  const skinTypeText = getSkinTypeText(skinType);

  const handleShare = () => {
    const shareText = `Je viens de découvrir mon type de peau avec Majoliepeau ! 💖 Mon diagnostic : Peau ${skinTypeText}`;
    window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <motion.div
      key="conversion-optimized-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto px-4"
    >
      {/* Badge d'urgence en haut */}
      <UrgencyBadge />

      {/* Titre principal avec animation */}
      <motion.div 
        className="text-center mb-4 sm:mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SkinTypeHeader 
          skinType={skinType} 
          skinState={skinState}
          variants={itemVariants} 
        />
      </motion.div>

      {/* Section principale - Focus conversion */}
      <motion.div 
        className="relative mb-4 sm:mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Preuve sociale avant le formulaire */}
        <motion.div variants={itemVariants}>
          <SocialProofBanner />
        </motion.div>

        {/* Conteneur principal optimisé pour conversion */}
        <motion.div 
          variants={itemVariants}
          className="glass rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-pink-50/98 to-white/98 shadow-[0_12px_40px_rgba(255,192,203,0.25)] relative overflow-hidden border border-pink-200/30"
        >
          {/* Effets visuels de fond */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/8 to-pink-200/12 pointer-events-none" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full" />
          
          <div className="relative space-y-4 sm:space-y-6 md:space-y-8">
            {/* Section d'inscription optimisée */}
            <OptimizedSubscriptionSection
              skinType={skinType}
              skinTypeText={skinTypeText}
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              isSubscribed={isSubscribed}
              isLoading={isLoading}
              gdprConsent={gdprConsent}
              setGdprConsent={setGdprConsent}
              handleSubmit={handleSubmit}
              handleShare={handleShare}
              visitInstagram={visitInstagram}
              onResetQuiz={onResetQuiz}
              variants={itemVariants}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Section teaser pour non-inscrits */}
      {!isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <TeaserSection
            skinType={skinType}
            skinTypeText={skinTypeText}
            details={details}
            visitInstagram={visitInstagram}
            onResetQuiz={onResetQuiz}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
