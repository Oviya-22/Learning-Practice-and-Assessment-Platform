import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, CheckCheck, Award, BookOpen, Clock, AlertCircle } from 'lucide-react';

export const NotificationDrawer = () => {
  const { notificationsOpen, setNotificationsOpen, notifications, markNotificationAsRead, markAllNotificationsRead } = useApp();

  if (!notificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md h-full glass-panel shadow-2xl flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Notifications</h3>
              <p className="text-xs text-gray-400">
                {notifications.filter(n => !n.read).length} unread alerts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              title="Mark all as read"
              className="p-2 text-xs font-medium text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors flex items-center gap-1"
            >
              <CheckCheck className="w-4 h-4" />
              Read All
            </button>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => {
            let IconComponent = Bell;
            let iconBg = 'bg-blue-500/20 text-blue-400';

            if (item.type === 'assignment') {
              IconComponent = BookOpen;
              iconBg = 'bg-emerald-500/20 text-emerald-400';
            } else if (item.type === 'exam') {
              IconComponent = Clock;
              iconBg = 'bg-amber-500/20 text-amber-400';
            } else if (item.type === 'badge') {
              IconComponent = Award;
              iconBg = 'bg-purple-500/20 text-purple-400';
            }

            return (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-slate-900/40 border-white/5 opacity-70 hover:opacity-100'
                    : 'bg-indigo-950/40 border-indigo-500/30 hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl shrink-0 ${iconBg}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-2">{item.message}</p>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
