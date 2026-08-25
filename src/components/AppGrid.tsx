import React from 'react';
import { IAppItem } from '../interfaces';
import { AppTile } from './AppTile';
import { SearchX } from 'lucide-react';

interface AppGridProps {
  apps: IAppItem[];
  favoriteApps: IAppItem[];
  searchQuery: string;
  onToggleFavorite: (id: string) => void;
  onInspectApp: (app: IAppItem) => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  searchQuery,
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
    <div className="w-full py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4 sm:gap-x-8 justify-items-center">
        {apps.map((app) => (
          <AppTile
            key={app.id}
            app={app}
            onSelect={onInspectApp}
          />
        ))}
      </div>
    </div>
  );
};
