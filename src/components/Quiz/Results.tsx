import { motion, AnimatePresence } from "framer-motion";
import { useQuiz, getSkinTypeFormatted } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Check, Loader2, Mail, Instagram, Sparkles, Wand2, RefreshCw } from "lucide-react";
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
  const details: Record<string, { characteristics: string[]; factors: string[]; description: string; skinCycling: string }> = {
    "combination": {
      description: "Ta peau présente deux comportements distincts : plus grasse sur la zone T (front, nez, menton) et normale à sèche sur les joues.",
      characteristics: [
        "Zone T grasse, joues plus sèches",
        "Pores visibles principalement sur le nez et le front",
        "Brillance modérée qui se développe en cours de journée"
      ],
      factors: [
        "Déséquilibre hormonal",
        "Utilisation de produits inadaptés",
        "Facteurs environnementaux"
      ],
      skinCycling: "Ton skin cycling devra équilibrer les différentes zones avec des actifs adaptés, en utilisant des produits plus légers sur la zone T et plus nourrissants sur les zones sèches."
    },
    "dry": {
      description: "Ta peau manque de sébum et d'hydratation. Elle peut paraître terne, tiraillée et présenter des squames.",
      characteristics: [
        "Sensation de tiraillement fréquente",
        "Teint parfois terne ou manquant d'éclat",
        "Tendance aux ridules de déshydratation"
      ],
      factors: [
        "Production insuffisante de sébum",
        "Barrière cutanée fragilisée",
        "Facteurs environnementaux (chauffage, climatisation)"
      ],
      skinCycling: "Le skin cycling devra privilégier l'hydratation profonde et limiter les actifs exfoliants trop puissants qui pourraient accentuer la sécheresse."
    },
    "oily": {
      description: "Ta peau produit un excès de sébum qui lui donne un aspect brillant. Les pores sont souvent dilatés et les imperfections fréquentes.",
      characteristics: [
        "Brillance excessive tout au long de la journée",
        "Pores dilatés visibles",
        "Tendance aux imperfections (points noirs, comédons)"
      ],
      factors: [
        "Surproduction de sébum",
        "Facteurs hormonaux",
        "Prédisposition génétique"
      ],
      skinCycling: "Ton skin cycling mettra l'accent sur la régulation du sébum tout en maintenant une bonne hydratation, car même les peaux grasses ont besoin d'être hydratées."
    },
    "sensitive": {
      description: "Ta peau réagit facilement aux stimuli externes (climat, produits, stress) par des rougeurs, irritations ou inconfort.",
      characteristics: [
        "Réactivité cutanée aux stimuli externes",
        "Rougeurs fréquentes ou permanentes",
        "Sensations d'inconfort (picotements, tiraillements)"
      ],
      factors: [
        "Barrière cutanée fragilisée",
        "Réactivité aux ingrédients cosmétiques",
        "Facteurs environnementaux et stress"
      ],
      skinCycling: "Ton skin cycling devra être particulièrement progressif avec des actifs doux et apaisants, en introduisant les actifs puissants avec précaution et en petites quantités."
    },
    "normal": {
      description: "Ta peau est équilibrée, ni trop grasse ni trop sèche. Elle présente peu d'imperfections et ne réagit pas excessivement aux facteurs externes.",
      characteristics: [
        "Teint uniforme et lumineux",
        "Texture lisse avec des pores peu visibles",
        "Bonne tolérance aux produits cosmétiques"
      ],
      factors: [
        "Équilibre naturel de la production de sébum",
        "Bonne hydratation naturelle",
        "Barrière cutanée intacte"
      ],
      skinCycling: "Ton skin cycling peut être adapté à tes objectifs spécifiques (anti-âge, éclat, etc.) tout en maintenant l'équilibre naturel de ta peau."
    }
  };

  return details[skinType] || details["normal"];
};

export const Results = ({ onResetQuiz }: { onResetQuiz: () => void }) => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const webhookUrl = "https://hooks.zapier.com/hooks/catch/14381563/2w2elvt/";
  const instagramUrl = "https://www.instagram.com/majolie_peau/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const processLifestyleFactors = (answers: Record<string, string>) => {
    const factors: string[] = [];
    return factors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Merci d'accepter les conditions d'utilisation pour recevoir ton calendrier de Skin Cycling personnalisé.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("🚀 Préparation de l'envoi de données à Zapier");

    try {
      dispatch({ type: "SET_EMAIL", payload: email });
      dispatch({ type: "SET_FIRST_NAME", payload: firstName });

      const lifestyleFactors = processLifestyleFactors(state.answers);
      const formattedSkinType = getSkinTypeFormatted(state.result);

      // Format data properly for Klaviyo
      const quizData = {
        email,
        first_name: firstName,
        skinType: formattedSkinType, // Cette propriété sera accessible via {{ skinType }} dans Klaviyo
        skin_type: formattedSkinType, // Alternative format
        property: {
          skinType: formattedSkinType // Cette propriété sera accessible via {{ property.skinType }} dans Klaviyo
        },
        quizAnswers: state.answers,
        timestamp: new Date().toISOString(),
        skinDetails: getSkinTypeDetails(state.result || "normal"),
        properties: {
          $email: email,
          $first_name: firstName,
          $consent: gdprConsent,
          quiz_completed: true,
          quiz_completion_date: new Date().toISOString(),
          skin_type: formattedSkinType,
          skinType: formattedSkinType,
          lifestyle_factors: lifestyleFactors,
          skin_characteristics: getSkinTypeDetails(state.result || "normal").characteristics,
          skin_factors: getSkinTypeDetails(state.result || "normal").factors,
        }
      };

      console.log("📤 Envoi des données au webhook Zapier:", webhookUrl);
      console.log("📦 Données envoyées:", quizData);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(quizData),
      });

      console.log("✅ Données envoyées avec succès à Zapier");
      setIsSubscribed(true);
      toast({
        title: "Merci ! 💝",
        description: "Ton calendrier de Skin Cycling personnalisé arrive dans ta boîte mail 💌",
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi des données à Zapier:", error);
      toast({
        title: "Oups !",
        description: "Une erreur est survenue lors de l'envoi de tes données. Merci de réessayer.",
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

  const handleResetQuiz = () => {
    onResetQuiz();
  };

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  const skinType = state.result || "normal";
  const details = getSkinTypeDetails(skinType);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 24
      }
    }
  };

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
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200/30 to-pink-300/30 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-20 h-20 flex items-center justify-center"
            >
              <Sparkles className="absolute w-24 h-24 text-pink-200 animate-pulse" />
              <Wand2 className="w-16 h-16 text-pink-400 z-10" />
            </motion.div>
          </div>
          
          <div className="space-y-4 text-center">
            <motion.p 
              className="text-xl font-medium text-pink-600"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨ La magie opère... ✨
            </motion.p>
            <p className="text-lg text-center text-muted-foreground max-w-md">
              Nous préparons ton diagnostic beauté personnalisé avec amour...
            </p>
          </div>
          
          <motion.div 
            className="w-64 h-2 bg-pink-100 rounded-full overflow-hidden mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-300 to-pink-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2.2,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto px-4"
        >
          <motion.div 
            className="glass rounded-3xl p-8 md:p-12 mb-8 bg-gradient-to-br from-pink-50/95 to-white/95 shadow-[0_8px_32px_rgba(255,192,203,0.2)] relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/10 to-pink-200/15 pointer-events-none" />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-10 relative"
            >
              <motion.div 
                variants={itemVariants}
                className="text-center space-y-6 relative"
              >
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
                    ✨ RÉSULTAT : DÉCOUVRE TON VÉRITABLE TYPE DE PEAU ✨
                  </h1>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400/90 via-pink-300/90 to-pink-200/90 text-transparent bg-clip-text"
                    animate={{
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    💖 Ton type de peau : {getSkinTypeText(skinType)}
                  </motion.h2>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-pink-50/90 to-white/90 p-6 rounded-xl border border-pink-100/50 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-black mb-3">Ton profil cutané :</h3>
                <p className="text-black/80 mb-4">{details.description}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  variants={itemVariants}
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
                  variants={itemVariants}
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

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-pink-100/30 to-pink-50/30 p-6 rounded-xl border border-pink-200/30 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-black mb-3">Recommandation Skin Cycling :</h3>
                <p className="text-black/80">{details.skinCycling}</p>
              </motion.div>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-8 mt-10">
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col gap-6"
                  >
                    <div className="text-center space-y-3">
                      <motion.h3 
                        className="text-2xl font-semibold text-black"
                        animate={{ 
                          scale: [1, 1.03, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🌟 PROCHAINE ÉTAPE 🌟
                      </motion.h3>
                      <p className="text-black/70">
                        Reçois ton calendrier de Skin Cycling personnalisé pour optimiser ta routine selon tes besoins spécifiques !
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
                        placeholder="Ton email pour recevoir ton calendrier personnalisé 🎀"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="premium-input text-lg py-6 bg-white border-pink-200/70 shadow-[0_2px_8px_rgba(255,192,203,0.15)] focus:border-pink-300/70 focus:ring-pink-200/50"
                      />
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(255,192,203,0.3)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="flex items-start space-x-3 bg-gradient-to-r from-pink-50/90 to-white/90 p-4 rounded-xl border border-pink-200/60 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Checkbox
                        id="gdpr"
                        checked={gdprConsent}
                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                        className="mt-1 border-pink-300 h-5 w-5 data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400 shadow-sm"
                      />
                      <label 
                        htmlFor="gdpr" 
                        className="text-sm text-black/70 cursor-pointer"
                      >
                        J'accepte de recevoir mon calendrier personnalisé et des conseils adaptés par email. 
                        Je peux me désinscrire à tout moment.
                      </label>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="group premium-button w-full text-lg py-6 relative overflow-hidden bg-gradient-to-r from-pink-300/90 to-pink-200/90 hover:from-pink-400/90 hover:to-pink-300/90 text-white border border-pink-200/50 shadow-[0_8px_24px_rgba(255,192,203,0.25)] hover:shadow-[0_12px_32px_rgba(255,192,203,0.4)] transition-all duration-300"
                        disabled={isLoading || !email || !gdprConsent}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 mr-2 animate-spin text-white" />
                        ) : (
                          <Mail className="w-5 h-5 mr-2 text-white" />
                        )}
                        RECEVOIR MON CALENDRIER PERSONNALISÉ
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              ) : (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center gap-6 mt-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600"
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                  
                  <div className="space-y-3 text-center">
                    <p className="text-lg font-medium text-black">
                      Ton calendrier de Skin Cycling est en route ! 💌
                    </p>
                    <p className="text-sm text-black/70">
                      N'oublie pas de vérifier tes spams si tu ne reçois rien d'ici quelques minutes.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleShare}
                        variant="outline"
                        className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                      >
                        <Instagram className="w-4 h-4" />
                        Partager mes résultats
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={visitInstagram}
                        variant="outline"
                        className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                      >
                        <Instagram className="w-4 h-4" />
                        Suivre Majoliepeau
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleResetQuiz}
                        variant="outline"
                        className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refaire le test
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {!isSubscribed && (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={visitInstagram}
                      variant="outline"
                      className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                    >
                      <Instagram className="w-4 h-4" />
                      Suivre Majoliepeau
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleResetQuiz}
                      variant="outline"
                      className="flex items-center gap-2 bg-white hover:bg-pink-50/50 text-black border-pink-200/50 px-6 py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refaire le test
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
