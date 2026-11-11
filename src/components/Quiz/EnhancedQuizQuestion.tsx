import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { questions } from "./questions/index";
import { useEffect, useState } from "react";
import { QuizProgressBar } from "./QuizProgressBar";
import { calculateHormoneProfile } from "./utils/hormoneProfileCalculator";
import { DynamicQuestionDisplay } from "./components/DynamicQuestionDisplay";
import { motivationalTexts } from "./constants/quizTexts";
import { ArrowLeft } from "lucide-react";

export const EnhancedQuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);

  const currentQuestion = questions[state.currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      dispatch({
        type: "SET_ANSWER",
        questionId: currentQuestion.id,
        answer: answer,
      });

      const updatedAnswers = { ...state.answers, [currentQuestion.id]: answer };
      const hormoneProfile = calculateHormoneProfile(updatedAnswers);
      dispatch({ type: "SET_HORMONE_PROFILE", payload: hormoneProfile });
      
      setShowNextQuestion(true);
    }, 250);
  };

  useEffect(() => {
    if (showNextQuestion) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setSelectedAnswer(null);
        setShowNextQuestion(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [showNextQuestion, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [state.currentQuestion]);

  if (state.currentQuestion >= questions.length) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      key={state.currentQuestion}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto px-6 py-6 sm:py-8"
    >
      <QuizProgressBar 
        currentQuestion={state.currentQuestion} 
        totalQuestions={questions.length}
        motivationalTexts={motivationalTexts}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-8"
      >
        {/* Display text = petit texte emotionnel (DM Sans, italic, rose) */}
        {currentQuestion.display && (
          <p className="font-heading italic text-[17px] mb-3 text-primary">
            {currentQuestion.display}
          </p>
        )}
        {/* Titre principal (Cormorant, bold) */}
        <h2 className="font-heading text-[2rem] lg:text-[2.5rem] leading-[1.05] font-semibold text-foreground">
          {currentQuestion.question}
        </h2>
      </motion.div>

      <DynamicQuestionDisplay
        question={currentQuestion}
        selectedAnswer={selectedAnswer ?? (state.answers[currentQuestion.id] as string | undefined) ?? null}
        onSelect={handleAnswer}
      />

      <div className="flex justify-between items-center mt-8 min-h-[28px]">
        {state.currentQuestion > 0 ? (
          <button
            onClick={() => {
              dispatch({ type: "PREV_QUESTION" });
              setSelectedAnswer(null);
              setShowNextQuestion(false);
            }}
            className="inline-flex items-center gap-2 font-body text-[13px] font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-primary hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Question précédente
          </button>
        ) : <span />}
      </div>


    </motion.div>
  );
};
