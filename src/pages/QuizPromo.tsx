import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"
import GuaranteeSection from "@/components/GuaranteeSection"

const QuizPromo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-3"
          >
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 text-transparent bg-clip-text">
              Découvre ta Routine Skincare Idéale
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Un quiz personnalisé pour révéler tous les secrets de ta peau et obtenir des conseils sur-mesure ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(255,192,203,0.15)] hover:shadow-[0_8px_16px_rgba(255,192,203,0.2)] transition-all duration-300"
            >
              <div className="h-8 w-8 bg-pink-100 rounded-lg flex items-center justify-center mb-2">
                <Sparkles className="h-4 w-4 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-1">2 Minutes Chrono</h3>
              <p className="text-sm text-gray-600">
                Un quiz rapide et efficace pour découvrir ton type de peau
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(255,192,203,0.15)] hover:shadow-[0_8px_16px_rgba(255,192,203,0.2)] transition-all duration-300"
            >
              <div className="h-8 w-8 bg-pink-100 rounded-lg flex items-center justify-center mb-2">
                <Heart className="h-4 w-4 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-1">100% Personnalisé</h3>
              <p className="text-sm text-gray-600">
                Des conseils adaptés à TA peau et à TON mode de vie
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(255,192,203,0.15)] hover:shadow-[0_8px_16px_rgba(255,192,203,0.2)] transition-all duration-300"
            >
              <div className="h-8 w-8 bg-pink-100 rounded-lg flex items-center justify-center mb-2">
                <Star className="h-4 w-4 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Routine Sur-Mesure</h3>
              <p className="text-sm text-gray-600">
                Reçois ta routine beauté personnalisée par email
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* CTA Section */}
      <section className="py-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-2xl shadow-[0_4px_16px_rgba(255,192,203,0.12)]"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Prête à découvrir ta routine idéale ? 💖
            </h2>
            <p className="text-lg text-gray-600 mb-4 max-w-lg mx-auto">
              Rejoins des milliers de personnes qui ont déjà trouvé leur routine parfaite grâce à notre quiz !
            </p>
            <a 
              href="https://quiz.majoliepeau.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                className="group bg-black hover:bg-black/90 text-white px-6 py-4 rounded-lg text-base font-medium transition-all duration-300"
              >
                Je découvre mon type de peau
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuizPromo;
