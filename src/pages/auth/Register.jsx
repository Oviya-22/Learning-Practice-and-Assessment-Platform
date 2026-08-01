import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Register = () => {
  const { setCurrentView, setCurrentRole, addToast } = useApp();
  const [role, setRole] = useState('student'); // 'student' | 'faculty'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!otpStep) {
      setOtpStep(true);
      addToast(`OTP verification code sent to ${email} (Demo: 999888)`, 'info');
    } else {
      addToast('Account created successfully! Welcome to LearnSphere.', 'success');
      setCurrentRole(role);
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-6 bg-[#0b0f19]">
      <div className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create LearnSphere Account</h2>
          <p className="text-xs text-gray-400">Join over 50,000+ students and educators</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`p-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              role === 'student'
                ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            🎓 Register as Student
          </button>
          <button
            type="button"
            onClick={() => setRole('faculty')}
            className={`p-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              role === 'faculty'
                ? 'bg-emerald-600/30 border-emerald-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            👩‍🏫 Register as Faculty
          </button>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {!otpStep ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex.rivera@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <div className="space-y-3 text-center py-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-sm text-white">Enter OTP Verification Code</h3>
              <p className="text-xs text-gray-400">Code sent to {email}</p>
              <input
                type="text"
                placeholder="999888"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500 rounded-xl px-4 py-3 text-sm text-white font-mono text-center tracking-widest focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            {otpStep ? 'Verify & Complete Account Setup' : 'Continue to Verification'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Already have an account?{' '}
          <button onClick={() => setCurrentView('login')} className="text-indigo-400 font-semibold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
