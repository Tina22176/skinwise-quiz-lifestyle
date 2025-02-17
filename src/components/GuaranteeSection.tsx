
import { Shield, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const GuaranteeSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Titre principal avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Preuve Sociale Massive & Garantie
          </h2>
        </motion.div>

        {/* Carte de garantie avec animation glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass p-8 rounded-2xl mb-8 animate-glow"
        >
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-8 h-8 text-pink-400" />
            <h3 className="text-2xl font-semibold">
              Garantie Glow 100% - 0 Risque, 100% Confiance !
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Section essai sans stress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <Sparkles className="w-6 h-6 text-pink-400 mt-1" />
              <div>
                <h4 className="text-lg font-medium mb-2">
                  Tu veux essayer sans stress ?
                </h4>
                <p className="text-gray-600">
                  Si après 30 jours, tu ne vois aucune amélioration sur ta peau, 
                  contacte-moi et je t{"'"}accompagnerons personnellement pour 
                  optimiser tes résultats.
                </p>
              </div>
            </motion.div>

            {/* Section priorité */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-4"
            >
              <MessageCircle className="w-6 h-6 text-pink-400 mt-1" />
              <div>
                <p className="text-lg font-medium">
                  Ton glow est ma priorité !
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
