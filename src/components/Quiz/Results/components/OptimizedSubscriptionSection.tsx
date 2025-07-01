
import { motion } from "framer-motion";
import { EnhancedSubscriptionForm } from "./EnhancedSubscriptionForm";
import { SubscribedSuccessState } from "./SubscribedSuccessState";

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
  return (
    <>
      {!isSubscribed ? (
        <motion.div variants={variants} className="space-y-8">
          {/* Titre optimisé avec personnalisation */}
          <div className="text-center space-y-4">
            <motion.div
              animate={{ 
                scale: [1, 1.02, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 text-transparent bg-clip-text">
                💖 TON PLAN BEAUTÉ PERSONNALISÉ
              </h2>
            </motion.div>
            
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-gray-800 font-medium">
                Reçois ta routine <span className="text-pink-600 font-semibold">PEAU {skinTypeText.toUpperCase()}</span> gratuite !
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ✨ Routine adaptée en 5 min
                </span>
                <span className="flex items-center gap-1">
                  🎯 Conseils d'experts inclus
                </span>
                <span className="flex items-center gap-1">
                  📱 Suivi personnalisé gratuit
                </span>
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
