import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";

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

  const locked = [
    "Tes trois premiers gestes",
    "Le programme qui te correspond",
    "Un récap à garder dans ta boîte mail",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-10 lg:py-16"
    >
      <div className="max-w-[560px] mx-auto">
        <div className="flex justify-between items-baseline border-b border-foreground pb-3 mb-10">
          <span className="eyebrow">Ton résultat</span>
          <span className="eyebrow">1 / 2</span>
        </div>

        <p className="font-heading italic text-[18px] text-primary mb-2">Tu es…</p>
        <h1 className="font-heading font-semibold text-[2.6rem] lg:text-[3.4rem] leading-[1] tracking-[-0.01em] text-foreground mb-6">
          {profile.title}
        </h1>
        <p className="font-body text-[17px] leading-relaxed text-foreground first-letter:font-heading first-letter:text-[3.2rem] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary">
          {profile.tuEs}
        </p>

        <div className="mt-12 border-t border-foreground pt-8">
          <h2 className="font-heading text-[1.8rem] leading-tight font-semibold text-foreground mb-2">
            La suite, <span className="italic font-normal">par écrit</span>
          </h2>
          <p className="font-body text-[15px] text-muted-foreground mb-6">
            Laisse ton prénom et ton email pour lire la suite ici et la recevoir dans ta boîte :
          </p>
          <ul className="mb-8">
            {locked.map((item, i) => (
              <li key={item} className="flex gap-4 py-3 border-b border-border font-body text-[15px] text-foreground">
                <span className="font-heading italic text-primary w-6">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Ton prénom"
              aria-label="Ton prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full font-body text-[16px] py-3 bg-transparent text-foreground border-0 border-b border-foreground rounded-none outline-none placeholder:text-muted-foreground focus-visible:border-primary"
            />
            <input
              type="email"
              placeholder="ton@email.com"
              aria-label="Ton email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full font-body text-[16px] py-3 bg-transparent text-foreground border-0 border-b border-foreground rounded-none outline-none placeholder:text-muted-foreground focus-visible:border-primary"
            />
            <label className="flex items-start gap-3 text-[13px] cursor-pointer font-body pt-2">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                required
                className="mt-0.5 accent-primary"
              />
              <span className="text-muted-foreground leading-relaxed">
                J'accepte de recevoir mon résultat par email, puis des conseils et offres Majoliepeau. Désinscription en un clic.
              </span>
            </label>
            <button
              type="submit"
              disabled={isLoading || !email || !firstName || !gdprConsent}
              className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-background font-body text-[15px] font-medium tracking-wide py-4 rounded-sm transition-colors hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {isLoading ? "Un instant…" : "Lire la suite"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {onSkip && (
            <div className="text-center mt-6">
              <button
                onClick={onSkip}
                className="text-[13px] text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors font-body"
              >
                Continuer sans email
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
