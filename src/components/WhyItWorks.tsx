import { motion } from "framer-motion";
import { ClipboardList, Zap, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "6 questions ciblées",
    description: "On analyse ta peau, tes habitudes et ton mode de vie pour comprendre ce qui se passe vraiment.",
    color: "#F5F0FA",
    iconColor: "#8A6BA0",
  },
  {
    icon: Zap,
    title: "Algorithme personnalisé",
    description: "Notre moteur de diagnostic croise 40+ paramètres pour identifier ton profil cutané unique.",
    color: "#FDF2F7",
    iconColor: "#D4649A",
  },
  {
    icon: Sparkles,
    title: "Routine sur-mesure",
    description: "Tu reçois des gestes adaptés à TU peau — pas une routine générique copiée-collée.",
    color: "#F5F0FA",
    iconColor: "#6B4E7D",
  },
  {
    icon: TrendingUp,
    title: "Résultats visibles",
    description: "En suivant les recommandations personnalisées, 92% des utilisatrices voient une amélioration en 4 semaines.",
    color: "#FDF2F7",
    iconColor: "#D4649A",
  },
];

export const WhyItWorks = () => {
  return (
    <div className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-[22px] lg:text-[26px] font-bold text-foreground text-center mb-6"
      >
        Pourquoi ça marche
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[26px] top-6 bottom-6 w-px bg-border hidden sm:block" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
                className="flex items-start gap-4"
              >
                <div
                  className="relative z-10 flex-shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-sm"
                  style={{ background: step.color }}
                >
                  <Icon className="w-5 h-5" style={{ color: step.iconColor }} />
                </div>
                <div className="flex-1 bg-card border border-border rounded-[16px] p-4">
                  <p className="text-[15px] font-semibold text-foreground font-body mb-1">
                    {step.title}
                  </p>
                  <p className="text-[13px] text-muted-foreground font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
