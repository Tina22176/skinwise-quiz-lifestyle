import React, { useCallback } from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
  onClick
}) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Preconnect automatique avant la navigation
    const url = new URL(href);
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url.origin;
    document.head.appendChild(link);
    
    // Suppression après un délai
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 1000);
    
    if (onClick) {
      onClick();
    }
  }, [href, onClick]);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

// Hook pour optimiser les liens externes
export const useExternalLinkOptimizer = () => {
  const preconnectToDomain = useCallback((url: string) => {
    try {
      const domain = new URL(url).origin;
      
      // Vérifie si le preconnect existe déjà
      const existingPreconnect = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (existingPreconnect) {
        return;
      }
      
      // Ajoute le preconnect
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
      
      // Nettoyage automatique
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 5000);
    } catch (error) {
      console.warn('Invalid URL for preconnect:', url);
    }
  }, []);

  return { preconnectToDomain };
}; 