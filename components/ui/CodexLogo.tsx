import React from 'react';
import { MousePointer2 } from 'lucide-react';

interface CodexLogoProps {
  className?: string;
  withText?: boolean;
}

export const CodexLogo: React.FC<CodexLogoProps> = ({ className = "h-8", withText = true }) => {
  return (
    <div className={`flex items-center font-display font-bold tracking-tighter select-none ${className}`}>
      <span className="text-primary">C</span>
      <div className="relative mx-[0.05em] flex items-center justify-center">
        <span className="text-primary">O</span>
        {/* Cursor Overlay */}
        <MousePointer2 
          className="absolute top-[25%] left-[25%] w-[60%] h-[60%] text-white fill-white stroke-none drop-shadow-md transform -rotate-12" 
          strokeWidth={0}
        />
      </div>
      <span className="text-primary">D</span>
      <span className="text-primary">E</span>
      <span className="text-secondary">X</span>
    </div>
  );
};