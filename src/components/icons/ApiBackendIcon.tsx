import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ApiBackendIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group-hover:translate-y-[-2px] transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="apiGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="24" height="9" rx="3" fill="#ffedd5" fillOpacity="0.7" stroke="#f97316" strokeWidth="1.5" />
      <rect x="4" y="18" width="24" height="9" rx="3" fill="#ffedd5" fillOpacity="0.7" stroke="#f97316" strokeWidth="1.5" />
      
      <circle cx="9" cy="9.5" r="1.5" fill="url(#apiGrad)" />
      <circle cx="14" cy="9.5" r="1.5" fill="#fdba74" />
      
      <circle cx="9" cy="22.5" r="1.5" fill="url(#apiGrad)" />
      <circle cx="14" cy="22.5" r="1.5" fill="#fdba74" />

      {/* Lightning connect line */}
      <path d="M21 9.5L24 14.5H20L23 19.5" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
