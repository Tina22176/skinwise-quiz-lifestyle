
import { motion } from "framer-motion";
import { getSkinTypeText } from "./Results";

interface SkinTypeHeaderProps {
  skinType: string;
  variants: any;
}

export const SkinTypeHeader = ({ skinType, variants }: SkinTypeHeaderProps) => {
  return (
    <motion.div 
      variants={variants}
      className="text-center space-y-6 relative"
    >
      <motion.div
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.98, 1, 0.98],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-pink-100/40 via-pink-200/40 to-pink-100/40 blur-xl"
      />
      <motion.div className="relative">
        <h1 className="text-2xl md:text-3xl font-medium text-pink-500 mb-4">
          ✨ RÉSULTAT : DÉCOUVRE TON VÉRITABLE TYPE DE PEAU ✨
        </h1>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500/90 via-pink-400/90 to-pink-300/90 text-transparent bg-clip-text"
          animate={{
            backgroundPosition: ['0% center', '100% center', '0% center'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💖 Ton type de peau : {getSkinTypeText(skinType)}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
};
