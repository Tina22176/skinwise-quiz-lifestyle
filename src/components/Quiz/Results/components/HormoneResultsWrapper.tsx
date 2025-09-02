import { motion } from "framer-motion";
import { useQuiz } from "../../QuizContext";
import { getHormoneProfileText, getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { HormoneResultsMainContent } from "./HormoneResultsMainContent";

export const HormoneResultsWrapper = ({
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
}: any) => {
  const { state } = useQuiz();
  const hormoneProfile = state.hormoneProfile;
  const skinType = state.result || hormoneProfile?.type || "normal";

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (!hormoneProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement de votre profil hormonal...</p>
      </div>
    );
  }

  const profileDetails = getHormoneProfileDetails(skinType);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-5xl">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {profileDetails.emoji} {profileDetails.title}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {profileDetails.description}
          </p>
        </motion.div>

        <HormoneResultsMainContent
          hormoneProfile={hormoneProfile}
          answers={state.answers}
          itemVariants={itemVariants}
        />

        {/* Simple email subscription section */}
        {!isSubscribed ? (
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-6 shadow-lg mt-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              📧 Reçois ta routine complète par email
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Ton email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Ton prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  required
                />
                <span className="text-sm">J'accepte de recevoir ma routine personnalisée</span>
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                {isLoading ? "Envoi..." : "Recevoir ma routine 💌"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="text-center bg-green-50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              ✅ Merci ! Ta routine arrive bientôt
            </h3>
            <p className="text-green-700">
              Vérifie tes emails pour recevoir tes recommandations complètes
            </p>
          </motion.div>
        )}

        <motion.div 
          variants={itemVariants}
          className="text-center mt-8"
        >
          <button
            onClick={onResetQuiz}
            className="text-pink-600 hover:text-pink-800 transition-colors"
          >
            Refaire le quiz →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};