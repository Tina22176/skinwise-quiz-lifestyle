import { motion } from "framer-motion";
import { Users, Star, Heart } from "lucide-react";

export const SocialProofBanner = () => {
  const testimonials = [
    { name: "Marie", text: "Ma peau n'a jamais été aussi belle !", rating: 5 },
    { name: "Sarah", text: "Enfin une routine qui marche vraiment", rating: 5 },
    { name: "Emma", text: "Je recommande à toutes mes amies", rating: 5 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 mb-8 text-center shadow-sm"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Statistiques */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-700">
            <Users className="w-5 h-5" />
            <span className="font-semibold text-lg">+2,847</span>
          </div>
          <span className="text-green-600 text-sm">femmes ont transformé leur peau</span>
        </div>

        {/* Étoiles */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
          <span className="text-sm text-gray-600 ml-2">🌟 4.8/5 (532 avis vérifiés)</span>
        </div>
      </div>

      {/* Mini témoignages qui défilent */}
      <div className="mt-4 overflow-hidden">
        <motion.div
          animate={{ x: [300, -300] }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
              <span className="font-medium">{testimonial.name}:</span>
              <span>"{testimonial.text}"</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
