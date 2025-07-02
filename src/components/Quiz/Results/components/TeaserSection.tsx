import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, Clock, Star, Shield, Sparkles } from "lucide-react";

interface TeaserSectionProps {
  skinType: string;
  skinTypeText: string;
  details: any;
  visitInstagram: () => void;
  onResetQuiz: () => void;
}

// Au lieu de classes dynamiques, utiliser des objets de mapping
const COLOR_MAPPINGS = {
  blue: {
    text: 'text-blue-500',
    bg: 'from-blue-50/80',
    border: 'border-blue-500/20',
    bgLight: 'from-blue-50/50',
    bgLighter: 'from-blue-50/10'
  },
  green: {
    text: 'text-green-500',
    bg: 'from-green-50/80',
    border: 'border-green-500/20',
    bgLight: 'from-green-50/50',
    bgLighter: 'from-green-50/10'
  },
  purple: {
    text: 'text-purple-500',
    bg: 'from-purple-50/80',
    border: 'border-purple-500/20',
    bgLight: 'from-purple-50/50',
    bgLighter: 'from-purple-50/10'
  },
  pink: {
    text: 'text-pink-500',
    bg: 'from-pink-50/80',
    border: 'border-pink-500/20',
    bgLight: 'from-pink-50/50',
    bgLighter: 'from-pink-50/10'
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
  return (
    <div className="space-y-6">
      {/* Aperçu de ce qui t'attend - Basé sur l'email réel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-pink-50/80 to-white/80 p-6 rounded-2xl border border-pink-200/50 shadow-lg"
      >
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-pink-600 mb-2">
            🎯 Aperçu de ce qui t'attend
          </h3>
          <p className="text-sm sm:text-base text-gray-700">
            Voici un avant-goût de ta routine personnalisée
          </p>
        </div>

        {/* Aperçu routine matin/soir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Routine du matin */}
          <div className="bg-white/70 p-4 rounded-xl border border-pink-200/30">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-pink-500" />
              <h4 className="font-semibold text-gray-800">Routine du matin</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">1️⃣</span>
                <span className="text-gray-700">Lait nettoyant ultra-doux</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">2️⃣</span>
                <span className="text-gray-700">Eau thermale réparatrice</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">3️⃣</span>
                <span className="text-gray-700">Sérum lipidique</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">4️⃣</span>
                <span className="text-gray-700">Crème riche nourrissante</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">5️⃣</span>
                <span className="text-gray-700">SPF crème minérale</span>
              </div>
            </div>
          </div>

          {/* Routine du soir */}
          <div className="bg-white/70 p-4 rounded-xl border border-pink-200/30">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-pink-500" />
              <h4 className="font-semibold text-gray-800">Routine du soir</h4>
            </div>
            <div className="space-y-2 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">1️⃣</span>
                <span className="text-gray-700">Baume démaquillant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">2️⃣</span>
                <span className="text-gray-700">Lait nettoyant doux</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">3️⃣</span>
                <span className="text-gray-700">Essence hydratante</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">4️⃣</span>
                <span className="text-gray-700">Sérum réparateur intensif</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 font-bold">5️⃣</span>
                <span className="text-gray-700">Baume de nuit réparateur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingrédients stars */}
        <div className="bg-gradient-to-r from-pink-100/50 to-pink-50/50 p-4 rounded-xl border border-pink-200/40">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            Les ingrédients stars pour ta peau {skinTypeText}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm md:text-base">
            <div className="flex items-center gap-1">
              <span className="text-pink-500">•</span>
              <span className="text-gray-700">Céramides</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-pink-500">•</span>
              <span className="text-gray-700">Acide hyaluronique</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-pink-500">•</span>
              <span className="text-gray-700">Squalane</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-pink-500">•</span>
              <span className="text-gray-700">Panthenol</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-pink-500">•</span>
              <span className="text-gray-700">Beurre de karité</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-pink-500">•</span>
              <span className="text-gray-700">Allantoïne</span>
            </div>
          </div>
        </div>

        {/* Conseils bonus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 p-4 rounded-xl border border-yellow-200/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <h4 className="font-semibold text-orange-700">3 conseils bonus exclusifs</h4>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-orange-600">
            La technique du layering hydratant, le geste SOS tiraillements, 
            et le masque cocooning hebdomadaire t'attendent dans ton email ! 🎁
          </p>
        </motion.div>
        </motion.div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={visitInstagram}
            variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
          >
            <Instagram className="w-4 h-4" />
            Suivre @majolie_peau
          </Button>

          <Button
            onClick={onResetQuiz}
            variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
          >
            <RefreshCw className="w-4 h-4" />
            Refaire le test
          </Button>
      </div>
    </div>
  );
};
