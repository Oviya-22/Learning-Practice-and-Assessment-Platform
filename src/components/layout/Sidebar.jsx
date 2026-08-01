import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { 
  LayoutDashboard, BookOpen, Compass, Dumbbell, ShieldCheck, 
  FileText, Award, Trophy, BarChart3, Settings, PlusCircle, 
  Users, ShieldAlert, Activity, PlayCircle, Flame, Zap, Lock
} from 'lucide-react';

export const Sidebar = () => {
  const { currentRole, currentView, setCurrentView, user, activeCourse } = useApp();

  const menuConfig = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'courses', label: 'Explore Courses', icon: BookOpen },
      { id: 'learning-path', label: 'Skill Roadmaps', icon: Compass },
      { id: 'practice', label: 'Adaptive Practice', icon: Dumbbell },
      { id: 'assessments', label: 'Assessments & Exams', icon: ShieldCheck },
      { id: 'assignments', label: 'Assignments', icon: FileText },
      { id: 'certificates', label: 'Certificates', icon: Award },
      { id: 'leaderboard', label: 'Gamification & XP', icon: Trophy },
      { id: 'reports', label: 'Analytics Reports', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
    faculty: [
      { id: 'dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
      { id: 'faculty-course-create', label: 'Create Course', icon: PlusCircle },
      { id: 'courses', label: 'Manage Courses', icon: BookOpen },
      { id: 'assignments', label: 'Grade Assignments', icon: FileText },
      { id: 'assessments', label: 'Exam Builder', icon: ShieldCheck },
      { id: 'reports', label: 'Student Analytics', icon: BarChart3 },
      { id: 'settings', label: 'Faculty Settings', icon: Settings },
    ],
    admin: [
      { id: 'dashboard', label: 'Admin Overview', icon: LayoutDashboard },
      { id: 'admin-users', label: 'User Management', icon: Users },
      { id: 'courses', label: 'Course Moderation', icon: BookOpen },
      { id: 'assessments', label: 'Assessment Audit', icon: ShieldCheck },
      { id: 'certificates', label: 'Certificate Registry', icon: Award },
      { id: 'reports', label: 'Platform Reports', icon: BarChart3 },
      { id: 'settings', label: 'System Settings', icon: Settings },
    ],
    superadmin: [
      { id: 'dashboard', label: 'Control Center', icon: LayoutDashboard },
      { id: 'superadmin-logs', label: 'Audit Logs', icon: ShieldAlert },
      { id: 'superadmin-permissions', label: 'Roles & RBAC', icon: Lock },
      { id: 'admin-users', label: 'All Platform Users', icon: Users },
      { id: 'reports', label: 'Global Telemetry', icon: Activity },
      { id: 'settings', label: 'Platform Config', icon: Settings },
    ],
  };

  const getInitials = (name) => {
    if (!name) return 'LQ';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const currentMenu = menuConfig[currentRole] || menuConfig.student;

  return (
    <aside className="w-64 h-[calc(100vh-65px)] sticky top-[65px] bg-white border-r border-slate-200 flex flex-col justify-between p-4 overflow-y-auto shrink-0 hidden md:flex shadow-xs">
      <div className="space-y-5">
        {/* User Info Strip for Students */}
        {currentRole === 'student' && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                <p className="text-[10px] text-slate-500 capitalize">{user.role} Account</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="flex items-center gap-1 text-amber-700">
                <Flame className="w-3.5 h-3.5 fill-amber-500" /> {user.streakDays || 14} Day Streak
              </span>
              <span className="flex items-center gap-1 text-blue-700">
                <Zap className="w-3.5 h-3.5 fill-blue-500" /> Lvl {user.level || 12}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-blue-100">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>{user.xp || 3450} XP</span>
              <span>4,000 XP next level</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div>
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Navigation
          </div>
          <nav className="space-y-0.5">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Resume Learning CTA */}
      {currentRole === 'student' && activeCourse && (
        <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
            <PlayCircle className="w-4 h-4 text-blue-600" /> Continue Learning
          </div>
          <p className="text-[11px] text-slate-700 font-semibold leading-snug truncate">{activeCourse.title}</p>
          <button
            onClick={() => setCurrentView('learning-view')}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20"
          >
            Resume Course
          </button>
        </div>
      )}
    </aside>
  );
};
