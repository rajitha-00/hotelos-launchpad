import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const AnalyticsIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
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
        <linearGradient id="chartGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="24" height="24" rx="5" fill="#cffaff" fillOpacity="0.7" stroke="#06b6d4" strokeWidth="1.5" />
      <rect x="8" y="17" width="3.5" height="6" rx="1" fill="#67e8f9" />
      <rect x="14.25" y="12" width="3.5" height="11" rx="1" fill="#22d3ee" />
      <rect x="20.5" y="8" width="3.5" height="15" rx="1" fill="url(#chartGrad)" />
    </svg>
  );
};
