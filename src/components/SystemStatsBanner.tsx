import React from 'react';
import { ISystemMetrics } from '../interfaces';
import { LayoutGrid, Activity, Wifi, BedDouble, Users, Utensils } from 'lucide-react';

interface SystemStatsBannerProps {
  metrics: ISystemMetrics;
}

export const SystemStatsBanner: React.FC<SystemStatsBannerProps> = ({
  metrics,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-4">
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <LayoutGrid className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">Applications</p>
          <p className="text-sm font-bold text-slate-900">{metrics.activeAppsCount} Active</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Activity className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">API Health</p>
          <p className="text-sm font-bold text-slate-900">{metrics.apiLatencyMs} ms</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Wifi className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">SLA Uptime</p>
          <p className="text-sm font-bold text-slate-900">{metrics.systemUptime}</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <BedDouble className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">Rooms Tracked</p>
          <p className="text-sm font-bold text-slate-900">{metrics.totalRoomsManaged}</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <Users className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">Staff Active</p>
          <p className="text-sm font-bold text-slate-900">{metrics.activeStaffCount} Online</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <Utensils className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">F&B Orders</p>
          <p className="text-sm font-bold text-slate-900">{metrics.activeOrdersCount} Pending</p>
        </div>
      </div>
    </div>
  );
};
