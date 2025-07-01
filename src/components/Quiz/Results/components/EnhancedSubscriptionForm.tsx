
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Sparkles, Shield, Users } from "lucide-react";

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

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Ton email est nécessaire pour recevoir ta routine 💌");
    } else if (!emailRegex.test(value)) {
      setEmailError("Assure-toi que ton email est correct 😊");
    } else {
      setEmailError("");
    }
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Dis-nous ton prénom pour personnaliser ta routine ✨");
    } else if (value.trim().length < 2) {
      setNameError("Ton prénom semble un peu court 😊");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div variants={variants} className="space-y-5">
        {/* Champ prénom avec validation */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Ton prénom pour personnaliser ta routine ✨"
            value={firstName}
            onChange={handleNameChange}
            onBlur={() => validateName(firstName)}
            required
            className={`premium-input text-base md:text-lg py-4 md:py-6 bg-white/95 shadow-[0_4px_12px_rgba(255,192,203,0.2)] transition-all duration-300 ${
              nameError 
                ? 'border-pink-400/70 focus:border-pink-500/70 focus:ring-pink-300/50' 
                : 'border-pink-200/70 focus:border-pink-400/70 focus:ring-pink-200/50'
            }`}
          />
          {nameError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-pink-600 ml-1"
            >
              {nameError}
            </motion.p>
          )}
        </div>
        
        {/* Champ email avec validation */}
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Ton email pour recevoir ta routine personnalisée 💌"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            required
            className={`premium-input text-base md:text-lg py-4 md:py-6 bg-white/95 shadow-[0_4px_12px_rgba(255,192,203,0.2)] transition-all duration-300 ${
              emailError 
                ? 'border-pink-400/70 focus:border-pink-500/70 focus:ring-pink-300/50' 
                : 'border-pink-200/70 focus:border-pink-400/70 focus:ring-pink-200/50'
            }`}
          />
          {emailError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-pink-600 ml-1"
            >
              {emailError}
            </motion.p>
          )}
        </div>

        {/* Checkbox RGPD amélioré */}
        <motion.div 
          whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(255,192,203,0.25)" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex items-start space-x-3 bg-gradient-to-r from-pink-50/95 to-white/95 p-4 md:p-5 rounded-2xl border border-pink-200/60 shadow-lg"
        >
          <Checkbox
            id="gdpr-enhanced"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
            className="mt-1 border-pink-300 h-5 w-5 data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400 shadow-sm"
          />
          <div className="space-y-2">
            <label 
              htmlFor="gdpr-enhanced" 
              className="text-sm md:text-base text-gray-700 cursor-pointer leading-relaxed"
            >
              J'accepte de recevoir ma routine personnalisée et des conseils adaptés par email.
            </label>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                0 spam
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                +12k femmes satisfaites
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
            className="group premium-button w-full text-base md:text-xl py-5 md:py-7 relative overflow-hidden bg-gradient-to-r from-pink-500/95 to-pink-400/95 hover:from-pink-600/95 hover:to-pink-500/95 text-white border-0 shadow-[0_12px_28px_rgba(255,192,203,0.4)] hover:shadow-[0_16px_36px_rgba(255,192,203,0.5)] transition-all duration-300 rounded-2xl font-semibold"
            disabled={isLoading || !email || !firstName || !gdprConsent || emailError !== "" || nameError !== ""}
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
            <span className="flex items-center justify-center gap-3">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
              <span>
                RECEVOIR MA ROUTINE {skinType.toUpperCase()} GRATUITE
              </span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};
