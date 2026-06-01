import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Fingerprint,
  Sprout,
  Sparkles,
  Mail,
  Clock,
  ShieldCheck,
  Gift,
  Zap,
  ArrowRight,
} from "lucide-react";
import { HORMONE_PROFILE_DETAILS } from "./Results/utils/HormoneProfileDetails";

/* ── Visuel hero : photo fournie par le client (/public/hero.jpg).
   Fallback décoratif élégant si l'image est absente afin de ne jamais casser la page. ── */
const HeroVisual = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative">
      {/* halo derrière le visuel */}
      <div className="absolute -inset-6 bg-rose-glow/40 rounded-[40px] blur-3xl -z-10" aria-hidden="true" />
      <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto rounded-xl overflow-hidden border border-border shadow-lg">
        {!failed ? (
          <img
            src="/hero.jpg"
            alt="Routine de soin Majoliepeau"
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Fallback CSS — scène douce rose/lila */
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{ background: "linear-gradient(150deg, #FBEAF2 0%, #F5F0FA 55%, #EDE5F4 100%)" }}
          >
            <div className="absolute top-8 left-8 w-28 h-28 bg-rose-glow/60 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-10 right-8 w-32 h-32 bg-lilas-soft/60 rounded-full blur-2xl animate-float" style={{ animationDelay: "1.5s" }} />
            <div className="relative text-center px-6">
              <div className="w-20 h-20 rounded-full bg-card/80 backdrop-blur flex items-center justify-center mx-auto mb-4 shadow-md">
                <Sparkles className="w-9 h-9 text-primary" />
              </div>
              <p className="font-heading text-2xl text-violet-deep italic">Ta peau,<br />décodée</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* CTA réutilisable */
const StartButton = ({ onStart, label }: { onStart: () => void; label: string }) => (
  <motion.button
    onClick={onStart}
    className="group bg-brand-gradient text-primary-foreground rounded-full text-[17px] font-bold shadow-glow font-body inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    style={{ padding: "18px 44px" }}
    whileHover={{ y: -2, boxShadow: "0 14px 44px rgba(212, 100, 154, 0.38)" }}
    whileTap={{ scale: 0.98 }}
  >
    {label}
    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
  </motion.button>
);

const features = [
  { icon: Fingerprint, title: "Ton profil peau unique", text: "Découvre lequel des 5 profils hormonaux te correspond vraiment." },
  { icon: Sprout, title: "3 gestes sur-mesure", text: "Des conseils concrets adaptés à TA peau — pas à celle des autres." },
  { icon: Sparkles, title: "Fini le bruit TikTok", text: "On coupe court aux routines à 12 étapes qui agressent ta peau." },
  { icon: Mail, title: "Ton guide perso", text: "Reçois ton profil détaillé et tes ressources directement par email." },
];

const reassurance = [
  { icon: Gift, label: "100% gratuit" },
  { icon: Clock, label: "2 minutes" },
  { icon: Zap, label: "Résultats immédiats" },
  { icon: ShieldCheck, label: "Sans spam" },
];

const profiles = Object.values(HORMONE_PROFILE_DETAILS).map((p) => ({
  emoji: p.emoji,
  title: p.title,
}));

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  const reduce = useReducedMotion();

  // Variantes respectant prefers-reduced-motion
  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Orbs décoratifs globaux */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-24 left-[8%] w-44 h-44 bg-rose-glow/40 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-[6%] w-52 h-52 bg-lilas-soft/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-24 left-1/4 w-36 h-36 bg-violet-whisper/60 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* ───────────────── HERO ───────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 pt-10 pb-16 sm:pt-16 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Colonne texte */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 bg-rose-whisper text-primary px-[18px] py-[7px] rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[13px] font-semibold font-body">Diagnostic gratuit</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[2.6rem] sm:text-[3rem] lg:text-[3.4rem] font-bold mb-5"
              style={{ lineHeight: 1.1 }}
            >
              <span className="text-violet-deep">Tu connais vraiment</span>
              <br />
              <span className="text-brand-gradient">ta peau ?</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base lg:text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed font-body"
            >
              6 questions. 2 minutes. Un profil personnalisé avec les gestes qui te
              correspondent — pas ceux de TikTok.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">
              <StartButton onStart={onStart} label="Commencer le diagnostic" />
              <p className="mt-5 text-[13px] text-soft font-body">
                Gratuit · Sans engagement · Résultats immédiats
              </p>
            </motion.div>
          </motion.div>

          {/* Colonne visuel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="order-first lg:order-last"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ──────────── CE QUE TU VAS DÉCOUVRIR ──────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <p className="font-body uppercase text-[13px] text-soft tracking-[1.5px] mb-2">En 2 minutes</p>
          <h2 className="font-heading text-[1.9rem] lg:text-[2.3rem] font-bold text-violet-deep">
            Ce que tu vas découvrir
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-4 lg:gap-5"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="bg-card border border-border rounded-lg p-6 card-hover flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-soft flex items-center justify-center">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground font-body text-[15px] leading-relaxed">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ──────────── APERÇU DES 5 PROFILS ──────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <p className="font-body uppercase text-[13px] text-soft tracking-[1.5px] mb-2">5 profils possibles</p>
          <h2 className="font-heading text-[1.9rem] lg:text-[2.3rem] font-bold text-violet-deep">
            Lequel es-tu vraiment ?
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {profiles.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 bg-card border border-border rounded-full pl-2.5 pr-5 py-2 card-hover"
            >
              <span className="w-9 h-9 rounded-full surface-soft flex items-center justify-center text-lg">{p.emoji}</span>
              <span className="font-body text-[15px] font-medium text-foreground">{p.title}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-body mt-7 italic"
        >
          Réponds à 6 questions pour révéler le tien.
        </motion.p>
      </section>

      {/* ──────────── RÉASSURANCE ──────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-card border border-border rounded-xl px-6 py-7"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {reassurance.map((r) => (
              <div key={r.label} className="flex flex-col items-center text-center gap-2">
                <div className="w-11 h-11 rounded-full bg-brand-soft flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body text-sm font-medium text-foreground">{r.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ──────────── CTA FINAL ──────────── */}
      <section className="max-w-[1100px] mx-auto px-6 pt-8 pb-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="font-heading text-[2rem] lg:text-[2.5rem] font-bold text-violet-deep mb-3">
            Prête à comprendre ta peau ?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Ton profil personnalisé t'attend — c'est gratuit et ça prend 2 minutes.
          </p>
          <StartButton onStart={onStart} label="Démarrer mon diagnostic" />
        </motion.div>
      </section>
    </div>
  );
};
