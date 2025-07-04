import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Sparkles, Shield, User, AlertCircle, Users } from "lucide-react";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 mt-2 sm:mt-4">
      {/* Header contextuel */}
      <motion.div
        variants={variants}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full text-xs text-orange-600 font-medium mb-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          Offre limitée - Diagnostic gratuit
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-pink-600">
          Reçois ta routine personnalisée
        </h3>
        <p className="text-sm sm:text-base text-gray-700">
          Adaptée à ta peau <span className="font-semibold text-pink-500">{skinType}</span>
        </p>
      </motion.div>

      {/* Inputs flottants */}
      <motion.div variants={variants} className="space-y-4">
        {/* Prénom */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
          <Input
            type="text"
            placeholder="Ton prénom"
            value={firstName}
            onChange={handleNameChange}
            onBlur={() => validateName(firstName)}
            required
            aria-label="Prénom"
            className={`premium-input text-base py-3 bg-white/95 pl-10 shadow-[0_4px_12px_rgba(255,192,203,0.2)] transition-all duration-300 ${
              nameError 
                ? 'border-pink-400/70 focus:border-pink-500/70 focus:ring-pink-300/50' 
                : 'border-pink-200/70 focus:border-pink-400/70 focus:ring-pink-200/50'
            }`}
          />
          {nameError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-pink-600 ml-1 mt-1"
            >
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{nameError}</span>
            </motion.div>
          )}
        </div>
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
          <Input
            type="email"
            placeholder="Ton email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            required
            aria-label="Email"
            className={`premium-input text-base py-3 bg-white/95 pl-10 shadow-[0_4px_12px_rgba(255,192,203,0.2)] transition-all duration-300 ${
              emailError 
                ? 'border-pink-400/70 focus:border-pink-500/70 focus:ring-pink-300/50' 
                : 'border-pink-200/70 focus:border-pink-400/70 focus:ring-pink-200/50'
            }`}
          />
          {emailError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-pink-600 ml-1 mt-1"
            >
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{emailError}</span>
            </motion.div>
          )}
        </div>
        {/* RGPD */}
        <motion.div 
          whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(255,192,203,0.25)" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex items-start space-x-3 bg-gradient-to-r from-pink-50/95 to-white/95 p-3 rounded-xl border border-pink-200/60 shadow-lg"
        >
          <Checkbox
            id="gdpr-enhanced"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
            className="mt-1 border-pink-300 h-4 w-4 data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400 shadow-sm"
            aria-label="Consentement RGPD"
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
        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pt-2"
        >
          <Button 
            type="submit" 
            className="group premium-button w-full text-base py-3 relative overflow-hidden bg-gradient-to-r from-pink-500/95 to-pink-400/95 hover:from-pink-600/95 hover:to-pink-500/95 text-white border-0 shadow-[0_12px_28px_rgba(255,192,203,0.4)] hover:shadow-[0_16px_36px_rgba(255,192,203,0.5)] transition-all duration-300 rounded-xl font-semibold"
            disabled={isLoading || !email || !firstName || !gdprConsent || emailError !== "" || nameError !== ""}
            aria-disabled={isLoading || !email || !firstName || !gdprConsent || emailError !== "" || nameError !== ""}
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
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span className="whitespace-nowrap text-base">
                Recevoir ma routine
              </span>
            </span>
          </Button>
        </motion.div>
        {/* Preuve sociale sous le bouton */}
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
          <Users className="w-4 h-4 text-pink-400" />
          <span>2,847 femmes ont déjà reçu leur routine</span>
        </div>
      </motion.div>
    </form>
  );
};

