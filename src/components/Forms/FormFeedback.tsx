import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface FormFeedbackProps {
  type: "error" | "success" | "info";
  message: string;
  visible?: boolean;
}

const typeConfig = {
  error: {
    icon: AlertCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    iconColor: "text-red-500",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    iconColor: "text-green-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    iconColor: "text-blue-500",
  },
};

export const FormFeedback = ({ type, message, visible = true }: FormFeedbackProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={`flex items-start gap-2.5 p-3.5 rounded-[12px] border ${config.bg} ${config.border}`}
        >
          <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
          <p className={`text-[13px] font-body leading-relaxed ${config.text}`}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
