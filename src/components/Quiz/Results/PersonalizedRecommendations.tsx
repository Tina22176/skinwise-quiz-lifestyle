
import { motion } from "framer-motion";
import { Droplets, Shield, Sparkles, Sun, Moon, Coffee } from "lucide-react";

interface PersonalizedRecommendationsProps {
  skinType: string;
  answers: Record<string, string>;
}

export const PersonalizedRecommendations = ({ skinType, answers }: PersonalizedRecommendationsProps) => {
  const getPersonalizedRoutine = () => {
    const routine = {
      morning: [] as Array<{icon: any, step: string, product: string, why: string}>,
      evening: [] as Array<{icon: any, step: string, product: string, why: string}>
    };

    // Base routine for all skin types
    routine.morning.push(
      { icon: Droplets, step: "Nettoyage", product: "Gel nettoyant doux", why: "Pour éliminer les impuretés de la nuit" },
      { icon: Sun, step: "Protection", product: "Crème solaire SPF 30+", why: "Protection essentielle contre les UV" }
    );

    routine.evening.push(
      { icon: Droplets, step: "Démaquillage", product: "Eau micellaire", why: "Première étape pour nettoyer ta peau" },
      { icon: Moon, step: "Nettoyage", product: "Nettoyant adapté", why: "Pour éliminer pollution et excès de sébum" }
    );

    // Customize based on skin type
    switch (skinType) {
      case "dry":
        routine.morning.splice(1, 0, { icon: Sparkles, step: "Hydratation", product: "Sérum hydratant", why: "Ta peau a besoin d'hydratation intensive" });
        routine.evening.push({ icon: Shield, step: "Nutrition", product: "Crème riche", why: "Pour nourrir ta peau sèche pendant la nuit" });
        break;
      
      case "oily":
        routine.morning.splice(1, 0, { icon: Coffee, step: "Équilibrage", product: "Lotion purifiante", why: "Pour réguler l'excès de sébum" });
        routine.evening.push({ icon: Sparkles, step: "Purification", product: "Masque purifiant (2x/semaine)", why: "Pour désobstruer tes pores" });
        break;
      
      case "combination":
        routine.morning.splice(1, 0, { icon: Sparkles, step: "Équilibrage", product: "Soin bi-zone", why: "Pour traiter zone T et joues différemment" });
        routine.evening.push({ icon: Shield, step: "Hydratation ciblée", product: "Crème légère", why: "Hydratation sans surcharger la zone T" });
        break;
      
      case "sensitive":
        routine.morning.splice(1, 0, { icon: Shield, step: "Apaisement", product: "Sérum apaisant", why: "Pour calmer les irritations" });
        routine.evening.push({ icon: Sparkles, step: "Réparation", product: "Crème réparatrice", why: "Pour réparer ta barrière cutanée" });
        break;
    }

    return routine;
  };

  const routine = getPersonalizedRoutine();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-6"
    >
      {/* Morning Routine */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-orange-50/80 to-yellow-50/80 p-6 rounded-2xl border border-orange-100/50 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sun className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-orange-700">Routine Matinale</h3>
        </div>
        
        <div className="space-y-4">
          {routine.morning.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
            >
              <step.icon className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-800">{step.step}</p>
                <p className="text-sm text-orange-700">{step.product}</p>
                <p className="text-xs text-orange-600/80 italic mt-1">{step.why}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Evening Routine */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 p-6 rounded-2xl border border-purple-100/50 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Moon className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-purple-700">Routine du Soir</h3>
        </div>
        
        <div className="space-y-4">
          {routine.evening.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
            >
              <step.icon className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-purple-800">{step.step}</p>
                <p className="text-sm text-purple-700">{step.product}</p>
                <p className="text-xs text-purple-600/80 italic mt-1">{step.why}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
