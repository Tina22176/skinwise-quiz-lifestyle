import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface ConfidenceIndicatorProps {
  confidence: number;
  skinType: string;
  skinTypeText: string;
}

export const ConfidenceIndicator = ({ 
  confidence, 
  skinType, 
  skinTypeText 
}: ConfidenceIndicatorProps) => {
  const getConfidenceLevel = () => {
    if (confidence >= 0.9) return { level: "Très élevée", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle };
    if (confidence >= 0.8) return { level: "Élevée", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: Shield };
    if (confidence >= 0.6) return { level: "Modérée", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle };
    return { level: "Faible", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle };
  };

  const getRecommendations = () => {
    if (confidence >= 0.8) {
      return [
        "Votre diagnostic est fiable",
        "Vous pouvez suivre les recommandations en toute confiance",
        "Observez les résultats sur 2-3 semaines"
      ];
    } else if (confidence >= 0.6) {
      return [
        "Testez différents produits pour valider",
        "Observez votre peau sur plusieurs semaines",
        "Considérez une consultation dermatologique"
      ];
    } else {
      return [
        "Consultez un dermatologue pour confirmer",
        "Répondez à plus de questions pour améliorer la précision",
        "Votre peau peut avoir des caractéristiques mixtes"
      ];
    }
  };

  const confidenceInfo = getConfidenceLevel();
  const IconComponent = confidenceInfo.icon;
  const recommendations = getRecommendations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`${confidenceInfo.bg} ${confidenceInfo.border} border rounded-xl p-4 mb-6`}
    >
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 ${confidenceInfo.color} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className={`font-semibold ${confidenceInfo.color}`}>
              Niveau de confiance du diagnostic
            </h4>
            <span className={`text-sm font-medium ${confidenceInfo.color}`}>
              {confidenceInfo.level} ({(confidence * 100).toFixed(0)}%)
            </span>
          </div>
          
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${
                  confidence >= 0.8 ? 'bg-green-500' : 
                  confidence >= 0.6 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${confidence * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-3">
            Diagnostic : <strong>Peau {skinTypeText}</strong> - 
            {confidence >= 0.8 
              ? " Résultat fiable basé sur vos réponses cohérentes"
              : confidence >= 0.6
              ? " Résultat probable, mais nécessite validation"
              : " Résultat incertain, recommandations supplémentaires nécessaires"
            }
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <strong>Recommandations :</strong>
                <ul className="mt-1 space-y-1">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 