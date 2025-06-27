import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail } from "lucide-react";

interface SubscriptionFormProps {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  variants: any;
}

export const SubscriptionForm = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  gdprConsent,
  setGdprConsent,
  isLoading,
  handleSubmit,
  variants
}: SubscriptionFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 mt-8 sm:mt-10">
      <motion.div 
        variants={variants}
        className="flex flex-col gap-4 sm:gap-6"
      >
        <div className="text-center space-y-3">
          <motion.h3 
            className="text-xl sm:text-2xl font-semibold text-black"
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🌟 PROCHAINE ÉTAPE 🌟
          </motion.h3>
          <p className="text-black/70 text-sm sm:text-base">
            Reçois ta routine personnalisée gratuite adaptée à tes besoins spécifiques !
          </p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Ton prénom 💝"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="premium-input text-base sm:text-lg py-4 sm:py-6 bg-white border-pink-200/70 shadow-[0_2px_8px_rgba(255,192,203,0.15)] focus:border-pink-300/70 focus:ring-pink-200/50"
          />
          
          <Input
            type="email"
            placeholder="Ton email pour recevoir ta routine personnalisée 🎀"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="premium-input text-base sm:text-lg py-4 sm:py-6 bg-white border-pink-200/70 shadow-[0_2px_8px_rgba(255,192,203,0.15)] focus:border-pink-300/70 focus:ring-pink-200/50"
          />
        </div>

        <motion.div 
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(255,192,203,0.3)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-start space-x-3 bg-gradient-to-r from-pink-50/90 to-white/90 p-3 sm:p-4 rounded-xl border border-pink-200/60 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Checkbox
            id="gdpr"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
            className="mt-1 border-pink-300 h-5 w-5 data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400 shadow-sm"
          />
          <label 
            htmlFor="gdpr" 
            className="text-xs sm:text-sm text-black/70 cursor-pointer"
          >
            J'accepte de recevoir ma routine personnalisée et des conseils adaptés par email. 
            Je peux me désinscrire à tout moment.
          </label>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            className="group premium-button w-full text-base sm:text-lg py-4 sm:py-6 relative overflow-hidden bg-gradient-to-r from-pink-300/90 to-pink-200/90 hover:from-pink-400/90 hover:to-pink-300/90 text-white border border-pink-200/50 shadow-[0_8px_24px_rgba(255,192,203,0.25)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.4)] transition-all duration-300 flex-shrink-0 flex-wrap"
            disabled={isLoading || !email || !gdprConsent}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {isLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin text-white" />
            ) : (
              <Mail className="w-5 h-5 mr-2 text-white" />
            )}
            <span className="whitespace-normal">RECEVOIR MA ROUTINE PERSONNALISÉE</span>
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};
