import { motion } from "framer-motion";
import { TrustBadges } from "@/components/TrustBadges";
import { SocialProofSection } from "@/components/SocialProofSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { WhyItWorks } from "@/components/WhyItWorks";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col">
      {/* Decorative orbs — 3 blobs with float animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-rose-glow rounded-full blur-3xl opacity-40"
          animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-lilas-soft rounded-full blur-3xl opacity-50"
          animate={{ x: [0, -8, 10, 0], y: [0, 6, -8, 0], scale: [1, 0.97, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-violet-whisper rounded-full blur-3xl opacity-40"
          animate={{ x: [0, 6, -4, 0], y: [0, -4, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ===== HERO SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto text-center px-6 py-10 sm:py-14"
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center bg-rose-whisper text-primary px-[18px] py-[6px] rounded-full mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <span className="text-[13px] font-semibold font-body">✨ Diagnostic gratuit · +2 500 femmes</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="font-heading text-[2.5rem] lg:text-[3rem] font-bold mb-6"
          style={{ lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-violet-deep">
            Tu connais vraiment
          </span>
          <br />
          <span className="text-primary">ta peau ?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base lg:text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed font-body"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          6 questions. 2 minutes. Un profil personnalisé avec les gestes qui te correspondent — pas ceux de TikTok.
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          className="w-[60px] h-px bg-border mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        />

        {/* CTA */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="group text-primary-foreground rounded-full text-[17px] font-bold shadow-glow transition-all duration-200 w-full sm:w-auto font-body relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)',
              padding: '18px 44px',
              borderRadius: 99,
            }}
            whileHover={{ 
              y: -2,
              boxShadow: "0 12px 40px rgba(212, 100, 154, 0.35), 0 4px 12px rgba(212, 100, 154, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            <span className="relative z-10">Commencer le diagnostic →</span>
          </motion.button>
          
          <p className="mt-5 text-[13px] text-text-muted font-body">
            Gratuit · Sans engagement · Résultats immédiats
          </p>
        </motion.div>

        {/* Trust badges */}
        <TrustBadges />
      </motion.div>

      {/* ===== SOCIAL PROOF SECTION ===== */}
      <div className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto mb-3"
        >
          <h2 className="font-heading text-[22px] lg:text-[26px] font-bold text-foreground text-center mb-5">
            Elles l'ont essayé
          </h2>
        </motion.div>
        <SocialProofSection />
      </div>

      {/* ===== WHY IT WORKS ===== */}
      <div className="px-6 pb-12">
        <WhyItWorks />
      </div>

      {/* Second CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="px-6 pb-10 text-center"
      >
        <motion.button
          onClick={onStart}
          className="text-primary-foreground rounded-full text-[17px] font-bold shadow-glow transition-all duration-200 w-full sm:w-auto font-body max-w-xs"
          style={{
            background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)',
            padding: '18px 44px',
            borderRadius: 99,
          }}
          whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(212, 100, 154, 0.35)" }}
          whileTap={{ scale: 0.98 }}
        >
          Faire mon diagnostic →
        </motion.button>
        <p className="mt-3 text-[13px] text-text-muted font-body">
          2 minutes · Gratuit · Résultats immédiats
        </p>
      </motion.div>

      {/* ===== FAQ SECTION ===== */}
      <div className="px-6 pb-12">
        <FAQAccordion />
      </div>
    </div>
  );
};