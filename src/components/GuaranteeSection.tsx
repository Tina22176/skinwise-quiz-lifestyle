
import { Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GuaranteeSection = () => {
  const navigate = useNavigate();
  
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
            Garantie Glow 100% – Zéro Risque, 100% Confiance !
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(255,192,203,0.15)] hover:shadow-[0_12px_48px_rgba(255,192,203,0.25)] transition-shadow duration-300"
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-medium mb-2">
                  Satisfait(e) ou accompagné(e) !
                </h4>
                <p className="text-gray-600">
                  Si après 30 jours, tu ne constates aucune amélioration sur ta peau, contacte-moi et je t'accompagnerai personnellement pour ajuster ta routine et maximiser tes résultats.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Sparkles className="w-6 h-6 text-pink-500 flex-shrink-0" />
              <p className="text-xl font-medium">
                Ton glow est ma priorité ! ✨
              </p>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-6 rounded-full text-lg h-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Heart className="w-5 h-5" />
                Je commence ma transformation aujourd'hui !
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuaranteeSection;
