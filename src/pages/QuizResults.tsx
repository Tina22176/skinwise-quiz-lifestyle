
import { Results } from "@/components/Quiz/Results";
import { QuizProvider } from "@/components/Quiz/QuizContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { KlaviyoTestButton } from "@/components/Quiz/Results/components/KlaviyoTestButton";

const QuizResults = () => {
  const navigate = useNavigate();
  
  // Function to reset the quiz and navigate to home
  const handleResetQuiz = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white/50 overflow-x-hidden px-1 sm:px-2">
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto py-8"
        >
          <QuizProvider>
            <Results onResetQuiz={handleResetQuiz} />
          </QuizProvider>
        </motion.div>
      </main>
      
      <footer className="mt-4 sm:mt-8 py-2 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground">
        <p>© 2023 Majoliepeau. Tous droits réservés.</p>
      </footer>
      
      {/* Bouton de test Klaviyo temporaire */}
      <KlaviyoTestButton />
    </div>
  );
};

export default QuizResults;
