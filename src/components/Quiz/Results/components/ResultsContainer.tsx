
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
        {children}
      </div>
    </motion.div>
  );
};
