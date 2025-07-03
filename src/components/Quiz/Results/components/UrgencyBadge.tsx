
import { motion } from “framer-motion”;
import { Clock, Zap } from “lucide-react”;
import { useState, useEffect } from “react”;

export const UrgencyBadge = () => {
const [timeLeft, setTimeLeft] = useState(“23:47:12”);

useEffect(() => {
// Timer optimisé - update moins fréquent sur mobile
const isMobile = window.innerWidth < 640;
const updateInterval = isMobile ? 10000 : 1000; // 10s sur mobile, 1s sur desktop

const updateTimer = () => {
  // Timer cohérent basé sur un délai fixe de 24h
  const targetTime = new Date();
  targetTime.setHours(24, 0, 0, 0); // Minuit suivant
  
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();
  
  if (diff > 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }
};

updateTimer();
const interval = setInterval(updateTimer, updateInterval);

return () => clearInterval(interval);

}, []);

return (
<motion.div
initial={{ opacity: 0, y: -15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
className=“flex justify-center mb-3 sm:mb-4” // Margin réduite
>
<motion.div
animate={{
boxShadow: [
“0 0 15px rgba(255,192,203,0.25)”,
“0 0 20px rgba(255,192,203,0.4)”,
“0 0 15px rgba(255,192,203,0.25)”
]
}}
transition={{
duration: 3, // Plus lent pour économiser la batterie
repeat: Infinity,
ease: “easeInOut”
}}
className=“bg-gradient-to-r from-pink-500 to-pink-400 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg”
>
<motion.div
animate={{ rotate: [0, 5, -5, 0] }}
transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }} // Moins fréquent
>
<Zap className="w-3 h-3 sm:w-4 sm:h-4" />
</motion.div>
<span className="text-xs sm:text-sm font-semibold">
<span className="hidden sm:inline">Analyse valide encore</span>
<span className="sm:hidden">Valide encore</span>
</span>
<div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
<Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
<span className="text-xs font-mono">{timeLeft}</span>
</div>
</motion.div>
</motion.div>
);
};

// Version compacte intégrée (pour le header mobile)
export const CompactUrgencyBadge = () => {
return (
<div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full text-xs text-orange-600 font-medium">
<motion.div
animate={{ scale: [1, 1.1, 1] }}
transition={{ duration: 2, repeat: Infinity, ease: “easeInOut” }}
className=“w-2 h-2 bg-orange-400 rounded-full”
/>
<span>Diagnostic gratuit - Plus que 24h</span>
</div>
);
};

// Hook pour choisir la version selon le contexte
export const ResponsiveUrgencyBadge = ({ compact = false }) => {
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
const checkIsMobile = () => {
setIsMobile(window.innerWidth < 640);
};

checkIsMobile();
window.addEventListener('resize', checkIsMobile);
return () => window.removeEventListener('resize', checkIsMobile);

}, []);

// Si on veut la version compacte OU qu’on est sur mobile et que compact est autorisé
if (compact || (isMobile && compact !== false)) {
return <CompactUrgencyBadge />;
}

return <UrgencyBadge />;
};
