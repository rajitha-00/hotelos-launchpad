import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200 shadow-xl space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div>
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
            404
          </span>
          <h1 className="text-lg font-bold text-slate-800 mt-1">
            Application Route Not Found
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            The page or module URL you requested does not exist or has been moved within the NamiOS ecosystem.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home Launchpad</span>
        </button>
      </div>
    </div>
  );
};
