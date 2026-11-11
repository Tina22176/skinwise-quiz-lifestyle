import { Quiz } from "@/components/Quiz/Quiz";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Home');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-gold"
        role="banner"
      >
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex justify-between items-center">
          <a href="https://majoliepeau.com" aria-label="Majoliepeau, retour au site">
            <img src="/brand/majoliepeau-wordmark.svg" alt="" width={1166} height={310} className="h-8 w-auto" />
          </a>
          <span className="eyebrow">Diagnostic peau</span>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16" role="main">
        <Quiz />
      </main>
      
    </div>
  );
};

export default Index;
