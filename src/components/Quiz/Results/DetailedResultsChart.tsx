
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface DetailedResultsChartProps {
  skinType: string;
  answers: Record<string, string>;
}

export const DetailedResultsChart = ({ skinType, answers }: DetailedResultsChartProps) => {
  // Calculate skin characteristics based on answers
  const calculateCharacteristics = () => {
    let characteristics = {
      hydratation: 0,
      sensibilite: 0,
      sebum: 0,
      reactivite: 0,
      tolerance: 0,
      protection: 0
    };

    Object.values(answers).forEach(answer => {
      switch (answer) {
        case "seche":
          characteristics.hydratation += 1;
          characteristics.protection += 2;
          break;
        case "grasse":
          characteristics.sebum += 3;
          characteristics.tolerance += 2;
          break;
        case "mixte":
          characteristics.sebum += 1;
          characteristics.hydratation += 1;
          characteristics.tolerance += 1;
          break;
        case "sensible":
          characteristics.sensibilite += 3;
          characteristics.reactivite += 2;
          break;
      }
    });

    // Normalize to 0-100 scale
    const maxValue = Math.max(...Object.values(characteristics));
    if (maxValue > 0) {
      Object.keys(characteristics).forEach(key => {
        characteristics[key as keyof typeof characteristics] = 
          (characteristics[key as keyof typeof characteristics] / maxValue) * 100;
      });
    }

    return [
      { characteristic: 'Hydratation', value: Math.max(20, characteristics.hydratation), fullMark: 100 },
      { characteristic: 'Sensibilité', value: Math.max(10, characteristics.sensibilite), fullMark: 100 },
      { characteristic: 'Production Sébum', value: Math.max(15, characteristics.sebum), fullMark: 100 },
      { characteristic: 'Réactivité', value: Math.max(10, characteristics.reactivite), fullMark: 100 },
      { characteristic: 'Tolérance', value: Math.max(25, characteristics.tolerance), fullMark: 100 },
      { characteristic: 'Protection', value: Math.max(20, characteristics.protection), fullMark: 100 },
    ];
  };

  const data = calculateCharacteristics();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-white/90 to-pink-50/90 p-6 rounded-2xl border border-pink-100/50 shadow-sm"
    >
      <motion.h3 
        className="text-xl font-semibold text-black mb-6 text-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        📊 Profil Détaillé de Ta Peau
      </motion.h3>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid 
              stroke="#f472b6" 
              strokeWidth={1}
              strokeOpacity={0.3}
            />
            <PolarAngleAxis 
              tick={{ 
                fontSize: 12, 
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
              name="Caractéristiques"
              dataKey="value"
              stroke="#ec4899"
              fill="#fce7f3"
              strokeWidth={2}
              fillOpacity={0.3}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <motion.div 
        className="mt-4 text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-pink-600/80 italic">
          Ce graphique représente les principales caractéristiques de ta peau selon tes réponses
        </p>
      </motion.div>
    </motion.div>
  );
};
