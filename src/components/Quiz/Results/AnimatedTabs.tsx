import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const AnimatedTabs = ({ tabs, defaultTab }: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tabId: string) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    const nextIndex = tabs.findIndex((t) => t.id === tabId);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(tabId);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex gap-1 bg-muted rounded-[12px] p-1 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className="relative flex-1 py-2 px-3 text-[13px] font-semibold font-body rounded-[8px] transition-colors z-10"
            style={{ color: activeTab === tab.id ? "#3D2B45" : "#9B8FA3" }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-card border border-border shadow-sm rounded-[8px]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
