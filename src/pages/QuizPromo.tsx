
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"

const QuizPromo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 text-transparent bg-clip-text">
              Découvre ta Routine Skincare Idéale
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un quiz personnalisé pour révéler tous les secrets de ta peau et obtenir des conseils sur-mesure ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-[0_8px_24px_rgba(255,192,203,0.2)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.3)] transition-all duration-300"
            >
              <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2 Minutes Chrono</h3>
              <p className="text-gray-600">
                Un quiz rapide et efficace pour découvrir ton type de peau
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-[0_8px_24px_rgba(255,192,203,0.2)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.3)] transition-all duration-300"
            >
              <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Personnalisé</h3>
              <p className="text-gray-600">
                Des conseils adaptés à TA peau et à TON mode de vie
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-[0_8px_24px_rgba(255,192,203,0.2)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.3)] transition-all duration-300"
            >
              <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Routine Sur-Mesure</h3>
              <p className="text-gray-600">
                Reçois ta routine beauté personnalisée par email
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-pink-50 to-pink-100 p-12 rounded-3xl shadow-[0_8px_32px_rgba(255,192,203,0.15)]"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prête à découvrir ta routine idéale ? 💖
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Rejoins des milliers de personnes qui ont déjà trouvé leur routine parfaite grâce à notre quiz !
            </p>
            <a 
              href="https://quiz.majoliepeau.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                className="group bg-black hover:bg-black/90 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all duration-300"
              >
                Je découvre mon type de peau
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default QuizPromo
