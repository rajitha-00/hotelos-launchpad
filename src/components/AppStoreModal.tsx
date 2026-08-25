import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IAppItem } from '../interfaces';
import {
  X,
  ExternalLink,
  Sparkles,
  Layers,
  Users,
  BookOpen,
  Hotel,
  UtensilsCrossed,
  ShieldAlert,
  Globe,
  Wallet,
  Package,
} from 'lucide-react';
import { LordIconWrapper } from './icons';

interface AppStoreModalProps {
  app: IAppItem | null;
  onClose: () => void;
}

export const AppStoreModal: React.FC<AppStoreModalProps> = ({
  app,
  onClose,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!app) return null;

  const renderFallbackIcon = () => {
    switch (app.id) {
      case 'stay-os':
        return <Hotel className="w-8 h-8 text-white" />;
      case 'dine-os':
        return <UtensilsCrossed className="w-8 h-8 text-white" />;
      case 'super-admin':
        return <ShieldAlert className="w-8 h-8 text-white" />;
      case 'payments-os':
        return <Wallet className="w-8 h-8 text-white" />;
      case 'inventory-os':
        return <Package className="w-8 h-8 text-white" />;
      case 'public-web':
        return <Globe className="w-8 h-8 text-white" />;
      default:
        return <Sparkles className="w-8 h-8 text-white" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
        />

        {/* Morphing App Store Modal Container */}
        <motion.div
          layoutId={`card-container-${app.id}`}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
            mass: 0.8,
          }}
          className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/90 z-10 my-auto text-slate-900"
          style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        >
          {/* Top Hero Banner with Animated GIF Preview */}
          <motion.div
            layoutId={`card-image-container-${app.id}`}
            className="relative h-56 sm:h-64 shrink-0 flex items-center justify-center overflow-hidden select-none"
            style={{
              background: app.iconBg || 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
            }}
          >
            {/* Top Gloss Reflection */}
            <div
              aria-hidden="true"
              className="absolute top-0 inset-x-0 h-1/2 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            {/* Ambient Background Blur Glow */}
            <div className="absolute inset-0 bg-radial from-white/20 to-transparent pointer-events-none" />

            {/* Central Animated GIF / Icon Preview (iOS App Store Showcase) */}
            <div className="relative z-10 flex flex-col items-center justify-center scale-110 sm:scale-125 transition-transform">
              <div
                className="w-24 h-24 rounded-[26px] flex items-center justify-center text-white shadow-2xl border border-white/40 overflow-hidden relative"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)',
                }}
              >
                <LordIconWrapper
                  src={app.lordIconSrc}
                  trigger={app.lordIconTrigger}
                  size={64}
                  fallbackIcon={renderFallbackIcon()}
                />
              </div>
            </div>

            {/* Top Left Category Tag & Title Header */}
            <motion.div
              layoutId={`title-container-${app.id}`}
              className="absolute bottom-4 left-5 sm:bottom-6 sm:left-6 text-white z-10 drop-shadow-md"
            >
              <span className="text-xs font-extrabold uppercase tracking-wider text-white/80 bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                {app.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                {app.name}
              </h2>
            </motion.div>

            {/* Top Right Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 border border-white/20 shadow-md"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>

          {/* Scrollable Detailed App Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.12, duration: 0.22 }}
            className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6"
          >
            {/* Tagline & Quick Metadata Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  {app.tagline}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Operational Cloud Service
                  </span>
                </div>
              </div>

              {app.metrics && (
                <div className="bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-right">
                  <p className="text-xs text-slate-400 font-semibold uppercase">{app.metrics.label}</p>
                  <p className="text-sm font-extrabold text-slate-900">{app.metrics.value}</p>
                </div>
              )}
            </div>

            {/* About Application */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Overview & Capabilities
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {app.description}
              </p>
            </div>

            {/* Key Features List */}
            {app.features && app.features.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Key Features & Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {app.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50/90 px-3 py-2 rounded-xl border border-slate-200/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Authorized Roles */}
            {app.roles && app.roles.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Authorized User Roles</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {app.roles.map((role, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sticky Bottom Actions Bar */}
          <div className="p-4 sm:p-5 bg-slate-50/90 backdrop-blur-md border-t border-slate-200/90 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 hover:shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>Open Application</span>
              <ExternalLink className="w-4 h-4 stroke-[2.2]" />
            </a>

            {app.docUrl && (
              <a
                href={app.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 shadow-xs active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Documentation</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
