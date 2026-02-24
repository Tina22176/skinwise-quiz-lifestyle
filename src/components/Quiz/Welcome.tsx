import { motion } from "framer-motion";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center">
      {/* Decorative orbs — 3 blobs with float animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-rose-glow rounded-full blur-3xl opacity-40"
          animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-lilas-soft rounded-full blur-3xl opacity-50"
          animate={{ x: [0, -8, 10, 0], y: [0, 6, -8, 0], scale: [1, 0.97, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-violet-whisper rounded-full blur-3xl opacity-40"
          animate={{ x: [0, 6, -4, 0], y: [0, -4, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg mx-auto text-center px-6 sm:px-8 py-8 sm:py-12"
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center bg-rose-whisper text-primary px-[18px] py-[6px] rounded-full mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <span className="text-[13px] font-semibold font-body">Diagnostic gratuit</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="font-heading text-[2.5rem] font-bold mb-6"
          style={{ lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-violet-deep">
            Tu connais vraiment
          </span>
          <br />
          <span className="text-primary">ta peau ?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed font-body"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          6 questions. 2 minutes. Un profil personnalisé avec les gestes qui te correspondent — pas ceux de TikTok.
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          className="w-[60px] h-px bg-border mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        />

        {/* CTA */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="group text-primary-foreground rounded-full text-[17px] font-bold shadow-glow transition-all duration-200 w-full sm:w-auto font-body"
            style={{
              background: 'linear-gradient(135deg, #D4649A 0%, #C45589 100%)',
              padding: '18px 44px',
              borderRadius: 99,
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 12px 40px rgba(212, 100, 154, 0.35), 0 4px 12px rgba(212, 100, 154, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Commencer le diagnostic →
          </motion.button>
          
          <p className="mt-5 text-[13px] text-text-muted font-body">
            Gratuit · Sans engagement · Résultats immédiats
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};