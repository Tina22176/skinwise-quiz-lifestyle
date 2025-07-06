
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Sparkles, Shield, Heart } from "lucide-react";

interface PremiumSubscriptionFormProps {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  colors: any;
  variants: any;
}

export const PremiumSubscriptionForm = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  gdprConsent,
  setGdprConsent,
  isLoading,
  handleSubmit,
  colors,
  variants
}: PremiumSubscriptionFormProps) => {
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Ton email est nécessaire pour recevoir ta routine");
    } else if (!emailRegex.test(value)) {
      setEmailError("Assure-toi que ton email est correct");
    } else {
      setEmailError("");
    }
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Dis-nous ton prénom pour personnaliser ta routine");
    } else if (value.trim().length < 2) {
      setNameError("Ton prénom semble un peu court");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    validateName(value);
  };

  const isFormValid = email && firstName && gdprConsent && !emailError && !nameError;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div variants={variants} className="space-y-5">
        {/* Champ prénom avec contraste amélioré */}
        <div className="space-y-2">
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <Input
              type="text"
              placeholder="Ton prénom pour personnaliser ta routine ✨"
              value={firstName}
              onChange={handleNameChange}
              onBlur={() => validateName(firstName)}
              required
              className={`backdrop-blur-sm bg-white/95 border-2 border-gray-300 text-gray-900 placeholder:text-gray-600 font-medium py-4 text-base rounded-2xl shadow-xl transition-all duration-300 focus:bg-white focus:shadow-2xl focus:border-pink-400 ${
                nameError 
                  ? 'border-red-400 focus:border-red-500'
                  : 'hover:border-pink-300'
              }`}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
          </motion.div>
          {nameError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm ml-2 font-medium"
            >
              {nameError}
            </motion.p>
          )}
        </div>
        
        {/* Champ email avec contraste amélioré */}
        <div className="space-y-2">
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <Input
              type="email"
              placeholder="Ton email pour recevoir ta routine personnalisée 💌"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              required
              className={`backdrop-blur-sm bg-white/95 border-2 border-gray-300 text-gray-900 placeholder:text-gray-600 font-medium py-4 text-base rounded-2xl shadow-xl transition-all duration-300 focus:bg-white focus:shadow-2xl focus:border-pink-400 ${
                emailError 
                  ? 'border-red-400 focus:border-red-500'
                  : 'hover:border-pink-300'
              }`}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
          </motion.div>
          {emailError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm ml-2 font-medium"
            >
              {emailError}
            </motion.p>
          )}
        </div>

        {/* Checkbox RGPD avec contraste amélioré */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="flex items-start space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border-2 border-gray-200 shadow-lg"
        >
          <Checkbox
            id="gdpr-premium"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
            className="mt-1 border-gray-400 h-5 w-5 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 data-[state=checked]:text-white"
          />
          <div className="space-y-2">
            <label 
              htmlFor="gdpr-premium" 
              className="text-gray-800 text-sm cursor-pointer leading-relaxed font-medium"
            >
              J'accepte de recevoir ma routine personnalisée et des conseils adaptés par email.
            </label>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                0 spam
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bouton CTA avec meilleur contraste */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pt-2"
        >
          <Button 
            type="submit" 
            className={`w-full text-base py-6 relative overflow-hidden bg-gradient-to-r ${colors.primary} hover:shadow-2xl text-white border-0 shadow-xl transition-all duration-500 rounded-2xl font-bold text-lg`}
            disabled={isLoading || !isFormValid}
          >
            {/* Effet de brillance animé */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
            />
            
            {/* Contenu du bouton */}
            <span className="flex items-center justify-center gap-3 relative z-10">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              )}
              <span className="font-bold">
                {isLoading ? "Envoi en cours..." : "RECEVOIR MA ROUTINE MAINTENANT"}
              </span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};
