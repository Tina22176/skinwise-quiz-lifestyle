import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarItem {
  label: string;
  value: number;
  color?: string;
}

interface AnimatedProgressBarsProps {
  items: ProgressBarItem[];
}

export const AnimatedProgressBars = ({ items }: AnimatedProgressBarsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="space-y-4">
      {items.map((item, index) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] font-semibold text-foreground font-body">{item.label}</span>
            <motion.span
              className="text-[13px] font-semibold font-body"
              style={{ color: item.color || "#D4649A" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 + index * 0.12, duration: 0.4 }}
            >
              {item.value}%
            </motion.span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: item.color || "linear-gradient(90deg, #D4649A 0%, #8A6BA0 100%)" }}
              initial={{ width: "0%" }}
              animate={isInView ? { width: `${item.value}%` } : { width: "0%" }}
              transition={{
                delay: 0.2 + index * 0.12,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
