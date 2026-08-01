import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, Search, Bell, Sun, Moon, Shield, GraduationCap, 
  UserCheck, Settings, LogOut, ChevronDown, User, Zap, Lock
} from 'lucide-react';
import { MOCK_ROLES_INFO } from '../../data/mockData';

export const Navbar = () => {
  const { 
    currentRole, setCurrentRole, currentView, setCurrentView, 
    user, setSearchOpen, setNotificationsOpen, notifications, addToast 
  } = useApp();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSelect = (roleKey) => {
    setCurrentRole(roleKey);
    setRoleDropdownOpen(false);
    addToast(`Switched portal view to ${MOCK_ROLES_INFO[roleKey].title}`, 'info');
    if (currentView === 'landing' || currentView === 'login' || currentView === 'register') {
      setCurrentView('dashboard');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'LQ';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Brand & Logo */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-blue-700">
              LearnSphere
            </span>
            <span className="block text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
              AI Assessment Platform
            </span>
          </div>
        </div>

        {/* Global Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>{MOCK_ROLES_INFO[currentRole]?.badge || 'Portal'} View</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                Switch Portal Role
              </div>
              {Object.keys(MOCK_ROLES_INFO).map((rKey) => (
                <button
                  key={rKey}
                  onClick={() => handleRoleSelect(rKey)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                    currentRole === rKey
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  {MOCK_ROLES_INFO[rKey].title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Search Trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-700 text-xs w-72 transition-all"
      >
        <Search className="w-4 h-4 text-blue-600" />
        <span className="flex-1 text-left">Search courses, labs, exams...</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-500 shadow-2xs">
          ⌘K
        </kbd>
      </button>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        {/* JWT Session status chip */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
          <Lock className="w-3 h-3" />
          JWT Active Session
        </div>

        {/* Notifications Bell */}
        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          )}
        </button>

        {/* User Profile Menu with Initial Badge (No Photo Avatar) */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-all"
          >
            {/* Clean Initial Badge */}
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {getInitials(user.name)}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-slate-800 leading-tight">
                {user.name}
              </span>
              <span className="block text-[10px] text-slate-500 font-medium capitalize">
                {user.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-800">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('profile');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <User className="w-4 h-4 text-blue-600" /> Profile Details
              </button>

              <button
                onClick={() => {
                  setCurrentView('settings');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Settings className="w-4 h-4 text-blue-600" /> App Settings
              </button>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={() => {
                  setCurrentView('login');
                  setProfileMenuOpen(false);
                  addToast('Logged out of session', 'info');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
