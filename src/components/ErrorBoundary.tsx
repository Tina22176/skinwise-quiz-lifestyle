
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Quiz Error Boundary caught an error:', error, errorInfo);
    
    // Ici on pourrait envoyer l'erreur à un service de monitoring
    // comme Sentry, LogRocket, etc.
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    // Optionnellement, recharger la page
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white/50 p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-pink-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oups ! Une erreur est survenue
              </h1>
              <p className="text-gray-600 mb-6">
                Ne t'inquiète pas, tes réponses sont sauvegardées. 
                Essaie de recharger la page.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-gray-100 p-4 rounded-lg mb-4 text-sm">
                  <summary className="cursor-pointer font-medium">
                    Détails de l'erreur (développement)
                  </summary>
                  <pre className="mt-2 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={this.handleReset}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Recharger la page
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
