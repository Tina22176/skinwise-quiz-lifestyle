import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { useState } from "react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-whisper rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-lilas-soft rounded-full blur-3xl opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-6 sm:px-8 py-8 sm:py-12"
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center space-x-2 bg-rose-whisper px-4 py-1.5 rounded-full mb-6 border border-rose-soft/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <span className="text-sm font-medium text-rose-DEFAULT font-body">Diagnostic gratuit</span>
        </motion.div>

        {/* Titre */}
        <motion.h1 
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-primary">
            Tu connais vraiment
          </span>
          <br />
          <span className="text-foreground">ta peau ?</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed font-body"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          6 questions. 2 minutes. Un profil personnalisé avec les gestes qui te correspondent — pas ceux de TikTok.
        </motion.p>

        {/* Image */}
        <motion.div 
          className="mb-8 relative max-w-sm mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-rose-whisper/40 to-transparent rounded-2xl" />
          
          {!imageLoaded && (
            <div className="w-full h-64 bg-rose-whisper rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-soft" />
            </div>
          )}
          
          <img 
            src="https://majoliepeau.com/cdn/shop/files/illustration_digitale_de_copines_majoliepeau.png?v=1738249223&width=600"
            alt="Illustration digitale des copines Majoliepeau"
            className={`w-full rounded-2xl shadow-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="eager"
          />
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="group relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 sm:py-5 rounded-xl text-lg font-semibold shadow-glow transition-all duration-300 w-full sm:w-auto font-body"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 12px 36px rgba(212, 100, 154, 0.30)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Commencer le diagnostic
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-primary-hover"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <p className="mt-4 text-sm text-muted-foreground font-body">
            Gratuit · Sans engagement · Résultats immédiats
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
