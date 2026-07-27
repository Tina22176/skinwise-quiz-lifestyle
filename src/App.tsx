
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuizPromo from "./pages/QuizPromo";
import Guarantee from "./pages/Guarantee";
import QuizResults from "./pages/QuizResults";

console.log('🚀 App module loading...');

const queryClient = new QueryClient();

const AppRoutes = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return <Index />;
  if (path === "/promo") return <QuizPromo />;
  if (path === "/garantie") return <Guarantee />;
  if (path === "/results") return <QuizResults />;
  return <NotFound />;
};

const App = () => {
  console.log('📱 App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
