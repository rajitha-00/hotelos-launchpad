import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const SuperAdminIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group-hover:rotate-6 transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="adminGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path
        d="M16 3L5 8V15C5 22.2 10.1 28.9 16 30.5C21.9 28.9 27 22.2 27 15V8L16 3Z"
        fill="#dcfce7"
        fillOpacity="0.7"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Central gear or lock graphic */}
      <circle cx="16" cy="16" r="4.5" fill="url(#adminGrad)" />
      <path d="M16 13.5V18.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 16H18.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
