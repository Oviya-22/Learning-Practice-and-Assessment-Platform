import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = Info;
        let bgClass = 'bg-blue-900/90 border-blue-500/50 text-blue-200';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          bgClass = 'bg-emerald-900/90 border-emerald-500/50 text-emerald-200';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          bgClass = 'bg-amber-900/90 border-amber-500/50 text-amber-200';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          bgClass = 'bg-rose-900/90 border-rose-500/50 text-rose-200';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-float ${bgClass}`}
          >
            <div className="flex items-start gap-3">
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
