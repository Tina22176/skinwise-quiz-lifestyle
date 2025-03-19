
import { motion } from "framer-motion";

interface RoutineRecommendationProps {
  recommendation: string;
  variants: any;
}

export const RoutineRecommendation = ({ 
  recommendation, 
  variants 
}: RoutineRecommendationProps) => {
  return (
    <motion.div
      variants={variants}
      className="bg-gradient-to-r from-pink-100/30 to-pink-50/30 p-6 rounded-xl border border-pink-200/30 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-black mb-3">Recommandation pour ta routine :</h3>
      <p className="text-black/80">{recommendation}</p>
    </motion.div>
  );
};
