import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Instagram, RefreshCw, Share2, Gift, Sparkles, Mail } from "lucide-react";

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
      className="text-center space-y-6 sm:space-y-8"
    >
      {/* Animation de succès */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg relative"
      >
        <CheckCircle className="w-10 h-10 text-white" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-green-400/30 rounded-full"
        />
      </motion.div>

      {/* Message de succès */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-green-500" />
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Merci ! Ta routine arrive bientôt
          </h3>
          <Sparkles className="w-5 h-5 text-green-500" />
        </div>
        <div className="space-y-2">
          <p className="text-base sm:text-lg text-gray-700">
            Ta routine personnalisée est en préparation
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>Vérifie tes emails dans les prochaines minutes</span>
          </div>
        </div>
      </div>

      {/* Bonus surprise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-200/50 shadow"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="w-5 h-5 text-green-600" />
          <h4 className="text-base font-semibold text-green-700">Bonus Surprise !</h4>
        </div>
        <p className="text-xs sm:text-sm text-green-600">
          En plus de ta routine, tu recevras nos 3 secrets d'expertes pour une peau parfaite en 30 jours !
        </p>
      </motion.div>
    </motion.div>
  );
};
