
import { Quiz } from "@/components/Quiz/Quiz";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white/50">
      <header className="py-6 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-pink-500"
        >
          ✨ DÉCOUVRE TON VÉRITABLE TYPE DE PEAU ✨
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2 text-muted-foreground max-w-xl mx-auto"
        >
          Réponds à quelques questions et obtiens un diagnostic personnalisé pour une routine adaptée à tes besoins
        </motion.p>
      </header>
      
      <main>
        <Quiz />
      </main>
      
      <footer className="mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>© 2023 Majoliepeau. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Index;
