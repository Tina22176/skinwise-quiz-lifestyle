
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";
import { calculateSkinCharacteristics } from "./utils/SkinScoreCalculator";
import { SkinRadarChart } from "./components/SkinRadarChart";
import { SkinScoreBars } from "./components/SkinScoreBars";

interface DetailedResultsChartProps {
  skinType: string;
  answers: Record<string, string>;
}

export const DetailedResultsChart = ({ skinType, answers }: DetailedResultsChartProps) => {
  const [showExplanations, setShowExplanations] = useState(false);

  const data = calculateSkinCharacteristics(answers);
  const barData = data.map(item => ({
    name: item.characteristic,
    score: item.value,
    explanation: item.explanation
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-white/90 to-pink-50/90 p-6 rounded-2xl border border-pink-100/50 shadow-sm"
    >
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-black">
          📊 Analyse Détaillée de Ta Peau
        </h3>
        <button
          onClick={() => setShowExplanations(!showExplanations)}
          className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 transition-colors"
        >
          <Info className="w-4 h-4" />
          <span className="text-sm">Explications</span>
        </button>
      </motion.div>

      <SkinRadarChart data={data} />
      
      <SkinScoreBars data={barData} showExplanations={showExplanations} />

      <motion.div 
        className="mt-6 p-4 bg-pink-50/50 rounded-xl border border-pink-100/30"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-sm text-pink-700 text-center">
          💡 <strong>Ces scores reflètent l'état actuel de ta peau</strong> basé sur tes réponses. 
          Avec une routine adaptée, tu peux améliorer ces caractéristiques !
        </p>
      </motion.div>
    </motion.div>
  );
};
