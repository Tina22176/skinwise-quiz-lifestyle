
import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export const UrgencyBadge = () => {
  const [timeLeft, setTimeLeft] = useState("23:47:12");

  useEffect(() => {
    // Simuler un compte à rebours (pour l'effet psychologique)
    const interval = setInterval(() => {
      const now = new Date();
      const hours = 23 - (now.getHours() % 24);
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center mb-6"
    >
      <motion.div
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(255,192,203,0.3)",
            "0 0 30px rgba(255,192,203,0.5)",
            "0 0 20px rgba(255,192,203,0.3)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Zap className="w-4 h-4" />
        </motion.div>
        <span className="text-sm font-semibold">
          Analyse valide encore
        </span>
        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-mono">{timeLeft}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
