import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Instagram, RefreshCw, Eye, Share2 } from "lucide-react";

interface SubscribedActionsProps {
  handleShare: () => void;
  visitInstagram: () => void;
  onResetQuiz: () => void;
  variants: any;
}

export const SubscribedActions = ({
  handleShare,
  visitInstagram,
  onResetQuiz,
  variants
}: SubscribedActionsProps) => {
  return (
    <motion.div 
      variants={variants}
      className="flex flex-col items-center gap-6 mt-8"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600"
      >
        <Check className="w-8 h-8" />
      </motion.div>
      
      <div className="space-y-3 text-center">
        <p className="text-lg font-medium text-black">
          Ta routine personnalisée est en route ! 💌
        </p>
        <p className="text-sm text-black/70">
          N'oublie pas de vérifier tes spams si tu ne reçois rien d'ici quelques minutes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
        <Button
          onClick={handleShare}
          className="premium-button bg-gradient-to-r from-pink-400/90 to-pink-300/90 hover:from-pink-500/90 hover:to-pink-400/90 text-white border border-pink-200/50 shadow-[0_8px_24px_rgba(255,192,203,0.25)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.4)] transition-all duration-300 w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Partager mes résultats
        </Button>
        
        <Button
          onClick={visitInstagram}
          className="premium-button bg-gradient-to-r from-pink-400/90 to-pink-300/90 hover:from-pink-500/90 hover:to-pink-400/90 text-white border border-pink-200/50 shadow-[0_8px_24px_rgba(255,192,203,0.25)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.4)] transition-all duration-300 w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
        >
          <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Suivre Majoliepeau
        </Button>

        <Button
          onClick={onResetQuiz}
          className="premium-button bg-gradient-to-r from-pink-400/90 to-pink-300/90 hover:from-pink-500/90 hover:to-pink-400/90 text-white border border-pink-200/50 shadow-[0_8px_24px_rgba(255,192,203,0.25)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.4)] transition-all duration-300 w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
        >
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Refaire le test
        </Button>
      </div>
    </motion.div>
  );
};
