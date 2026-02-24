import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const ResultsLoading = () => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary blur-xl"
          animate={{ scale: [1, 1.3], opacity: [0.4, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative w-16 h-16 flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>
      </div>
      
      <div className="space-y-3 text-center">
        <motion.p 
          className="font-heading text-xl font-semibold text-foreground"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Analyse en cours...
        </motion.p>
        <p className="text-sm text-muted-foreground font-body">
          Ton diagnostic personnalisé arrive
        </p>
      </div>
      
      <motion.div 
        className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
