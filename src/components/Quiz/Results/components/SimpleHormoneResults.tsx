import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { HormoneIcon } from "./HormoneIcon";
import { ArrowRight, Check } from "lucide-react";

interface SimpleHormoneResultsProps {
  hormoneProfile: HormoneProfile;
  onResetQuiz: () => void;
}

export const SimpleHormoneResults = ({
  hormoneProfile,
  onResetQuiz
}: SimpleHormoneResultsProps) => {
  const profile = getHormoneProfileDetails(hormoneProfile.type);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  const handleDiscoverProgram = () => {
    window.open(`https://majoliepeau.com${profile.programSlug}`, '_blank');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="px-4 py-8"
    >
      <div className="max-w-xl mx-auto space-y-5">
        
        {/* Profile header */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm text-muted-foreground font-body uppercase tracking-wide mb-3">Ton profil peau</p>
          <div className="mb-3 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <HormoneIcon profile={hormoneProfile.type} size={32} className="text-primary" />
            </div>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            {profile.title}
          </h1>
        </motion.div>

        {/* Description card */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <p className="text-foreground leading-relaxed text-base font-body">
            {profile.tuEs}
          </p>
        </motion.div>

        {/* Needs card */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Ce que ta peau a besoin
          </h2>
          <p className="text-muted-foreground leading-relaxed font-body">
            {profile.besoin}
          </p>
        </motion.div>

        {/* 3 Steps card */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl p-6 shadow-md border border-border">
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

        {/* Separator */}
        <motion.div variants={itemVariants} className="border-t border-border my-1" />

        {/* Product CTA */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <p className="text-sm text-muted-foreground font-body uppercase tracking-wide mb-2">Pour aller plus loin</p>
          <h2 className="font-heading text-xl font-bold text-foreground mb-1">
            {profile.program} — {profile.programPrice}
          </h2>
          <p className="text-muted-foreground mb-5 font-body text-[15px]">
            {profile.programReason}
          </p>
          <motion.button
            onClick={handleDiscoverProgram}
            className="w-full font-body text-base font-bold text-primary-foreground py-3.5 rounded-full shadow-glow flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, hsl(340 65% 58%) 0%, hsl(340 55% 49%) 100%)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir {profile.program}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-xs text-muted-foreground text-center mt-3 font-body">
            10 min/jour · Accès immédiat · Garantie 30 jours
          </p>
        </motion.div>

        {/* Email reminder */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <p className="text-foreground font-medium mb-3 font-body">Tu recevras aussi par email :</p>
          <ul className="space-y-2 text-muted-foreground font-body">
            {["Ton profil en PDF", "3 conseils adaptés", "Ressources gratuites"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm mt-4 italic font-body">
            Pas prête ? Pas de souci. Le guide arrive dans ta boîte.
          </p>
        </motion.div>

        {/* Reset */}
        <motion.div variants={itemVariants} className="text-center pb-8">
          <button
            onClick={onResetQuiz}
            className="text-primary hover:text-primary-hover transition-colors underline text-sm font-body"
          >
            Refaire le quiz →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
