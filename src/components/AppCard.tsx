import React from 'react';
import { IAppItem } from '../interfaces';
import {
  LordIconWrapper,
  StayOSIcon,
  DineOSIcon,
  SuperAdminIcon,
  PublicWebIcon,
  ApiBackendIcon,
  TouristPoliceIcon,
  AnalyticsIcon,
  GuestPortalIcon,
} from './icons';
import {
  ExternalLink,
  Star,
  Sparkles,
  Info,
} from 'lucide-react';

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
  // Render custom SVG icon dynamically
  const renderFallbackIcon = () => {
    switch (app.id) {
      case 'stay-os':
        return <StayOSIcon size={34} />;
      case 'dine-os':
        return <DineOSIcon size={34} />;
      case 'super-admin':
        return <SuperAdminIcon size={34} />;
      case 'public-web':
        return <PublicWebIcon size={34} />;
      case 'api-backend':
        return <ApiBackendIcon size={34} />;
      case 'tourist-police-sync':
        return <TouristPoliceIcon size={34} />;
      case 'analytics-dashboard':
        return <AnalyticsIcon size={34} />;
      case 'guest-portal':
        return <GuestPortalIcon size={34} />;
      default:
        return <Sparkles size={34} />;
    }
  };

  const getStatusBadge = () => {
    switch (app.status) {
      case 'OPERATIONAL':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 text-emerald-700 text-[11px] font-semibold border border-emerald-200/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-dot-active" />
            Operational
          </span>
        );
      case 'BETA':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50/90 text-cyan-700 text-[11px] font-semibold border border-cyan-200/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            Beta
          </span>
        );
      case 'DEVELOPMENT':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50/90 text-amber-700 text-[11px] font-semibold border border-amber-200/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            In Dev
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`launch-card relative group bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300`}>
      {/* Subtle top gradient accent indicator */}
      <div className={`absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r ${app.gradientBorder || 'from-blue-500/20 to-indigo-500/20'} rounded-t-full opacity-80 group-hover:opacity-100 transition-opacity`} />

      <div>
        {/* Top Bar: LordIcon + Favorite + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-36 h-36 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 "
          >
            <LordIconWrapper
              src={app.lordIconSrc}
              trigger={app.lordIconTrigger}
              size={76}
              fallbackIcon={renderFallbackIcon()}
            />
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={`p-1.5 rounded-xl transition-colors ${app.isFavorite
                ? 'text-amber-400 hover:text-amber-500 bg-amber-50 border border-amber-200/60'
                : 'text-slate-300 hover:text-slate-400 hover:bg-slate-100 border border-transparent'
                }`}
              title={app.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                className="w-4 h-4"
                fill={app.isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">
              {app.name}
            </h3>
            {app.badgeText && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                {app.badgeText}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-blue-600/90 mt-0.5">
            {app.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {app.description}
        </p>

        {/* Quick Metric Chip */}
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
        <button
          onClick={() => onInspectApp(app)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Details</span>
        </button>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20"
        >
          <span>Open App</span>
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
        </a>
      </div>
    </div>
  );
};
