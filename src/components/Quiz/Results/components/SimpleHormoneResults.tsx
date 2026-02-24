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
    // Open product page — will be updated with actual e-commerce URL
    window.open(`https://majoliepeau.com${profile.programSlug}`, '_blank');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-rose-whisper/30 px-4 py-8"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header profil */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-rose-whisper flex items-center justify-center">
              <HormoneIcon profile={hormoneProfile.type} size={32} className="text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-body uppercase tracking-wide mb-1">Ton profil peau</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            {profile.title}
          </h1>
        </motion.div>

        {/* Tu es */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-rose-whisper to-card rounded-xl p-6 shadow-md border border-border">
          <p className="text-foreground leading-relaxed text-lg font-body">
            {profile.tuEs}
          </p>
        </motion.div>

        {/* Ce que ta peau a besoin */}
        <motion.div variants={itemVariants} className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Ce que ta peau a besoin
          </h2>
          <p className="text-muted-foreground leading-relaxed font-body">
            {profile.besoin}
          </p>
        </motion.div>

        {/* 3 premiers gestes */}
        <motion.div variants={itemVariants} className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Tes 3 premiers gestes
          </h2>
          <div className="space-y-4">
            {profile.gestes.map((geste, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold font-body">
                  {index + 1}
                </span>
                <p className="text-foreground leading-relaxed pt-0.5 font-body">{geste}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="border-t border-border my-2" />

        {/* Programme recommandé */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-lilas-whisper to-rose-whisper rounded-xl p-6 shadow-md border border-lilas-soft/50">
          <p className="text-sm text-violet-mid font-body uppercase tracking-wide mb-2">Pour aller plus loin</p>
          <h2 className="font-heading text-xl font-bold text-foreground mb-1">
            {profile.program} — {profile.programPrice}
          </h2>
          <p className="text-muted-foreground mb-5 font-body">
            {profile.programReason}
          </p>
          <motion.button
            onClick={handleDiscoverProgram}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3.5 rounded-xl font-semibold shadow-glow flex items-center justify-center gap-2 transition-all duration-200 font-body"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir {profile.program}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Ce que tu recevras par email */}
        <motion.div variants={itemVariants} className="bg-card rounded-xl p-6 shadow-md border border-border">
          <p className="text-foreground font-medium mb-3 font-body">Tu recevras aussi par email :</p>
          <ul className="space-y-2 text-muted-foreground font-body">
            {["Ton profil en PDF", "3 conseils adaptés", "Ressources gratuites"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm mt-4 italic font-body">
            Pas prête ? Pas de souci. Le guide arrive dans ta boîte.
          </p>
        </motion.div>

        {/* Refaire le quiz */}
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
