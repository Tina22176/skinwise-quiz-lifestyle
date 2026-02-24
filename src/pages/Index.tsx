import { Quiz } from "@/components/Quiz/Quiz";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Home');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header — matches mockup exactly */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border"
        style={{ minHeight: '56px' }}
        role="banner"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center" style={{ minHeight: '56px' }}>
          <span className="font-heading text-[20px] font-bold text-violet-deep">
            Majoliepeau
          </span>
          
          <div className="flex items-center space-x-4 text-sm font-body" role="complementary">
            <span className="text-primary font-semibold">100% Gratuit</span>
            <span className="text-muted-foreground">2 min</span>
          </div>
        </div>
      </header>

      {/* Floating orbs — decorative */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute rounded-full bg-lilas-soft/40 blur-3xl"
          style={{ width: 200, height: 200, top: '15%', left: '10%' }}
          animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full bg-rose-glow/30 blur-3xl"
          style={{ width: 160, height: 160, bottom: '20%', right: '15%' }}
          animate={{ x: [0, -8, 10, 0], y: [0, 6, -8, 0], scale: [1, 0.97, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full bg-violet-whisper/50 blur-3xl"
          style={{ width: 120, height: 120, top: '60%', left: '50%' }}
          animate={{ x: [0, 6, -4, 0], y: [0, -4, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <main className="pt-16" role="main">
        <Quiz />
      </main>
      
      {/* Footer — simple, matches mockup */}
      <footer 
        className="py-6 border-t border-border bg-card/50"
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm text-muted-foreground font-body">
              © 2026 Majoliepeau. Tous droits réservés.
            </p>
            
            <nav className="flex items-center space-x-6" role="navigation" aria-label="Liens externes">
              <a
                href="https://majoliepeau.com"
                className="text-sm text-primary hover:text-primary-hover transition-colors font-medium font-body"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boutique
              </a>
              <a
                href="https://instagram.com/majolie_peau"
                className="text-sm text-primary hover:text-primary-hover transition-colors font-medium font-body"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
