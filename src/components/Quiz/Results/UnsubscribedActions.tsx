
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, RefreshCw } from "lucide-react";

interface UnsubscribedActionsProps {
  visitInstagram: () => void;
  onResetQuiz: () => void;
  variants: any;
}

export const UnsubscribedActions = ({
  visitInstagram,
  onResetQuiz,
  variants
}: UnsubscribedActionsProps) => {
  return (
    <motion.div 
      variants={variants}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
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
    </motion.div>
  );
};
