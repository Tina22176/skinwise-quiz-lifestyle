import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { HormoneIcon } from "./HormoneIcon";
import { ArrowRight } from "lucide-react";

interface SimpleHormoneResultsProps {
  hormoneProfile: HormoneProfile;
  onResetQuiz: () => void;
}

export const SimpleHormoneResults = ({
  hormoneProfile,
  onResetQuiz
}: SimpleHormoneResultsProps) => {
  const profile = getHormoneProfileDetails(hormoneProfile.type);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-8"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header profil */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
              <HormoneIcon profile={hormoneProfile.type} size={32} className="text-pink-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
            Ton profil : {profile.title} {profile.emoji}
          </h1>
        </motion.div>

        {/* Tu es */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/50">
          <p className="text-gray-700 leading-relaxed text-lg">
            {profile.tuEs}
          </p>
        </motion.div>

        {/* Ce que ta peau a besoin */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/50">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Ce que ta peau a besoin :
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {profile.besoin}
          </p>
        </motion.div>

        {/* 3 premiers gestes */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/50">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Tes 3 premiers gestes :
          </h2>
          <div className="space-y-4">
            {profile.gestes.map((geste, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed pt-0.5">{geste}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="border-t border-pink-100 my-2" />

        {/* Programme recommandé */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-pink-200/50">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Pour aller plus loin :
          </h2>
          <p className="text-gray-800 font-medium mb-1">
            {profile.program} — {profile.programPrice}
          </p>
          <p className="text-gray-600 mb-4">
            {profile.programReason}
          </p>
          <motion.button
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3.5 rounded-full font-semibold shadow-md flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir le programme
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Ce que tu recevras par email */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100/50">
          <p className="text-gray-700 font-medium mb-3">Tu recevras aussi par email :</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><span>•</span> Ton profil complet en PDF</li>
            <li className="flex items-center gap-2"><span>•</span> 3 conseils adaptés à ta peau</li>
            <li className="flex items-center gap-2"><span>•</span> Des ressources gratuites</li>
          </ul>
          <p className="text-gray-500 text-sm mt-4 italic">
            Pas prête ? Pas de souci. Le guide arrive dans ta boîte. 💌
          </p>
        </motion.div>

        {/* Refaire le quiz */}
        <motion.div variants={itemVariants} className="text-center pb-8">
          <button
            onClick={onResetQuiz}
            className="text-pink-600 hover:text-pink-800 transition-colors underline text-sm"
          >
            Refaire le quiz →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
