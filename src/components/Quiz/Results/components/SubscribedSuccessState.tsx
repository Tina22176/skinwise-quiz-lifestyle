
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Instagram, RefreshCw, Share2, Mail, Gift } from "lucide-react";

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
      className="text-center space-y-8"
    >
      {/* Animation de succès */}
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
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-10 h-10 text-white" />
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

      {/* Message de succès */}
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          🎉 Merci ! Ta routine arrive bientôt
        </h3>
        <div className="space-y-2">
          <p className="text-lg text-gray-700">
            Ta routine personnalisée est en préparation dans nos laboratoires ✨
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>Vérifie tes emails dans les prochaines minutes</span>
          </div>
        </div>
      </div>

      {/* Bonus surprise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200/50"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gift className="w-5 h-5 text-orange-500" />
          <h4 className="text-lg font-semibold text-orange-700">Bonus Surprise !</h4>
        </div>
        <p className="text-sm text-orange-600">
          En plus de ta routine, tu recevras nos 3 secrets d'expertes 
          pour une peau parfaite en moins de 30 jours ! 🎁
        </p>
      </motion.div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button
          onClick={handleShare}
          className="premium-button bg-gradient-to-r from-pink-500/90 to-pink-400/90 hover:from-pink-600/90 hover:to-pink-500/90 text-white shadow-lg"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Partager mes résultats
        </Button>
        
        <Button
          onClick={visitInstagram}
          className="premium-button bg-gradient-to-r from-pink-500/90 to-pink-400/90 hover:from-pink-600/90 hover:to-pink-500/90 text-white shadow-lg"
        >
          <Instagram className="w-4 h-4 mr-2" />
          Suivre @majoliepeau
        </Button>

        <Button
          onClick={onResetQuiz}
          variant="outline"
          className="bg-white hover:bg-pink-50/50 text-gray-700 border-pink-200/50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Nouveau test
        </Button>
      </div>
    </motion.div>
  );
};
