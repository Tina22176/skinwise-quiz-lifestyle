import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HORMONE_PROFILE_DETAILS } from "./Results/utils/HormoneProfileDetails";

const heroImage = "/hero-illustration.webp";
const ROMAN = ["I", "II", "III", "IV", "V"];

const StartButton = ({ onStart, label }: { onStart: () => void; label: string }) => (
  <button
    onClick={onStart}
    className="group inline-flex items-center justify-center gap-3 bg-foreground text-background font-body text-[15px] font-medium tracking-wide px-8 py-4 rounded-sm transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    {label}
    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  </button>
);

const takeaways = [
  {
    title: "Ton profil, parmi cinq",
    text: "Pas un « type de peau » de plus. Une lecture de ce qui la fait réagir : ton stress, ton sommeil, ton cycle.",
  },
  {
    title: "Trois gestes, pas douze",
    text: "De quoi commencer cette semaine, avec ce que tu as déjà dans ta salle de bain.",
  },
  {
    title: "Un récap dans ta boîte mail",
    text: "Pour le relire tranquillement, plus tard, sans refaire le quiz.",
  },
];

const profiles = Object.values(HORMONE_PROFILE_DETAILS).map((p) => p.title);

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  const reduce = useReducedMotion();
  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div>
      {/* ── Couverture ── */}
      <motion.section initial="hidden" animate="visible" variants={fadeUp} className="max-w-[1100px] mx-auto px-6 pt-8 pb-14 lg:pt-14 lg:pb-20">
        <p className="eyebrow mb-6 lg:mb-10">8 questions · 2 min</p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-heading font-semibold text-foreground text-[3.1rem] leading-[0.95] sm:text-[4.2rem] lg:text-[5.6rem] tracking-[-0.02em]">
              Ta peau te parle.
              <br />
              <span className="italic font-normal text-primary">Apprends à l'écouter.</span>
            </h1>
            <p className="mt-7 font-body text-[17px] leading-relaxed text-muted-foreground max-w-[30rem]">
              Huit questions sur ton rythme, ton stress et ton cycle. Tu repars avec ton profil
              et trois gestes simples pour commencer cette semaine.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
              <StartButton onStart={onStart} label="Commencer le diagnostic" />
              <span className="font-body text-[13px] text-muted-foreground">Gratuit, sans inscription pour commencer.</span>
            </div>
          </div>

          <figure className="lg:col-span-5">
            <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
              <img
                src={heroImage}
                alt="Illustration : une femme au masque visage, une tasse de thé à la main, sur son canapé"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 font-heading italic text-[15px] text-muted-foreground">
              Le soir, cinq minutes rien qu'à toi.
            </figcaption>
          </figure>
        </div>
      </motion.section>

      {/* ── Ce que tu repars avec ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-secondary"
      >
        <div className="max-w-[1100px] mx-auto px-6 py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">Au sommaire</p>
          <h2 className="font-heading text-[2.2rem] lg:text-[2.8rem] leading-[1.02] font-semibold text-foreground">
            Ce que tu <span className="italic font-normal">repars</span> avec
          </h2>
        </div>
        <ol className="lg:col-span-8">
          {takeaways.map((t, i) => (
            <li key={t.title} className="grid grid-cols-[3rem_1fr] gap-4 py-6 border-b border-foreground/15 last:border-0 first:pt-0">
              <span className="font-heading text-[2rem] leading-none text-primary">0{i + 1}</span>
              <div>
                <h3 className="font-heading text-[1.5rem] font-semibold text-foreground leading-tight mb-2">{t.title}</h3>
                <p className="font-body text-[15px] leading-relaxed text-muted-foreground max-w-[34rem]">{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
        </div>
      </motion.section>

      {/* ── Les cinq profils ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-foreground text-background"
      >
        <div className="max-w-[1100px] mx-auto px-6 py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3 !text-gold">Les cinq profils</p>
          <h2 className="font-heading text-[2.2rem] lg:text-[2.8rem] leading-[1.02] font-semibold text-background">
            Laquelle <span className="italic font-normal">es-tu</span> ?
          </h2>
        </div>
        <ul className="lg:col-span-8">
          {profiles.map((title, i) => (
            <li key={title} className="flex items-baseline gap-6 py-4 border-b border-background/15 last:border-0 first:pt-0">
              <span className="font-heading italic text-[15px] text-gold w-8">{ROMAN[i]}</span>
              <span className="font-heading text-[1.6rem] lg:text-[1.9rem] leading-tight text-background">{title}</span>
            </li>
          ))}
        </ul>
        </div>
      </motion.section>

      {/* ── Fin ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="max-w-[1100px] mx-auto px-6 py-16 lg:py-24 text-center"
      >
        <p className="font-heading italic text-[1.9rem] lg:text-[2.6rem] leading-tight text-foreground max-w-[40rem] mx-auto">
          « On ne soigne bien que ce qu'on comprend. »
        </p>
        <div className="mt-10">
          <StartButton onStart={onStart} label="Je fais le diagnostic" />
        </div>
      </motion.section>
    </div>
  );
};
