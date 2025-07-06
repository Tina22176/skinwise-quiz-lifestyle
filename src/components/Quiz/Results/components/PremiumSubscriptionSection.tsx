
import { motion } from "framer-motion";
import { PremiumSubscriptionForm } from "./PremiumSubscriptionForm";
import { Sparkles, Gift, Heart, Star } from "lucide-react";

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
      {/* Titre premium avec animation */}
      <div className="text-center space-y-4">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [-1, 1, -1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block"
        >
          <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors.primary} text-transparent bg-clip-text leading-tight`}>
            Ta routine beauté sur-mesure
          </h2>
        </motion.div>

        <div className="space-y-3">
          <p className="text-white/90 text-lg font-medium">
            Reçois ta routine <span className={`text-${colors.accent} font-bold`}>peau {skinTypeText}</span> maintenant
          </p>
          
          {/* Avantages premium */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { icon: Heart, text: "Routine personnalisée", color: "text-red-400" },
              { icon: Star, text: "Conseils d'expertes", color: "text-yellow-400" },
              { icon: Gift, text: "3 secrets bonus", color: "text-purple-400" },
              { icon: Sparkles, text: "100% gratuit", color: "text-blue-400" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire premium */}
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
