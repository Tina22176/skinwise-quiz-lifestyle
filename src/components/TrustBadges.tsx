import { motion } from "framer-motion";
import { Shield, Gift, Lock } from "lucide-react";

const badges = [
  { icon: Gift, label: "100% Gratuit", sublabel: "Sans frais cachés" },
  { icon: Lock, label: "Pas de spam", sublabel: "Désabonne-toi en 1 clic" },
  { icon: Shield, label: "Garantie 30j", sublabel: "Satisfaction garantie" },
];

export const TrustBadges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-wrap justify-center gap-4"
    >
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + index * 0.08, duration: 0.4 }}
            className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-full shadow-sm"
          >
            <div className="w-7 h-7 rounded-full bg-rose-whisper flex items-center justify-center flex-shrink-0">
              <Icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold text-foreground font-body leading-tight">{badge.label}</p>
              <p className="text-[11px] text-muted-foreground font-body leading-tight">{badge.sublabel}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
