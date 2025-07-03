import { motion } from “framer-motion”;
import { EnhancedSubscriptionForm } from “./EnhancedSubscriptionForm”;
import { SubscribedSuccessState } from “./SubscribedSuccessState”;

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
<motion.div variants={variants} className=“space-y-4 sm:space-y-6 max-w-2xl mx-auto px-4”>
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
ease: “easeInOut”
}}
className=“inline-block”
>
<h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 text-transparent bg-clip-text">
Ta routine beauté personnalisée
</h2>
</motion.div>

        <div className="space-y-3">
          <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">
            Reçois ta routine <span className="text-pink-600 font-semibold">peau {skinTypeText}</span> gratuite
          </p>
          
          {/* Aperçu du contenu de l'email */}
          <div className="bg-gradient-to-r from-pink-100/60 to-white/60 p-4 rounded-xl border border-pink-200/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
              <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                Routine matin/soir détaillée
              </span>
              <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                Ingrédients stars personnalisés
              </span>
              <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                3 conseils bonus exclusifs
              </span>
              <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                Ingrédients à éviter
              </span>
            </div>
          </div>
          
          {/* FOMO et urgence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-orange-50/80 to-yellow-50/80 p-3 rounded-lg border border-orange-200/50"
          >
            <p className="text-xs sm:text-sm text-orange-700 font-medium text-center">
              <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Offre limitée : +2,847 femmes ont déjà reçu leur routine personnalisée
            </p>
          </motion.div>
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
