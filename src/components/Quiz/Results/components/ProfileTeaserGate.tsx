import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { PROFILE_ILLUSTRATIONS } from "../utils/profileIllustrations";

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

const fieldClass =
  "w-full font-body text-[16px] px-4 py-3.5 bg-background text-foreground border border-foreground/25 rounded-none outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25";

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
  const profile = getHormoneProfileDetails(hormoneProfile.type, hormoneProfile.cycleContext);

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
      className="pb-12 lg:pb-16"
    >
      {/* ── Ton profil ── */}
      <div className="max-w-[560px] mx-auto px-6 pt-10 lg:pt-16">
        <div className="flex justify-between items-baseline border-b border-foreground pb-3 mb-10">
          <span className="eyebrow">Ton résultat</span>
          <span className="eyebrow">1 / 2</span>
        </div>

        <p className="font-heading italic text-[18px] text-primary mb-2">Tu es…</p>
        <h1 className="font-heading font-semibold text-[2.6rem] lg:text-[3.4rem] leading-[1] tracking-[-0.01em] text-foreground mb-6">
          {profile.title}
        </h1>
        {PROFILE_ILLUSTRATIONS[hormoneProfile.type] && (
          <figure className="mb-8 -mx-6 sm:mx-0">
            <img src={PROFILE_ILLUSTRATIONS[hormoneProfile.type]} alt={`Illustration : ${profile.title}`} width={1024} height={768} className="w-full h-auto block" />
          </figure>
        )}
        <p className="font-body text-[17px] leading-relaxed text-foreground first-letter:font-heading first-letter:text-[3.2rem] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary">
          {profile.tuEs}
        </p>
      </div>

      {/* ── Les conseils restent sur le fond de page ── */}
      <div className="mt-12">
        <div className="max-w-[560px] mx-auto px-6">
          <h2 className="font-heading text-[1.9rem] leading-tight font-semibold text-foreground mb-3">
            La suite, <span className="italic font-normal">par écrit</span>
          </h2>
          <p className="font-body text-[15px] leading-relaxed text-muted-foreground mb-7">
            Laisse ton prénom et ton email pour lire la suite ici et la recevoir dans ta boîte :
          </p>

          <ul className="mb-9">
            {locked.map((item, i) => (
              <li key={item} className="flex gap-4 py-3 border-b border-foreground/15 font-body text-[15px] text-foreground last:border-0">
                <span className="font-heading italic text-primary w-6">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="space-y-5 bg-secondary border-y border-primary/25 px-5 py-7 sm:px-7">
            <label htmlFor="result-first-name" className="block font-body text-[14px] font-medium text-foreground">
              Ton prénom
            <input
              id="result-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="Ton prénom"
              aria-label="Ton prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={`${fieldClass} mt-2`}
            />
            </label>
            <label htmlFor="result-email" className="block font-body text-[14px] font-medium text-foreground">
              Ton email
            <input
              id="result-email"
              type="email"
              autoComplete="email"
              placeholder="ton@email.com"
              aria-label="Ton email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${fieldClass} mt-2`}
            />
            </label>
            <label className="flex items-start gap-3 text-[13px] cursor-pointer font-body pt-3">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 accent-primary"
              />
              <span className="text-muted-foreground leading-relaxed">
                J'accepte de recevoir mon résultat par email, puis des conseils et offres Majoliepeau. Désinscription en un clic.
              </span>
            </label>
            <Button
              type="submit"
              disabled={isLoading || !email || !firstName || !gdprConsent}
              className="w-full h-auto mt-2 gap-3 bg-foreground text-background font-body text-[15px] font-medium py-4 rounded-sm hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-offset-secondary"
            >
              {isLoading ? "Un instant…" : "Lire la suite"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>

      {onSkip && (
        <div className="max-w-[560px] mx-auto px-6 text-center mt-7">
          <Button
            variant="link"
            onClick={onSkip}
            className="text-[13px] text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors font-body"
          >
            Continuer sans email
          </Button>
        </div>
      )}
    </motion.div>
  );
};
