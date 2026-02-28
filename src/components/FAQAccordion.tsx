import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "C'est vraiment gratuit ?",
    answer: "Oui, complètement gratuit ! Le diagnostic et les recommandations personnalisées ne coûtent rien. Si tu souhaites aller plus loin avec un programme complet, c'est en option.",
  },
  {
    question: "Combien de temps ça prend ?",
    answer: "Environ 2 minutes. On te pose 6 questions ciblées sur ta peau, ton mode de vie et tes habitudes. Les résultats sont immédiats.",
  },
  {
    question: "À quelle fréquence dois-je refaire le diagnostic ?",
    answer: "Idéalement tous les 3-6 mois, car ta peau évolue avec les saisons, le stress, les hormones et l'âge. Tu peux aussi le refaire après un changement important dans ta vie.",
  },
  {
    question: "Mes données sont-elles protégées ?",
    answer: "Absolument. Tes données ne sont jamais vendues à des tiers. Elles servent uniquement à personnaliser ton diagnostic et te proposer des conseils adaptés. Tu peux te désinscrire à tout moment.",
  },
  {
    question: "Le diagnostic remplace-t-il un dermatologue ?",
    answer: "Non, il le complète. Notre diagnostic te donne des pistes concrètes pour prendre soin de ta peau au quotidien. Pour des problèmes dermatologiques spécifiques, consulte toujours un professionnel de santé.",
  },
];

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto space-y-3">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-[22px] lg:text-[26px] font-bold text-foreground text-center mb-5"
      >
        Questions fréquentes
      </motion.h2>

      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07, duration: 0.4 }}
          className="bg-card border border-border rounded-[16px] overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="text-[15px] font-semibold text-foreground font-body pr-4">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-primary" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-[14px] text-muted-foreground leading-relaxed font-body">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
