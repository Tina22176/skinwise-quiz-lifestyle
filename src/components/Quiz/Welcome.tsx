import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Clock, Heart } from "lucide-react";
import { useState } from "react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      {/* Background decoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-6 sm:px-8 py-8 sm:py-12"
      >
        {/* Titre principal */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 bg-clip-text text-transparent">
            Tu connais vraiment
          </span>
          <br />
          <span className="text-gray-800">ta peau ?</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed"
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
          <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 to-transparent rounded-3xl" />
          
          {!imageLoaded && (
            <div className="w-full h-64 bg-pink-100 rounded-3xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-300" />
            </div>
          )}
          
          <img 
            src="https://majoliepeau.com/cdn/shop/files/illustration_digitale_de_copines_majoliepeau.png?v=1738249223&width=600"
            alt="Illustration digitale des copines Majoliepeau"
            className={`w-full rounded-3xl shadow-[0_20px_40px_rgba(255,192,203,0.3)] transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="eager"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 sm:py-5 rounded-full text-lg font-semibold shadow-[0_10px_30px_rgba(255,192,203,0.4)] transition-all duration-300 w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 40px rgba(255,192,203,0.6)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Commencer le diagnostic
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <p className="mt-4 text-sm text-gray-500">
            Gratuit · Sans engagement · Résultats immédiats
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
