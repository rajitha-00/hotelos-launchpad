import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const StayOSIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group-hover:rotate-1 transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="stayGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* Background card with glass effect */}
      <rect x="4" y="5" width="24" height="22" rx="5" fill="#dbeafe" fillOpacity="0.6" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Header bar */}
      <path d="M4 11H28" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="1.2" fill="#2563eb" />
      <circle cx="12" cy="8" r="1.2" fill="#60a5fa" />
      
      {/* Room Door / Bed icon graphic */}
      <rect x="8" y="15" width="7" height="9" rx="1.5" fill="url(#stayGrad)" />
      <circle cx="13" cy="19.5" r="0.8" fill="#ffffff" />

      <path d="M18 16H24" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 19.5H24" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 23H22" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
