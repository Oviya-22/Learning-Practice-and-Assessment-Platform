import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertTriangle, Lock } from 'lucide-react';

export const SecureProctorSim = ({ onAutoSubmit }) => {
  const { isExamActive, proctorWarnings, setProctorWarnings, addToast } = useApp();

  // Tab switch listener simulation
  useEffect(() => {
    if (!isExamActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setProctorWarnings(prev => {
          const nextCount = prev + 1;
          addToast(`SECURITY WARNING: Window blur / tab switch detected! (${nextCount}/3)`, 'warning');
          
          if (nextCount >= 3) {
            onAutoSubmit && onAutoSubmit();
          }
          return nextCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isExamActive, setProctorWarnings, addToast, onAutoSubmit]);

  if (!isExamActive) return null;

  return (
    <div className="w-full bg-rose-950/80 border-b border-rose-500/40 px-4 py-2 flex items-center justify-between text-xs text-rose-200">
      <div className="flex items-center gap-2 font-semibold">
        <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
        <span>SECURE PROCTORING ACTIVE</span>
        <span className="text-[10px] text-rose-300 bg-rose-900/60 px-2 py-0.5 rounded border border-rose-500/30">
          Tab Switch & Fullscreen Monitoring Enabled
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 font-mono">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Warnings Used:</span>
          <span className="font-bold text-amber-400">{proctorWarnings} / 3</span>
        </div>

        <button
          onClick={() => {
            setProctorWarnings(prev => {
              const next = prev + 1;
              addToast(`Simulated tab switch warning! Count: ${next}/3`, 'warning');
              if (next >= 3) onAutoSubmit && onAutoSubmit();
              return next;
            });
          }}
          className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-medium transition-colors"
        >
          Simulate Tab Switch Violation
        </button>
      </div>
    </div>
  );
};
