
import { Shield, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const GuaranteeSection = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
            Preuve Sociale Massive & Garantie
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(255,192,203,0.15)] hover:shadow-[0_12px_48px_rgba(255,192,203,0.25)] transition-shadow duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-8 h-8 text-pink-500" />
            <h3 className="text-2xl font-semibold">
              Garantie Glow 100% - 0 Risque, 100% Confiance !
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-medium mb-2">
                  Tu veux essayer sans stress ?
                </h4>
                <p className="text-gray-600">
                  Si après 30 jours, tu ne vois aucune amélioration sur ta peau, contacte-moi et je t'accompagnerai personnellement pour optimiser tes résultats.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MessageCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <p className="text-lg font-medium">
                Ton glow est ma priorité !
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuaranteeSection;
