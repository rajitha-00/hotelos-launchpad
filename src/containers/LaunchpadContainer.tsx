import React, { useState } from 'react';
import { LayoutGrid, Activity } from 'lucide-react';
import { InstallApp } from '../components/InstallApp';
import { AnimatePresence } from 'framer-motion';
import { useLaunchpad } from '../hooks';
import {
  LaunchpadHeader,
  SearchBar,
  CategoryFilterBar,
  SystemStatsBanner,
  AppGrid,
  AppStoreModal,
} from '../components';
export const LaunchpadContainer: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<'apps' | 'activity'>('apps');
  const {
    filteredApps,
    favoriteApps,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeTenant,
    tenants,
    setActiveTenant,
    inspectApp,
    setInspectApp,
    toggleFavorite,
    metrics,
  } = useLaunchpad();

  return (
    <div className="nami-launchpad min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900" data-mobile-tab={mobileTab}>
      {/* Top sticky header */}
      <LaunchpadHeader
        activeTenant={activeTenant}
        tenants={tenants}
        onSelectTenant={setActiveTenant}
      />

      {/* Main portal layout container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Main App Launcher Card (Matching AppLauncher design) */}
        <section className="nami-launchpad-apps bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
          <div className="nami-launchpad-heading"><div><p>Your workspace</p><h1>Applications</h1></div><InstallApp /></div>
          {/* Search Bar */}
          <div className="relative">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Category Filter Pills */}
          <CategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* iOS Squircle App Grid */}
          <div className="pt-2">
            <AppGrid
              apps={filteredApps}
              favoriteApps={favoriteApps}
              searchQuery={searchQuery}
              onToggleFavorite={toggleFavorite}
              onInspectApp={setInspectApp}
            />
          </div>

          {/* Card Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="font-semibold text-slate-600">NamiOS Suite</span>
            <span>Choose an app to get started</span>
          </div>
        </section>

        {/* Live System Operational Metrics Banner */}
        <section className="nami-launchpad-activity" aria-label="System activity"><SystemStatsBanner metrics={metrics} /></section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">NamiOS Ecosystem</span>
            <span>•</span>
            <span>v1.0.0 Light Launchpad</span>
          </div>
          <p className="text-slate-400">
            © 2026 NamiOS Operations Suite. All rights reserved.
          </p>
        </div>
      </footer>

      <nav className="nami-launchpad-tabs" aria-label="Launcher navigation">
        <button type="button" aria-current={mobileTab === 'apps' ? 'page' : undefined} onClick={() => setMobileTab('apps')}><LayoutGrid size={22} />Apps</button>
        <button type="button" aria-current={mobileTab === 'activity' ? 'page' : undefined} onClick={() => setMobileTab('activity')}><Activity size={22} />Activity</button>
      </nav>
      {/* iOS App Store Morphing Modal */}
      <AnimatePresence>
        {inspectApp && (
          <AppStoreModal
            app={inspectApp}
            onClose={() => setInspectApp(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
