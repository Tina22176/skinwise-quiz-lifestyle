
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Download, RotateCcw } from "lucide-react";

interface ResultsActionButtonsProps {
  onShare: () => void;
  onDownload: () => void;
  onResetQuiz: () => void;
  variants: any;
}

export const ResultsActionButtons = ({
  onShare,
  onDownload,
  onResetQuiz,
  variants
}: ResultsActionButtonsProps) => {
  return (
    <motion.div 
      variants={variants}
      className="flex flex-wrap justify-center gap-4 mb-8"
    >
      <Button
        onClick={onShare}
        variant="outline"
        size="sm"
        className="glass hover:bg-pink-50/50"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Partager
      </Button>
      <Button
        onClick={onDownload}
        variant="outline"
        size="sm"
        className="glass hover:bg-pink-50/50"
      >
        <Download className="h-4 w-4 mr-2" />
        Télécharger
      </Button>
      <Button
        onClick={onResetQuiz}
        variant="outline"
        size="sm"
        className="glass hover:bg-pink-50/50"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Refaire le quiz
      </Button>
    </motion.div>
  );
};
