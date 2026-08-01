import React from 'react';
import { MOCK_AUDIT_LOGS, MOCK_SYSTEM_HEALTH } from '../../data/mockData';
import { ShieldAlert, Activity, Server, Database, Cpu } from 'lucide-react';

export const AuditLogs = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Telemetry Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Server CPU Load</span>
          <h4 className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-1 justify-center md:justify-start">
            <Cpu className="w-4 h-4" /> {MOCK_SYSTEM_HEALTH.cpuUsage}% Normal
          </h4>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Active WebSockets</span>
          <h4 className="text-xl font-bold text-indigo-400 mt-1 flex items-center gap-1 justify-center md:justify-start">
            <Activity className="w-4 h-4" /> {MOCK_SYSTEM_HEALTH.activeWebsockets}
          </h4>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-semibold">API Latency</span>
          <h4 className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-1 justify-center md:justify-start">
            <Server className="w-4 h-4" /> {MOCK_SYSTEM_HEALTH.apiLatencyMs} ms
          </h4>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-semibold">System Uptime</span>
          <h4 className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-1 justify-center md:justify-start">
            <Database className="w-4 h-4" /> {MOCK_SYSTEM_HEALTH.uptime}
          </h4>
        </div>
      </div>

      {/* Security Audit Trail Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" /> Platform Security Audit Trail Logs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[11px] text-gray-400 uppercase bg-white/5 border-b border-white/10 font-mono">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Initiating User</th>
                <th className="p-3">Event Action</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {MOCK_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-gray-400">{log.timestamp}</td>
                  <td className="p-3 text-indigo-300 font-semibold">{log.user}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-amber-400">{log.ip}</td>
                  <td className="p-3 text-gray-300 font-sans">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
