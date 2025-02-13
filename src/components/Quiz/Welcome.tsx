
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center px-4"
    >
      <div className="mb-8">
        <span className="inline-block p-3 rounded-full bg-primary/20">
          <Leaf className="w-6 h-6 text-primary-foreground" />
        </span>
      </div>
      
      <h1 className="text-4xl font-semibold mb-4 text-balance">
        Discover Your Perfect Skincare Journey
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8 text-balance">
        Transform your skin from the inside out with our holistic approach. 
        Take this quiz to receive personalized skincare and lifestyle recommendations.
      </p>
      
      <button
        onClick={onStart}
        className="glass px-8 py-3 rounded-full text-lg font-medium 
                 text-primary-foreground card-hover"
      >
        Start Your Journey
      </button>
    </motion.div>
  );
};
