import React from 'react';
import { useLaunchpad } from '../hooks';
import {
  LaunchpadHeader,
  SearchBar,
  CategoryFilterBar,
  SystemStatsBanner,
  AppGrid,
  QuickLaunchDrawer,
} from '../components';
import { Sparkles, ArrowRight } from 'lucide-react';

export const LaunchpadContainer: React.FC = () => {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top sticky header */}
      <LaunchpadHeader
        activeTenant={activeTenant}
        tenants={tenants}
        onSelectTenant={setActiveTenant}
      />

      {/* Main portal layout container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Minimal Hero Header Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-600/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide text-blue-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hotel OS Unified Central Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome to Hotel OS Launchpad
              </h1>
              <p className="text-sm text-blue-100/90 leading-relaxed">
                Seamlessly launch, monitor, and switch between Property Management, Kitchen POS, Platform Super Admin, and REST API microservices.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="http://localhost:5174"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-md flex items-center gap-1.5"
              >
                <span>Launch PMS Desk</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </a>
              <a
                href="http://localhost:5175"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors backdrop-blur-md border border-white/20 flex items-center gap-1.5"
              >
                <span>Kitchen POS</span>
              </a>
            </div>
          </div>
        </section>

        {/* Live System Operational Metrics Banner */}
        <SystemStatsBanner metrics={metrics} />

        {/* Search & Filter Toolbar Section */}
        <section className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <div className="text-xs text-slate-500 font-medium hidden lg:block">
              Press <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">Cmd+K</kbd> to quick search
            </div>
          </div>

          <CategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        {/* Core Application Grid */}
        <AppGrid
          apps={filteredApps}
          favoriteApps={favoriteApps}
          searchQuery={searchQuery}
          onToggleFavorite={toggleFavorite}
          onInspectApp={setInspectApp}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Hotel OS Ecosystem</span>
            <span>•</span>
            <span>v1.0.0 Light Launchpad</span>
          </div>
          <p className="text-slate-400">
            © 2026 Hotel OS Operations Suite. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Inspect / Quick Launch Drawer */}
      <QuickLaunchDrawer
        app={inspectApp}
        activeTenant={activeTenant}
        onClose={() => setInspectApp(null)}
      />
    </div>
  );
};
