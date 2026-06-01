import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-140px)]"
    >
      <div className="max-w-[480px] w-full bg-card border border-border rounded-xl shadow-md p-8 space-y-6 text-center">
        {/* Icon + progression */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="font-body uppercase text-[13px] text-soft tracking-[1.5px] mb-4">
            Dernière étape
          </p>
          <div className="mb-4 flex justify-center">
            <div className="w-[72px] h-[72px] rounded-full bg-brand-soft flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-heading text-[1.8rem] lg:text-[2.2rem] font-bold text-violet-deep mb-3">
            Ton profil est prêt
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed font-body">
            Entre ton email pour recevoir tes résultats + un guide avec les 3 premiers
            gestes adaptés à ta peau.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Ton prénom"
            aria-label="Ton prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full font-body text-[15px] py-3.5 px-5 rounded-sm surface-soft text-foreground border-[1.5px] border-border transition-colors outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20"
          />
          <input
            type="email"
            placeholder="ton@email.com"
            aria-label="Ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full font-body text-[15px] py-3.5 px-5 rounded-sm surface-soft text-foreground border-[1.5px] border-border transition-colors outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20"
          />

          <label className="flex items-start gap-2 text-sm cursor-pointer font-body">
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              required
              className="mt-1 accent-primary"
            />
            <span className="text-muted-foreground">
              J'accepte de recevoir mes résultats et mon guide personnalisé par email.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !email || !firstName || !gdprConsent}
            className="w-full font-body text-base font-bold text-primary-foreground bg-brand-gradient rounded-full py-4 shadow-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            {isLoading ? "..." : "Voir mes résultats"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </motion.form>

        <motion.p
          className="text-xs text-soft font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Pas de spam. Tu peux te désinscrire en 1 clic.
        </motion.p>

        {onSkip && (
          <motion.button
            onClick={onSkip}
            className="text-sm text-soft underline hover:text-foreground transition-colors font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Voir mes résultats sans donner mon email
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
