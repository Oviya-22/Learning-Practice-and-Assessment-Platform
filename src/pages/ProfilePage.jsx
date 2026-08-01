import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, ShieldCheck, Key, Save, Camera, Check } from 'lucide-react';

export const ProfilePage = () => {
  const { user, setUser, addToast } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [bio, setBio] = useState(user.bio || '');
  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name, phone, bio, twoFactorEnabled: twoFactor }));
    addToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-5 border-b border-white/10 pb-6">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30" />
            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-indigo-600 text-white shadow-md">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-indigo-300 font-mono">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">
              {user.role} Account
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* 2FA Security Toggle */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Two-Factor Authentication (2FA)
              </h4>
              <p className="text-[11px] text-gray-400">Secure your account using TOTP Authenticator apps</p>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactor(!twoFactor)}
              className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                twoFactor ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
            >
              {twoFactor ? 'Enabled ✓' : 'Disabled'}
            </button>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-md shadow-indigo-600/30 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
