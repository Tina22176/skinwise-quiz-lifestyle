import { motion } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { OptimizedSubscriptionSection } from "./OptimizedSubscriptionSection";
import { TeaserSection } from "./TeaserSection";
import { SocialProofBanner } from "./SocialProofBanner";
import { UrgencyBadge } from "./UrgencyBadge";
import { ConfidenceIndicator } from "./ConfidenceIndicator";
import { useQuiz } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails, SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";
import { SkinTypeScore } from "../../utils/skinTypeCalculator";
import { Sparkles, Star, Shield, Clock, Users, CheckCircle } from "lucide-react";

// Animation variants optimisés
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      duration: 0.6
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface ConversionOptimizedResultsProps {
  skinType: string;
  skinState?: string | null;
  skinTypeScore?: SkinTypeScore | null;
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
  confidence?: number;
}

export const ConversionOptimizedResults = ({
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
  confidence = 0.8
}: ConversionOptimizedResultsProps) => {
  const { state } = useQuiz();
  const details = getSkinTypeDetails(skinType);
  const skinTypeText = getSkinTypeText(skinType);
  
  // Utiliser le score de confiance calculé ou la valeur par défaut
  const calculatedConfidence = skinTypeScore?.confidence || confidence;

  const handleShare = () => {
    const shareText = `Je viens de découvrir mon type de peau avec Majoliepeau ! Mon diagnostic : Peau ${skinTypeText}`;
    window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const visitInstagram = () => {
    window.open(instagramUrl, "_blank");
  };

  // Couleurs adaptatives basées sur la nouvelle configuration
  const getSkinTypeColors = () => {
    const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
    
    const colorSchemes = {
      blue: {
        primary: "from-blue-400 to-purple-500",
        secondary: "from-blue-50 to-purple-50",
        accent: "blue",
        text: "text-blue-700",
        border: "border-blue-200"
      },
      green: {
        primary: "from-green-400 to-teal-500",
        secondary: "from-green-50 to-teal-50",
        accent: "green",
        text: "text-green-700",
        border: "border-green-200"
      },
      purple: {
        primary: "from-purple-400 to-pink-500",
        secondary: "from-purple-50 to-pink-50",
        accent: "purple",
        text: "text-purple-700",
        border: "border-purple-200"
      },
      pink: {
        primary: "from-pink-400 to-rose-500",
        secondary: "from-pink-50 to-rose-50",
        accent: "pink",
        text: "text-pink-700",
        border: "border-pink-200"
      }
    };
    
    return colorSchemes[teaser.colorTheme] || colorSchemes.pink;
  };

  const colors = getSkinTypeColors();

  return (
    <motion.div
      key="optimized-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-md mx-auto px-4 sm:max-w-2xl sm:px-6"
    >
      {/* Header avec badge d'urgence */}
      <motion.div
        className="text-center mb-6"
        variants={itemVariants}
        initial="hidden"
        animate="show"
      >
        {/* Badge d'urgence */}
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full text-sm font-medium text-amber-700 mb-4 shadow-sm border border-amber-200"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <Clock className="w-4 h-4" />
          <span>Diagnostic gratuit - Plus que 24h</span>
        </motion.div>

        <SkinTypeHeader 
          skinType={skinType} 
          skinState={skinState}
          variants={itemVariants} 
        />
      </motion.div>

      {/* Indicateur de confiance */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
      >
        <ConfidenceIndicator
          confidence={calculatedConfidence}
          skinType={skinType}
          skinTypeText={skinTypeText}
        />
      </motion.div>

      {/* Conteneur principal */}
      <motion.div 
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Preuve sociale */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 rounded-2xl shadow-sm border border-gray-200">
            <Users className="w-5 h-5 text-gray-600" />
            <div className="text-sm">
              <span className="font-bold text-gray-800">2,847</span>
              <span className="text-gray-600"> femmes ont déjà reçu leur routine personnalisée</span>
            </div>
          </div>
        </motion.div>

        {/* Carte principale */}
        <motion.div 
          variants={itemVariants}
          className={`bg-gradient-to-br ${colors.secondary} rounded-3xl p-6 sm:p-8 shadow-2xl border ${colors.border} relative overflow-hidden backdrop-blur-sm`}
        >
          {/* Effet de brillance subtil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
          
          {/* Barre décorative */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r ${colors.primary} rounded-full shadow-lg`} />
          
          <div className="relative space-y-6">
            {/* Section de conversion optimisée */}
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

            {/* Garanties */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200/50"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>100% Gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Personnalisé</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Expert</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* TeaserSection - Disparaît après inscription */}
      {!isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
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
