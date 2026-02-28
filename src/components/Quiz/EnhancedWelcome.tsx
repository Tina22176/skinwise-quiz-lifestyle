import { motion } from "framer-motion";
import { Clock, Target, Gift } from "lucide-react";

const features = [
  { icon: Clock, label: "2 min", description: "Résultats rapides" },
  { icon: Target, label: "Précis", description: "Profil personnalisé" },
  { icon: Gift, label: "Gratuit", description: "Sans engagement" },
];

const trustItems = [
  "12 000+ diagnostics réalisés",
  "Résultats validés par des expertes",
  "100% confidentiel",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const EnhancedWelcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl"
          style={{ background: 'rgba(249, 213, 229, 0.45)' }}
          animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full blur-3xl"
          style={{ background: 'rgba(235, 224, 245, 0.5)' }}
          animate={{ x: [0, -8, 10, 0], y: [0, 6, -8, 0], scale: [1, 0.97, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full blur-3xl"
          style={{ background: 'rgba(237, 229, 244, 0.4)' }}
          animate={{ x: [0, 6, -4, 0], y: [0, -4, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto text-center px-6 py-8 sm:py-12"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span
            className="inline-flex items-center px-[18px] py-[7px] rounded-full text-[13px] font-semibold font-body mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(251,234,242,0.9) 0%, rgba(245,240,250,0.9) 100%)',
              color: '#D4649A',
              border: '1px solid rgba(212, 100, 154, 0.2)',
              backdropFilter: 'blur(8px)',
              display: 'inline-flex',
            }}
          >
            ✨ Diagnostic gratuit
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-[2.5rem] lg:text-[3rem] font-bold mb-6"
          style={{ lineHeight: 1.15 }}
        >
          <span style={{ color: '#3D2B45' }}>Tu connais vraiment</span>
          <br />
          <span style={{ color: '#D4649A' }}>ta peau ?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base lg:text-lg mb-8 max-w-md mx-auto leading-relaxed font-body"
          style={{ color: '#9B8FA3' }}
        >
          6 questions. 2 minutes. Un profil personnalisé avec les gestes qui te correspondent — pas ceux de TikTok.
        </motion.p>

        {/* Features grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3 mb-8 max-w-sm mx-auto"
        >
          {features.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(240, 234, 243, 0.8)',
                boxShadow: '0 2px 8px rgba(61, 43, 69, 0.05)',
              }}
            >
              <Icon className="w-5 h-5" style={{ color: '#9B6BA3' }} />
              <span className="text-sm font-bold font-body" style={{ color: '#3D2B45' }}>{label}</span>
              <span className="text-[11px] font-body" style={{ color: '#9B8FA3' }}>{description}</span>
            </div>
          ))}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          variants={itemVariants}
          className="w-[60px] h-px mx-auto mb-8"
          style={{ background: '#F0EAF3' }}
        />

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <motion.button
            onClick={onStart}
            className="text-white rounded-full text-[17px] font-bold font-body w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)',
              padding: '18px 44px',
              borderRadius: 99,
              boxShadow: '0 8px 30px rgba(212, 100, 154, 0.30), 0 2px 8px rgba(212, 100, 154, 0.15)',
            }}
            whileHover={{
              y: -2,
              boxShadow: "0 14px 44px rgba(212, 100, 154, 0.38), 0 4px 14px rgba(212, 100, 154, 0.22)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Commencer le diagnostic →
          </motion.button>

          <p className="mt-5 text-[13px] font-body" style={{ color: '#9B8FA3' }}>
            Gratuit · Sans engagement · Résultats immédiats
          </p>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-[12px] font-body"
              style={{ color: '#9B8FA3' }}
            >
              <span style={{ color: '#D4649A', fontWeight: 700 }}>✓</span>
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
