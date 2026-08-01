import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';

export const Login = () => {
  const { setCurrentView, setCurrentRole, setUser, addToast } = useApp();
  const [email, setEmail] = useState('oviyas.cs24@bitsathy.ac.in');
  const [password, setPassword] = useState('oviya');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await apiService.loginUser(email, password);
      if (res.success) {
        setUser(res.user);
        setCurrentRole(res.user.role);
        addToast(`Welcome back, ${res.user.name}! JWT session started.`, 'success');
        setCurrentView('dashboard');
      }
    } catch (err) {
      setErrorMsg(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Sign In to LearnSphere</h2>
          <p className="text-xs text-slate-500 font-medium">Authentication connected to client database API</p>
        </div>



        {/* Error */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setCurrentView('forgot-password')}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 font-medium">
          Don't have an account?{' '}
          <button onClick={() => setCurrentView('register')} className="text-blue-600 font-bold hover:underline">
            Register Account
          </button>
        </p>
      </div>
    </div>
  );
};
