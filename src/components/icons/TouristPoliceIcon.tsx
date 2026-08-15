import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const TouristPoliceIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
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
        <linearGradient id="policeGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <path
        d="M19 4H8C6.3 4 5 5.3 5 7V25C5 26.7 6.3 28 8 28H24C25.7 28 27 26.7 27 25V12L19 4Z"
        fill="#ccfbf1"
        fillOpacity="0.7"
        stroke="#14b8a6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M19 4V12H27" stroke="#14b8a6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 19L14.5 22.5L21 16" stroke="url(#policeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
