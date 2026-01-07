import React from 'react';

interface CodexLogoProps {
  className?: string;
}

export const CodexLogo: React.FC<CodexLogoProps> = ({ className = "h-8" }) => {
  return (
    <img 
      src="/logo.png" 
      alt="CODEX Logo" 
      className={className}
      style={{ minWidth: '120px' }}
      draggable={false}
    />
  );
};