import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { questions } from "./questions/index";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizAnswerOption } from "./QuizAnswerOption";
import { calculateSkinType } from "./utils/skinTypeCalculator";
import { motivationalTexts } from "./constants/quizTexts";
import { ArrowRight, Sparkles } from "lucide-react";

export const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const isMobile = useIsMobile();

  // Si nous avons dépassé le nombre de questions, nous passons aux résultats
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Ajouter un délai avant de passer à la question suivante
    // pour permettre l'affichage de l'animation de sélection
    setTimeout(() => {
      const currentQuestion = questions[state.currentQuestion];
      dispatch({
        type: "SET_ANSWER",
        questionId: currentQuestion.id,
        answer: answer,
      });
  
      // Si c'est la dernière question, calculons le résultat
      if (state.currentQuestion === questions.length - 1) {
        console.log("🔥 DERNIÈRE QUESTION - CALCUL DU TYPE DE PEAU");
        console.log("Réponses complètes:", { ...state.answers, [currentQuestion.id]: answer });
        
        const skinTypeScore = calculateSkinType({ ...state.answers, [currentQuestion.id]: answer });
        console.log("🎯 RÉSULTAT CALCULÉ:", skinTypeScore);
        
        dispatch({ type: "SET_SKIN_TYPE_SCORE", payload: skinTypeScore });
        setShowNextQuestion(true);
      } else {
        setShowNextQuestion(true);
      }
    }, 800);
  };

  // Passer à la question suivante après l'animation
  useEffect(() => {
    if (showNextQuestion) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setSelectedAnswer(null);
        setShowNextQuestion(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showNextQuestion, dispatch]);

  // Si nous n'avons plus de questions, ne rien afficher
  if (state.currentQuestion >= questions.length) {
    return null;
  }

  const currentQuestion = questions[state.currentQuestion];

  // Définir des classes adaptées selon l'appareil
  const containerClasses = isMobile 
    ? "max-w-3xl mx-auto px-4 py-6" 
    : "max-w-4xl mx-auto px-8 py-8 sm:px-10";
  
  const questionClasses = isMobile
    ? "text-base sm:text-lg md:text-xl font-semibold mb-6 sm:mb-8 text-balance text-center px-2"
    : "text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-10 text-balance text-center";
  
  const optionSpacing = isMobile
    ? "space-y-3.5"
    : "space-y-4 sm:space-y-5";

  // Animation variants for the question container
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

  // Animation variants for the question text
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

  // Animation for next button
  const nextButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.8, 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
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
          animate={{ scale: [0, 1.2] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.span>
      </motion.h2>

      <div className={optionSpacing}>
        {currentQuestion.options.map((option, index) => (
          <QuizAnswerOption
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
          variants={nextButtonVariants}
          initial="hidden"
          animate="visible" 
          className="mt-8 flex justify-center"
        >
          <div className="animate-bounce-subtle">
            <ArrowRight className="h-6 w-6 text-pink-400" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
