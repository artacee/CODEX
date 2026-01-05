import React from 'react';

interface CodexLogoProps {
  className?: string;
}

export const CodexLogo: React.FC<CodexLogoProps> = ({ className = "h-8" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 165 40" 
      className={className}
      fill="none"
      aria-label="CODEX Logo"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Icon: Abstract Hexagon/Code Shape */}
      <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#2EFF7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 14L26 17.5V23.5L20 27L14 23.5V17.5L20 14Z" fill="#2EFF7B"/>
      
      {/* Text: CODEX */}
      <text 
        x="48" 
        y="29" 
        fill="white" 
        fontFamily="'Space Grotesk', sans-serif" 
        fontWeight="bold" 
        fontSize="28" 
        letterSpacing="0.05em"
      >
        CODEX
      </text>
    </svg>
  );
};