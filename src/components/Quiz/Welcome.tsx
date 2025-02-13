
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative">
      {/* Image de fond immersive */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-20"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('/placeholder.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-4 py-12"
      >
        {/* Image principale avec effet shake */}
        <motion.div 
          className="mb-12 rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(255,192,203,0.2)] mx-auto max-w-md"
          whileHover={{ 
            scale: 1.02,
            rotate: [0, -1, 1, -1, 0],
            transition: {
              rotate: {
                duration: 0.3,
                repeat: 0,
              }
            }
          }}
        >
          <img 
            src="/placeholder.svg"
            alt="Femme avec une peau lumineuse"
            className="w-full h-64 object-cover"
          />
        </motion.div>

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
    </div>
  );
};
