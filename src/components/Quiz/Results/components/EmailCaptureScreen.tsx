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
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 space-y-6 text-center border border-border">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="mb-4 flex justify-center">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: '#F5F0FA' }}>
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-heading text-[1.8rem] font-bold text-violet-deep mb-3">
            Ton profil est prêt
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed font-body">
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
          <input
            type="text"
            placeholder="Ton prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full font-body text-[15px] py-3.5 px-5 rounded-xl outline-none transition-colors"
            style={{
              background: '#F5F0FA',
              border: '1.5px solid #E6DCE9',
              color: '#2E2233',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#D4649A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E6DCE9')}
          />
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full font-body text-[15px] py-3.5 px-5 rounded-xl outline-none transition-colors"
            style={{
              background: '#F5F0FA',
              border: '1.5px solid #E6DCE9',
              color: '#2E2233',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#D4649A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E6DCE9')}
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
            className="w-full font-body text-base font-bold text-primary-foreground rounded-full py-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)',
              boxShadow: '0 8px 30px rgba(212, 100, 154, 0.25)',
              borderRadius: 99,
            }}
          >
            {isLoading ? "..." : "Voir mes résultats"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </motion.form>

        <motion.p
          className="text-xs font-body"
          style={{ color: '#9B8FA3' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Pas de spam. Tu peux te désinscrire en 1 clic.
        </motion.p>

        {onSkip && (
          <motion.button
            onClick={onSkip}
            className="text-sm underline hover:text-foreground transition-colors font-body"
            style={{ color: '#9B8FA3' }}
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