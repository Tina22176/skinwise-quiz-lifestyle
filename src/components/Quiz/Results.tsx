import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Check, Loader2, Mail, Instagram, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const getSkinTypeText = (skinType: string) => {
  const texts: Record<string, string> = {
    "combination": "Mixte",
    "dry": "Sèche",
    "oily": "Grasse",
    "sensitive": "Sensible",
    "normal": "Normale"
  };
  return texts[skinType] || texts["normal"];
};

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
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const webhookUrl = "https://hooks.zapier.com/hooks/catch/14381563/2w2elvt/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      const quizData = {
        email,
        firstName,
        skinType: state.result,
        quizAnswers: state.answers,
        timestamp: new Date().toISOString(),
        skinDetails: getSkinTypeDetails(state.result || "normal"),
        properties: {
          $consent: gdprConsent,
          quiz_completed: true,
          quiz_completion_date: new Date().toISOString(),
          recommended_routine: state.result,
          skin_characteristics: getSkinTypeDetails(state.result || "normal").characteristics,
          skin_factors: getSkinTypeDetails(state.result || "normal").factors,
        }
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(quizData),
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
    const shareText = `Je viens de découvrir mon type de peau avec Majoliepeau ! 💖 Mon diagnostic : Peau ${getSkinTypeText(state.result || "normal")}`;
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
            <Wand2 className="w-16 h-16 text-pink-400 animate-pulse" />
          </motion.div>
          <p className="text-lg text-center text-muted-foreground">
            ✨ La magie opère... nous préparons ton diagnostic beauté personnalisé ✨
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto px-4"
        >
          <div className="glass rounded-3xl p-8 md:p-12 mb-8 bg-gradient-to-br from-pink-50/95 to-white/95 shadow-[0_8px_32px_rgba(255,192,203,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/10 to-pink-200/15 pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-10 relative"
            >
              <div className="text-center space-y-6 relative">
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [0.98, 1, 0.98],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-100/40 via-pink-200/40 to-pink-100/40 blur-xl"
                />
                <motion.div className="relative">
                  <h1 className="text-2xl md:text-3xl font-medium text-black mb-4">
                    ✨ Résultat : Voici ton diagnostic beauté personnalisé ✨
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400/90 via-pink-300/90 to-pink-200/90 text-transparent bg-clip-text">
                    💖 Ton type de peau : {getSkinTypeText(skinType)}
                  </h2>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 bg-gradient-to-br from-white/80 to-pink-50/80 p-8 rounded-2xl shadow-[0_4px_20px_rgba(255,192,203,0.15)] border border-pink-100/50"
                >
                  <h3 className="text-xl font-semibold text-black flex items-center gap-2">
                    <span className="h-8 w-1 bg-gradient-to-b from-pink-400 to-pink-200 rounded-full"/>
                    Caractéristiques Principales
                  </h3>
                  <ul className="space-y-3">
                    {details.characteristics.map((char, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center text-black/70"
                      >
                        <span className="mr-2 text-pink-400">•</span> {char}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4 bg-gradient-to-br from-white/80 to-pink-50/80 p-8 rounded-2xl shadow-[0_4px_20px_rgba(255,192,203,0.15)] border border-pink-100/50"
                >
                  <h3 className="text-xl font-semibold text-black flex items-center gap-2">
                    <span className="h-8 w-1 bg-gradient-to-b from-pink-400 to-pink-200 rounded-full"/>
                    Facteurs Influents
                  </h3>
                  <ul className="space-y-3">
                    {details.factors.map((factor, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center text-black/70"
                      >
                        <span className="mr-2 text-pink-400">•</span> {factor}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-8 mt-10">
                  <motion.div 
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-semibold text-black">
                        🌟 Reçois ton plan skincare exclusif directement par email ! 🌟
                      </h3>
                      <p className="text-black/70">
                        Accède à des conseils inédits et des astuces que tu ne trouveras nulle part ailleurs.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Ton prénom 💝"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="premium-input text-lg py-6 bg-white border-pink-200/70 shadow-[0_2px_8px_rgba(255,192,203,0.15)] focus:border-pink-300/70 focus:ring-pink-200/50"
                      />
                      
                      <Input
                        type="email"
                        placeholder="Ton email pour recevoir ta routine sur-mesure 🎀"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="premium-input text-lg py-6 bg-white border-pink-200/70 shadow-[0_2px_8px_rgba(255,192,203,0.15)] focus:border-pink-300/70 focus:ring-pink-200/50"
                      />
                    </div>

                    <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-pink-100/50 shadow-sm">
                      <Checkbox
                        id="gdpr"
                        checked={gdprConsent}
                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                        className="mt-1 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <label 
                        htmlFor="gdpr" 
                        className="text-sm text-black/70"
                      >
                        J'accepte de recevoir ma routine personnalisée et des conseils adaptés par email. 
                        Je peux me désinscrire à tout moment.
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="group premium-button w-full text-lg py-6 relative overflow-hidden bg-white hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-pink-50/50 text-black border border-pink-200/50 shadow-[0_4px_16px_rgba(255,192,203,0.15)] hover:shadow-[0_4px_20px_rgba(255,192,203,0.3)] transition-all duration-300"
                      disabled={isLoading || !email || !gdprConsent}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-transparent"
                        animate={{
                          x: ["0%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin text-black" />
                      ) : (
                        <Mail className="w-5 h-5 mr-2 text-black" />
                      )}
                      Je veux ma routine personnalisée ! 💖
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div 
                  className="flex flex-col items-center gap-6 mt-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center gap-2 text-black font-medium">
                    <Check className="w-5 h-5" />
                    <span>Ta routine personnalisée est en route ! 💌</span>
                  </div>
                  <p className="text-sm text-black/70 text-center">
                    N'oublie pas de vérifier tes spams si tu ne reçois rien d'ici quelques minutes.
                  </p>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50"
                  >
                    <Instagram className="w-4 h-4" />
                    Partager mes résultats sur Instagram
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
