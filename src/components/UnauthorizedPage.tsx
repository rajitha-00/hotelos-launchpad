import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200 shadow-xl space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
            403 Access Denied
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 mt-2">
            Unauthorized Access
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            You do not have the required role permissions to open this application module. Please contact your Super Admin.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Required Role:</span>
          </div>
          <p className="text-slate-600 font-mono text-[11px]">
            SUPER_ADMIN or PLATFORM_OWNER
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Launchpad</span>
        </button>
      </div>
    </div>
  );
};
