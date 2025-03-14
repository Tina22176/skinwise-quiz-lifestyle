
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { questions } from "./questions";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);

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

  // Fonction pour déterminer le type de peau basée sur les réponses
  const calculateSkinType = (answers: Record<string, string>) => {
    let points = {
      seche: 0,
      mixte: 0,
      grasse: 0,
      sensible: 0,
    };

    // Compter les points pour chaque type de peau
    Object.values(answers).forEach(answer => {
      if (answer === "seche") points.seche += 1;
      if (answer === "mixte") points.mixte += 1;
      if (answer === "grasse") points.grasse += 1;
      if (answer === "sensible") points.sensible += 1;
    });

    // Déterminer le type de peau dominant
    const maxPoints = Math.max(points.seche, points.mixte, points.grasse, points.sensible);
    
    // Vérification des types combinés
    const skinTypes = [];
    
    if (points.seche === maxPoints) skinTypes.push("dry");
    if (points.mixte === maxPoints) skinTypes.push("combination");
    if (points.grasse === maxPoints) skinTypes.push("oily");
    if (points.sensible === maxPoints) skinTypes.push("sensitive");
    
    // Retourner le premier type dominant, ou "normal" s'il y a une égalité
    return skinTypes[0] || "normal";
  };

  // Si nous n'avons plus de questions, ne rien afficher
  if (state.currentQuestion >= questions.length) {
    return null;
  }

  const currentQuestion = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  const motivationalTexts = [
    "Prends soin de toi...",
    "Ta peau mérite le meilleur...",
    "En route vers une peau rayonnante...",
    "Découvrons ensemble ta routine idéale..."
  ];

  return (
    <motion.div
      key={state.currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="mb-10">
        <div className="h-2.5 w-full bg-pink-100/50 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-300 to-pink-400 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              transition: { 
                duration: 0.7, 
                ease: "easeOut"
              }
            }}
          >
            <motion.div 
              className="absolute top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent to-white/30"
              animate={{ 
                opacity: [0, 1, 0],
                x: ['-100%', '100%']
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "linear",
                delay: 0.2
              }}
            />
          </motion.div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-muted-foreground">
            Question {state.currentQuestion + 1} sur {questions.length}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm italic text-pink-400/80"
          >
            {motivationalTexts[state.currentQuestion % motivationalTexts.length]}
          </motion.p>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-semibold mb-8 text-balance text-center"
      >
        {currentQuestion.question}
      </motion.h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option.value;
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className={`w-full text-left justify-start p-6 h-auto glass card-hover overflow-hidden relative ${
                  isSelected ? 'border-pink-400/70 bg-pink-50/50 shadow-lg' : ''
                }`}
                onClick={() => !selectedAnswer && handleAnswer(option.value)}
                disabled={selectedAnswer !== null}
              >
                {isSelected && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="flex items-start gap-3 w-full">
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <CheckCircle className="h-5 w-5 text-pink-500" />
                    </motion.div>
                  )}
                  <div className={isSelected ? "flex-1" : "w-full"}>
                    <p className={`font-medium mb-2 ${isSelected ? 'text-pink-600' : ''}`}>
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
