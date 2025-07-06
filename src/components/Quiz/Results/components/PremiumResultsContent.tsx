
import { motion } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { PremiumSubscriptionSection } from "./PremiumSubscriptionSection";
import { PremiumSuccessState } from "./PremiumSuccessState";
import { FloatingParticles } from "./FloatingParticles";
import { useQuiz } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails, SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";
import { SkinTypeScore } from "../../utils/skinTypeCalculator";
import { Sparkles, Stars, Crown } from "lucide-react";

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.8
    }
  }
};

interface PremiumResultsContentProps {
  skinType: string;
  skinState?: string | null;
  skinTypeScore?: SkinTypeScore | null;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onResetQuiz: () => void;
  instagramUrl: string;
}

export const PremiumResultsContent = ({
  skinType,
  skinState,
  skinTypeScore,
  email,
  setEmail,
  firstName,
  setFirstName,
  isSubscribed,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
  onResetQuiz,
  instagramUrl,
}: PremiumResultsContentProps) => {
  const { state } = useQuiz();
  const details = getSkinTypeDetails(skinType);
  const skinTypeText = getSkinTypeText(skinType);

  const handleShare = () => {
    const shareText = `Je viens de découvrir mon type de peau avec Majoliepeau ! Mon diagnostic : Peau ${skinTypeText} ✨`;
    if (navigator.share) {
      navigator.share({
        title: 'Mon diagnostic peau personnalisé',
        text: shareText,
        url: window.location.href
      });
    } else {
      window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, "_blank");
    }
  };

  const visitInstagram = () => {
    window.open(instagramUrl, "_blank");
  };

  // Couleurs premium adaptatives
  const getSkinTypeColors = () => {
    const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
    
    const colorSchemes = {
      blue: {
        primary: "from-blue-500 via-indigo-500 to-purple-600",
        secondary: "from-blue-400/20 via-indigo-300/20 to-purple-400/20",
        accent: "blue-500",
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.5)]"
      },
      green: {
        primary: "from-emerald-500 via-teal-500 to-cyan-600",
        secondary: "from-emerald-400/20 via-teal-300/20 to-cyan-400/20",
        accent: "emerald-500",
        glow: "shadow-[0_0_40px_rgba(16,185,129,0.5)]"
      },
      purple: {
        primary: "from-purple-500 via-violet-500 to-fuchsia-600",
        secondary: "from-purple-400/20 via-violet-300/20 to-fuchsia-400/20",
        accent: "purple-500",
        glow: "shadow-[0_0_40px_rgba(168,85,247,0.5)]"
      },
      pink: {
        primary: "from-pink-500 via-rose-500 to-red-500",
        secondary: "from-pink-400/20 via-rose-300/20 to-red-400/20",
        accent: "pink-500",
        glow: "shadow-[0_0_40px_rgba(236,72,153,0.5)]"
      }
    };
    
    return colorSchemes[teaser.colorTheme] || colorSchemes.pink;
  };

  const colors = getSkinTypeColors();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particules flottantes */}
      <FloatingParticles colors={colors} />
      
      {/* Gradient de fond premium */}
      <div className={`fixed inset-0 bg-gradient-to-br ${colors.secondary} backdrop-blur-sm`} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      
      <motion.div
        key="premium-results"
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative z-10 max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col justify-center"
      >
        {/* Header avec effet premium */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          {/* Badge premium */}
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/90 to-yellow-500/90 px-6 py-3 rounded-full text-white font-semibold text-sm mb-6 shadow-xl"
            animate={{
              y: [-2, 2, -2],
              rotate: [-1, 1, -1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Crown className="w-5 h-5" />
            <span>Diagnostic Personnalisé</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>

          <SkinTypeHeader 
            skinType={skinType} 
            skinState={skinState}
            variants={itemVariants} 
          />
        </motion.div>

        {/* Carte principale avec glassmorphism */}
        <motion.div 
          variants={itemVariants}
          className={`relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 ${colors.glow} border border-white/20 overflow-hidden`}
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "300%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2
              }}
            />
          </div>
          
          {/* Barre décorative premium */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r ${colors.primary} rounded-full shadow-lg`} />
          
          <div className="relative space-y-8">
            {/* Section principale */}
            {!isSubscribed ? (
              <PremiumSubscriptionSection
                skinType={skinType}
                skinTypeText={skinTypeText}
                email={email}
                setEmail={setEmail}
                firstName={firstName}
                setFirstName={setFirstName}
                isLoading={isLoading}
                gdprConsent={gdprConsent}
                setGdprConsent={setGdprConsent}
                handleSubmit={handleSubmit}
                colors={colors}
                variants={itemVariants}
              />
            ) : (
              <PremiumSuccessState
                handleShare={handleShare}
                visitInstagram={visitInstagram}
                onResetQuiz={onResetQuiz}
                colors={colors}
                variants={itemVariants}
              />
            )}
          </div>
        </motion.div>

        {/* Témoignages social proof */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors.primary} border-2 border-white`} />
              ))}
            </div>
            <div className="text-sm text-white/90">
              <span className="font-bold">3,247</span> femmes ont déjà découvert leur routine
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
