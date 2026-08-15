import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PublicWebIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group-hover:scale-110 transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="webGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#6b21a8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="#f3e8ff" fillOpacity="0.7" stroke="#a855f7" strokeWidth="1.5" />
      <path d="M4.5 12H27.5" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.5 20H27.5" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="16" cy="16" rx="5" ry="12" stroke="url(#webGrad)" strokeWidth="1.5" />
    </svg>
  );
};
