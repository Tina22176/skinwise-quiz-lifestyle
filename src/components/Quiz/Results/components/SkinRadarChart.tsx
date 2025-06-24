
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { SkinCharacteristic } from "../utils/SkinScoreCalculator";

interface SkinRadarChartProps {
  data: SkinCharacteristic[];
}

export const SkinRadarChart = ({ data }: SkinRadarChartProps) => {
  return (
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
  );
};
