import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { ResultsRevealAnimation } from "../ResultsRevealAnimation";
import { AnimatedResultCard } from "../AnimatedResultCard";
import { AnimatedProgressBars } from "../AnimatedProgressBars";
import { ShareWidget } from "../ShareWidget";

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

  const scoreItems = [
    { label: "Hydratation", value: 65 + Math.abs(hormoneProfile.score % 30), color: "#6B4E7D" },
    { label: "Équilibre", value: 55 + Math.abs((hormoneProfile.score + 10) % 35), color: "#D4649A" },
    { label: "Éclat", value: 50 + Math.abs((hormoneProfile.score + 20) % 40), color: "#8A6BA0" },
  ];

  return (
    <ResultsRevealAnimation trigger>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-6 py-8"
      >
        <div className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto space-y-5">
          
          {/* Profile header — now uses AnimatedResultCard */}
          <motion.div variants={itemVariants}>
            <AnimatedResultCard
              emoji={profile.emoji}
              title={profile.title}
            />
          </motion.div>

          {/* Description card */}
          <motion.div variants={itemVariants} className="bg-card p-6 border border-border" style={{ borderRadius: 20 }}>
            <p className="text-foreground leading-relaxed text-base font-body">
              {profile.tuEs}
            </p>
          </motion.div>

          {/* Score bars */}
          <motion.div variants={itemVariants} className="bg-card p-6 border border-border" style={{ borderRadius: 20 }}>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Tes scores peau
            </h2>
            <AnimatedProgressBars items={scoreItems} />
          </motion.div>

          {/* Needs card */}
          <motion.div variants={itemVariants} className="bg-card p-6 border border-border" style={{ borderRadius: 20 }}>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              Ce que ta peau a besoin
            </h2>
            <p className="text-muted-foreground leading-relaxed font-body">
              {profile.besoin}
            </p>
          </motion.div>

          {/* 3 Steps card */}
          <motion.div variants={itemVariants} className="bg-card p-6 border border-border" style={{ borderRadius: 20 }}>
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

          {/* Share widget */}
          <motion.div variants={itemVariants}>
            <ShareWidget profileTitle={profile.title} profileEmoji={profile.emoji} />
          </motion.div>

          {/* Separator */}
          <motion.div variants={itemVariants} className="border-t border-border my-1" />

          {/* Product CTA */}
          <motion.div variants={itemVariants} className="p-6 border border-border" style={{ borderRadius: 20, background: 'linear-gradient(135deg, #F5F0FA 0%, #FBEAF2 100%)' }}>
            <p className="font-body uppercase mb-2" style={{ fontSize: 13, color: '#9B8FA3', letterSpacing: '1.5px' }}>Pour aller plus loin</p>
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">
              {profile.program} — {profile.programPrice}
            </h2>
            <p className="text-muted-foreground mb-5 font-body text-[15px]">
              {profile.programReason}
            </p>
            <motion.button
              onClick={handleDiscoverProgram}
              className="w-full font-body text-base font-bold text-primary-foreground py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)',
                boxShadow: '0 8px 30px rgba(212, 100, 154, 0.25)',
                borderRadius: 99,
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(212, 100, 154, 0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              Découvrir {profile.program} →
            </motion.button>
            <p className="text-xs text-center mt-3 font-body" style={{ color: '#9B8FA3' }}>
              10 min/jour · Accès immédiat · Garantie 30 jours
            </p>
          </motion.div>

          {/* Email reminder */}
          <motion.div variants={itemVariants} className="bg-card p-6 border border-border" style={{ borderRadius: 20 }}>
            <p className="text-foreground font-medium mb-3 font-body">Tu recevras aussi par email :</p>
            <ul className="space-y-2 text-muted-foreground font-body">
              {["Ton profil en PDF", "3 conseils adaptés", "Ressources gratuites"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4 italic font-body" style={{ color: '#9B8FA3' }}>
              Pas prête ? Pas de souci. Le guide arrive dans ta boîte. 💌
            </p>
          </motion.div>

          {/* Reset */}
          <motion.div variants={itemVariants} className="text-center pb-4">
            <button
              onClick={onResetQuiz}
              className="hover:text-foreground transition-colors underline text-sm font-body"
              style={{ color: '#9B8FA3' }}
            >
              Refaire le quiz →
            </button>
          </motion.div>

          {/* Footer */}
          <motion.footer variants={itemVariants} className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-muted-foreground font-body">
                © 2026 Majoliepeau. Tous droits réservés.
              </p>
              <nav className="flex items-center space-x-6">
                <a href="https://majoliepeau.com" className="text-sm text-primary hover:text-primary-hover transition-colors font-medium font-body" target="_blank" rel="noopener noreferrer">Boutique</a>
                <a href="https://instagram.com/majolie_peau" className="text-sm text-primary hover:text-primary-hover transition-colors font-medium font-body" target="_blank" rel="noopener noreferrer">Instagram</a>
              </nav>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </ResultsRevealAnimation>
  );
};