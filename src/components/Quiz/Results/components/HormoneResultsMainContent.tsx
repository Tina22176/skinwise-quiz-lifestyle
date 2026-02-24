import { motion } from "framer-motion";
import { HormoneProfile } from "../../utils/hormoneProfileCalculator";
import { getHormoneProfileDetails } from "../utils/HormoneProfileDetails";
import { HormoneIcon } from "./HormoneIcon";

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
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <HormoneIcon profile={hormoneProfile.type} size={32} className="text-pink-500" />
          {profileDetails.title}
        </h2>
        <p className="text-gray-600 mb-6">{profileDetails.tuEs}</p>
        
        <div className="bg-pink-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-pink-700 mb-3">Ce que ta peau a besoin :</h3>
          <p className="text-pink-600">{profileDetails.besoin}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Tes 3 premiers gestes :</h3>
          <ul className="space-y-2 text-left">
            {profileDetails.gestes.map((geste, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">{index + 1}.</span>
                <span className="text-gray-700">{geste}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
