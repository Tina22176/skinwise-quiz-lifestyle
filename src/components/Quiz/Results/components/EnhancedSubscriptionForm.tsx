import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Sparkles, Shield, Users } from "lucide-react";
import { SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";

interface EnhancedSubscriptionFormProps {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  skinType: string;
  variants: any;
}

export const EnhancedSubscriptionForm = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  gdprConsent,
  setGdprConsent,
  isLoading,
  handleSubmit,
  skinType,
  variants
}: EnhancedSubscriptionFormProps) => {
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  // Couleurs adaptatives basées sur le type de peau
  const getSkinTypeColors = () => {
    const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
    
    const colorSchemes = {
      blue: {
        primary: "from-blue-500 to-blue-400",
        hover: "hover:from-blue-600 hover:to-blue-500",
        border: "border-blue-200 focus:border-blue-400 focus:ring-blue-200",
        error: "border-blue-400 focus:border-blue-500 focus:ring-blue-300",
        text: "text-blue-600",
        bg: "from-blue-50 to-white",
        checkbox: "border-blue-300 data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
      },
      green: {
        primary: "from-green-500 to-green-400",
        hover: "hover:from-green-600 hover:to-green-500",
        border: "border-green-200 focus:border-green-400 focus:ring-green-200",
        error: "border-green-400 focus:border-green-500 focus:ring-green-300",
        text: "text-green-600",
        bg: "from-green-50 to-white",
        checkbox: "border-green-300 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
      },
      purple: {
        primary: "from-purple-500 to-purple-400",
        hover: "hover:from-purple-600 hover:to-purple-500",
        border: "border-purple-200 focus:border-purple-400 focus:ring-purple-200",
        error: "border-purple-400 focus:border-purple-500 focus:ring-purple-300",
        text: "text-purple-600",
        bg: "from-purple-50 to-white",
        checkbox: "border-purple-300 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
      },
      pink: {
        primary: "from-pink-500 to-pink-400",
        hover: "hover:from-pink-600 hover:to-pink-500",
        border: "border-pink-200 focus:border-pink-400 focus:ring-pink-200",
        error: "border-pink-400 focus:border-pink-500 focus:ring-pink-300",
        text: "text-pink-600",
        bg: "from-pink-50 to-white",
        checkbox: "border-pink-300 data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400"
      }
    };
    
    return colorSchemes[teaser.colorTheme] || colorSchemes.pink;
  };

  const colors = getSkinTypeColors();

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
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <motion.div variants={variants} className="space-y-4">
        {/* Champ prénom */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Ton prénom pour personnaliser ta routine"
            value={firstName}
            onChange={handleNameChange}
            onBlur={() => validateName(firstName)}
            required
            className={`text-sm sm:text-base py-2 sm:py-3 bg-white/95 shadow-lg transition-all duration-300 ${
              nameError 
                ? colors.error
                : colors.border
            }`}
          />
          {nameError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs sm:text-sm ${colors.text} ml-1`}
            >
              {nameError}
            </motion.p>
          )}
        </div>
        
        {/* Champ email */}
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Ton email pour recevoir ta routine personnalisée"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            required
            className={`text-sm sm:text-base py-2 sm:py-3 bg-white/95 shadow-lg transition-all duration-300 ${
              emailError 
                ? colors.error
                : colors.border
            }`}
          />
          {emailError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs sm:text-sm ${colors.text} ml-1`}
            >
              {emailError}
            </motion.p>
          )}
        </div>

        {/* Checkbox RGPD simplifié */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`flex items-start space-x-3 bg-gradient-to-r ${colors.bg} p-3 rounded-xl border ${colors.border.split(' ')[0]} shadow-lg`}
        >
          <Checkbox
            id="gdpr-enhanced"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
            className={`mt-1 ${colors.checkbox} h-4 w-4 shadow-sm`}
          />
          <div className="space-y-2">
            <label 
              htmlFor="gdpr-enhanced" 
              className="text-xs sm:text-sm text-gray-700 cursor-pointer leading-relaxed"
            >
              J'accepte de recevoir ma routine personnalisée et des conseils adaptés par email.
            </label>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                0 spam
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bouton CTA optimisé */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pt-2"
        >
          <Button 
            type="submit" 
            className={`w-full text-sm sm:text-base py-3 relative overflow-hidden bg-gradient-to-r ${colors.primary} ${colors.hover} text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl font-semibold`}
            disabled={isLoading || !isFormValid}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="whitespace-nowrap text-sm sm:text-base">
                Recevoir ma routine
              </span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};
