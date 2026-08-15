import React from 'react';

interface LordIconWrapperProps {
  src?: string;
  trigger?: string;
  colors?: string;
  size?: number;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export const LordIconWrapper: React.FC<LordIconWrapperProps> = ({
  src,
  size = 38,
  className = '',
  fallbackIcon,
}) => {
  if (src && (src.endsWith('.svg') || src.endsWith('.gif') || src.startsWith('/'))) {
    return (
      <div
        className={`inline-flex items-center justify-center hover:scale-110 transition-transform duration-300 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt="App Icon"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center hover:scale-110 transition-transform duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {fallbackIcon}
    </div>
  );
};
