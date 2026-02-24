import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

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
      className="min-h-screen flex items-center justify-center bg-rose-whisper/30 px-4"
    >
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 space-y-6 text-center border border-border">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="mb-4 flex justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Ton profil est prêt
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            Entre ton email pour recevoir tes résultats + un guide avec les 3 premiers gestes adaptés à ta peau.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Input
            type="text"
            placeholder="Ton prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-border focus:ring-primary/30 focus:border-primary py-3 font-body"
          />
          <Input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-border focus:ring-primary/30 focus:border-primary py-3 font-body"
          />
          
          <label className="flex items-start gap-2 text-sm cursor-pointer font-body">
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              required
              className="mt-1 accent-rose-DEFAULT"
            />
            <span className="text-muted-foreground">
              J'accepte de recevoir mes résultats et mon guide personnalisé par email.
            </span>
          </label>
          
          <Button
            type="submit"
            disabled={isLoading || !email || !firstName || !gdprConsent}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3.5 rounded-xl font-semibold text-lg shadow-glow flex items-center justify-center gap-2 font-body"
          >
            {isLoading ? "..." : "Voir mes résultats"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </Button>
        </motion.form>

        <motion.p
          className="text-xs text-muted-foreground font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Pas de spam. Tu peux te désinscrire en 1 clic.
        </motion.p>

        {onSkip && (
          <motion.button
            onClick={onSkip}
            className="text-sm text-muted-foreground underline hover:text-foreground transition-colors font-body"
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
