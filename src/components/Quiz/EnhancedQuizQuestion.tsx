
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { questions } from "./questions/index";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuizProgressBar } from "./QuizProgressBar";
import { EnhancedAnswerOption } from "./EnhancedAnswerOption";
import { calculateSkinType } from "./utils/skinTypeCalculator";
import { motivationalTexts } from "./constants/quizTexts";
import { ArrowRight, Sparkles, Lightbulb } from "lucide-react";

export const EnhancedQuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const isMobile = useIsMobile();

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      const currentQuestion = questions[state.currentQuestion];
      dispatch({
        type: "SET_ANSWER",
        questionId: currentQuestion.id,
        answer: answer,
      });

      if (state.currentQuestion === questions.length - 1) {
        const skinType = calculateSkinType(state.answers);
        dispatch({ type: "SET_RESULT", payload: skinType });
        setShowNextQuestion(true);
      } else {
        setShowNextQuestion(true);
      }
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
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showNextQuestion, dispatch]);

  if (state.currentQuestion >= questions.length) {
    return null;
  }

  const currentQuestion = questions[state.currentQuestion];

  const containerClasses = isMobile 
    ? "max-w-3xl mx-auto px-4 py-6" 
    : "max-w-4xl mx-auto px-8 py-8 sm:px-10";
  
  const questionClasses = isMobile
    ? "text-base sm:text-lg md:text-xl font-semibold mb-6 sm:mb-8 text-balance text-center px-2"
    : "text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-10 text-balance text-center";

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

  const getQuestionTip = (questionId: string) => {
    const tips: Record<string, string> = {
      "sensation_apres_nettoyage": "💡 Pense à ta peau 2h après le nettoyage, sans crème",
      "fin_journee": "🌅 Comment ta peau se sent-elle en fin d'après-midi ?",
      "pores": "🔍 Regarde-toi dans le miroir : tes pores sont-ils visibles ?",
      "imperfections": "⭐ As-tu souvent des boutons ou points noirs ?",
      "reaction_soleil": "☀️ Comment réagit ta peau aux premiers rayons de soleil ?",
      "nouveaux_produits": "🧴 Que se passe-t-il quand tu testes un nouveau produit ?",
      "souci_principal": "🎯 Quel est ton plus grand défi beauté quotidien ?",
      "texture_creme": "✨ Quelle texture de crème te fait envie instinctivement ?"
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
        totalQuestions={questions.length}
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
          animate={{ scale: [0, 1.2, 1] }}
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

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <EnhancedAnswerOption
            key={option.value}
            option={option}
            index={index}
            isSelected={selectedAnswer === option.value}
            selectedAnswer={selectedAnswer}
            onSelect={handleAnswer}
          />
        ))}
      </div>

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
