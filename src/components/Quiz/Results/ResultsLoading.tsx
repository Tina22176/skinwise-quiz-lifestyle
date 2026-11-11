import { motion } from "framer-motion";

export const ResultsLoading = () => (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
  >
    <p className="eyebrow mb-5">Un instant</p>
    <p className="font-heading italic text-[2rem] lg:text-[2.6rem] leading-tight text-foreground max-w-[22rem]">
      On relit tes réponses…
    </p>
    <div className="w-40 h-px bg-border mt-10 overflow-hidden">
      <motion.div
        className="h-full bg-foreground"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);
