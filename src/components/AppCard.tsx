import React from 'react';
import { motion } from 'framer-motion';
import { IAppItem } from '../interfaces';
import {
  ExternalLink,
  Star,
  Sparkles,
  Hotel,
  UtensilsCrossed,
  ShieldAlert,
  Globe,
  Wallet,
  Package,
  ArrowUpRight,
} from 'lucide-react';
import { LordIconWrapper } from './icons';

interface AppCardProps {
  app: IAppItem;
  onToggleFavorite: (id: string) => void;
  onInspectApp: (app: IAppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onToggleFavorite,
  onInspectApp,
}) => {
  const renderFallbackIcon = () => {
    switch (app.id) {
      case 'stay-os':
        return <Hotel className="w-7 h-7 text-white" />;
      case 'dine-os':
        return <UtensilsCrossed className="w-7 h-7 text-white" />;
      case 'super-admin':
        return <ShieldAlert className="w-7 h-7 text-white" />;
      case 'payments-os':
        return <Wallet className="w-7 h-7 text-white" />;
      case 'inventory-os':
        return <Package className="w-7 h-7 text-white" />;
      case 'public-web':
        return <Globe className="w-7 h-7 text-white" />;
      default:
        return <Sparkles className="w-7 h-7 text-white" />;
    }
  };

  const getStatusBadge = () => {
    switch (app.status) {
      case 'OPERATIONAL':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-dot-active" />
            Operational
          </span>
        );
      case 'BETA':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            Beta
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold border border-slate-200 shadow-xs">
            Ready
          </span>
        );
    }
  };

  return (
    <motion.div
      layoutId={`card-container-${app.id}`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 25,
      }}
      onClick={() => onInspectApp(app)}
      className="launch-card relative group bg-white/95 backdrop-blur-md rounded-[28px] p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-blue-400/80 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden select-none"
    >
      {/* Subtle Top Gradient Accent Accent */}
      <div
        className={`absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r ${
          app.gradientBorder || 'from-blue-500/20 to-indigo-500/20'
        } rounded-t-full opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Top Header: iOS Squircle Icon + Favorite + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* iOS Squircle Icon (AppLauncher Design Language) */}
          <motion.div
            layoutId={`card-icon-${app.id}`}
            className="relative w-16 h-16 rounded-[20px] flex items-center justify-center text-white shrink-0 overflow-hidden shadow-md border border-white/40 select-none group-hover:scale-105 transition-transform"
            style={{
              background: app.iconBg || 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Top Gloss Reflection */}
            <div
              aria-hidden="true"
              className="absolute top-0 inset-x-0 h-[45%] pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            <LordIconWrapper
              src={app.lordIconSrc}
              trigger={app.lordIconTrigger}
              size={40}
              fallbackIcon={renderFallbackIcon()}
            />
          </motion.div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(app.id);
              }}
              className={`p-1.5 rounded-xl transition-colors ${
                app.isFavorite
                  ? 'text-amber-400 hover:text-amber-500 bg-amber-50 border border-amber-200/60'
                  : 'text-slate-300 hover:text-slate-400 hover:bg-slate-100 border border-transparent'
              }`}
              title={app.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className="w-4 h-4" fill={app.isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <motion.div layoutId={`title-container-${app.id}`} className="mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">
              {app.name}
            </h3>
            {app.badgeText && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                {app.badgeText}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-blue-600/90 mt-0.5">
            {app.tagline}
          </p>
        </motion.div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {app.description}
        </p>

        {/* Metric Pill */}
        {app.metrics && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 mb-4 font-medium">
            <span className="font-bold text-slate-900">{app.metrics.value}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{app.metrics.label}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
        <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors flex items-center gap-1">
          <span>Explore Preview</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20"
        >
          <span>Launch</span>
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
        </a>
      </div>
    </motion.div>
  );
};
