import React, { useState, useEffect } from 'react';
import { ITenantInfo } from '../interfaces';
import { useAuth } from '../features/auth/AuthContext';
import { NamiOsLogo } from './NamiOsLogo';
import {
  Building2,
  ChevronDown,
  ShieldCheck,
  Clock,
  LogOut,
} from 'lucide-react';

interface LaunchpadHeaderProps {
  activeTenant: ITenantInfo;
  tenants?: ITenantInfo[];
  onSelectTenant: (tenant: ITenantInfo) => void;
}

export const LaunchpadHeader: React.FC<LaunchpadHeaderProps> = ({
  activeTenant,
  tenants = [],
  onSelectTenant,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tenantList = tenants;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Nami OS Dynamic Brand Logo */}
        <NamiOsLogo size="compact" variant="master" />

        {/* Tenant Switcher, Time & User */}
        <div className="flex items-center gap-3">
          {/* Live System Operational Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-dot-active" />
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Systems Operational</span>
          </div>

          {/* Time Clock */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentTime || '10:30:00 AM'}</span>
          </div>

          {/* Tenant Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-label="Select property"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition-all shadow-xs"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="max-w-[130px] sm:max-w-[180px] truncate">
                {activeTenant?.name || 'Select Property'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-20 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Active Property / Tenant
                    </p>
                    <p className="text-xs text-slate-600 font-medium">
                      Select property context
                    </p>
                  </div>
                  {tenantList.length === 0 && (
                    <p className="px-3 py-3 text-xs text-amber-700 bg-amber-50 rounded-xl">
                      No property is assigned to this account.
                    </p>
                  )}
                  {tenantList.map((tenant) => (
                    <button
                      key={tenant.id}
                      onClick={() => {
                        onSelectTenant(tenant);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        activeTenant?.id === tenant.id
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
                          : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{tenant.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {tenant.city}, {tenant.country} • {tenant.roomsCount} Rooms
                        </p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-600 font-bold">
                        {tenant.tier}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Authenticated User & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            {user?.avatarUrl || (typeof window !== 'undefined' && window.localStorage.getItem('hotelos.avatar')) ? (
              <img
                src={user?.avatarUrl || window.localStorage.getItem('hotelos.avatar')!}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-800 flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight font-mono">
                {user?.email || 'admin@hotelos.io'}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1"
              title="Sign Out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
