import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  validate?: (value: string) => string | null;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ label, error, success, validate, onChange, onBlur, className, ...props }, ref) => {
    const [localError, setLocalError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const currentError = error || localError;
    const showSuccess = success || (touched && hasValue && !currentError);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      if (touched && validate) {
        setLocalError(validate(e.target.value));
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      setHasValue(e.target.value.length > 0);
      if (validate) {
        setLocalError(validate(e.target.value));
      }
      onBlur?.(e);
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-[13px] font-semibold text-foreground font-body">{label}</label>
        )}
        <motion.div
          className="relative"
          animate={currentError ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <input
            ref={ref}
            onChange={handleChange}
            onBlur={handleBlur}
            className={[
              "w-full font-body text-[15px] py-3.5 px-5 rounded-[12px] outline-none transition-all duration-200 pr-12",
              currentError
                ? "border-[1.5px] border-red-400"
                : showSuccess
                ? "border-[1.5px] border-green-400"
                : "border-[1.5px] border-[#E6DCE9]",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              background: "#F5F0FA",
              color: "#2E2233",
              boxShadow: currentError
                ? "0 0 0 3px rgba(248, 113, 113, 0.15)"
                : showSuccess
                ? "0 0 0 3px rgba(74, 222, 128, 0.15)"
                : "none",
              ...props.style,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = currentError ? "#f87171" : "#D4649A";
              e.currentTarget.style.boxShadow = currentError
                ? "0 0 0 3px rgba(248, 113, 113, 0.15)"
                : "0 0 0 3px rgba(212, 100, 154, 0.12)";
              props.onFocus?.(e);
            }}
            {...props}
          />

          {/* Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <AnimatePresence mode="wait">
              {currentError ? (
                <motion.div
                  key="error-icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-4 h-4 text-red-400" />
                </motion.div>
              ) : showSuccess ? (
                <motion.div
                  key="success-icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {currentError && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.22 }}
              className="text-[12px] text-red-500 font-body ml-1"
            >
              {currentError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ValidatedInput.displayName = "ValidatedInput";
