import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Search, Heart, Star, Zap, Shield, CheckCircle } from "lucide-react";
import { getSkinTypeText, getSkinStateText } from "./SkinTypeDetails";
import { useMemo } from "react";

interface SkinTypeHeaderProps {
  skinType: string;
  skinState?: string | null;
  variants: any;
}

// Mapping des icônes par type de peau avec couleurs personnalisées
const getSkinTypeConfig = (skinType: string) => {
  const configs = {
    normal: {
      icon: Heart,
      gradient: "from-emerald-400 to-teal-400",
      bgGradient: "from-emerald-50 to-teal-50",
      textGradient: "from-emerald-600 to-teal-600",
      pulseColor: "emerald"
    },
    dry: {
      icon: Shield,
      gradient: "from-blue-400 to-indigo-400",
      bgGradient: "from-blue-50 to-indigo-50",
      textGradient: "from-blue-600 to-indigo-600",
      pulseColor: "blue"
    },
    oily: {
      icon: Zap,
      gradient: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-50 to-orange-50",
      textGradient: "from-yellow-600 to-orange-600",
      pulseColor: "yellow"
    },
    combination: {
      icon: Star,
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50",
      textGradient: "from-purple-600 to-pink-600",
      pulseColor: "purple"
    },
    sensitive: {
      icon: Sparkles,
      gradient: "from-rose-400 to-pink-400",
      bgGradient: "from-rose-50 to-pink-50",
      textGradient: "from-rose-600 to-pink-600",
      pulseColor: "rose"
    }
  };
  return configs[skinType as keyof typeof configs] || configs.normal;
};

export const SkinTypeHeader = ({ skinType, skinState, variants }: SkinTypeHeaderProps) => {
  const shouldReduceMotion = useReducedMotion();
  const stateText = getSkinStateText(skinState);
  const skinConfig = useMemo(() => getSkinTypeConfig(skinType), [skinType]);
  const SkinIcon = skinConfig.icon;
  
  // Animations optimisées pour l'accessibilité
  const animations = shouldReduceMotion ? {
    background: { opacity: 0.5 },
    badge: { opacity: 1 },
    title: { opacity: 1 },
    icon: { opacity: 1, scale: 1 },
    skinType: { opacity: 1 },
    state: { opacity: 1 },
    line: { scaleX: 1 }
  } : {
    background: {
      opacity: [0.3, 0.6, 0.3],
      scale: [0.95, 1.05, 0.95],
    },
    badge: { opacity: [0, 1], y: [-20, 0] },
    title: { opacity: [0, 1], y: [20, 0] },
    icon: { opacity: [0, 1], scale: [0.8, 1] },
    skinType: { opacity: [0, 1] },
    state: { opacity: [0, 1], y: [15, 0] },
    line: { scaleX: [0, 1] }
  };

  const transitions = shouldReduceMotion ? {} : {
    background: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    badge: { delay: 0.2, duration: 0.6, ease: "easeOut" },
    title: { delay: 0.4, duration: 0.6, ease: "easeOut" },
    icon: { delay: 0.6, type: "spring", stiffness: 300, damping: 20 },
    skinType: { delay: 0.8, duration: 0.8, ease: "easeOut" },
    state: { delay: 0.8, duration: 0.6, ease: "easeOut" },
    line: { delay: 1, duration: 0.8, ease: "easeOut" }
  };
  
  return (
    <motion.div 
      variants={variants}
      className="text-center space-y-4 sm:space-y-6 lg:space-y-8 relative overflow-hidden"
    >
      {/* Background animé optimisé */}
      <motion.div
        animate={animations.background}
        transition={transitions.background}
        className={`absolute inset-0 bg-gradient-to-r ${skinConfig.bgGradient} blur-3xl -z-10`}
        style={{ 
          backgroundSize: '200% 200%',
          animation: shouldReduceMotion ? 'none' : 'gradientShift 8s ease infinite'
        }}
      />
      
      <motion.div className="relative space-y-4 sm:space-y-6">
        {/* Badge de résultat amélioré */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={animations.badge}
          transition={transitions.badge}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
        >
          <motion.div
            animate={{ rotate: shouldReduceMotion ? 0 : [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
          </motion.div>
          <span className="text-gray-700 font-semibold">Résultat de ton diagnostic</span>
          <CheckCircle className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Titre principal optimisé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animations.title}
          transition={transitions.title}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-tight">
            Découvre ton véritable
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">
              type de peau
            </span>
          </h1>
          
          {/* Type de peau avec icône améliorée */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={animations.icon}
            transition={transitions.icon}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            <motion.div 
              className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${skinConfig.gradient} rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <SkinIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
            <motion.h2 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r ${skinConfig.textGradient} text-transparent bg-clip-text`}
              animate={shouldReduceMotion ? {} : {
                backgroundPosition: ["0% center", "100% center"],
              }}
              transition={shouldReduceMotion ? {} : {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {getSkinTypeText(skinType)}
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* État de la peau amélioré */}
        {stateText && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={animations.state}
            transition={transitions.state}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <Search className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm sm:text-base font-medium text-gray-700">
              État : <span className="font-semibold">{stateText}</span>
            </span>
          </motion.div>
        )}

        {/* Ligne décorative améliorée */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={animations.line}
          transition={transitions.line}
          className={`w-24 h-1 bg-gradient-to-r ${skinConfig.gradient} rounded-full mx-auto shadow-sm`}
        />
      </motion.div>

      {/* Styles CSS pour l'animation de gradient */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};
