import { Quiz } from "@/components/Quiz/Quiz";
import { motion } from "framer-motion";
import { Sparkles, Shield, Award } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Home');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-white to-pink-50/20 overflow-x-hidden">
      {/* Header avec logo flottant - simplifié */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl border-b border-pink-100/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ minHeight: '64px' }}
        role="banner"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center" style={{ minHeight: '64px' }}>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <OptimizedImage 
              src="https://cdn.shopify.com/s/files/1/0819/8622/4458/files/logo_majoliepeau.png?v=1738319474"
              alt="Logo Majoliepeau - Découvrez votre type de peau"
              width={56}
              height={56}
              className="h-10 sm:h-12 md:h-14 w-auto"
              priority={true}
            />
          </motion.div>
          
          <div className="flex items-center space-x-6 text-sm" role="complementary" aria-label="Informations du quiz">
            <motion.div 
              className="flex items-center space-x-1 text-pink-600/80"
              whileHover={{ scale: 1.05 }}
              aria-label="Quiz entièrement gratuit"
            >
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>100% Gratuit</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-1 text-pink-600/80"
              whileHover={{ scale: 1.05 }}
              aria-label="Quiz rapide de 2 minutes"
            >
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>2 min</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Particules flottantes d'arrière-plan */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenu principal - le Quiz démarre directement */}
      <main className="pt-20" role="main">
        <Quiz />
      </main>
      
      {/* Footer premium */}
      <motion.footer 
        className="mt-8 py-8 border-t border-pink-100/30 bg-gradient-to-r from-pink-50/20 to-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-pink-400" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                © 2024 Majoliepeau. Tous droits réservés.
              </p>
            </div>
            
            <nav className="flex items-center space-x-6" role="navigation" aria-label="Liens externes">
              <motion.a
                href="https://majoliepeau.com"
                className="text-sm text-pink-600/70 hover:text-pink-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter la boutique Majoliepeau (nouvel onglet)"
              >
                Boutique
              </motion.a>
              <motion.a
                href="https://instagram.com/majolie_peau"
                className="text-sm text-pink-600/70 hover:text-pink-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivre Majoliepeau sur Instagram (nouvel onglet)"
              >
                Instagram
              </motion.a>
            </nav>
          </div>
          
          <motion.div 
            className="mt-6 pt-4 border-t border-pink-100/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto">
              Ce quiz a été conçu avec amour pour t'aider à comprendre ta peau et révéler son véritable potentiel. 
              Tes données sont protégées et utilisées uniquement pour personnaliser tes recommandations.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
