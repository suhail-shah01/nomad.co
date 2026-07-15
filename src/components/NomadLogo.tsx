import React from 'react';

interface NomadLogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export const NomadLogo: React.FC<NomadLogoProps> = ({ 
  className = "w-10 h-10", 
  showText = true,
  textSize = "text-xl"
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg 
        viewBox="0 0 100 100" 
        fill="currentColor" 
        className={`${className} text-neutral-900 transition-transform duration-500 hover:scale-105`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Vintage Circular Shield Border */}
        <circle 
          cx="50" 
          cy="50" 
          r="46" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="2 3" 
          className="opacity-40"
        />
        <circle 
          cx="50" 
          cy="50" 
          r="42" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          className="opacity-60"
        />

        {/* Majestic Mountain Ranges (Background) */}
        {/* Left Side Mountain */}
        <polygon 
          points="22,70 42,42 58,70" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
        <polygon 
          points="42,42 42,70 58,70" 
          fill="currentColor" 
          opacity="0.1"
        />

        {/* Major Center Mountain */}
        <polygon 
          points="35,70 56,30 78,70" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinejoin="round"
        />
        {/* 3D shading on the mountain side */}
        <polygon 
          points="56,30 56,70 78,70" 
          fill="currentColor" 
          opacity="0.15"
        />

        {/* Royal Polaris Compass Star above the peaks */}
        <circle cx="56" cy="22" r="2.5" fill="currentColor" />
        <line x1="56" y1="14" x2="56" y2="18" stroke="currentColor" strokeWidth="1" />
        <line x1="56" y1="26" x2="56" y2="30" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="22" x2="52" y2="22" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="22" x2="64" y2="22" stroke="currentColor" strokeWidth="1" />

        {/* Ledge and Horizon Lines */}
        <path 
          d="M15,70 C30,68 45,71 85,70" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        
        {/* Silhouette of a Man (the Vintage Explorer) with staff on a rock ledge */}
        {/* Rock platform */}
        <path 
          d="M20,70 L26,67 L30,70 Z" 
          fill="currentColor" 
        />
        {/* Head */}
        <circle cx="24" cy="53" r="1.5" fill="currentColor" />
        {/* Body & Trenchcoat */}
        <path 
          d="M24,54.5 C25,56 25.5,59 25,64 L22.5,64 C22.5,61 23,57 23.5,54.5 Z" 
          fill="currentColor" 
        />
        {/* Cape floating elegantly in the high-altitude wind */}
        <path 
          d="M24,54.5 C21.5,56.5 20.5,60 21,63 C22.5,62.5 23.5,61.5 24,59 Z" 
          fill="currentColor" 
          opacity="0.7"
        />
        {/* Vintage explorer's walking staff */}
        <line 
          x1="26" 
          y1="51.5" 
          x2="28" 
          y2="66.5" 
          stroke="currentColor" 
          strokeWidth="0.75" 
        />
        {/* Legs */}
        <line x1="23.2" y1="64" x2="23.2" y2="67" stroke="currentColor" strokeWidth="0.8" />
        <line x1="24.8" y1="64" x2="24.8" y2="67" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      {showText && (
        <span className={`font-display font-bold tracking-[0.18em] text-neutral-900 ${textSize} flex items-center`}>
          Nomad
          <span className="font-serif italic text-neutral-400 font-normal tracking-wide lowercase ml-1.5 mr-1">Co.</span>
          <span className="text-[10px] text-neutral-400 font-normal self-start mt-0.5">®</span>
        </span>
      )}
    </div>
  );
};

export default NomadLogo;
