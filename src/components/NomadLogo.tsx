import React from 'react';

interface NomadLogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export const NomadLogo: React.FC<NomadLogoProps> = ({ 
  className = "w-8 h-8", 
  showText = true,
  textSize = "text-xl"
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg 
        viewBox="0 0 100 100" 
        fill="currentColor" 
        className={`${className} transition-transform duration-300 hover:rotate-12`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sleek, stylized minimalist mountain peak and path representing 'Nomad' */}
        <polygon 
          points="50,15 15,85 85,85" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinejoin="miter"
        />
        {/* Inner Peak representing split paths */}
        <polygon 
          points="50,15 50,85 85,85" 
          fill="currentColor" 
          opacity="0.15"
        />
        {/* The North Star / Compass Core at the apex */}
        <path 
          d="M50,45 L53,52 L60,55 L53,58 L50,65 L47,58 L40,55 L47,52 Z" 
          fill="currentColor"
        />
        {/* Subtle horizontal line showing horizon */}
        <line 
          x1="30" 
          y1="68" 
          x2="70" 
          y2="68" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className={`font-display font-bold tracking-[0.25em] uppercase text-neutral-900 ${textSize}`}>
          Nomad<span className="text-neutral-500 font-normal">®</span>
        </span>
      )}
    </div>
  );
};

export default NomadLogo;
