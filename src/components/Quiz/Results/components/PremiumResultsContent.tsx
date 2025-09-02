
import { motion } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { PremiumSubscriptionSection } from "./PremiumSubscriptionSection";
import { PremiumSuccessState } from "./PremiumSuccessState";
import { FloatingParticles } from "./FloatingParticles";
import { useQuiz } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails, SKIN_TYPE_TEASERS } from "../utils/SkinTypeDetails";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
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
  hormoneProfile?: HormoneProfile | null;
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
  itemVariants?: any;
}

export const PremiumResultsContent = ({
  skinType,
  skinState,
  hormoneProfile,
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
  itemVariants,
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

  // Couleurs premium adaptatives avec meilleur contraste
  const getSkinTypeColors = () => {
    const teaser = SKIN_TYPE_TEASERS[skinType] || SKIN_TYPE_TEASERS.normal;
    
    const colorSchemes = {
      blue: {
        primary: "from-blue-600 via-indigo-600 to-purple-700",
        secondary: "from-blue-500/30 via-indigo-400/30 to-purple-500/30",
        accent: "blue-600",
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.6)]"
      },
      green: {
        primary: "from-emerald-600 via-teal-600 to-cyan-700",
        secondary: "from-emerald-500/30 via-teal-400/30 to-cyan-500/30",
        accent: "emerald-600",
        glow: "shadow-[0_0_40px_rgba(16,185,129,0.6)]"
      },
      purple: {
        primary: "from-purple-600 via-violet-600 to-fuchsia-700",
        secondary: "from-purple-500/30 via-violet-400/30 to-fuchsia-500/30",
        accent: "purple-600",
        glow: "shadow-[0_0_40px_rgba(168,85,247,0.6)]"
      },
      pink: {
        primary: "from-pink-600 via-rose-600 to-red-600",
        secondary: "from-pink-500/30 via-rose-400/30 to-red-500/30",
        accent: "pink-600",
        glow: "shadow-[0_0_40px_rgba(236,72,153,0.6)]"
      }
    };
    
    return colorSchemes[teaser.colorTheme] || colorSchemes.pink;
  };

  const colors = getSkinTypeColors();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particules flottantes */}
      <FloatingParticles colors={colors} />
      
      {/* Gradient de fond premium avec meilleur contraste */}
      <div className={`fixed inset-0 bg-gradient-to-br ${colors.secondary} backdrop-blur-sm`} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
      
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
          {/* Badge premium avec meilleur contraste */}
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 rounded-full text-white font-bold text-sm mb-6 shadow-2xl border-2 border-amber-300"
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

        {/* Carte principale avec glassmorphism et meilleur contraste */}
        <motion.div 
          variants={itemVariants}
          className={`relative backdrop-blur-xl bg-white/20 rounded-3xl p-8 ${colors.glow} border-2 border-white/30 overflow-hidden shadow-2xl`}
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
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

        {/* Témoignages social proof avec texte plus lisible */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/25 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-white/30 shadow-lg">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors.primary} border-2 border-white shadow-sm`} />
              ))}
            </div>
            <div className="text-sm font-semibold text-gray-800">
              <span className="font-bold text-gray-900">+2,500</span> femmes ont déjà découvert leur routine
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
