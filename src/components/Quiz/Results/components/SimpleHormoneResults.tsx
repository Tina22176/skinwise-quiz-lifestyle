import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { ArrowRight } from "lucide-react";
import { getProgram } from "../../utils/programRecommendation";
import { PROFILE_ILLUSTRATIONS } from "../utils/profileIllustrations";

interface SimpleHormoneResultsProps {
  hormoneProfile: HormoneProfile;
  onResetQuiz: () => void;
  hasSubscribed: boolean;
  onUnlock?: () => void;
}

export const SimpleHormoneResults = ({
  hormoneProfile,
  onResetQuiz,
  hasSubscribed,
  onUnlock,
}: SimpleHormoneResultsProps) => {
  const profile = getHormoneProfileDetails(hormoneProfile.type, hormoneProfile.cycleContext);
  const recommendation = hormoneProfile.recommendation;
  const illustration = PROFILE_ILLUSTRATIONS[hormoneProfile.type];
  const secondaryProgram = getProgram(recommendation.secondaryId);

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
    const url = new URL(`https://majoliepeau.com${recommendation.slug}`);
    url.searchParams.set("utm_source", "skinwise_quiz");
    url.searchParams.set("utm_medium", "recommendation");
    url.searchParams.set("utm_campaign", recommendation.id);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="px-6 py-10 lg:py-16">
      <article className="max-w-[640px] mx-auto">
        <motion.header variants={itemVariants}>
          <div className="flex justify-between items-baseline border-b border-foreground pb-3 mb-10">
            <span className="eyebrow">Ton profil peau</span>
            <span className="eyebrow">2 / 2</span>
          </div>
          <p className="font-heading italic text-[18px] text-primary mb-2">Tu es…</p>
          <h1 className="font-heading font-semibold text-[2.6rem] lg:text-[3.6rem] leading-[1] tracking-[-0.01em] text-foreground mb-8">
            {profile.title}
          </h1>
          {illustration && (
            <figure className="mb-8 -mx-6 sm:mx-0">
              <img src={illustration} alt={`Illustration : ${profile.title}`} width={1024} height={768} className="w-full h-auto block" />
            </figure>
          )}
          <p className="font-body text-[17px] leading-relaxed text-foreground first-letter:font-heading first-letter:text-[3.2rem] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary">
            {profile.tuEs}
          </p>
        </motion.header>

        <p className="mt-6 font-body text-[13px] leading-relaxed text-muted-foreground">
          Ce profil reflète tes réponses du moment : il ne mesure pas tes hormones.
          Ces gestes ne remplacent pas un suivi médical ni un traitement prescrit.
          Si une irritation persiste ou s’aggrave, demande un avis médical.
        </p>

        <motion.section variants={itemVariants} className="mt-12 border-t border-foreground pt-8">
          <p className="eyebrow mb-3">Chapitre 1</p>
          <h2 className="font-heading text-[2rem] leading-tight font-semibold text-foreground mb-4">
            Ce dont ta peau <span className="italic font-normal">a besoin</span>
          </h2>
          <p className="font-body text-[16px] leading-relaxed text-muted-foreground">{profile.besoin}</p>
        </motion.section>

        {!hasSubscribed && onUnlock && (
          <motion.section variants={itemVariants} className="mt-12 bg-secondary px-6 py-8 sm:px-10">
            <p className="eyebrow mb-3">Chapitre 2</p>
            <h2 className="font-heading text-[2rem] leading-tight font-semibold text-foreground mb-3">
              Tes trois <span className="italic font-normal">premiers gestes</span>
            </h2>
            <p className="font-body text-[16px] leading-relaxed text-foreground mb-6">
              Ils sont réservés à celles qui laissent leur email. Tu as changé d'avis ? Il est encore temps.
            </p>
            <button
              onClick={onUnlock}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-foreground text-background font-body text-[15px] font-medium tracking-wide px-8 py-4 rounded-sm transition-colors hover:bg-primary"
            >
              Recevoir mes trois gestes
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.section>
        )}

        {hasSubscribed && (
          <motion.section variants={itemVariants} className="mt-12 border-t border-foreground pt-8">
            <p className="eyebrow mb-3">Chapitre 2</p>
            <h2 className="font-heading text-[2rem] leading-tight font-semibold text-foreground mb-4">
              Tes trois <span className="italic font-normal">premiers gestes</span>
            </h2>
            <ol>
              {profile.gestes.map((geste, index) => (
                <li key={index} className="grid grid-cols-[3rem_1fr] gap-3 py-5 border-b border-border">
                  <span className="font-heading text-[2rem] leading-none text-primary">0{index + 1}</span>
                  <p className="font-body text-[16px] leading-relaxed text-foreground">{geste}</p>
                </li>
              ))}
            </ol>
          </motion.section>
        )}

        <motion.section variants={itemVariants} className="mt-12 bg-foreground text-background px-6 py-10 sm:px-10">
          <p className="font-body uppercase text-[11px] tracking-[0.22em] font-medium text-gold mb-4">Pour aller plus loin</p>
          <h2 className="font-heading text-[2.2rem] lg:text-[2.6rem] leading-[1.02] font-semibold mb-1">
            {recommendation.name}
          </h2>
          <p className="font-heading italic text-[20px] text-gold mb-5">{recommendation.price}</p>
          <p className="font-body text-[16px] leading-relaxed opacity-80 mb-8">{recommendation.reason}</p>
          <button
            onClick={handleDiscoverProgram}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-body text-[15px] font-medium tracking-wide px-8 py-4 rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            Découvrir {recommendation.name}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="font-body text-[13px] opacity-70 mt-5">{recommendation.reassurance}</p>
          <p className="font-body text-[13px] opacity-70 mt-2">
            Sinon, il y a aussi {secondaryProgram.name}, selon ton rythme et ton budget.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mt-12 border-t border-foreground pt-8">
          <p className="font-heading italic text-[1.4rem] leading-snug text-foreground">
            {hasSubscribed
              ? "Pas prête ? Aucun souci. Ton profil détaillé, tes trois gestes et quelques ressources t'attendent dans ta boîte mail."
              : "Pas prête ? Aucun souci. Prends le temps d'observer ta peau, elle a beaucoup à te dire."}
          </p>
        </motion.section>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <button
            onClick={onResetQuiz}
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 text-[13px] font-body"
          >
            Refaire le quiz
          </button>
        </motion.div>
      </article>
    </motion.div>
  );
};
