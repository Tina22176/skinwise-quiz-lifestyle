import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, Clock, Star, Shield, Sparkles, Lock, Heart, ArrowRight, Gift, Zap } from "lucide-react";
import { SKIN_TYPE_TEASERS } from "../SkinTypeDetails";

interface TeaserSectionProps {
  skinType: string;
  skinTypeText: string;
  details: any;
  visitInstagram: () => void;
  onResetQuiz: () => void;
}

// Mapping des couleurs modernisé
const COLOR_MAPPINGS = {
  blue: {
    primary: 'from-blue-500 to-blue-600',
    secondary: 'from-blue-400 to-blue-500',
    bg: 'from-blue-50/90 to-blue-100/50',
    border: 'border-blue-200/60',
    text: 'text-blue-600',
    icon: 'text-blue-500',
    hover: 'hover:from-blue-600 hover:to-blue-700'
  },
  green: {
    primary: 'from-green-500 to-green-600',
    secondary: 'from-green-400 to-green-500',
    bg: 'from-green-50/90 to-green-100/50',
    border: 'border-green-200/60',
    text: 'text-green-600',
    icon: 'text-green-500',
    hover: 'hover:from-green-600 hover:to-green-700'
  },
  purple: {
    primary: 'from-purple-500 to-purple-600',
    secondary: 'from-purple-400 to-purple-500',
    bg: 'from-purple-50/90 to-purple-100/50',
    border: 'border-purple-200/60',
    text: 'text-purple-600',
    icon: 'text-purple-500',
    hover: 'hover:from-purple-600 hover:to-purple-700'
  },
  pink: {
    primary: 'from-pink-500 to-pink-600',
    secondary: 'from-pink-400 to-pink-500',
    bg: 'from-pink-50/90 to-pink-100/50',
    border: 'border-pink-200/60',
    text: 'text-pink-600',
    icon: 'text-pink-500',
    hover: 'hover:from-pink-600 hover:to-pink-700'
  }
};

export const TeaserSection = ({
  skinType,
  skinTypeText,
  details,
  visitInstagram,
  onResetQuiz
}: TeaserSectionProps) => {
  const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
  const colors = COLOR_MAPPINGS[teaser.colorTheme];

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Header moderne - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-2 sm:space-y-3 lg:space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base text-pink-700 font-medium">
          <Gift className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 animate-pulse" />
          Ta routine personnalisée
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          🎯 Aperçu de ce qui t'attend
        </h3>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700">
          Voici un avant-goût de ta routine personnalisée pour peau <span className="font-semibold text-pink-600">{skinTypeText}</span>
        </p>
      </motion.div>

      {/* Conteneur principal - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/50 relative overflow-hidden"
      >
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_4s_ease-in-out_infinite]" />
        
        <div className="relative space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Routines matin/soir - Grille responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Routine du matin */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-pink-50/80 to-white/80 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-pink-200/40 shadow-lg"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Routine du matin</h4>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {teaser.morningRoutine.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Routine du soir */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-purple-50/80 to-white/80 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-purple-200/40 shadow-lg"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Routine du soir</h4>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {teaser.eveningRoutine.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Ingrédients stars - Grille responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-pink-200/40"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-pink-500" />
              <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Les ingrédients stars pour ta peau {skinTypeText}</h4>
            </div>
            {/* Grille responsive : 1 colonne mobile, 2 tablette, 3 desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {teaser.keyIngredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/70 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-pink-400 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">{ingredient}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conseils bonus - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-gradient-to-r from-yellow-50/90 to-orange-50/90 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-yellow-200/50 relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-60">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-500" />
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-500" />
              <h4 className="text-base sm:text-lg lg:text-xl font-bold text-orange-700">3 conseils bonus exclusifs</h4>
            </div>
            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              {teaser.bonusTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 opacity-70">
                  <span className="text-orange-500 text-sm sm:text-base">🔒</span>
                  <span className="text-xs sm:text-sm lg:text-base text-orange-600">{tip}</span>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-orange-600 mt-2 sm:mt-3 lg:mt-4 font-medium">
              Débloque ces secrets dans ton email ! 🎁
            </p>
          </motion.div>

          {/* Preuve sociale - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-gradient-to-r from-pink-100/80 to-purple-100/80 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-pink-200/50 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-pink-500" />
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700">
                <span className="font-bold text-pink-600">✨ 2,847 personnes</span> ont déjà transformé leur peau
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Rejoins la communauté Majoliepeau ! 💖
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Boutons d'action modernes - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center"
      >
        <Button
          onClick={visitInstagram}
          className="group flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base lg:text-lg"
        >
          <Instagram className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          Suivre @majolie_peau
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button
          onClick={onResetQuiz}
          variant="outline"
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200/50 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 text-sm sm:text-base lg:text-lg"
        >
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          Refaire le quiz
        </Button>
      </motion.div>

      {/* Animation CSS pour l'effet shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};
