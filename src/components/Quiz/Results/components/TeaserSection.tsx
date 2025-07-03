import { motion } from “framer-motion”;
import { Button } from “@/components/ui/button”;
import { Instagram, RefreshCw, Clock, Star, Shield, Sparkles, Lock, Mail } from “lucide-react”;

interface TeaserSectionProps {
skinType: string;
skinTypeText: string;
details: any;
visitInstagram: () => void;
onResetQuiz: () => void;
}

// Configuration personnalisée par type de peau avec classes fixes
const getSkinTypeTeaser = (skinType: string) => {
const teasers = {
dry: {
morningSteps: [
“Nettoyant crémeux ultra-doux”,
“Sérum hydra-réparateur”,
“Crème riche nourrissante”,
“Protection SPF adaptée”
],
eveningSteps: [
“Démaquillant onctueux”,
“Sérum lipidique intensif”,
“Baume de nuit cocooning”
],
keyIngredients: [“Céramides”, “Acide hyaluronique”, “Squalane”],
urgentTip: “La technique SOS anti-tiraillements”,
bgClass: “from-blue-50 to-white”,
borderClass: “border-blue-200”,
textClass: “text-blue-500”,
buttonClass: “bg-blue-500”
},
oily: {
morningSteps: [
“Gel nettoyant purifiant”,
“Lotion équilibrante”,
“Crème matifiante légère”,
“SPF fluide non-comédogène”
],
eveningSteps: [
“Double nettoyage détox”,
“Sérum régulateur”,
“Crème nuit purifiante”
],
keyIngredients: [“Acide salicylique”, “Niacinamide”, “Zinc”],
urgentTip: “L’astuce matité 24h sans poudrer”,
bgClass: “from-green-50 to-white”,
borderClass: “border-green-200”,
textClass: “text-green-500”,
buttonClass: “bg-green-500”
},
combination: {
morningSteps: [
“Nettoyant équilibrant”,
“Bi-sérum zone T/joues”,
“Crème modulable”,
“SPF universel”
],
eveningSteps: [
“Nettoyage ciblé bi-zone”,
“Traitement différencié”,
“Soin nuit harmonisant”
],
keyIngredients: [“Acide lactique”, “Bakuchiol”, “Aloe vera”],
urgentTip: “La méthode multi-zones révolutionnaire”,
bgClass: “from-purple-50 to-white”,
borderClass: “border-purple-200”,
textClass: “text-purple-500”,
buttonClass: “bg-purple-500”
},
normal: {
morningSteps: [
“Lait micellaire apaisant”,
“Eau thermale réparatrice”,
“Crème barrière protectrice”,
“SPF minéral doux”
],
eveningSteps: [
“Démaquillage ultra-doux”,
“Sérum SOS réparateur”,
“Baume réconfortant”
],
keyIngredients: [“Panthenol”, “Bisabolol”, “Allantoïne”],
urgentTip: “Le protocole anti-réactivité 48h”,
bgClass: “from-pink-50 to-white”,
borderClass: “border-pink-200”,
textClass: “text-pink-500”,
buttonClass: “bg-pink-500”
}
};

return teasers[skinType as keyof typeof teasers] || teasers.normal;
};

export const TeaserSection = ({
skinType,
skinTypeText,
details,
visitInstagram,
onResetQuiz
}: TeaserSectionProps) => {
const teaser = getSkinTypeTeaser(skinType);

return (
<div className="space-y-6">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3 }}
className={`bg-gradient-to-r ${teaser.bgClass} p-6 rounded-2xl border ${teaser.borderClass} shadow-lg`}
>
<div className="text-center mb-6">
<h3 className={`text-lg sm:text-xl font-bold ${teaser.textClass} mb-2`}>
Ton plan d’action personnalisé
</h3>
<p className="text-sm sm:text-base text-gray-700">
Spécialement conçu pour les peaux <strong>{skinTypeText}</strong>
</p>
</div>

    {/* Aperçu routine - VERSION TEASER */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Matin - Partiellement visible */}
      <div className="bg-white/70 p-4 rounded-xl border border-gray-200 relative">
        <div className="flex items-center gap-2 mb-3">
          <Clock className={`w-4 h-4 ${teaser.textClass}`} />
          <h4 className="font-semibold text-gray-800">Routine du matin</h4>
        </div>
        <div className="space-y-2 text-sm">
          {teaser.morningSteps.slice(0, 2).map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`${teaser.textClass} font-bold`}>{index + 1}️⃣</span>
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
          {/* Étapes cachées */}
          <div className="relative">
            <div className="flex items-center gap-2 blur-sm">
              <span className={`${teaser.textClass} font-bold`}>3️⃣</span>
              <span className="text-gray-400">████████████</span>
            </div>
            <div className="flex items-center gap-2 blur-sm">
              <span className={`${teaser.textClass} font-bold`}>4️⃣</span>
              <span className="text-gray-400">███████████████</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`${teaser.buttonClass} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                <Lock className="w-3 h-3" />
                +2 étapes dans l'email
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Soir - Partiellement visible */}
      <div className="bg-white/70 p-4 rounded-xl border border-gray-200 relative">
        <div className="flex items-center gap-2 mb-3">
          <Star className={`w-4 h-4 ${teaser.textClass}`} />
          <h4 className="font-semibold text-gray-800">Routine du soir</h4>
        </div>
        <div className="space-y-2 text-sm">
          {teaser.eveningSteps.slice(0, 1).map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`${teaser.textClass} font-bold`}>{index + 1}️⃣</span>
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
          {/* Étapes cachées */}
          <div className="relative">
            <div className="space-y-2 blur-sm">
              <div className="flex items-center gap-2">
                <span className={`${teaser.textClass} font-bold`}>2️⃣</span>
                <span className="text-gray-400">██████████████</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`${teaser.textClass} font-bold`}>3️⃣</span>
                <span className="text-gray-400">████████████████</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`${teaser.buttonClass} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                <Mail className="w-3 h-3" />
                Suite par email
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Ingrédients personnalisés */}
    <div className={`bg-gradient-to-r ${teaser.bgClass} p-4 rounded-xl border ${teaser.borderClass}`}>
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Sparkles className={`w-4 h-4 ${teaser.textClass}`} />
        Tes ingrédients stars (peau {skinTypeText})
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
        {teaser.keyIngredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className={teaser.textClass}>•</span>
            <span className="text-gray-700">{ingredient}</span>
          </div>
        ))}
        <div className="flex items-center gap-1">
          <span className={teaser.textClass}>•</span>
          <span className="text-gray-400">+ 4 autres actifs</span>
        </div>
      </div>
    </div>

    {/* Bonus exclusif */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-orange-500" />
        <h4 className="font-semibold text-orange-700">Bonus exclusif dans ton email</h4>
      </div>
      <p className="text-sm text-orange-600 mb-3">
        <strong>{teaser.urgentTip}</strong> + le calendrier beauté mensuel 
        + la liste shopping avec les prix les plus bas trouvés ! 
      </p>
      <div className="flex items-center gap-1 text-xs text-orange-500">
        <Lock className="w-3 h-3" />
        <span>Contenu réservé aux abonnées</span>
      </div>
    </motion.div>
  </motion.div>

  {/* Boutons d'action */}
  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
    <Button
      onClick={visitInstagram}
      variant="outline"
      className="flex items-center gap-2 bg-white hover:bg-pink-50 text-black border-pink-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
    >
      <Instagram className="w-4 h-4" />
      Suivre @majolie_peau
    </Button>

    <Button
      onClick={onResetQuiz}
      variant="outline"
      className="flex items-center gap-2 bg-white hover:bg-pink-50 text-black border-pink-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
    >
      <RefreshCw className="w-4 h-4" />
      Refaire le test
    </Button>
  </div>
</div>

);
};
