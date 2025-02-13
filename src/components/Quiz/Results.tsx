
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, Mail, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Results = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    toast({
      title: "Succès !",
      description: "Votre routine personnalisée a été envoyée à votre email.",
      duration: 5000,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Mes Résultats Skincare",
        text: "Je viens de découvrir ma routine de soin parfaite ! Faites le quiz pour trouver la vôtre :",
        url: window.location.href,
      });
    } catch (err) {
      toast({
        title: "Partage non supporté",
        description: "Votre navigateur ne supporte pas le partage direct.",
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass rounded-2xl p-8 md:p-10 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
            Vos Résultats Personnalisés
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground text-center">
              Selon vos réponses, nous avons créé un programme de soin et de style de vie
              personnalisé rien que pour vous.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <motion.div 
                  className="flex flex-col md:flex-row gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="premium-input flex-1"
                  />
                  <Button type="submit" className="premium-button whitespace-nowrap">
                    <Mail className="w-4 h-4 mr-2" />
                    Recevoir mes résultats
                  </Button>
                </motion.div>
                <p className="text-sm text-muted-foreground text-center">
                  En soumettant, vous acceptez de recevoir des conseils de soin et des mises à jour.
                  Vous pouvez vous désabonner à tout moment.
                </p>
              </form>
            ) : (
              <motion.div 
                className="flex items-center justify-center gap-2 text-green-600"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Check className="w-5 h-5" />
                <span>Vérifiez votre boîte mail pour votre routine personnalisée !</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full glass card-hover"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Partager Mes Résultats
        </Button>
      </motion.div>
    </motion.div>
  );
};
