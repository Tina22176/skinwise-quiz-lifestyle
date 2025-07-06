
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

interface FloatingParticlesProps {
  colors: {
    primary: string;
    accent: string;
  };
}

export const FloatingParticles = ({ colors }: FloatingParticlesProps) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.id % 3 === 0 ? (
            <Sparkles 
              className={`text-${colors.accent} drop-shadow-lg`}
              size={particle.size}
            />
          ) : (
            <Star 
              className={`text-${colors.accent} drop-shadow-lg`}
              size={particle.size}
            />
          )}
        </motion.div>
      ))}
      
      {/* Particules de lumière */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
