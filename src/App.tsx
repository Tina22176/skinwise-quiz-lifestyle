
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuizPromo from "./pages/QuizPromo";
import Guarantee from "./pages/Guarantee";
import QuizResults from "./pages/QuizResults";

console.log('🚀 App module loading...');

const queryClient = new QueryClient();

const App = () => {
  console.log('📱 App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/promo" element={<QuizPromo />} />
            <Route path="/garantie" element={<Guarantee />} />
            <Route path="/results" element={<QuizResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
