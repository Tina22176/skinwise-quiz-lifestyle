
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export const Results = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Merci d'accepter les conditions d'utilisation pour recevoir ta routine personnalisée.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Remplacer cette URL par ton webhook Zapier pour Klaviyo
      const response = await fetch("VOTRE_URL_WEBHOOK_ZAPIER", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          quizAnswers: state.answers,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setIsSubscribed(true);
      toast({
        title: "Merci ! 💝",
        description: "Ta routine personnalisée est en route vers ta boîte mail 💌",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Oups !",
        description: "Une erreur est survenue. Merci de réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            Ta Routine Personnalisée
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground text-center">
              Selon tes réponses, nous avons créé un programme de soin et de style de vie
              unique, rien que pour toi.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <motion.div 
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    type="email"
                    placeholder="Entre ton email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="premium-input"
                  />
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="gdpr"
                      checked={gdprConsent}
                      onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                      className="mt-1"
                    />
                    <label 
                      htmlFor="gdpr" 
                      className="text-sm text-muted-foreground"
                    >
                      J'accepte de recevoir ma routine personnalisée et des conseils adaptés par email. 
                      Je peux me désinscrire à tout moment. 
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="premium-button w-full transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-400 hover:to-amber-300"
                    disabled={isLoading || !email || !gdprConsent}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    Recevoir Ma Routine Personnalisée
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div 
                className="flex flex-col items-center gap-4 text-green-600"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Ta routine personnalisée est en route ! 💌</span>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  N'oublie pas de vérifier tes spams si tu ne reçois rien d'ici quelques minutes.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
