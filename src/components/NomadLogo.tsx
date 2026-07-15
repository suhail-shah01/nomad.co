import React from 'react';

interface NomadLogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
  iconOnly?: boolean;
}

export const NomadLogo: React.FC<NomadLogoProps> = ({ 
  className = "w-10 h-10", 
  showText = true,
  textSize = "text-xl",
  iconOnly = false
}) => {
  // Beautiful gold/cream color from the uploaded image: #FAF6E9
  // Deep charcoal background for contrast: #0D0D0D
  const creamColor = "#FAF6E9";
  const darkBg = "#0D0D0D";

  return (
    <div className="flex items-center gap-3.5 select-none">
      {/* Self-contained high-fidelity desert nomad badge */}
      <div 
        className={`relative ${className} rounded-xl overflow-hidden shadow-md flex items-center justify-center transition-all duration-500 hover:scale-[1.06] hover:rotate-[1deg]`}
        style={{ backgroundColor: darkBg, aspectRatio: '1/1' }}
      >
        <svg 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[90%] h-[90%]"
        >
          {/* Outer circle layout guides inside dark badge */}
          <circle 
            cx="200" 
            cy="200" 
            r="190" 
            stroke="rgba(250, 246, 233, 0.08)" 
            strokeWidth="2" 
            strokeDasharray="4 6" 
          />
          
          {/* THE CELESTIAL SWOOSH ARC (Starting lower left, curving high over, ending in star) */}
          <path 
            d="M 60,260 C 50,130 130,55 240,65 C 290,70 330,95 355,135" 
            stroke={creamColor} 
            strokeWidth="11" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* 5-POINTED NORTH COMPASS STAR (Glows at the end of celestial swoosh) */}
          {/* Center at (355, 145) */}
          <g transform="translate(355, 145)">
            <path 
              d="M 0,-40 L 10,-12 L 38,-12 L 15,6 L 24,34 L 0,16 L -24,34 L -15,6 L -38,-12 L -10,-12 Z" 
              fill={creamColor} 
            />
            {/* Tiny center core dot */}
            <circle cx="0" cy="0" r="4.5" fill={darkBg} />
          </g>

          {/* DESERT NOMAD HEAD WRAP / TURBAN (Cream Silhouette) */}
          <g>
            {/* Turban top mass */}
            <path 
              d="M 130,195 C 120,110 160,85 200,85 C 240,85 280,110 270,195 C 270,205 260,210 255,215 C 248,220 238,220 228,220 C 215,220 185,220 172,220 C 150,220 135,205 130,195 Z" 
              fill={creamColor} 
            />

            {/* Inner Turban folds (Carved out with background dark lines) */}
            <path d="M 148,165 Q 200,125 252,165" stroke={darkBg} strokeWidth="8.5" strokeLinecap="round" />
            <path d="M 136,188 Q 200,148 264,188" stroke={darkBg} strokeWidth="9" strokeLinecap="round" />
            <path d="M 162,142 Q 200,118 238,142" stroke={darkBg} strokeWidth="6.5" strokeLinecap="round" />

            {/* Face/Tagelmust Mask - beautiful drape going down to chest */}
            <path 
              d="M 136,220 C 130,225 136,260 142,275 C 148,290 162,305 168,318 C 178,335 182,352 196,358 C 204,362 216,362 224,358 C 238,352 242,335 252,318 C 258,305 272,290 278,275 C 284,260 290,225 284,220 C 278,215 272,220 260,220 C 230,220 190,220 160,220 C 148,220 142,215 136,220 Z" 
              fill={creamColor} 
            />

            {/* Inner Mask folds (Tagelmust layers) */}
            <path d="M 140,248 Q 200,266 260,248" stroke={darkBg} strokeWidth="8.5" strokeLinecap="round" />
            <path d="M 148,272 Q 200,296 252,272" stroke={darkBg} strokeWidth="8.5" strokeLinecap="round" />
            <path d="M 158,298 Q 200,324 242,298" stroke={darkBg} strokeWidth="7" strokeLinecap="round" />
            <path d="M 174,322 Q 200,345 226,322" stroke={darkBg} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 188,340 Q 200,354 212,340" stroke={darkBg} strokeWidth="4" strokeLinecap="round" />

            {/* EYE BAND SLOT - Black mask cutout */}
            <path 
              d="M 166,205 Q 200,215 234,205 L 234,218 Q 200,225 166,218 Z" 
              fill={darkBg} 
            />

            {/* Intense Eyes looking forward (White slits) */}
            {/* Left Eye */}
            <path d="M 178,211 Q 186,206 193,212" stroke={creamColor} strokeWidth="3.5" strokeLinecap="round" />
            {/* Right Eye */}
            <path d="M 207,212 Q 214,206 222,211" stroke={creamColor} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {showText && !iconOnly && (
        <span className={`font-display font-black tracking-[0.16em] text-neutral-900 ${textSize} flex items-center`}>
          Nomad
          <span className="font-serif italic text-neutral-400 font-normal tracking-wide lowercase ml-1.5 mr-1">Collection</span>
          <span className="text-[10px] text-neutral-400 font-normal self-start mt-0.5">®</span>
        </span>
      )}
    </div>
  );
};

export default NomadLogo;
