import { motion } from "framer-motion";

interface EnhancedProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const EnhancedProgressBar = ({
  currentQuestion,
  totalQuestions,
}: EnhancedProgressBarProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      {/* Progress info */}
      <div className="flex justify-between items-center mb-2">
        <motion.p
          key={currentQuestion}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[13px] font-body font-medium"
          style={{ color: '#9B8FA3' }}
        >
          Question{" "}
          <motion.span
            key={`num-${currentQuestion}`}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-block font-bold"
            style={{ color: '#D4649A' }}
          >
            {currentQuestion + 1}
          </motion.span>
          /{totalQuestions}
        </motion.p>
        <motion.p
          key={`pct-${currentQuestion}`}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-[13px] font-body font-semibold"
          style={{ color: '#D4649A' }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>

      {/* Bar with shimmer */}
      <div
        className="h-1.5 w-full rounded-full overflow-hidden relative"
        style={{ background: '#F0EAF3' }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #D4649A, #9B6BA3)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Shimmer overlay */}
          <motion.span
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
              width: '60%',
            }}
            animate={{ x: ['-100%', '250%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
          />
        </motion.div>
      </div>
    </div>
  );
};
