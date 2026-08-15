import React from 'react';

interface NamiOsLogoProps {
  size?: 'icon' | 'compact' | 'full';
  variant?: 'master' | 'stay' | 'dine' | 'control';
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

export const NamiOsLogo: React.FC<NamiOsLogoProps> = ({
  size = 'compact',
  variant = 'master',
  className = '',
  showText = true,
  onClick,
}) => {
  const getDimension = () => {
    switch (size) {
      case 'icon':
        return 28;
      case 'compact':
        return 34;
      case 'full':
        return 44;
      default:
        return 34;
    }
  };

  const dim = getDimension();

  const getVariantSubtext = () => {
    switch (variant) {
      case 'stay':
        return 'Stay OS';
      case 'dine':
        return 'Dine OS';
      case 'control':
        return 'Control OS';
      default:
        return 'Ecosystem Hub';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official NamiOS Mark */}
      <div
        className="flex items-center justify-center p-1 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
        style={{ width: dim + 8, height: dim + 8 }}
      >
        <img
          src="/nami-mark.svg"
          alt="NamiOS Mark"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight font-sans">
              NamiOS
            </span>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-900 text-white tracking-widest font-mono">
              Launchpad
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-0.5 tracking-wide">
            {getVariantSubtext()}
          </span>
        </div>
      )}
    </div>
  );
};
