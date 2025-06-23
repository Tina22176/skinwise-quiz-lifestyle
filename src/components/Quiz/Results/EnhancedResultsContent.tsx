
import { motion } from "framer-motion";
import { SkinTypeHeader } from "./SkinTypeHeader";
import { SkinProfileCard } from "./SkinProfileCard";
import { SkinCharacteristicsGrid } from "./SkinCharacteristicsGrid";
import { DetailedResultsChart } from "./DetailedResultsChart";
import { PersonalizedRecommendations } from "./PersonalizedRecommendations";
import { SubscriptionForm } from "./SubscriptionForm";
import { SubscribedActions } from "./SubscribedActions";
import { getSkinTypeDetails } from "./SkinTypeDetails";
import { useQuiz } from "../QuizContext";
import { Share2, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface EnhancedResultsContentProps {
  skinType: string;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onResetQuiz: () => void;
  instagramUrl: string;
}

export const EnhancedResultsContent = ({
  skinType,
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
}: EnhancedResultsContentProps) => {
  const { state } = useQuiz();
  const { toast } = useToast();
  const skinDetails = getSkinTypeDetails(skinType);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mon type de peau - Quiz Majo-Liepeau',
          text: `J'ai découvert mon type de peau : ${skinDetails.title}! 🌸`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié !",
          description: "Le lien a été copié dans ton presse-papiers",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Erreur",
        description: "Impossible de partager pour le moment",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    // Create a simple text summary
    const summary = `
Mon Type de Peau - Quiz Majo-Liepeau
=====================================

Type de peau : ${skinDetails.title}
Description : ${skinDetails.description}

Caractéristiques principales :
${skinDetails.characteristics.map(char => `• ${char}`).join('\n')}

Facteurs influents :
${skinDetails.factors.map(factor => `• ${factor}`).join('\n')}

Recommandation :
${skinDetails.routineRecommendation}

Généré le : ${new Date().toLocaleDateString('fr-FR')}
    `;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mon-type-de-peau.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement réussi !",
      description: "Tes résultats ont été sauvegardés",
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const visitInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header with enhanced styling */}
        <motion.div variants={itemVariants}>
          <SkinTypeHeader skinType={skinType} variants={itemVariants} />
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="glass hover:bg-pink-50/50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="glass hover:bg-pink-50/50"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button
            onClick={onResetQuiz}
            variant="outline"
            size="sm"
            className="glass hover:bg-pink-50/50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Refaire le quiz
          </Button>
        </motion.div>

        {/* Detailed Chart */}
        <motion.div variants={itemVariants}>
          <DetailedResultsChart skinType={skinType} answers={state.answers} />
        </motion.div>

        {/* Skin Profile */}
        <motion.div variants={itemVariants}>
          <SkinProfileCard description={skinDetails.description} variants={itemVariants} />
        </motion.div>

        {/* Characteristics Grid */}
        <motion.div variants={itemVariants}>
          <SkinCharacteristicsGrid 
            characteristics={skinDetails.characteristics}
            factors={skinDetails.factors}
            variants={itemVariants}
          />
        </motion.div>

        {/* Personalized Recommendations */}
        <motion.div variants={itemVariants}>
          <PersonalizedRecommendations skinType={skinType} answers={state.answers} />
        </motion.div>

        {/* Subscription Form */}
        <motion.div variants={itemVariants}>
          {!isSubscribed ? (
            <SubscriptionForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              isLoading={isLoading}
              gdprConsent={gdprConsent}
              setGdprConsent={setGdprConsent}
              handleSubmit={handleFormSubmit}
            />
          ) : (
            <SubscribedActions 
              handleShare={handleShare}
              visitInstagram={visitInstagram}
              onResetQuiz={onResetQuiz}
              variants={itemVariants}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
