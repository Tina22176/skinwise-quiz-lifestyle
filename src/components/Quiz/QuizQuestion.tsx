
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { questions } from "./questions/index";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizAnswerOption } from "./QuizAnswerOption";
import { calculateSkinType } from "./utils/skinTypeCalculator";
import { motivationalTexts } from "./constants/quizTexts";

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
        const skinType = calculateSkinType(state.answers);
        dispatch({ type: "SET_RESULT", payload: skinType });
        setShowNextQuestion(true);
      } else {
        setShowNextQuestion(true);
      }
    }, 600);
  };

  // Passer à la question suivante après l'animation
  useEffect(() => {
    if (showNextQuestion) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setSelectedAnswer(null);
        setShowNextQuestion(false);
      }, 300);
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
    ? "max-w-3xl mx-auto px-4 py-4" 
    : "max-w-3xl mx-auto px-8 py-6 sm:px-10";
  
  const questionClasses = isMobile
    ? "text-base sm:text-lg md:text-xl font-semibold mb-6 sm:mb-8 text-balance text-center px-2"
    : "text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-10 text-balance text-center";
  
  const optionSpacing = isMobile
    ? "space-y-3"
    : "space-y-4 sm:space-y-5";

  return (
    <motion.div
      key={state.currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={containerClasses}
    >
      <QuizProgressBar 
        currentQuestion={state.currentQuestion} 
        totalQuestions={questions.length}
        motivationalTexts={motivationalTexts}
      />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={questionClasses}
      >
        {currentQuestion.question}
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
    </motion.div>
  );
};
