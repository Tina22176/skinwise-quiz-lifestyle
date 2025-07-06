import { motion } from "framer-motion";
import { EnhancedSubscriptionForm } from "./EnhancedSubscriptionForm";
import { SubscribedSuccessState } from "./SubscribedSuccessState";
import { SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";

interface OptimizedSubscriptionSectionProps {
  skinType: string;
  skinTypeText: string;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleShare: () => void;
  visitInstagram: () => void;
  onResetQuiz: () => void;
  variants: any;
}

export const OptimizedSubscriptionSection = ({
  skinType,
  skinTypeText,
  email,
  setEmail,
  firstName,
  setFirstName,
  isSubscribed,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  handleShare,
  visitInstagram,
  onResetQuiz,
  variants
}: OptimizedSubscriptionSectionProps) => {
  // Couleurs adaptatives basées sur le type de peau
  const getSkinTypeColors = () => {
    const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
    
    const colorSchemes = {
      blue: {
        primary: "from-blue-600 to-blue-500",
        secondary: "text-blue-600",
        accent: "bg-blue-400",
        bg: "from-blue-100/60 to-white/60",
        border: "border-blue-200/40"
      },
      green: {
        primary: "from-green-600 to-green-500",
        secondary: "text-green-600",
        accent: "bg-green-400",
        bg: "from-green-100/60 to-white/60",
        border: "border-green-200/40"
      },
      purple: {
        primary: "from-purple-600 to-purple-500",
        secondary: "text-purple-600",
        accent: "bg-purple-400",
        bg: "from-purple-100/60 to-white/60",
        border: "border-purple-200/40"
      },
      pink: {
        primary: "from-pink-600 to-pink-500",
        secondary: "text-pink-600",
        accent: "bg-pink-400",
        bg: "from-pink-100/60 to-white/60",
        border: "border-pink-200/40"
      }
    };
    
    return colorSchemes[teaser.colorTheme] || colorSchemes.pink;
  };

  const colors = getSkinTypeColors();

  return (
    <>
      {!isSubscribed ? (
        <motion.div variants={variants} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          {/* Titre optimisé et épuré */}
          <div className="text-center space-y-3">
            <motion.div
              animate={{
                scale: [1, 1.01, 1],
                opacity: [0.95, 1, 0.95]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              <h2 className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${colors.primary} text-transparent bg-clip-text`}>
                Ta routine beauté personnalisée
              </h2>
            </motion.div>

            <div className="space-y-3">
              <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">
                Reçois ta routine <span className={`${colors.secondary} font-semibold`}>peau {skinTypeText}</span> gratuite
              </p>
              
              {/* Aperçu du contenu - Badges horizontaux scrollables */}
              <div className={`bg-gradient-to-r ${colors.bg} p-3 sm:p-4 rounded-xl border ${colors.border}`}>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm text-gray-600 flex-shrink-0">
                    <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
                    Routine matin/soir détaillée
                  </span>
                  <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm text-gray-600 flex-shrink-0">
                    <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
                    Ingrédients stars personnalisés
                  </span>
                  <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm text-gray-600 flex-shrink-0">
                    <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
                    3 conseils bonus exclusifs
                  </span>
                  <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm text-gray-600 flex-shrink-0">
                    <div className={`w-2 h-2 ${colors.accent} rounded-full`}></div>
                    Ingrédients à éviter
                  </span>
                </div>
                
                {/* Indicateur de scroll sur mobile */}
                <div className="sm:hidden flex justify-center mt-2">
                  <div className="flex space-x-1">
                    <div className={`w-1 h-1 ${colors.accent} rounded-full`}></div>
                    <div className={`w-1 h-1 ${colors.accent} rounded-full`}></div>
                    <div className={`w-1 h-1 ${colors.accent} rounded-full`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire amélioré */}
          <EnhancedSubscriptionForm
            email={email}
            setEmail={setEmail}
            firstName={firstName}
            setFirstName={setFirstName}
            gdprConsent={gdprConsent}
            setGdprConsent={setGdprConsent}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            skinType={skinType}
            variants={variants}
          />
        </motion.div>
      ) : (
        <SubscribedSuccessState
          handleShare={handleShare}
          visitInstagram={visitInstagram}
          onResetQuiz={onResetQuiz}
          variants={variants}
        />
      )}
    </>
  );
};
