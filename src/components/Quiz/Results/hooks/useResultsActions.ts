
import { useToast } from "@/components/ui/use-toast";
import { getSkinTypeDetails } from "../SkinTypeDetails";

export const useResultsActions = (skinType: string) => {
  const { toast } = useToast();
  const skinDetails = getSkinTypeDetails(skinType);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mon type de peau - Quiz Majo-Liepeau',
          text: `J'ai découvert mon type de peau : ${skinDetails.title}! 🌸`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié !",
          description: "Le lien a été copié dans ton presse-papiers",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Erreur",
        description: "Impossible de partager pour le moment",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const summary = `
Mon Type de Peau - Quiz Majo-Liepeau
=====================================

Type de peau : ${skinDetails.title}
Description : ${skinDetails.description}

Caractéristiques principales :
${skinDetails.characteristics.map(char => `• ${char}`).join('\n')}

Facteurs influents :
${skinDetails.factors.map(factor => `• ${factor}`).join('\n')}

Recommandation :
${skinDetails.routineRecommendation}

Généré le : ${new Date().toLocaleDateString('fr-FR')}
    `;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mon-type-de-peau.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement réussi !",
      description: "Tes résultats ont été sauvegardés",
    });
  };

  return { handleShare, handleDownload };
};
