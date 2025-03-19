
import { motion } from "framer-motion";

interface SkinCharacteristicsGridProps {
  characteristics: string[];
  factors: string[];
  variants: any;
}

export const SkinCharacteristicsGrid = ({ 
  characteristics, 
  factors, 
  variants 
}: SkinCharacteristicsGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div
        variants={variants}
        className="space-y-4 bg-gradient-to-br from-white/80 to-pink-50/80 p-8 rounded-2xl shadow-[0_4px_20px_rgba(255,192,203,0.15)] border border-pink-100/50"
      >
        <h3 className="text-xl font-semibold text-black flex items-center gap-2">
          <span className="h-8 w-1 bg-gradient-to-b from-pink-400 to-pink-200 rounded-full"/>
          Caractéristiques Principales
        </h3>
        <ul className="space-y-3">
          {characteristics.map((char, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center text-black/70"
            >
              <span className="mr-2 text-pink-400">•</span> {char}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        variants={variants}
        className="space-y-4 bg-gradient-to-br from-white/80 to-pink-50/80 p-8 rounded-2xl shadow-[0_4px_20px_rgba(255,192,203,0.15)] border border-pink-100/50"
      >
        <h3 className="text-xl font-semibold text-black flex items-center gap-2">
          <span className="h-8 w-1 bg-gradient-to-b from-pink-400 to-pink-200 rounded-full"/>
          Facteurs Influents
        </h3>
        <ul className="space-y-3">
          {factors.map((factor, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center text-black/70"
            >
              <span className="mr-2 text-pink-400">•</span> {factor}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
