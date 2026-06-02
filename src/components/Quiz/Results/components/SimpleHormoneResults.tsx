import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { getProfileIcon, getProfileTheme } from "../../utils/profileVisuals";
import { ArrowRight, Check, Mail } from "lucide-react";

interface SimpleHormoneResultsProps {
  hormoneProfile: HormoneProfile;
  onResetQuiz: () => void;
}

export const SimpleHormoneResults = ({
  hormoneProfile,
  onResetQuiz,
}: SimpleHormoneResultsProps) => {
  const profile = getHormoneProfileDetails(hormoneProfile.type);
  const theme = getProfileTheme(profile.colorTheme);
  const ProfileIcon = getProfileIcon(profile.icon);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const handleDiscoverProgram = () => {
    window.open(`https://majoliepeau.com${profile.programSlug}`, "_blank");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="px-6 py-8"
    >
      <div className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto space-y-5">

        {/* Profile header — halo coloré selon le profil */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="font-body uppercase text-[13px] text-soft tracking-[1.5px] mb-3">
            Ton profil peau
          </p>
          <div className="mb-4 flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: theme.halo, boxShadow: `0 0 0 10px ${theme.ring}` }}
            >
              <ProfileIcon className="w-9 h-9" style={{ color: theme.icon }} strokeWidth={1.75} />
            </div>
          </div>
          <h1 className="font-heading text-[28px] lg:text-[32px] font-bold text-foreground">
            {profile.title}
          </h1>
        </motion.div>

        {/* Description card */}
        <motion.div variants={itemVariants} className="bg-card p-6 rounded-lg border border-border shadow-md">
          <p className="text-foreground leading-relaxed text-base font-body">
            {profile.tuEs}
          </p>
        </motion.div>

        {/* Needs card */}
        <motion.div variants={itemVariants} className="bg-card p-6 rounded-lg border border-border shadow-md">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Ce que ta peau a besoin
          </h2>
          <p className="text-muted-foreground leading-relaxed font-body">
            {profile.besoin}
          </p>
        </motion.div>

        {/* 3 Steps card */}
        <motion.div variants={itemVariants} className="bg-card p-6 rounded-lg border border-border shadow-md">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Tes 3 premiers gestes
          </h2>
          <div className="space-y-4">
            {profile.gestes.map((geste, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold font-body">
                  {index + 1}
                </span>
                <p className="text-foreground leading-relaxed pt-0.5 font-body text-[15px]">{geste}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product CTA — gradient de marque */}
        <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-brand-soft shadow-md">
          <p className="font-body uppercase text-[13px] text-soft tracking-[1.5px] mb-2">
            Pour aller plus loin
          </p>
          <h2 className="font-heading text-xl font-bold text-foreground mb-1">
            {profile.program} — {profile.programPrice}
          </h2>
          <p className="text-muted-foreground mb-5 font-body text-[15px]">
            {profile.programReason}
          </p>
          <motion.button
            onClick={handleDiscoverProgram}
            className="w-full font-body text-base font-bold text-primary-foreground bg-brand-gradient py-3.5 rounded-full shadow-glow flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir {profile.program}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="text-xs text-center mt-3 text-soft font-body">
            10 min/jour · Accès immédiat · Garantie 30 jours
          </p>
        </motion.div>

        {/* Email reminder */}
        <motion.div variants={itemVariants} className="bg-card p-6 rounded-lg border border-border shadow-md">
          <p className="text-foreground font-medium mb-3 font-body">Tu recevras aussi par email :</p>
          <ul className="space-y-2 text-muted-foreground font-body">
            {["Ton profil détaillé", "3 conseils adaptés", "Ressources gratuites"].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={3} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4 italic text-soft font-body flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" />
            Pas prête ? Pas de souci. Le guide arrive dans ta boîte.
          </p>
        </motion.div>

        {/* Reset */}
        <motion.div variants={itemVariants} className="text-center pb-2">
          <button
            onClick={onResetQuiz}
            className="text-soft hover:text-foreground transition-colors underline text-sm font-body"
          >
            Refaire le quiz →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
