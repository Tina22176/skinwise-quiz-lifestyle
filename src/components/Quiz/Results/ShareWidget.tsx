import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";

interface ShareWidgetProps {
  profileTitle: string;
  profileEmoji: string;
}

export const ShareWidget = ({ profileTitle, profileEmoji }: ShareWidgetProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `${profileEmoji} J'ai découvert mon profil peau sur Majoliepeau : "${profileTitle}" ! Découvre le tien en 2 min 👉 https://majoliepeau.com`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select text
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon profil peau Majoliepeau",
          text: shareText,
          url: "https://majoliepeau.com",
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-card border border-border rounded-[20px] p-5 space-y-4">
      <p className="text-[14px] font-semibold text-foreground font-body">Partage tes résultats 🌸</p>

      {/* Preview text */}
      <div className="bg-muted rounded-[12px] p-3">
        <p className="text-[13px] text-muted-foreground font-body leading-relaxed">{shareText}</p>
      </div>

      <div className="flex gap-2">
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.96 }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-border bg-card text-[13px] font-semibold font-body text-foreground hover:bg-muted transition-colors"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex items-center gap-1 text-green-600"
              >
                <Check className="w-3.5 h-3.5" />
                Copié !
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                Copier
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={handleNativeShare}
          whileTap={{ scale: 0.96 }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-primary-foreground text-[13px] font-semibold font-body transition-all"
          style={{ background: "linear-gradient(135deg, #D4649A 0%, #C45589 100%)" }}
        >
          <Share2 className="w-3.5 h-3.5" />
          Partager
        </motion.button>
      </div>
    </div>
  );
};
