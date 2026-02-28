import { motion } from "framer-motion";

export const PremiumLoader = () => {
  return (
    <motion.div
      key="premium-loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
    >
      {/* Concentric animated rings */}
      <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
        {/* Outer ring */}
        <motion.span
          className="absolute rounded-full border-2"
          style={{
            width: 88,
            height: 88,
            borderColor: 'rgba(212, 100, 154, 0.2)',
            borderTopColor: '#D4649A',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle ring */}
        <motion.span
          className="absolute rounded-full border-2"
          style={{
            width: 64,
            height: 64,
            borderColor: 'rgba(155, 107, 163, 0.15)',
            borderTopColor: '#9B6BA3',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
        {/* Center pulse icon */}
        <motion.span
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'linear-gradient(135deg, #FBEAF2 0%, #F5F0FA 100%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨
        </motion.span>
      </div>

      {/* Text */}
      <div className="space-y-2 text-center">
        <motion.p
          className="font-heading text-xl font-semibold"
          style={{ color: '#3D2B45' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Analyse en cours…
        </motion.p>
        <motion.p
          className="text-sm font-body"
          style={{ color: '#9B8FA3' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Ton diagnostic personnalisé arrive
        </motion.p>
      </div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ background: '#F0EAF3' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #D4649A, #9B6BA3)' }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
