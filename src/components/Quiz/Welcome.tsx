
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Clock, Heart } from "lucide-react";
import { useState } from "react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const stats = [
    { icon: Users, value: "2,500+", label: "Peaux analysées" },
    { icon: Star, value: "4.9/5", label: "Note moyenne" },
    { icon: Clock, value: "2 min", label: "Temps moyen" }
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      {/* Background decoratif optimisé */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto text-center px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12"
      >
        {/* Badge premium */}
        <motion.div 
          className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6 sm:mb-8 border border-pink-200/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-pink-700">Quiz Premium Gratuit</span>
        </motion.div>
        
        {/* Titre principal avec gradient */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 bg-clip-text text-transparent">
            Révèle le Secret
          </span>
          <br />
          <span className="text-gray-800">de ta Peau ✨</span>
        </motion.h1>

        {/* Statistiques */}
        <motion.div 
          className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:items-center sm:space-x-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-pink-100 rounded-full mx-auto mb-2">
                <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-pink-600" />
              </div>
              <div className="font-semibold text-gray-800 text-sm sm:text-xl">{stat.value}</div>
              <div className="text-xs sm:text-base text-gray-600 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image principale avec chargement optimisé */}
        <motion.div 
          className="mb-6 sm:mb-8 relative max-w-sm sm:max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ 
            scale: 1.02,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 to-transparent rounded-3xl" />
          
          {!imageLoaded && (
            <div className="w-full h-64 sm:h-80 bg-pink-100 rounded-3xl flex items-center justify-center">
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

        {/* Description premium */}
        <motion.div 
          className="space-y-6 mb-8 sm:mb-10 text-left max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center font-semibold text-gray-800 mb-4 sm:mb-6">
            Ta peau te parle... mais la comprends-tu vraiment ? 💖
          </h2>
          
          <div className="glass p-4 sm:p-6 rounded-2xl border border-pink-100/50">
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Ce quiz unique te permet d'identifier précisément ton type de peau et de comprendre 
              les facteurs de ton mode de vie qui influencent son éclat.
            </p>
            
            <div className="flex items-start space-x-3 mb-4">
              <Heart className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>En seulement 2 minutes</strong>, reçois ton diagnostic complet avec des conseils personnalisés
              </p>
            </div>
            
            <div className="bg-pink-50/50 rounded-xl p-3 sm:p-4 mt-4">
              <p className="text-center text-pink-700 font-medium text-sm sm:text-base">
                🌸 Le secret d'une peau rayonnante n'est pas d'utiliser plus de produits, 
                mais les BONS produits dans le BON ordre 🌸
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Button premium */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold shadow-[0_10px_30px_rgba(255,192,203,0.4)] transition-all duration-300 w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 40px rgba(255,192,203,0.6)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              ✨ DÉCOUVRIR MON TYPE DE PEAU
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <p className="mt-4 text-xs sm:text-sm text-gray-500">
            🔒 Gratuit • Sans engagement • Résultats instantanés
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
