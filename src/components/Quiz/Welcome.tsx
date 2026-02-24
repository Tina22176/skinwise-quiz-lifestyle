import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center">
      {/* Decorative orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-lilas-soft rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-rose-glow rounded-full blur-3xl opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg mx-auto text-center px-6 sm:px-8 py-8 sm:py-12"
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center bg-primary text-primary-foreground px-5 py-1.5 rounded-full mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <span className="text-sm font-semibold font-body">Diagnostic gratuit</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-violet-deep">
            Tu connais vraiment
          </span>
          <br />
          <span className="text-primary">ta peau ?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed font-body"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          6 questions. 2 minutes. Un profil personnalisé avec les gestes qui te correspondent — pas ceux de TikTok.
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          className="w-16 h-px bg-border mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        />

        {/* CTA */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="group bg-primary text-primary-foreground px-10 py-4 sm:py-5 rounded-full text-lg font-bold shadow-glow transition-all duration-200 w-full sm:w-auto font-body"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 12px 40px rgba(212, 100, 154, 0.35), 0 4px 12px rgba(212, 100, 154, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center">
              Commencer le diagnostic
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
          
          <p className="mt-5 text-sm text-muted-foreground font-body">
            Gratuit · Sans engagement · Résultats immédiats
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
