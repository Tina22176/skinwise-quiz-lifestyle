import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

interface EmailCaptureScreenProps {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  isLoading: boolean;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const EmailCaptureScreen = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  isLoading,
  gdprConsent,
  setGdprConsent,
  handleSubmit,
}: EmailCaptureScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4"
    >
      <div className="max-w-md w-full space-y-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Ton profil est prêt ✨
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Entre ton email pour recevoir tes résultats + un guide personnalisé avec les 3 premiers gestes à adopter.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Input
            type="text"
            placeholder="Ton prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full rounded-xl border-pink-200 focus:ring-pink-300 py-3"
          />
          <Input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-pink-200 focus:ring-pink-300 py-3"
          />
          
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              required
              className="mt-1 accent-pink-500"
            />
            <span className="text-gray-500">
              J'accepte de recevoir mes résultats et mon guide personnalisé par email.
            </span>
          </label>
          
          <Button
            type="submit"
            disabled={isLoading || !email || !firstName || !gdprConsent}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3.5 rounded-full font-semibold text-lg shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? "Envoi..." : "Voir mes résultats"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </Button>
        </motion.form>

        <motion.p
          className="text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          On ne partage jamais ton email. Tu peux te désinscrire en 1 clic.
        </motion.p>
      </div>
    </motion.div>
  );
};
