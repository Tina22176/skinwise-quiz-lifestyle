import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

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
          className="absolute inset-0 rounded-full bg-rose-whisper blur-xl"
          animate={{ scale: [1, 1.3], opacity: [0.4, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1] }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }}
          className="relative w-20 h-20 flex items-center justify-center"
        >
          <Sparkles className="absolute w-24 h-24 text-rose-soft animate-pulse" />
          <Wand2 className="w-16 h-16 text-primary z-10" />
        </motion.div>
      </div>
      
      <div className="space-y-4 text-center">
        <motion.p 
          className="font-heading text-xl font-semibold text-violet-deep"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨ La magie opère... ✨
        </motion.p>
        <p className="text-lg text-center text-muted-foreground max-w-md font-body">
          Nous préparons ton diagnostic personnalisé...
        </p>
      </div>
      
      <motion.div 
        className="w-64 h-2 bg-lilas-soft rounded-full overflow-hidden mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-rose-DEFAULT to-rose-bright"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
