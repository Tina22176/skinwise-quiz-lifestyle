import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  lines?: number;
  showAvatar?: boolean;
}

const SkeletonLine = ({ width = "100%", height = 16, delay = 0 }: { width?: string | number; height?: number; delay?: number }) => (
  <motion.div
    className="rounded-full bg-muted"
    style={{ width, height }}
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export const SkeletonLoader = ({ lines = 3, showAvatar = true }: SkeletonLoaderProps) => {
  return (
    <div className="space-y-5 px-6 py-8 max-w-[480px] md:max-w-[600px] lg:max-w-[720px] mx-auto">
      {showAvatar && (
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="w-16 h-16 rounded-full bg-muted"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <SkeletonLine width="60%" height={24} delay={0.1} />
          <SkeletonLine width="40%" height={16} delay={0.2} />
        </div>
      )}

      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-[20px] p-6 space-y-3">
          <SkeletonLine width="45%" height={20} delay={i * 0.05} />
          <SkeletonLine width="100%" height={14} delay={i * 0.05 + 0.05} />
          <SkeletonLine width="85%" height={14} delay={i * 0.05 + 0.1} />
          <SkeletonLine width="70%" height={14} delay={i * 0.05 + 0.15} />
        </div>
      ))}
    </div>
  );
};
