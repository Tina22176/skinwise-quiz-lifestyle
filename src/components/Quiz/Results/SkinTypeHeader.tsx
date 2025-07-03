import { motion } from “framer-motion”;
import { Sparkles, Search } from “lucide-react”;
import { getSkinTypeText, getSkinStateText } from “./SkinTypeDetails”;

interface SkinTypeHeaderProps {
skinType: string;
skinState?: string | null;
variants: any;
}

export const SkinTypeHeader = ({ skinType, skinState, variants }: SkinTypeHeaderProps) => {
const stateText = getSkinStateText(skinState);

return (
<motion.div
variants={variants}
className=“text-center space-y-3 sm:space-y-4 relative” // Espacement réduit
>
{/* Animation de fond conservée (pas d’impact selon vous) */}
<motion.div
animate={{
opacity: [0.5, 1, 0.5],
scale: [0.98, 1, 0.98],
}}
transition={{
duration: 2,
repeat: Infinity,
ease: “easeInOut”
}}
className=“absolute inset-0 bg-gradient-to-r from-pink-100/40 via-pink-200/40 to-pink-100/40 blur-xl”
/>

  <motion.div className="relative">
    {/* Titre principal épuré et responsive */}
    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
      <h1 className="text-base sm:text-lg md:text-xl font-medium text-pink-500">
        Résultat : Découvre ton véritable type de peau
      </h1>
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
    </div>
    
    {/* Type de peau - taille adaptive */}
    <motion.h2 
      className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500/90 via-pink-400/90 to-pink-300/90 text-transparent bg-clip-text"
      animate={{
        backgroundPosition: ["0% center", "100% center"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <span className="flex items-center justify-center gap-2">
        <span>Ton type de peau :</span>
        <span className="font-extrabold">{getSkinTypeText(skinType)}</span>
      </span>
    </motion.h2>
    
    {/* État de la peau si présent */}
    {stateText && (
      <motion.h3 
        className="text-sm sm:text-base md:text-lg font-semibold text-pink-400 mt-2 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Search className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>État : {stateText}</span>
      </motion.h3>
    )}
  </motion.div>
</motion.div>

);
};
