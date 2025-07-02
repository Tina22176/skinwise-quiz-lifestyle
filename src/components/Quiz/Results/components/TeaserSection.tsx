import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, Clock, Star, Shield, Sparkles, Lock } from "lucide-react";
import { SKIN_TYPE_TEASERS } from "../SkinTypeDetails";

interface TeaserSectionProps {
  skinType: string;
  skinTypeText: string;
  details: any;
  visitInstagram: () => void;
  onResetQuiz: () => void;
}

// Mapping des couleurs par type de peau
const COLOR_MAPPINGS = {
  blue: {
    text: 'text-blue-500',
    bg: 'from-blue-50/80',
    border: 'border-blue-500/20',
    bgLight: 'from-blue-50/50',
    bgLighter: 'from-blue-50/10',
    accent: 'text-blue-600',
    borderAccent: 'border-blue-200/50'
  },
  green: {
    text: 'text-green-500',
    bg: 'from-green-50/80',
    border: 'border-green-500/20',
    bgLight: 'from-green-50/50',
    bgLighter: 'from-green-50/10',
    accent: 'text-green-600',
    borderAccent: 'border-green-200/50'
  },
  purple: {
    text: 'text-purple-500',
    bg: 'from-purple-50/80',
    border: 'border-purple-500/20',
    bgLight: 'from-purple-50/50',
    bgLighter: 'from-purple-50/10',
    accent: 'text-purple-600',
    borderAccent: 'border-purple-200/50'
  },
  pink: {
    text: 'text-pink-500',
    bg: 'from-pink-50/80',
    border: 'border-pink-500/20',
    bgLight: 'from-pink-50/50',
    bgLighter: 'from-pink-50/10',
    accent: 'text-pink-600',
    borderAccent: 'border-pink-200/50'
  }
};

// Animation pour les étapes cachées
const hiddenStepVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { delay: 0.8, duration: 0.5 }
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
    <div className="space-y-6">
      {/* Aperçu de ce qui t'attend - Basé sur l'email réel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`bg-gradient-to-r ${colors.bg} to-white/80 p-6 rounded-2xl border ${colors.borderAccent} shadow-lg`}
      >
        <div className="text-center mb-6">
          <h3 className={`text-lg sm:text-xl font-bold ${colors.accent} mb-2`}>
            🎯 Aperçu de ce qui t'attend
          </h3>
          <p className="text-sm sm:text-base text-gray-700">
            Voici un avant-goût de ta routine personnalisée pour peau {skinTypeText}
          </p>
        </div>

        {/* Aperçu routine matin/soir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Routine du matin */}
          <div className={`bg-white/70 p-4 rounded-xl border ${colors.borderAccent}`}>
            <div className="flex items-center gap-2 mb-3">
              <Clock className={`w-4 h-4 ${colors.text}`} />
              <h4 className="font-semibold text-gray-800">Routine du matin</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm md:text-base">
              {teaser.morningRoutine.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={`${colors.text} font-bold`}>{index + 1}️⃣</span>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Routine du soir */}
          <div className={`bg-white/70 p-4 rounded-xl border ${colors.borderAccent}`}>
            <div className="flex items-center gap-2 mb-3">
              <Star className={`w-4 h-4 ${colors.text}`} />
              <h4 className="font-semibold text-gray-800">Routine du soir</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm md:text-base">
              {teaser.eveningRoutine.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={`${colors.text} font-bold`}>{index + 1}️⃣</span>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ingrédients stars */}
        <div className={`bg-gradient-to-r ${colors.bgLight} to-${colors.bgLighter} p-4 rounded-xl border ${colors.borderAccent}`}>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${colors.text}`} />
            Les ingrédients stars pour ta peau {skinTypeText}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm md:text-base">
            {teaser.keyIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className={colors.text}>•</span>
                <span className="text-gray-700">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conseils bonus avec effet teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 p-4 rounded-xl border border-yellow-200/50 relative overflow-hidden"
        >
          {/* Effet de verrouillage */}
          <div className="absolute top-2 right-2 opacity-60">
            <Lock className="w-4 h-4 text-orange-500" />
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <h4 className="font-semibold text-orange-700">3 conseils bonus exclusifs</h4>
          </div>
          <div className="space-y-1 text-xs sm:text-sm md:text-base">
            {teaser.bonusTips.map((tip, index) => (
              <div key={index} className="flex items-center gap-2 opacity-60">
                <span className="text-orange-500">🔒</span>
                <span className="text-orange-600">{tip}</span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm md:text-base text-orange-600 mt-2 font-medium">
            Débloque ces secrets dans ton email ! 🎁
          </p>
        </motion.div>

        {/* FOMO - Preuve sociale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 p-4 rounded-xl border border-pink-200/50"
        >
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              <span className="font-semibold text-pink-600">✨ 2,847 personnes</span> ont déjà reçu leur routine personnalisée
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Rejoins la communauté Majoliepeau et transforme ta peau ! 💖
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button
          onClick={visitInstagram}
          variant="outline"
          className={`flex items-center gap-2 bg-white hover:${colors.bgLight} text-black ${colors.borderAccent} px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base`}
        >
          <Instagram className="w-4 h-4" />
          Suivre @majolie_peau
        </Button>

        <Button
          onClick={onResetQuiz}
          variant="outline"
          className={`flex items-center gap-2 bg-white hover:${colors.bgLight} text-black ${colors.borderAccent} px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base`}
        >
          <RefreshCw className="w-4 h-4" />
          Refaire le test
        </Button>
      </div>
    </div>
  );
};
