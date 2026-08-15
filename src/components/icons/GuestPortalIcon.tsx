import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const GuestPortalIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`group-hover:rotate-3 transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="guestGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="1" stopColor="#be185d" />
        </linearGradient>
      </defs>
      <rect x="8" y="3" width="16" height="26" rx="4" fill="#fce7f3" fillOpacity="0.7" stroke="#ec4899" strokeWidth="1.5" />
      <path d="M13 6H19" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="25" r="1" fill="#ec4899" />
      {/* Key icon graphic */}
      <circle cx="16" cy="14" r="3" fill="url(#guestGrad)" />
      <path d="M16 17V20" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
