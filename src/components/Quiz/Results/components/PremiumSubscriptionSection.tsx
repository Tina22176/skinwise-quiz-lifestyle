
import { motion } from "framer-motion";
import { PremiumSubscriptionForm } from "./PremiumSubscriptionForm";
import { SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";
import { Sparkles, Gift, Star, Check } from "lucide-react";

interface PremiumSubscriptionSectionProps {
  skinType: string;
  skinTypeText: string;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  colors: any;
  variants: any;
}

export const PremiumSubscriptionSection = ({
  skinType,
  skinTypeText,
  email,
  setEmail,
  firstName,
  setFirstName,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  colors,
  variants
}: PremiumSubscriptionSectionProps) => {
  return (
    <motion.div variants={variants} className="space-y-6">
      {/* Titre principal avec meilleur contraste */}
      <div className="text-center space-y-4">
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reçois ta routine <span className={`bg-gradient-to-r ${colors.primary} text-transparent bg-clip-text`}>peau {skinTypeText}</span> maintenant
          </h2>
        </motion.div>

        {/* Aperçu du contenu avec meilleur contraste */}
        <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border-2 border-white/40 shadow-lg">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl shadow-sm">
              <Check className="w-4 h-4 text-green-700" />
              <span className="text-sm font-medium text-gray-900">Routine personnalisée</span>
            </div>
            <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl shadow-sm">
              <Star className="w-4 h-4 text-yellow-700" />
              <span className="text-sm font-medium text-gray-900">Conseils d'expertes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl shadow-sm">
              <Gift className="w-4 h-4 text-purple-700" />
              <span className="text-sm font-medium text-gray-900">3 secrets bonus</span>
            </div>
            <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl shadow-sm">
              <Sparkles className="w-4 h-4 text-pink-700" />
              <span className="text-sm font-medium text-gray-900">100% gratuit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <PremiumSubscriptionForm
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        gdprConsent={gdprConsent}
        setGdprConsent={setGdprConsent}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        colors={colors}
        variants={variants}
      />
    </motion.div>
  );
};
