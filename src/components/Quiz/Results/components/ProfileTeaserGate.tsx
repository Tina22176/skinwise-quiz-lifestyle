import { motion } from "framer-motion";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { getProfileIcon, getProfileTheme } from "../../utils/profileVisuals";

interface ProfileTeaserGateProps {
  hormoneProfile: HormoneProfile;
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

export const ProfileTeaserGate = ({
  hormoneProfile,
  email,
  setEmail,
  firstName,
  setFirstName,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  onSkip,
}: ProfileTeaserGateProps) => {
  const profile = getHormoneProfileDetails(hormoneProfile.type);
  const theme = getProfileTheme(profile.colorTheme);
  const ProfileIcon = getProfileIcon(profile.icon);

  const locked = [
    "Tes 3 premiers gestes sur-mesure",
    "Ta recommandation programme personnalisée",
    "Ton guide complet, envoyé par email",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-140px)]"
    >
      <div className="max-w-[480px] w-full bg-card border border-border rounded-xl shadow-md p-8 space-y-6">

        {/* ── Révélation du profil (gratuit) ── */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center"
        >
          <p className="font-body uppercase text-[13px] text-soft tracking-[1.5px] mb-4">
            Ton profil peau
          </p>
          <div className="mb-4 flex justify-center">
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{ background: theme.halo, boxShadow: `0 0 0 9px ${theme.ring}` }}
            >
              <ProfileIcon className="w-8 h-8" style={{ color: theme.icon }} strokeWidth={1.75} />
            </div>
          </div>
          <h1 className="font-heading text-[1.7rem] lg:text-[2rem] font-bold text-foreground mb-3">
            {profile.title}
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed font-body">
            {profile.tuEs}
          </p>
        </motion.div>

        {/* ── Ce qui reste à débloquer ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-brand-soft rounded-lg p-5"
        >
          <p className="font-body text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Débloque ton plan complet
          </p>
          <ul className="space-y-2.5">
            {locked.map((item) => (
              <li key={item} className="flex items-center gap-2.5 font-body text-[14px] text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Formulaire email ── */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
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
            {isLoading ? "..." : "Voir mon plan complet"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </motion.form>

        <motion.p
          className="text-xs text-soft font-body text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Pas de spam. Tu peux te désinscrire en 1 clic.
        </motion.p>

        {onSkip && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={onSkip}
              className="text-[13px] text-soft/80 underline hover:text-foreground transition-colors font-body"
            >
              Voir un aperçu sans mon email
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
