import { motion } from "framer-motion";
import { SkinTypeScore } from "../../utils/skinTypeCalculator";
import { Shield, Target, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";

interface AdvancedAnalysisDisplayProps {
  skinTypeScore: SkinTypeScore;
  variants?: any;
}

export const AdvancedAnalysisDisplay = ({ 
  skinTypeScore, 
  variants 
}: AdvancedAnalysisDisplayProps) => {
  const { type, score, confidence, characteristics, concerns } = skinTypeScore;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="h-5 w-5" />;
    if (confidence >= 0.6) return <Target className="h-5 w-5" />;
    return <AlertCircle className="h-5 w-5" />;
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return "Très fiable";
    if (confidence >= 0.6) return "Fiable";
    return "À confirmer";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "dry": "text-blue-600",
      "combination": "text-purple-600", 
      "oily": "text-green-600",
      "sensitive": "text-red-600"
    };
    return colors[type as keyof typeof colors] || "text-gray-600";
  };

  return (
    <motion.div
      variants={variants}
      className="glass rounded-2xl p-6 space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Analyse Avancée
        </h3>
        <p className="text-sm text-gray-600">
          Résultats détaillés de votre profil cutané
        </p>
      </div>

      {/* Score de confiance */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-pink-500" />
            <span className="font-medium text-gray-800">Score de confiance</span>
          </div>
          <div className={`flex items-center gap-1 ${getConfidenceColor(confidence)}`}>
            {getConfidenceIcon(confidence)}
            <span className="text-sm font-medium">{getConfidenceText(confidence)}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${confidence * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>0%</span>
          <span>{Math.round(confidence * 100)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Score pondéré */}
      <div className="bg-white/50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          <span className="font-medium text-gray-800">Score pondéré</span>
        </div>
        
        <div className="text-center">
          <span className={`text-3xl font-bold ${getTypeColor(type)}`}>
            {score.toFixed(1)}
          </span>
          <p className="text-sm text-gray-600 mt-1">
            Points pour le type {type}
          </p>
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <Target className="h-4 w-4 text-pink-500" />
          Caractéristiques principales
        </h4>
        
        <div className="grid gap-2">
          {characteristics.map((characteristic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <span className="text-gray-700">{characteristic}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Préoccupations */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-orange-500" />
          Préoccupations identifiées
        </h4>
        
        <div className="grid gap-2">
          {concerns.map((concern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <span className="text-gray-700">{concern}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommandation de confiance */}
      {confidence < 0.7 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">
                Recommandation
              </p>
              <p className="text-xs text-yellow-700">
                Votre profil présente quelques contradictions. Nous vous recommandons de consulter un dermatologue pour confirmer votre type de peau.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}; 