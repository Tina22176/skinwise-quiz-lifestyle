import { motion } from "framer-motion";

interface AnimatedResultCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
}

export const AnimatedResultCard = ({ emoji, title, subtitle }: AnimatedResultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
        className="mb-3 flex justify-center"
      >
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-glow-sm"
          style={{ background: "linear-gradient(135deg, #F5F0FA 0%, #FBEAF2 100%)" }}
        >
          <span className="text-[36px]">{emoji}</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
        className="font-body uppercase mb-2"
        style={{ fontSize: 13, color: "#9B8FA3", letterSpacing: "1.5px" }}
      >
        Ton profil peau
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="font-heading text-[28px] lg:text-[32px] font-bold text-foreground"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-[14px] text-muted-foreground font-body mt-1"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
