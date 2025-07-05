import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, Clock, Star, Shield, Sparkles, Lock, Mail } from "lucide-react";
import { SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";

interface TeaserSectionProps {
  skinType: string;
  skinTypeText: string;
  details: any;
  visitInstagram: () => void;
  onResetQuiz: () => void;
}

// Configuration des couleurs par thème
const getColorScheme = (colorTheme: string) => {
  const schemes = {
    blue: {
      bgClass: "from-blue-50 to-white",
      borderClass: "border-blue-200",
      textClass: "text-blue-500",
      buttonClass: "bg-blue-500"
    },
    green: {
      bgClass: "from-green-50 to-white",
      borderClass: "border-green-200",
      textClass: "text-green-500",
      buttonClass: "bg-green-500"
    },
    purple: {
      bgClass: "from-purple-50 to-white",
      borderClass: "border-purple-200",
      textClass: "text-purple-500",
      buttonClass: "bg-purple-500"
    },
    pink: {
      bgClass: "from-pink-50 to-white",
      borderClass: "border-pink-200",
      textClass: "text-pink-500",
      buttonClass: "bg-pink-500"
    }
  };
  
  return schemes[colorTheme as keyof typeof schemes] || schemes.pink;
};

export const TeaserSection = ({
  skinType,
  skinTypeText,
  details,
  visitInstagram,
  onResetQuiz
}: TeaserSectionProps) => {
  const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
  const colors = getColorScheme(teaser.colorTheme);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`bg-gradient-to-r ${colors.bgClass} p-6 rounded-2xl border ${colors.borderClass} shadow-lg`}
      >
        <div className="text-center mb-6">
          <h3 className={`text-lg sm:text-xl font-bold ${colors.textClass} mb-2`}>
            Ton plan d'action personnalisé
          </h3>
          <p className="text-sm sm:text-base text-gray-700">
            Spécialement conçu pour les peaux <strong>{skinTypeText}</strong>
          </p>
        </div>

        {/* Aperçu routine - VERSION TEASER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Matin - Partiellement visible */}
          <div className="bg-white/70 p-4 rounded-xl border border-gray-200 relative">
            <div className="flex items-center gap-2 mb-3">
              <Clock className={`w-4 h-4 ${colors.textClass}`} />
              <h4 className="font-semibold text-gray-800">Routine du matin</h4>
            </div>
            <div className="space-y-2 text-sm">
              {teaser.morningRoutine.slice(0, 2).map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={`${colors.textClass} font-bold`}>{index + 1}️⃣</span>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
              {/* Étapes cachées */}
              <div className="relative">
                {teaser.morningRoutine.slice(2, 4).map((step, index) => (
                  <div key={index + 2} className="flex items-center gap-2 blur-sm">
                    <span className={`${colors.textClass} font-bold`}>{index + 3}️⃣</span>
                    <span className="text-gray-400">████████████</span>
                  </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`${colors.buttonClass} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                    <Lock className="w-3 h-3" />
                    +{teaser.morningRoutine.length - 2} étapes dans l'email
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soir - Partiellement visible */}
          <div className="bg-white/70 p-4 rounded-xl border border-gray-200 relative">
            <div className="flex items-center gap-2 mb-3">
              <Star className={`w-4 h-4 ${colors.textClass}`} />
              <h4 className="font-semibold text-gray-800">Routine du soir</h4>
            </div>
            <div className="space-y-2 text-sm">
              {teaser.eveningRoutine.slice(0, 1).map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={`${colors.textClass} font-bold`}>{index + 1}️⃣</span>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
              {/* Étapes cachées */}
              <div className="relative">
                <div className="space-y-2 blur-sm">
                  {teaser.eveningRoutine.slice(1, 3).map((step, index) => (
                    <div key={index + 1} className="flex items-center gap-2">
                      <span className={`${colors.textClass} font-bold`}>{index + 2}️⃣</span>
                      <span className="text-gray-400">██████████████</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`${colors.buttonClass} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                    <Mail className="w-3 h-3" />
                    Suite par email
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingrédients personnalisés */}
        <div className={`bg-gradient-to-r ${colors.bgClass} p-4 rounded-xl border ${colors.borderClass}`}>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${colors.textClass}`} />
            Tes ingrédients stars (peau {skinTypeText})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
            {teaser.keyIngredients.slice(0, 5).map((ingredient, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className={colors.textClass}>•</span>
                <span className="text-gray-700">{ingredient}</span>
              </div>
            ))}
            <div className="flex items-center gap-1">
              <span className={colors.textClass}>•</span>
              <span className="text-gray-400">+ {teaser.keyIngredients.length - 5} autres actifs</span>
            </div>
          </div>
        </div>

        {/* Bonus exclusif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <h4 className="font-semibold text-orange-700">Bonus exclusif dans ton email</h4>
          </div>
          <p className="text-sm text-orange-600 mb-3">
            <strong>{teaser.bonusTips[0]}</strong> + le calendrier beauté mensuel 
            + la liste shopping avec les prix les plus bas trouvés ! 
          </p>
          <div className="flex items-center gap-1 text-xs text-orange-500">
            <Lock className="w-3 h-3" />
            <span>Contenu réservé aux abonnées</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button
          onClick={visitInstagram}
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-pink-50 text-black border-pink-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
        >
          <Instagram className="w-4 h-4" />
          Suivre @majolie_peau
        </Button>

        <Button
          onClick={onResetQuiz}
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-pink-50 text-black border-pink-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
        >
          <RefreshCw className="w-4 h-4" />
          Refaire le test
        </Button>
      </div>
    </div>
  );
};
