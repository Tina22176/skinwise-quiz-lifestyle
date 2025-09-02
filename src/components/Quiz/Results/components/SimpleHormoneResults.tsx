import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { HormoneIcon } from "./HormoneIcon";
import { Mail, CheckCircle, Gift } from "lucide-react";

interface SimpleHormoneResultsProps {
  hormoneProfile: HormoneProfile;
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onResetQuiz: () => void;
}

export const SimpleHormoneResults = ({
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
  onResetQuiz
}: SimpleHormoneResultsProps) => {
  const profileDetails = getHormoneProfileDetails(hormoneProfile.type);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-8"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header avec profil */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mb-6 flex justify-center">
            <HormoneIcon profile={hormoneProfile.type} size={64} className="text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {profileDetails.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {profileDetails.description}
          </p>
        </motion.div>

        {/* Ce qui va t'aider */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ce qui va t'aider :
          </h2>
          <div className="space-y-3">
            {profileDetails.skincareRecommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-pink-500 font-bold">→</span>
                <span className="text-gray-700">{recommendation}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Email subscription */}
        {!isSubscribed ? (
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <Mail className="w-6 h-6 text-pink-500" />
                Reçois ta routine détaillée par email
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Ton email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Ton prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full"
              />
              
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  required
                  className="mt-0.5"
                />
                <span className="text-gray-600">
                  J'accepte de recevoir ma routine personnalisée
                </span>
              </label>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? "Envoi..." : "Recevoir ma routine gratuite"}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="bg-green-50 rounded-xl p-6 shadow-lg text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Merci ! Ta routine arrive bientôt
            </h3>
            <p className="text-green-700">
              Vérifie tes emails pour recevoir tes recommandations complètes
            </p>
          </motion.div>
        )}

        {/* Bonus offre */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-pink-500" />
              Bonus quiz : -20% sur {profileDetails.program} jusqu'à dimanche
            </h3>
            <p className="text-gray-600 mb-4">
              {profileDetails.programDescription}
            </p>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-lg font-semibold">
              {profileDetails.cta}
            </Button>
          </div>
        </motion.div>

        {/* Refaire le quiz */}
        <motion.div variants={itemVariants} className="text-center">
          <button
            onClick={onResetQuiz}
            className="text-pink-600 hover:text-pink-800 transition-colors underline"
          >
            Refaire le quiz →
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};