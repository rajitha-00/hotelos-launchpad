import React, { useState } from 'react';
import { IAppItem, ITenantInfo } from '../interfaces';
import {
  X,
  ExternalLink,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Layers,
  Users,
  BookOpen,
} from 'lucide-react';

interface QuickLaunchDrawerProps {
  app: IAppItem | null;
  activeTenant: ITenantInfo;
  onClose: () => void;
}

export const QuickLaunchDrawer: React.FC<QuickLaunchDrawerProps> = ({
  app,
  activeTenant,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!app) return null;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(app.devCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 p-6">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-xs"
                style={{ backgroundColor: app.iconBg, color: app.iconColor }}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {app.name}
                </h2>
                <p className="text-xs font-semibold text-blue-600">
                  {app.tagline}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Tenant Context Notice */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <p className="font-bold text-slate-700 flex items-center gap-1.5">
              <span>Selected Tenant Context:</span>
              <span className="text-blue-600 font-extrabold">{activeTenant.name}</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Opening this app will load configuration for {activeTenant.city} ({activeTenant.roomsCount} rooms).
            </p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              About Application
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* Dev Command Copy */}
          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span>Local Dev Terminal Command</span>
            </h3>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800">
              <span className="truncate mr-2">{app.devCommand}</span>
              <button
                onClick={handleCopyCmd}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy command"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Core Features */}
          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Key Features</span>
            </h3>
            <ul className="space-y-1.5">
              {app.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Authorized Roles */}
          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Authorized Roles</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {app.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 mt-6 space-y-2">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
          >
            <span>Launch App (Port {app.port})</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {app.docUrl && (
            <a
              href={app.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Documentation</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
