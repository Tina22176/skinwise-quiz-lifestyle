import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";

interface HormoneResultsMainContentProps {
  hormoneProfile: HormoneProfile;
  answers: any;
  itemVariants: any;
}

export const HormoneResultsMainContent = ({
  hormoneProfile,
  answers,
  itemVariants
}: HormoneResultsMainContentProps) => {
  const profileDetails = getHormoneProfileDetails(hormoneProfile.type);

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {profileDetails.emoji} {profileDetails.title}
        </h2>
        <p className="text-gray-600 mb-6">{profileDetails.description}</p>
        
        <div className="bg-pink-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-pink-700 mb-3">Ton déséquilibre hormonal :</h3>
          <p className="text-pink-600">{profileDetails.hormonalExplanation}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Ta routine personnalisée :</h3>
          <ul className="space-y-2 text-left">
            {profileDetails.skincareRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-green-50 rounded-xl p-4 mt-4">
            <h4 className="font-semibold text-green-700 mb-2">Bonus Lifestyle :</h4>
            <p className="text-green-600">{profileDetails.lifestyleBonus}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};