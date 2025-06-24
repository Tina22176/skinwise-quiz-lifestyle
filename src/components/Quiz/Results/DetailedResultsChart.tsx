
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Info } from "lucide-react";
import { useState } from "react";

interface DetailedResultsChartProps {
  skinType: string;
  answers: Record<string, string>;
}

export const DetailedResultsChart = ({ skinType, answers }: DetailedResultsChartProps) => {
  const [showExplanations, setShowExplanations] = useState(false);

  // Calculate realistic skin characteristics based on answers
  const calculateCharacteristics = () => {
    let scores = {
      hydratation: 50,
      sensibilite: 30,
      sebum: 40,
      reactivite: 25,
      tolerance: 60,
      protection: 45
    };

    // Analyze answers more precisely
    Object.values(answers).forEach(answer => {
      switch (answer) {
        case "seche":
          scores.hydratation = Math.max(10, scores.hydratation - 25);
          scores.sebum = Math.max(5, scores.sebum - 20);
          scores.protection = Math.min(90, scores.protection + 15);
          break;
        case "grasse":
          scores.sebum = Math.min(95, scores.sebum + 35);
          scores.hydratation = Math.min(80, scores.hydratation + 10);
          scores.tolerance = Math.min(85, scores.tolerance + 15);
          break;
        case "mixte":
          scores.sebum = Math.min(75, scores.sebum + 15);
          scores.hydratation = scores.hydratation + 5;
          scores.reactivite = Math.min(70, scores.reactivite + 10);
          break;
        case "sensible":
          scores.sensibilite = Math.min(90, scores.sensibilite + 40);
          scores.reactivite = Math.min(85, scores.reactivite + 35);
          scores.tolerance = Math.max(15, scores.tolerance - 25);
          break;
      }
    });

    const characteristics = [
      { 
        characteristic: 'Hydratation', 
        value: Math.round(scores.hydratation), 
        fullMark: 100,
        explanation: 'Capacité de ta peau à retenir l\'eau'
      },
      { 
        characteristic: 'Sensibilité', 
        value: Math.round(scores.sensibilite), 
        fullMark: 100,
        explanation: 'Réaction aux produits et agressions'
      },
      { 
        characteristic: 'Sébum', 
        value: Math.round(scores.sebum), 
        fullMark: 100,
        explanation: 'Production d\'huile naturelle'
      },
      { 
        characteristic: 'Réactivité', 
        value: Math.round(scores.reactivite), 
        fullMark: 100,
        explanation: 'Tendance aux rougeurs et irritations'
      },
      { 
        characteristic: 'Tolérance', 
        value: Math.round(scores.tolerance), 
        fullMark: 100,
        explanation: 'Résistance aux ingrédients actifs'
      },
      { 
        characteristic: 'Protection', 
        value: Math.round(scores.protection), 
        fullMark: 100,
        explanation: 'Barrière naturelle de la peau'
      },
    ];

    return characteristics;
  };

  const data = calculateCharacteristics();
  const barData = data.map(item => ({
    name: item.characteristic,
    score: item.value,
    explanation: item.explanation
  }));

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#10b981"; // vert
    if (score >= 40) return "#f59e0b"; // orange
    return "#ef4444"; // rouge
  };

  const getScoreText = (score: number) => {
    if (score >= 70) return "Optimal";
    if (score >= 40) return "Modéré";
    return "À améliorer";
  };

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

      {/* Vue radar */}
      <div className="h-80 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid 
              stroke="#f472b6" 
              strokeWidth={1}
              strokeOpacity={0.3}
            />
            <PolarAngleAxis 
              tick={{ 
                fontSize: 11, 
                fill: '#be185d',
                fontWeight: 500
              }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={false}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#ec4899"
              fill="#fce7f3"
              strokeWidth={2.5}
              fillOpacity={0.2}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 5 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Vue détaillée avec barres */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Scores détaillés :</h4>
        {barData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-pink-100/30"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span 
                  className="text-sm font-semibold px-2 py-1 rounded-full"
                  style={{ 
                    color: getScoreColor(item.score),
                    backgroundColor: `${getScoreColor(item.score)}20`
                  }}
                >
                  {item.score}/100 - {getScoreText(item.score)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${item.score}%`,
                    backgroundColor: getScoreColor(item.score)
                  }}
                />
              </div>
              {showExplanations && (
                <motion.p 
                  className="text-xs text-gray-600 mt-2 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.explanation}
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

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
      </div>
    </motion.div>
  );
};
