import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { ValidatedInput } from "@/components/Forms/ValidatedInput";
import { LoadingButton } from "@/components/Forms/LoadingButton";
import { TrustBadges } from "@/components/TrustBadges";

interface EmailCaptureScreenProps {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onSkip?: () => void;
}

const validateEmail = (value: string): string | null => {
  if (!value) return "Ton email est requis";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Adresse email invalide";
  return null;
};

const validateName = (value: string): string | null => {
  if (!value.trim()) return "Ton prénom est requis";
  if (value.trim().length < 2) return "Prénom trop court";
  return null;
};

export const EmailCaptureScreen = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  onSkip,
}: EmailCaptureScreenProps) => {
  const isFormValid = email && firstName && gdprConsent && !validateEmail(email) && !validateName(firstName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] w-full space-y-6 text-center">
        {/* Icon + heading */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <div className="mb-4 flex justify-center">
            <motion.div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{ background: "#F5F0FA" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(212,100,154,0)", "0 0 0 10px rgba(212,100,154,0.08)", "0 0 0 0 rgba(212,100,154,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
          <h1 className="font-heading text-[1.8rem] lg:text-[2.2rem] font-bold text-violet-deep mb-3">
            Ton profil est prêt ✨
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed font-body max-w-sm mx-auto">
            Entre ton email pour recevoir tes résultats + un guide avec les 3 premiers gestes adaptés à ta peau.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          aria-label="Formulaire d'inscription"
        >
          <ValidatedInput
            type="text"
            placeholder="Ton prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            validate={validateName}
            required
            aria-label="Prénom"
            autoComplete="given-name"
          />
          <ValidatedInput
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            validate={validateEmail}
            required
            aria-label="Adresse email"
            autoComplete="email"
          />

          <label className="flex items-start gap-3 cursor-pointer group" htmlFor="gdpr-consent">
            <div className="relative mt-0.5">
              <input
                id="gdpr-consent"
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                required
                className="sr-only"
                aria-label="Consentement RGPD"
              />
              <motion.div
                className="w-5 h-5 rounded-[5px] border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor: gdprConsent ? "#D4649A" : "#C4AEDA",
                  background: gdprConsent ? "#D4649A" : "transparent",
                }}
                whileTap={{ scale: 0.9 }}
              >
                {gdprConsent && (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.25 }}
                    viewBox="0 0 12 9"
                    fill="none"
                    className="w-3 h-3"
                  >
                    <motion.path
                      d="M1 4.5L4.5 8L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.svg>
                )}
              </motion.div>
            </div>
            <span className="text-[13px] text-muted-foreground font-body leading-relaxed">
              J'accepte de recevoir mes résultats et mon guide personnalisé par email. Pas de spam, désabonnement en 1 clic.
            </span>
          </label>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Envoi en cours..."
            disabled={!isFormValid}
          >
            Voir mes résultats
            <ArrowRight className="w-4 h-4" />
          </LoadingButton>
        </motion.form>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <TrustBadges />
        </motion.div>

        {onSkip && (
          <motion.button
            onClick={onSkip}
            className="text-sm underline hover:text-foreground transition-colors font-body"
            style={{ color: "#9B8FA3" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            type="button"
          >
            Voir mes résultats sans donner mon email
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};