
import { motion } from "framer-motion";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

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
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200/30 to-pink-300/30 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-20 h-20 flex items-center justify-center"
        >
          <Sparkles className="absolute w-24 h-24 text-pink-200 animate-pulse" />
          <Wand2 className="w-16 h-16 text-pink-400 z-10" />
        </motion.div>
      </div>
      
      <div className="space-y-4 text-center">
        <motion.p 
          className="text-xl font-medium text-pink-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨ La magie opère... ✨
        </motion.p>
        <p className="text-lg text-center text-muted-foreground max-w-md">
          Nous préparons ton diagnostic beauté personnalisé avec amour...
        </p>
      </div>
      
      <motion.div 
        className="w-64 h-2 bg-pink-100 rounded-full overflow-hidden mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-300 to-pink-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2.2,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};
