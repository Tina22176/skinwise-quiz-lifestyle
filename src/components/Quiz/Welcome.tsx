
import { motion } from "framer-motion";

export const Welcome = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative">
      <motion.div 
        className="absolute inset-0 -z-10 opacity-20"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('https://majoliepeau.com/cdn/shop/files/illustration_digitale_de_copines_majoliepeau.png?v=1738249223&width=1100')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-4 py-4"
      >
        {/* Image principale avec effet shake */}
        <motion.div 
          className="mb-2 rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(255,192,203,0.2)] mx-auto max-w-md"
          whileHover={{ 
            scale: 1.02,
            rotate: [0, -1, 1, -1, 0],
            transition: {
              rotate: {
                duration: 0.3,
                repeat: 0,
              }
            }
          }}
        >
          <img 
            src="https://majoliepeau.com/cdn/shop/files/illustration_digitale_de_copines_majoliepeau.png?v=1738249223&width=1100"
            alt="Illustration digitale des copines Majoliepeau"
            className="w-full h-48 object-cover"
          />
        </motion.div>

        <div className="mb-2">
          <span className="inline-block animate-glow">
            <img 
              src="/lovable-uploads/1f68abeb-6ffc-46ce-8aa4-392f60aecff3.png"
              alt="Logo Majoliepeau"
              className="w-72 h-72"
            />
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold mb-2 leading-tight mx-auto max-w-xl">
          ✨ DÉCOUVRE TON VÉRITABLE TYPE DE PEAU ✨
        </h1>

        <div className="space-y-3 mb-6">
          <h2 className="text-2xl text-pink-600/90 font-medium">
            Ta peau te parle... mais la comprends-tu vraiment ? 💖
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-xl">
            Ce quiz unique te permet d'identifier précisément ton type de peau et de comprendre les facteurs de ton mode de vie qui influencent son éclat.
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-xl">
            En seulement 2 minutes, tu vas recevoir :
          </p>
          
          <ul className="text-lg md:text-xl text-muted-foreground mx-auto max-w-xl list-disc list-inside space-y-2 text-left pl-4">
            <li>Un diagnostic précis de ton type de peau</li>
            <li>Des conseils personnalisés adaptés à TES besoins spécifiques</li>
            <li>Ton calendrier de Skin Cycling sur 28 jours prêt à l'emploi</li>
          </ul>

          <p className="text-xl text-pink-500/90 font-medium mt-4">
            🌸 Le secret d'une peau rayonnante n'est pas d'utiliser plus de produits, mais les BONS produits dans le BON ordre 🌸
          </p>
          
          <p className="text-lg text-muted-foreground mx-auto max-w-xl">
            Tes réponses sont confidentielles et te permettront de recevoir un plan d'action parfaitement adapté à ta peau.
          </p>
          
          <p className="text-lg text-pink-400/80 italic font-medium mt-2">
            👉 COMMENCER LE QUIZ →
          </p>
        </div>
        
        <button
          onClick={onStart}
          className="premium-button group border border-black/10"
        >
          <span className="relative inline-flex items-center">
            Commencer
            <motion.span
              className="ml-2 opacity-0 group-hover:opacity-100"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </span>
        </button>
      </motion.div>
    </div>
  );
};
