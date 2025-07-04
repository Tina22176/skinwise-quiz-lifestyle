import { motion, AnimatePresence } from "framer-motion";
import { SkinTypeHeader } from "../SkinTypeHeader";
import { OptimizedSubscriptionSection } from "./OptimizedSubscriptionSection";
import { TeaserSection } from "./TeaserSection";
import { useQuiz } from "../../QuizContext";
import { getSkinTypeText, getSkinTypeDetails } from "../SkinTypeDetails";
import { Sparkles, Heart, Star, Zap, Gift, ArrowRight, RefreshCw, CheckCircle, Share2, Instagram } from "lucide-react";

// Animations optimisées par device
const getDeviceAnimations = () => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const isDesktop = window.innerWidth >= 1024;
  
  return {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.06 : isTablet ? 0.08 : 0.1,
          delayChildren: isMobile ? 0.1 : isTablet ? 0.15 : 0.2,
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: isMobile ? 8 : isTablet ? 12 : 15 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring", 
          stiffness: isMobile ? 350 : isTablet ? 320 : 300,
          damping: isMobile ? 35 : isTablet ? 30 : 25
        }
      }
    }
  };
};

interface MobileOptimizedResultsProps {
  skinType: string;
  skinState?: string | null;
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

export const MobileOptimizedResults = ({
  skinType,
  skinState,
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
  instagramUrl
}: MobileOptimizedResultsProps) => {
  const { state } = useQuiz();
  const details = getSkinTypeDetails(skinType);
  const skinTypeText = getSkinTypeText(skinType);
  const animations = getDeviceAnimations();

  const handleShare = () => {
    const shareText = `✨ J'ai découvert mon type de peau avec Majoliepeau ! Mon diagnostic : Peau ${skinTypeText} 💖`;
    if (navigator.share) {
      navigator.share({
        title: "Mon diagnostic peau",
        text: shareText,
        url: window.location.href
      });
    } else {
      window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background décoratif moderne - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-pink-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] bg-gradient-to-r from-pink-100/10 to-purple-100/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Container responsive optimisé */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 xl:py-16">
          <motion.div
            variants={animations.container}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12"
          >
            {/* Header moderne avec type de peau - Responsive */}
            <motion.div variants={animations.item} className="text-center">
              {/* Badge de diagnostic - Responsive */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base text-pink-700 font-medium mb-3 sm:mb-4 lg:mb-6 shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 animate-pulse" />
                Diagnostic personnalisé
              </div>
              
              <SkinTypeHeader 
                skinType={skinType} 
                skinState={skinState}
                variants={animations.item} 
              />
            </motion.div>

            {/* Section principale - Formulaire ou Succès - Layout responsive */}
            <motion.div 
              variants={animations.item}
              className="relative"
            >
              {/* Largeur responsive : mobile centré, tablette/desktop plus large */}
              <div className="max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-2xl border border-white/50 relative overflow-hidden">
                  {/* Effet de brillance moderne */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />
                  
                  {/* Barre de progression décorative */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400" />
                  
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {!isSubscribed ? (
                        <div key="subscription-form">
                          {/* Preuve sociale moderne - Responsive */}
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-4 sm:mb-6 lg:mb-8"
                          >
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base text-green-700 font-medium">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-500" />
                              <span className="font-semibold text-green-600">2,847</span> femmes ont déjà transformé leur peau
                            </div>
                          </motion.div>

                          <OptimizedSubscriptionSection
                            skinType={skinType}
                            skinTypeText={skinTypeText}
                            email={email}
                            setEmail={setEmail}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            isSubscribed={isSubscribed}
                            isLoading={isLoading}
                            gdprConsent={gdprConsent}
                            setGdprConsent={setGdprConsent}
                            handleSubmit={handleSubmit}
                            handleShare={handleShare}
                            visitInstagram={visitInstagram}
                            onResetQuiz={onResetQuiz}
                            variants={animations.item}
                          />
                        </div>
                      ) : (
                        <div key="success-state" className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
                          {/* Animation de succès - Responsive */}
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                          </motion.div>

                          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">
                              Merci ! 💝
                            </h3>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                              Ta routine personnalisée arrive dans ta boîte mail 💌
                            </p>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                              Vérifie tes spams si tu ne la vois pas dans 5 minutes
                            </p>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section teaser - Récompense après inscription - Responsive */}
            <AnimatePresence>
              {isSubscribed && (
                <motion.div
                  key="teaser-section"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                    delay: 0.3 
                  }}
                  className="mt-4 sm:mt-6 lg:mt-8 xl:mt-10"
                >
                  <TeaserSection
                    skinType={skinType}
                    skinTypeText={skinTypeText}
                    details={details}
                    visitInstagram={visitInstagram}
                    onResetQuiz={onResetQuiz}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Animation CSS pour l'effet shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}; 