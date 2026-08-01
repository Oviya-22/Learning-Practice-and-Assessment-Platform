import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Moon, Sun, Bell, Shield, Globe, Eye } from 'lucide-react';

export const SettingsPage = () => {
  const { theme, toggleTheme, addToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" /> Platform Preferences & Settings
        </h2>

        <div className="space-y-4">
          {/* Theme setting */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
              <div>
                <h4 className="font-bold text-xs text-white">Appearance Theme</h4>
                <p className="text-[11px] text-gray-400">Switch between dark glassmorphism and crisp light theme</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          {/* Notifications */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="font-bold text-xs text-white">Push & Email Reminders</h4>
                <p className="text-[11px] text-gray-400">Receive exam deadlines and assignment evaluation alerts</p>
              </div>
            </div>
            <button
              onClick={() => addToast('Notification preferences saved', 'info')}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Enabled
            </button>
          </div>

          {/* Language */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-purple-400" />
              <div>
                <h4 className="font-bold text-xs text-white">Interface Language</h4>
                <p className="text-[11px] text-gray-400">Select default UI language</p>
              </div>
            </div>
            <select className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
