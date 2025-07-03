
import { motion } from “framer-motion”;
import { SkinTypeHeader } from “../SkinTypeHeader”;
import { OptimizedSubscriptionSection } from “./OptimizedSubscriptionSection”;
import { TeaserSection } from “./TeaserSection”;
import { SocialProofBanner } from “./SocialProofBanner”;
import { UrgencyBadge } from “./UrgencyBadge”;
import { useQuiz } from “../../QuizContext”;
import { getSkinTypeText, getSkinTypeDetails } from “../SkinTypeDetails”;

// Animation variants optimisées pour mobile
const containerVariants = {
hidden: { opacity: 0 },
show: {
opacity: 1,
transition: {
staggerChildren: 0.08, // Plus rapide pour mobile
delayChildren: 0.1,
}
}
};

const itemVariants = {
hidden: { opacity: 0, y: 10 }, // Mouvement réduit
show: {
opacity: 1,
y: 0,
transition: {
type: “spring”,
stiffness: 300,
damping: 30
}
}
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

const handleShare = () => {
const shareText = `Je viens de découvrir mon type de peau avec Majoliepeau ! Mon diagnostic : Peau ${skinTypeText}`;
window.open(`https://www.instagram.com/create/story?text=${encodeURIComponent(shareText)}`, ‘_blank’);
};

const visitInstagram = () => {
window.open(instagramUrl, ‘_blank’);
};

return (
<motion.div
key=“mobile-optimized-results”
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
className=“max-w-md mx-auto px-3 sm:max-w-2xl sm:px-4” // Optimisé mobile
>
{/* Urgence compacte intégrée */}
<motion.div
className=“text-center mb-3 sm:mb-4”
initial={{ opacity: 0, scale: 0.98 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.4, delay: 0.1 }}
>
{/* Urgence en bandeau discret */}
<div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full text-xs text-orange-600 font-medium mb-2">
<div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
Diagnostic gratuit - Plus que 24h
</div>

    <SkinTypeHeader 
      skinType={skinType} 
      skinState={skinState}
      variants={itemVariants} 
    />
  </motion.div>

  {/* Conteneur principal optimisé */}
  <motion.div 
    className="relative"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    {/* Preuve sociale compacte */}
    <motion.div 
      variants={itemVariants}
      className="text-center mb-3 sm:mb-4"
    >
      <p className="text-xs text-gray-600 bg-gray-50 px-4 py-2 rounded-full inline-block">
        <span className="font-medium text-pink-600">2,847</span> femmes ont déjà reçu leur routine
      </p>
    </motion.div>

    {/* Contenu principal avec padding réduit */}
    <motion.div 
      variants={itemVariants}
      className="bg-gradient-to-br from-pink-50/95 to-white/95 rounded-2xl p-4 sm:p-6 shadow-lg border border-pink-200/30 relative overflow-hidden"
    >
      {/* Barre décorative */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full" />
      
      <div className="relative space-y-3 sm:space-y-4"> {/* Espacement réduit */}
        {/* Section principale de conversion */}
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
          variants={itemVariants}
        />
      </div>
    </motion.div>
  </motion.div>

  {/* TeaserSection - LOGIQUE CORRECTE : Disparaît après inscription */}
  {!isSubscribed && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-4 sm:mt-6" // Espacement réduit
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
</motion.div>

);
};
