
import { motion } from "framer-motion";

interface SkinProfileCardProps {
  description: string;
  variants: any;
}

export const SkinProfileCard = ({ description, variants }: SkinProfileCardProps) => {
  return (
    <motion.div 
      variants={variants}
      className="bg-gradient-to-br from-pink-50/90 to-white/90 p-6 rounded-xl border border-pink-100/50 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-black mb-3">Ton profil cutané :</h3>
      <p className="text-black/80 mb-4">{description}</p>
    </motion.div>
  );
};
