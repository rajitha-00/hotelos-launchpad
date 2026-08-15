import React from 'react';
import { IAppItem } from '../interfaces';
import { AppCard } from './AppCard';
import { Star, SearchX } from 'lucide-react';

interface AppGridProps {
  apps: IAppItem[];
  favoriteApps: IAppItem[];
  searchQuery: string;
  onToggleFavorite: (id: string) => void;
  onInspectApp: (app: IAppItem) => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  favoriteApps,
  searchQuery,
  onToggleFavorite,
  onInspectApp,
}) => {
  if (apps.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs my-8 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          No Applications Found
        </h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          No matches for &quot;{searchQuery}&quot;. Try searching for &quot;PMS&quot;, &quot;POS&quot;, &quot;Admin&quot;, or port numbers like &quot;5174&quot;.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 my-6">
      {/* Favorites Section (if any & no search query) */}
      {!searchQuery && favoriteApps.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 rounded-lg bg-amber-50 text-amber-500">
              <Star className="w-4 h-4" fill="currentColor" />
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Starred Shortcuts
            </h2>
            <span className="text-xs text-slate-400">({favoriteApps.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteApps.map((app) => (
              <AppCard
                key={`fav-${app.id}`}
                app={app}
                onToggleFavorite={onToggleFavorite}
                onInspectApp={onInspectApp}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Grid Section */}
      <section>
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {searchQuery ? `Search Results (${apps.length})` : 'All Applications & Modules'}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {apps.length} Applications Available
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onToggleFavorite={onToggleFavorite}
              onInspectApp={onInspectApp}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
