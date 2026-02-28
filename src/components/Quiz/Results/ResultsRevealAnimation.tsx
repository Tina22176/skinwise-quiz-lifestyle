import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface ResultsRevealAnimationProps {
  children: React.ReactNode;
  trigger?: boolean;
}

export const ResultsRevealAnimation = ({
  children,
  trigger = true,
}: ResultsRevealAnimationProps) => {
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (trigger && !hasLaunched.current) {
      hasLaunched.current = true;
      const duration = 2200;
      const animationEnd = Date.now() + duration;
      const colors = ["#D4649A", "#C45589", "#8A6BA0", "#EBE0F5", "#F9D5E5"];

      const frame = () => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return;

        const particleCount = 3;
        confetti({
          particleCount,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
          gravity: 1.2,
          scalar: 0.9,
          drift: 0,
        });
        confetti({
          particleCount,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
          gravity: 1.2,
          scalar: 0.9,
          drift: 0,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }
  }, [trigger]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
