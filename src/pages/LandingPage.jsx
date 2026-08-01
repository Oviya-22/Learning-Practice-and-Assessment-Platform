import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, ShieldCheck, ArrowRight, CheckCircle2, 
  Flame, Bot, LogIn, Compass, GraduationCap, Award
} from 'lucide-react';

export const LandingPage = () => {
  const { setCurrentView, setCurrentRole, addToast } = useApp();

  const handleGetStarted = (role = 'student') => {
    setCurrentRole(role);
    setCurrentView('dashboard');
    addToast(`Welcome to LearnSphere ${role.toUpperCase()} portal!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Next-Gen AI Learning & Assessment Platform v2.5</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-900">
            Transform Learning & Certification with <br />
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Intelligence
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            LearnSphere merges Coursera curriculum quality, LeetCode coding practice, Duolingo gamification, Notion notebook notes, and AI proctoring into one unified platform.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleGetStarted('student')}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-500/25 hover:scale-105"
            >
              Explore Student Experience <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-600 font-extrabold text-sm transition-all shadow-xs hover:scale-105"
            >
              <LogIn className="w-4 h-4" /> Sign In to Portal
            </button>
          </div>

          {/* Feature Badges */}
          <div className="pt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Proctoring Simulation</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Adaptive Practice Engine</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verifiable PDF Certifications</span>
          </div>
        </div>

        {/* Dashboard Interactive Mock Preview Card */}
        <div className="mt-14 relative z-10 bg-white rounded-3xl p-4 border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-mono text-slate-500 ml-2">LearnSphere.edu/student-portal</span>
              </div>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Interactive Learning Hub
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Current Course</span>
                <h4 className="font-extrabold text-sm text-slate-900 mt-1">Full-Stack Development</h4>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-blue-600 w-[65%]"></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Daily Streak</span>
                <h4 className="font-extrabold text-sm text-amber-600 mt-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> 14 Days Active
                </h4>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase">AI Assistant</span>
                <h4 className="font-extrabold text-sm text-emerald-600 mt-1 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-emerald-600" /> Ready to Explain Code
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
