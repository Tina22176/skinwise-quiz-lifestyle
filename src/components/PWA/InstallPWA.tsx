
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Ne plus afficher pendant cette session
    sessionStorage.setItem('pwa_dismissed', 'true');
  };

  // Ne pas afficher si déjà installé ou dismissé
  if (!showInstallPrompt || sessionStorage.getItem('pwa_dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
      >
        <div className="bg-white rounded-lg shadow-lg border border-pink-200/50 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">
                Installer l'app Quiz Peau 📱
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Accès rapide et notifications de rappel
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 text-gray-400"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleInstall}
              size="sm"
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Installer
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              className="px-3"
            >
              Plus tard
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
