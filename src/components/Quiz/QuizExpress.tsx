
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";

const expressQuestions = [
  {
    id: "skin_feel_today",
    question: "Comment sens-tu ta peau aujourd'hui ?",
    options: [
      { text: "Parfaite ✨", value: "normal" },
      { text: "Un peu sèche 💧", value: "dry" },
      { text: "Brillante sur le nez 🌟", value: "combination" },
      { text: "Grasse partout 💫", value: "oily" },
      { text: "Irritée/sensible 🌸", value: "sensitive" }
    ]
  },
  {
    id: "skin_concerns_today",
    question: "Ton plus gros souci peau en ce moment ?",
    options: [
      { text: "Aucun, tout va bien ! 😊", value: "normal" },
      { text: "Tiraillements 😣", value: "dry" },
      { text: "Zone T brillante 😅", value: "combination" },
      { text: "Boutons/imperfections 😤", value: "oily" },
      { text: "Rougeurs/réactions 😰", value: "sensitive" }
    ]
  }
];

interface QuizExpressProps {
  onComplete: (result: string) => void;
  onClose: () => void;
}

export const QuizExpress = ({ onComplete, onClose }: QuizExpressProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [expressQuestions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);

    if (currentQuestion < expressQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcul simple du résultat
      const results = Object.values(newAnswers);
      const mostCommon = results.reduce((a, b, i, arr) =>
        arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
      );
      onComplete(mostCommon);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-pink-500" />
            Quiz Express (2 min)
          </CardTitle>
          <p className="text-sm text-gray-600">
            Suivi rapide de ton type de peau
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1}/2</span>
              <span>{Math.round(((currentQuestion + 1) / 2) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4 text-center">
            {expressQuestions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {expressQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 hover:bg-pink-50"
                onClick={() => handleAnswer(option.value)}
              >
                {option.text}
              </Button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = "/"}>
              Quiz complet
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
