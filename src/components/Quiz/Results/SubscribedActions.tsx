
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Instagram, RefreshCw } from "lucide-react";

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

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
          >
            <Instagram className="w-4 h-4" />
            Partager mes résultats
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={visitInstagram}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
          >
            <Instagram className="w-4 h-4" />
            Suivre Majoliepeau
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onResetQuiz}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Refaire le test
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
