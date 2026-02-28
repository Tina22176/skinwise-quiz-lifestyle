import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnhancedResultCardProps {
  children: ReactNode;
  accentColor?: string;
  variants?: any;
  className?: string;
  glowOnHover?: boolean;
}

export const EnhancedResultCard = ({
  children,
  accentColor = '#D4649A',
  variants,
  className = "",
  glowOnHover = true,
}: EnhancedResultCardProps) => {
  return (
    <motion.div
      variants={variants}
      className={`relative bg-card border border-border overflow-hidden ${className}`}
      style={{
        borderRadius: 20,
        boxShadow: '0 2px 12px rgba(61, 43, 69, 0.06), 0 1px 4px rgba(61, 43, 69, 0.04)',
      }}
      whileHover={glowOnHover ? {
        boxShadow: `0 8px 32px rgba(212, 100, 154, 0.14), 0 2px 8px rgba(61, 43, 69, 0.06)`,
        y: -2,
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {/* Accent line at top */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }}
      />
      <div className="p-6 pt-7">
        {children}
      </div>
    </motion.div>
  );
};
