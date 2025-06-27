import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw, Eye, Share2 } from "lucide-react";

interface UnsubscribedActionsProps {
  visitInstagram: () => void;
  onResetQuiz: () => void;
  variants: any;
  onShowDetailedResults: () => void;
}

export const UnsubscribedActions = ({
  visitInstagram,
  onResetQuiz,
  variants,
  onShowDetailedResults
}: UnsubscribedActionsProps) => {
  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          Veux-tu voir plus de détails ?
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Découvre tes caractéristiques détaillées et nos recommandations personnalisées
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Button
          onClick={visitInstagram}
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-4 sm:px-6 py-3 sm:py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
        >
          <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
          Suivre Majoliepeau
        </Button>

        <Button
          onClick={onResetQuiz}
          variant="outline"
          className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-4 sm:px-6 py-3 sm:py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
        >
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          Refaire le test
        </Button>

        <Button
          onClick={onShowDetailedResults}
          className="premium-button bg-gradient-to-r from-pink-400/90 to-pink-300/90 hover:from-pink-500/90 hover:to-pink-400/90 text-white border border-pink-200/50 shadow-[0_8px_24px_rgba(255,192,203,0.25)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.4)] transition-all duration-300 w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Voir les détails
        </Button>
        
        <Button
          variant="outline"
          className="glass border-pink-200/50 text-pink-600 hover:bg-pink-50/50 hover:border-pink-300/50 transition-all duration-300 w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Partager mes résultats
        </Button>
      </div>
    </div>
  );
};
