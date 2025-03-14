
import { Quiz } from "@/components/Quiz/Quiz";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white/50">
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
