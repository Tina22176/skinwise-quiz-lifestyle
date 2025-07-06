import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { getSkinTypeText, getSkinStateText, SKIN_TYPE_TEASERS } from "./SkinTypeDetails";

interface SkinTypeHeaderProps {
  skinType: string;
  skinState?: string | null;
  variants: any;
}

export const SkinTypeHeader = ({ skinType, skinState, variants }: SkinTypeHeaderProps) => {
  const stateText = getSkinStateText(skinState);
  
  // Couleurs adaptatives basées sur le type de peau
  const getSkinTypeColors = () => {
    const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
    
    const colorSchemes = {
      blue: {
        primary: "from-blue-500 via-blue-400 to-blue-300",
        secondary: "text-blue-500",
        accent: "text-blue-400",
        bg: "from-blue-100/40 via-blue-200/40 to-blue-100/40"
      },
      green: {
        primary: "from-green-500 via-green-400 to-green-300",
        secondary: "text-green-500",
        accent: "text-green-400",
        bg: "from-green-100/40 via-green-200/40 to-green-100/40"
      },
      purple: {
        primary: "from-purple-500 via-purple-400 to-purple-300",
        secondary: "text-purple-500",
        accent: "text-purple-400",
        bg: "from-purple-100/40 via-purple-200/40 to-purple-100/40"
      },
      pink: {
        primary: "from-pink-500 via-pink-400 to-pink-300",
        secondary: "text-pink-500",
        accent: "text-pink-400",
        bg: "from-pink-100/40 via-pink-200/40 to-pink-100/40"
      }
    };
    
    return colorSchemes[teaser.colorTheme] || colorSchemes.pink;
  };

  const colors = getSkinTypeColors();

  return (
    <motion.div
      variants={variants}
      className="text-center space-y-3 sm:space-y-4 relative"
    >
      {/* Animation de fond conservée */}
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
        className={`absolute inset-0 bg-gradient-to-r ${colors.bg} blur-xl`}
      />

      <motion.div className="relative">
        {/* Titre principal épuré */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.secondary}`} />
          <h1 className={`text-base sm:text-lg md:text-xl font-medium ${colors.secondary}`}>
            Résultat : Découvre ton véritable type de peau
          </h1>
          <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.secondary}`} />
        </div>
        
        {/* Type de peau */}
        <motion.h2 
          className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors.primary} text-transparent bg-clip-text`}
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
        
        {/* État de la peau */}
        {stateText && (
          <motion.h3 
            className={`text-sm sm:text-base md:text-lg font-semibold ${colors.accent} mt-2 flex items-center justify-center gap-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>État : {stateText}</span>
          </motion.h3>
        )}
      </motion.div>
    </motion.div>
  );
};
