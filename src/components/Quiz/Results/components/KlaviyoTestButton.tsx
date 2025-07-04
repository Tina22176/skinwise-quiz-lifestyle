import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { testKlaviyoIntegration, testKlaviyoListSubscription } from "@/utils/testKlaviyo";
import { Loader2, TestTube, CheckCircle, AlertCircle } from "lucide-react";

export const KlaviyoTestButton = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      // Test 1: Intégration générale
      const integrationResult = await testKlaviyoIntegration();
      setTestResult(integrationResult);

      if (integrationResult.success) {
        // Test 2: Ajout à la liste
        const listResult = await testKlaviyoListSubscription("test@example.com", "Test");
        
        toast({
          title: integrationResult.success ? "✅ Test réussi" : "❌ Test échoué",
          description: integrationResult.message,
          variant: integrationResult.success ? "default" : "destructive",
        });

        if (listResult.success) {
          toast({
            title: "✅ Liste Klaviyo",
            description: "Ajout à la liste réussi",
          });
        }
      } else {
        toast({
          title: "❌ Test échoué",
          description: integrationResult.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors du test:", error);
      toast({
        title: "❌ Erreur de test",
        description: "Une erreur est survenue lors du test",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleTest}
        disabled={isTesting}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-gray-300 shadow-lg"
      >
        {isTesting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : testResult?.success ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : testResult ? (
          <AlertCircle className="w-4 h-4 text-red-600" />
        ) : (
          <TestTube className="w-4 h-4" />
        )}
        <span className="ml-2 text-xs">
          {isTesting ? "Test..." : testResult?.success ? "OK" : testResult ? "Erreur" : "Test Klaviyo"}
        </span>
      </Button>
    </div>
  );
}; 