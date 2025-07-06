import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { questions } from "./questions/index";
import { dynamicQuestions } from "./questions/dynamicQuestions";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuizProgressBar } from "./QuizProgressBar";
import { EnhancedAnswerOption } from "./EnhancedAnswerOption";
import { calculateSkinType, validateAnswers } from "./utils/skinTypeCalculator";
import { DynamicQuestionEngine } from "./utils/dynamicQuestionEngine";
import { DynamicQuestionDisplay } from "./components/DynamicQuestionDisplay";
import { motivationalTexts } from "./constants/quizTexts";
import { ArrowRight, Sparkles, Lightbulb, AlertTriangle } from "lucide-react";

export const EnhancedQuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showValidationWarning, setShowValidationWarning] = useState(false);
  const [dynamicList, setDynamicList] = useState<any[]>([]);
  const isMobile = useIsMobile();

  // Générer la liste des questions dynamiques à chaque réponse
  useEffect(() => {
    const engine = new DynamicQuestionEngine(questions, state.answers);
    const generated = engine.generateQuestions();
    setDynamicList(generated);
  }, [state.answers]);

  // Question courante (peut être une question dynamique)
  const currentQuestion = dynamicList[state.currentQuestion] || questions[state.currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      dispatch({
        type: "SET_ANSWER",
        questionId: currentQuestion.id,
        answer: answer,
      });

      // Calculer le type de peau quand toutes les questions sont répondues
      const updatedAnswers = { ...state.answers, [currentQuestion.id]: answer };
      const skinTypeScore = calculateSkinType(updatedAnswers);
      dispatch({ type: "SET_SKIN_TYPE_SCORE", payload: skinTypeScore });
      
      const validation = validateAnswers(updatedAnswers);
      if (!validation.isValid) {
        dispatch({ type: "SET_VALIDATION_ERRORS", payload: validation.conflicts });
        setShowValidationWarning(true);
      }
      
      setShowNextQuestion(true);
    }, 1000);
  };

  // Show tip after 10 seconds if no answer selected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedAnswer) {
        setShowTip(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [selectedAnswer, state.currentQuestion]);

  useEffect(() => {
    if (showNextQuestion) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setSelectedAnswer(null);
        setShowNextQuestion(false);
        setShowTip(false);
        setShowValidationWarning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showNextQuestion, dispatch]);

  if (state.currentQuestion >= dynamicList.length) {
    return null;
  }

  const containerClasses = isMobile 
    ? "max-w-3xl mx-auto px-6 sm:px-8 py-6 sm:py-8" 
    : "max-w-4xl mx-auto px-8 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12";
  
  const questionClasses = isMobile
    ? "text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 text-balance text-center px-2 text-pink-700"
    : "text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-10 text-balance text-center text-pink-700";

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15
      }
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const tipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };

  const warningVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };

  const getQuestionTip = (questionId: string) => {
    const tips: Record<string, string> = {
      "sensation_apres_nettoyage": "💡 Pense à ta peau 2h après le nettoyage, sans crème",
      "fin_journee": "🌅 Comment ta peau se sent-elle en fin d'après-midi ?",
      "pores": "🔍 Regarde-toi dans le miroir : tes pores sont-ils visibles ?",
      "imperfections": "⭐ As-tu souvent des boutons ou points noirs ?",
      "reaction_soleil": "☀️ Comment réagit ta peau aux premiers rayons de soleil ?",
      "nouveaux_produits": "🧴 Que se passe-t-il quand tu testes un nouveau produit ?",
      "souci_principal": "🎯 Quel est ton plus grand défi beauté quotidien ?",
      "texture_creme": "✨ Quelle texture de crème te fait envie instinctivement ?",
      "sensation_inconfort": "⚠️ Ressens-tu souvent des sensations d'inconfort cutané ?",
      "sensible_detail": "🧐 Précise ce qui déclenche ta sensibilité pour des conseils adaptés.",
      "mixte_detail": "🧐 Précise la fréquence de la brillance pour affiner le diagnostic."
    };
    return tips[questionId] || "💫 Choisis la réponse qui te correspond le mieux";
  };

  return (
    <motion.div
      key={state.currentQuestion}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={containerClasses}
    >
      <QuizProgressBar 
        currentQuestion={state.currentQuestion} 
        totalQuestions={dynamicList.length}
        motivationalTexts={motivationalTexts}
      />

      <motion.h2
        variants={questionVariants}
        className={`${questionClasses} relative`}
      >
        {currentQuestion.question}
        <motion.span 
          className="absolute -top-1 -right-1 text-pink-400"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.span>
      </motion.h2>

      {showTip && !selectedAnswer && (
        <motion.div
          variants={tipVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 p-4 bg-gradient-to-r from-pink-50/80 to-pink-100/80 rounded-xl border border-pink-200/50 mx-4"
        >
          <div className="flex items-center gap-2 text-pink-600">
            <Lightbulb className="h-4 w-4" />
            <p className="text-sm font-medium">{getQuestionTip(currentQuestion.id)}</p>
          </div>
        </motion.div>
      )}

      {showValidationWarning && state.validationErrors.length > 0 && (
        <motion.div
          variants={warningVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 p-4 bg-gradient-to-r from-yellow-50/80 to-yellow-100/80 rounded-xl border border-yellow-200/50 mx-4"
        >
          <div className="flex items-start gap-2 text-yellow-700">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">Attention aux contradictions :</p>
              <ul className="text-xs space-y-1">
                {state.validationErrors.map((error, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-yellow-600">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Affichage de la question dynamique */}
      <DynamicQuestionDisplay
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={handleAnswer}
      />

      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-2 text-pink-500 font-medium">
            <span>Parfait ! Prochaine question</span>
            <ArrowRight className="h-5 w-5 animate-bounce" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
