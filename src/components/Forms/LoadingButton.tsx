import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton = ({
  isLoading = false,
  loadingText = "Chargement...",
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { y: -2, boxShadow: "0 12px 40px rgba(212, 100, 154, 0.35)" } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      disabled={disabled || isLoading}
      className={[
        "w-full font-body text-base font-bold text-primary-foreground rounded-full py-4 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "linear-gradient(135deg, #D4649A 0%, #C45589 100%)",
        boxShadow: "0 8px 30px rgba(212, 100, 154, 0.25)",
        borderRadius: 99,
      }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {/* Shimmer effect */}
      {!isLoading && !disabled && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};
