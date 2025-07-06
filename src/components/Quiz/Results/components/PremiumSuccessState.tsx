
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Instagram, RefreshCw, Share2, Mail, Gift, Sparkles, Heart } from "lucide-react";

interface PremiumSuccessStateProps {
  handleShare: () => void;
  visitInstagram: () => void;
  onResetQuiz: () => void;
  colors: any;
  variants: any;
}

export const PremiumSuccessState = ({
  handleShare,
  visitInstagram,
  onResetQuiz,
  colors,
  variants
}: PremiumSuccessStateProps) => {
  return (
    <motion.div
      variants={variants}
      className="text-center space-y-8"
    >
      {/* Animation de succès spectaculaire */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          duration: 1.2
        }}
        className="relative flex justify-center"
      >
        <div className={`w-24 h-24 bg-gradient-to-r ${colors.primary} rounded-full flex items-center justify-center ${colors.glow} shadow-2xl`}>
          <Check className="w-12 h-12 text-white" />
        </div>
        
        {/* Cercles de célébration */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-4 border-white/40 rounded-full"
            animate={{
              scale: [1, 1.5 + i * 0.3],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Message de succès premium avec meilleur contraste */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            <h3 className="text-2xl font-bold text-gray-900">
              C'est parti ! Ta routine arrive
            </h3>
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          
          <p className="text-gray-800 text-lg font-medium">
            Ta routine personnalisée est en préparation
          </p>
          
          <div className="flex items-center justify-center gap-2 text-gray-700 font-medium">
            <Mail className="w-5 h-5" />
            <span>Vérifie tes emails dans les prochaines minutes</span>
          </div>
        </motion.div>

        {/* Bonus surprise premium avec meilleur contraste */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border-2 border-amber-300/50 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Gift className="w-6 h-6 text-amber-700" />
            <h4 className="text-xl font-bold text-gray-900">Bonus Surprise !</h4>
          </div>
          <p className="text-gray-800 font-medium">
            En plus de ta routine, tu recevras nos 3 secrets d'expertes 
            pour une peau parfaite en 30 jours ! ✨
          </p>
        </motion.div>
      </div>

      {/* Boutons d'action premium avec meilleur contraste */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            onClick={handleShare}
            className={`w-full bg-gradient-to-r ${colors.primary} hover:shadow-2xl text-white shadow-xl text-lg py-4 rounded-2xl font-bold ${colors.glow} transition-all duration-300 border-2 border-white/20`}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Partager mes résultats
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={visitInstagram}
            className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 border-2 border-white/40 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            <Instagram className="w-4 h-4 mr-2" />
            @majoliepeau
          </Button>

          <Button
            onClick={onResetQuiz}
            variant="outline"
            className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 border-2 border-white/40 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Nouveau Test
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
