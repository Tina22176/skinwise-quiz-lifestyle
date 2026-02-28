import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { questions } from "./questions/index";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EnhancedProgressBar } from "./EnhancedProgressBar";
import { EnhancedAnswerOption } from "./EnhancedAnswerOption";
import { calculateHormoneProfile } from "./utils/hormoneProfileCalculator";
import { DynamicQuestionEngine } from "./utils/dynamicQuestionEngine";
import { DynamicQuestionDisplay } from "./components/DynamicQuestionDisplay";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const EnhancedQuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const isMobile = useIsMobile();

  const [dynamicList, setDynamicList] = useState<any[]>([]);

  useEffect(() => {
    const engine = new DynamicQuestionEngine(questions, state.answers);
    const generated = engine.generateQuestions();
    setDynamicList(generated);
  }, [state.answers]);

  const currentQuestion = dynamicList[state.currentQuestion] || questions[state.currentQuestion];

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
    }, 800);
  };

  useEffect(() => {
    if (showNextQuestion) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setSelectedAnswer(null);
        setShowNextQuestion(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [showNextQuestion, dispatch]);

  if (state.currentQuestion >= dynamicList.length) {
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
      {/* No card container — content directly on bg per mockup */}
      {state.currentQuestion > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            dispatch({ type: "PREV_QUESTION" });
            setSelectedAnswer(null);
            setShowNextQuestion(false);
          }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 font-body"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </motion.button>
      )}

      <EnhancedProgressBar 
        currentQuestion={state.currentQuestion} 
        totalQuestions={dynamicList.length}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center mb-6"
      >
        {/* Display text = petit texte emotionnel (DM Sans, italic, rose) */}
        {currentQuestion.display && (
          <p className="text-[15px] italic font-body mb-2 text-primary">
            {currentQuestion.display}
          </p>
        )}
        {/* Titre principal (Cormorant, bold) */}
        <h2 className="font-heading text-[22px] lg:text-[26px] font-bold text-foreground">
          {currentQuestion.question}
        </h2>
      </motion.div>

      <DynamicQuestionDisplay
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={handleAnswer}
      />

      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6 flex justify-center"
        >
          <div className="flex items-center gap-2 text-primary font-medium font-body">
            <span>Parfait ! Prochaine question</span>
            <ArrowRight className="h-4 w-4 animate-bounce" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};