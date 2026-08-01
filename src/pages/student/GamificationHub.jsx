import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_GAMIFICATION } from '../../data/mockData';
import { Trophy, Flame, Zap, Award, Sparkles, Star, Shield, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GamificationHub = () => {
  const { user, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'badges' | 'challenges'

  const handleBadgeClick = (badge) => {
    if (badge.unlocked) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      addToast(`Badge Unlocked: ${badge.name}! ${badge.description}`, 'success');
    } else {
      addToast(`Locked Badge: ${badge.name}. Keep practicing to unlock!`, 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Hero Stats Card */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950/60 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-8 h-8 fill-amber-400" />
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase font-semibold">Daily Streak</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{user.streakDays} Days 🔥</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
            <Zap className="w-8 h-8 fill-indigo-400" />
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase font-semibold">Total XP</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{user.xp} XP</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase font-semibold">Current Level</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">Level {user.level}</h3>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-400 font-semibold mb-1">Next Level Goal</span>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" style={{ width: '70%' }}></div>
          </div>
          <span className="text-[11px] text-gray-400 text-right mt-1 font-mono">3,450 / 4,000 XP</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-3 p-1 bg-white/5 rounded-2xl border border-white/10 max-w-md">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'leaderboard' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'badges' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          🎖️ Badges & Honors
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'leaderboard' ? (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" /> Global Student Leaderboard
          </h3>

          <div className="space-y-2">
            {MOCK_GAMIFICATION.leaderboard.map((student) => (
              <div
                key={student.rank}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  student.rank === 2
                    ? 'bg-indigo-950/60 border-indigo-500/50 shadow-lg'
                    : 'bg-slate-900/50 border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-xl font-bold font-mono text-xs flex items-center justify-center ${
                    student.rank === 1 ? 'bg-amber-500 text-slate-950' :
                    student.rank === 2 ? 'bg-indigo-600 text-white' :
                    student.rank === 3 ? 'bg-slate-400 text-slate-950' : 'bg-white/10 text-gray-400'
                  }`}>
                    #{student.rank}
                  </span>

                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-xl object-cover" />

                  <div>
                    <h4 className="font-bold text-xs text-white">{student.name}</h4>
                    <span className="text-[10px] text-gray-400">🔥 {student.streak} Day Streak</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-sm text-amber-400">{student.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_GAMIFICATION.badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                badge.unlocked
                  ? 'glass-card border-indigo-500/40 hover:scale-105'
                  : 'bg-slate-950/40 border-white/5 opacity-50 hover:opacity-75'
              }`}
            >
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h4 className="font-bold text-sm text-white flex items-center justify-between">
                {badge.name}
                {badge.unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-500" />
                )}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
              {badge.unlocked && (
                <span className="inline-block mt-3 text-[10px] font-mono text-indigo-400">
                  Unlocked: {badge.unlockedAt}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
