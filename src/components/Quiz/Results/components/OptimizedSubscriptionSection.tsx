import { motion, AnimatePresence } from "framer-motion";
import { EnhancedSubscriptionForm } from "./EnhancedSubscriptionForm";
import { SubscribedSuccessState } from "./SubscribedSuccessState";
import { Sparkles, Gift, Clock, Star, Shield, Zap, Heart, ArrowRight, CheckCircle, Share2, Instagram, RefreshCw } from "lucide-react";

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
    <AnimatePresence mode="wait">
      {!isSubscribed ? (
        <motion.div 
          key="subscription-form"
          variants={variants} 
          className="space-y-4 sm:space-y-6 lg:space-y-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Header moderne avec animation - Responsive */}
          <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base text-pink-700 font-medium mb-2 sm:mb-3 lg:mb-4">
                <Gift className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 animate-pulse" />
                Routine personnalisée offerte
              </div>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Ta routine beauté personnalisée
              </h2>
            </motion.div>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-800 font-medium">
                Reçois ta routine <span className="text-pink-600 font-semibold">peau {skinTypeText}</span> gratuite
              </p>
              
              {/* Aperçu du contenu - Design moderne et responsive */}
              <div className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-pink-200/40 shadow-lg">
                {/* Grille responsive : 1 colonne mobile, 2 tablette, 2 desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg sm:rounded-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Routine matin/soir détaillée</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg sm:rounded-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Ingrédients stars personnalisés</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg sm:rounded-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">3 conseils bonus exclusifs</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 rounded-lg sm:rounded-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Ingrédients à éviter</span>
                  </div>
                </div>
                
                {/* Badge de valeur - Responsive */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-600" />
                    <span className="text-xs sm:text-sm lg:text-base font-semibold text-green-700">Valeur estimée : 47€</span>
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
    </AnimatePresence>
  );
};
