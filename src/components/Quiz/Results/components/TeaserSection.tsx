
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, Eye, Sparkles, ArrowRight } from "lucide-react";

interface TeaserSectionProps {
  skinType: string;
  skinTypeText: string;
  details: any;
  visitInstagram: () => void;
  onResetQuiz: () => void;
}

export const TeaserSection = ({
  skinType,
  skinTypeText,
  details,
  visitInstagram,
  onResetQuiz
}: TeaserSectionProps) => {
  const teaserRecommendations = [
    `Nettoyant spécial peau ${skinTypeText.toLowerCase()}`,
    `Sérum adapté à tes besoins`,
    `Routine matin/soir personnalisée`
  ];

  return (
    <div className="glass rounded-2xl p-6 md:p-8 bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200/40">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            🎯 Aperçu de ce qui t'attend
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Voici un avant-goût de ta routine personnalisée
          </p>
        </div>

        {/* Aperçu des recommandations */}
        <div className="space-y-3">
          {teaserRecommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-pink-100"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-gray-700">{recommendation}</span>
              <div className="ml-auto text-pink-400">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA pour plus de détails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-pink-100/60 to-pink-50/60 p-4 rounded-xl border border-pink-200/50"
        >
          <p className="text-sm text-gray-600 mb-3">
            + conseils d'application détaillés, routine hebdomadaire, 
            produits recommandés par nos experts...
          </p>
          <p className="text-pink-600 font-medium text-sm">
            💌 Tout cela t'attend dans ta boîte mail !
          </p>
        </motion.div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={visitInstagram}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Instagram className="w-4 h-4" />
            Suivre @majolie_peau
          </Button>

          <Button
            onClick={onResetQuiz}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Refaire le test
          </Button>
        </div>
      </div>
    </div>
  );
};
