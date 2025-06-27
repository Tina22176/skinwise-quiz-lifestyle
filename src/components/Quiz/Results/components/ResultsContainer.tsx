import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ResultsContainerProps {
  containerVariants: any;
  children: ReactNode;
}

export const ResultsContainer = ({ containerVariants, children }: ResultsContainerProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/lovable-uploads/1f68abeb-6ffc-46ce-8aa4-392f60aecff3.png"
              alt="Logo Majoliepeau"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </motion.div>
          
          <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
            {/* ... reste du code ... */}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
};
