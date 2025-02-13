
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto text-center px-4"
    >
      <div className="mb-8">
        <span className="inline-block p-4 rounded-full bg-primary/10 animate-glow">
          <Leaf className="w-8 h-8 text-primary-foreground" />
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-balance leading-tight">
        Découvrez Votre Routine de Soin Personnalisée
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground mb-10 text-balance max-w-xl mx-auto">
        Transformez votre peau de l'intérieur vers l'extérieur avec notre approche holistique. 
        Répondez à ce questionnaire pour recevoir des recommandations personnalisées pour votre peau et votre style de vie.
      </p>
      
      <button
        onClick={onStart}
        className="premium-button group"
      >
        <span className="relative inline-flex items-center">
          Commencer le Quiz
          <motion.span
            className="ml-2 opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </span>
      </button>
    </motion.div>
  );
};
