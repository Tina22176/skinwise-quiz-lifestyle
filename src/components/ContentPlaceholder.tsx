import React from 'react';

interface ContentPlaceholderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({
  width = '100%',
  height = 'auto',
  className = '',
  children
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width, 
        height,
        minHeight: height === 'auto' ? '1px' : height,
      }}
    >
      {children}
    </div>
  );
};

// Composant spécialisé pour les textes
export const TextPlaceholder: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 1, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ 
            width: i === lines - 1 ? '75%' : '100%',
            minHeight: '16px'
          }}
        />
      ))}
    </div>
  );
}; 