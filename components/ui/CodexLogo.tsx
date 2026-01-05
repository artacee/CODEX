import React from 'react';

interface CodexLogoProps {
  className?: string;
}

export const CodexLogo: React.FC<CodexLogoProps> = ({ className = "h-8" }) => {
  return (
    <img 
      src="/logo.png" 
      alt="CODEX Logo" 
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
};