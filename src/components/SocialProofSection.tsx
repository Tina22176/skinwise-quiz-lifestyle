import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Camille R.",
    text: "J'ai enfin compris pourquoi mes crèmes ne fonctionnaient pas. Le diagnostic a tout changé !",
    stars: 5,
    result: "Peau mixte hormonale",
  },
  {
    name: "Sophie M.",
    text: "Super précis et personnalisé. En 2 minutes, j'ai eu une vraie routine adaptée à ma peau.",
    stars: 5,
    result: "Peau sensible réactive",
  },
  {
    name: "Léa B.",
    text: "Incroyable ! Je pensais avoir la peau grasse, mais c'est bien plus complexe. Merci !",
    stars: 5,
    result: "Peau à tendance acnéique",
  },
];

const stats = [
  { value: "+2 500", label: "femmes diagnostiquées" },
  { value: "4.9/5", label: "satisfaction moyenne" },
  { value: "2 min", label: "pour des résultats précis" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export const SocialProofSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto space-y-5"
    >
      {/* Stats row */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-[16px] p-4 text-center"
          >
            <p className="font-heading text-[22px] font-bold text-primary">{stat.value}</p>
            <p className="text-[12px] text-muted-foreground font-body mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Testimonials */}
      {testimonials.map((t) => (
        <motion.div
          key={t.name}
          variants={itemVariants}
          className="bg-card border border-border rounded-[16px] p-5"
        >
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-foreground text-[14px] leading-relaxed font-body mb-3">
            "{t.text}"
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-foreground font-body">{t.name}</span>
            <span className="text-[12px] text-primary bg-rose-whisper px-3 py-1 rounded-full font-body">
              {t.result}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
