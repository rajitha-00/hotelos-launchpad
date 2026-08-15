import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const DineOSIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group-hover:scale-105 transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="dineGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef4444" />
          <stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      {/* Plate circle background */}
      <circle cx="16" cy="16" r="12" fill="#fee2e2" fillOpacity="0.7" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="8" stroke="#fca5a5" strokeWidth="1.2" strokeDasharray="2 2" />

      {/* Fork & Knife graphic */}
      <path d="M11 10V16C11 17.5 12.5 18 14 18V23" stroke="url(#dineGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 10V14" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13 10V14" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />

      <path d="M20 10C20 10 22 12.5 22 15C22 17.5 20 18 20 18V23" stroke="url(#dineGrad)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
