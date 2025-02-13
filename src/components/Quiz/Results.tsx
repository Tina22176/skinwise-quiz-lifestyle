
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Check, Loader2, Mail, Instagram, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const getSkinTypeDetails = (skinType: string) => {
  const details: Record<string, { characteristics: string[]; factors: string[] }> = {
    "combination": {
      characteristics: [
        "Zone T grasse, joues sèches",
        "Pores visibles sur le nez",
        "Brillance modérée en cours de journée"
      ],
      factors: [
        "Stress et hormones",
        "Alimentation",
        "Routine irrégulière"
      ]
    },
    "dry": {
      characteristics: [
        "Sensation de tiraillement",
        "Teint terne",
        "Tendance aux rougeurs"
      ],
      factors: [
        "Déshydratation",
        "Environnement sec",
        "Manque de protection"
      ]
    },
    "oily": {
      characteristics: [
        "Brillance excessive",
        "Pores dilatés",
        "Tendance acnéique"
      ],
      factors: [
        "Production de sébum élevée",
        "Hormones",
        "Produits inadaptés"
      ]
    },
    "sensitive": {
      characteristics: [
        "Réactivité cutanée",
        "Rougeurs fréquentes",
        "Inconfort régulier"
      ],
      factors: [
        "Stress",
        "Allergènes",
        "Produits agressifs"
      ]
    },
    "normal": {
      characteristics: [
        "Teint équilibré",
        "Peu d'imperfections",
        "Texture uniforme"
      ],
      factors: [
        "Maintien de l'hydratation",
        "Protection solaire",
        "Routine régulière"
      ]
    }
  };

  return details[skinType] || details["normal"];
};

export const Results = () => {
  const { state } = useQuiz();
  const [email, setEmail] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Simuler le temps d'analyse
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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

    if (!webhookUrl) {
      toast({
        title: "Configuration requise",
        description: "Veuillez configurer l'URL du webhook Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Pour gérer les problèmes CORS avec Zapier
        body: JSON.stringify({
          email,
          quizAnswers: state.answers,
          timestamp: new Date().toISOString(),
        }),
      });

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

  const handleShare = () => {
    const shareText = "Je viens de découvrir mon type de peau avec Majoliepeau ! 💖";
    window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const skinType = state.result || "normal";
  const details = getSkinTypeDetails(skinType);

  return (
    <AnimatePresence mode="wait">
      {!showResults ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="relative w-16 h-16"
          >
            <Sparkles className="w-16 h-16 text-pink-400 animate-pulse" />
          </motion.div>
          <p className="text-lg text-center text-muted-foreground">
            Nous analysons tes réponses pour trouver ta routine parfaite... ✨
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto px-4"
        >
          <div className="glass rounded-2xl p-8 md:p-10 mb-8 bg-gradient-to-br from-pink-50/90 to-white/90">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center bg-gradient-to-r from-pink-600 to-amber-500 text-transparent bg-clip-text">
                Ton Type de Peau : {skinType.charAt(0).toUpperCase() + skinType.slice(1)}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-medium text-pink-700">Caractéristiques Principales</h3>
                  <ul className="space-y-2">
                    {details.characteristics.map((char, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="mr-2">•</span> {char}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-medium text-pink-700">Facteurs Influents</h3>
                  <ul className="space-y-2">
                    {details.factors.map((factor, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="mr-2">•</span> {factor}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleEmailSubmit} className="space-y-6 mt-8">
                  <motion.div 
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-xl font-medium text-center text-pink-700">
                      Reçois ta routine personnalisée 💝
                    </h3>
                    
                    <Input
                      type="url"
                      placeholder="URL du webhook Zapier"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      required
                      className="premium-input"
                    />
                    
                    <Input
                      type="email"
                      placeholder="Entre ton email pour recevoir ta routine complète"
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
                      className="premium-button w-full transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-400 hover:to-amber-300 active:scale-95"
                      disabled={isLoading || !email || !gdprConsent || !webhookUrl}
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
                  className="flex flex-col items-center gap-6 mt-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Ta routine personnalisée est en route ! 💌</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    N'oublie pas de vérifier tes spams si tu ne reçois rien d'ici quelques minutes.
                  </p>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-pink-50"
                  >
                    <Instagram className="w-4 h-4" />
                    Partager mes résultats
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
