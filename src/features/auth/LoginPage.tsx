import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { NamiOsLogo } from '../../components/NamiOsLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const { login, isLoading, requestPostLoginRipple } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email address and password.');
      return;
    }

    const result = await login(email.trim(), password);
    if (result.success) {
      navigate(from, { replace: true });
      window.requestAnimationFrame(requestPostLoginRipple);
    } else {
      setError(result.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90">
        {/* Nami OS Brand Header */}
        <div className="text-center mb-8">
          <NamiOsLogo size="full" variant="master" className="justify-center mb-3" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Nami Launchpad</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Sign in to the unified property & service launcher
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold leading-relaxed">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hotelos.io"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-blue-500/20 mt-6 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Log in</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Protected by enterprise-grade 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};
