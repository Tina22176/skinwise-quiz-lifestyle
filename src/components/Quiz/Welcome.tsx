
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center px-4"
    >
      <div className="mb-8">
        <span className="inline-block p-3 rounded-full bg-primary/20">
          <Leaf className="w-6 h-6 text-primary-foreground" />
        </span>
      </div>
      
      <h1 className="text-4xl font-semibold mb-4 text-balance">
        Découvrez Votre Routine de Soin Personnalisée
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8 text-balance">
        Transformez votre peau de l'intérieur vers l'extérieur avec notre approche holistique. 
        Répondez à ce questionnaire pour recevoir des recommandations personnalisées pour votre peau et votre style de vie.
      </p>
      
      <button
        onClick={onStart}
        className="glass px-8 py-3 rounded-full text-lg font-medium 
                 text-primary-foreground card-hover"
      >
        Commencer le Quiz
      </button>
    </motion.div>
  );
};
