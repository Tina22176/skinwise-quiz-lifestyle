
import { motion } from "framer-motion";
import { getScoreColor, getScoreText } from "../utils/SkinScoreCalculator";

interface ScoreBarData {
  name: string;
  score: number;
  explanation: string;
}

interface SkinScoreBarsProps {
  data: ScoreBarData[];
  showExplanations: boolean;
}

export const SkinScoreBars = ({ data, showExplanations }: SkinScoreBarsProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-lg font-medium text-gray-800 mb-4">Scores détaillés :</h4>
      {data.map((item, index) => (
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
  );
};
