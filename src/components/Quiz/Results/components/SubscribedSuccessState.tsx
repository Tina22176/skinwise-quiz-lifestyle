import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Instagram, RefreshCw, Share2, Mail, Gift, Sparkles } from "lucide-react";

interface SubscribedSuccessStateProps {
  handleShare: () => void;
  visitInstagram: () => void;
  onResetQuiz: () => void;
  variants: any;
}

export const SubscribedSuccessState = ({
  handleShare,
  visitInstagram,
  onResetQuiz,
  variants
}: SubscribedSuccessStateProps) => {
  return (
    <motion.div
      variants={variants}
      className="text-center space-y-4 sm:space-y-6" // Espacement réduit
    >
      {/* Animation de succès - taille mobile optimisée */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          duration: 0.8
        }}
        className="flex justify-center"
      >
        <div className="relative">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-green-400/30 rounded-full"
          />
        </div>
      </motion.div>

      {/* Message de succès - textes raccourcis */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-green-500" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Merci ! Ta routine arrive bientôt
          </h3>
          <Sparkles className="w-5 h-5 text-green-500" />
        </div>
        <div className="space-y-2">
          <p className="text-sm sm:text-base text-gray-700">
            Ta routine personnalisée est en préparation
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>Vérifie tes emails dans les prochaines minutes</span>
          </div>
        </div>
      </div>

      {/* Bonus surprise - palette verte cohérente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-200/50"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <h4 className="text-sm sm:text-base font-semibold text-green-700">Bonus Surprise !</h4>
        </div>
        <p className="text-xs sm:text-sm text-green-600">
          En plus de ta routine, tu recevras nos 3 secrets d'expertes 
          pour une peau parfaite en 30 jours !
        </p>
      </motion.div>

      {/* Boutons d'action - optimisés mobile */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:gap-3 justify-center pt-2 sm:pt-4">
        {/* Bouton principal en pleine largeur sur mobile */}
        <Button
          onClick={handleShare}
          className="w-full sm:w-auto premium-button bg-gradient-to-r from-pink-500/90 to-pink-400/90 hover:from-pink-600/90 hover:to-pink-500/90 text-white shadow-lg text-sm sm:text-base py-2 sm:py-3"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Partager mes résultats
        </Button>
        
        {/* Boutons secondaires côte à côte sur mobile */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          <Button
            onClick={visitInstagram}
            className="premium-button bg-gradient-to-r from-pink-500/90 to-pink-400/90 hover:from-pink-600/90 hover:to-pink-500/90 text-white shadow-lg text-xs sm:text-sm py-2 sm:py-3"
          >
            <Instagram className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Suivre </span>@majoliepeau
          </Button>

          <Button
            onClick={onResetQuiz}
            variant="outline"
            className="bg-white hover:bg-green-50/50 text-gray-700 border-green-200/50 text-xs sm:text-sm py-2 sm:py-3"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Nouveau </span>Test
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
