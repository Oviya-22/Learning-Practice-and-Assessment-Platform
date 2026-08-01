import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Download, FileSpreadsheet, FileText, Calendar, Filter } from 'lucide-react';

export const ReportsPage = () => {
  const { addToast } = useApp();
  const [reportType, setReportType] = useState('student');
  const [dateRange, setDateRange] = useState('30days');

  const handleExport = (format) => {
    addToast(`Exporting ${reportType.toUpperCase()} Analytics report as ${format.toUpperCase()}...`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" /> Platform Analytics & Report Generator
          </h2>
          <p className="text-xs text-gray-400">Generate, view, and export compliance and performance reports</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
          >
            <FileText className="w-4 h-4" /> Export PDF
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export CSV / Excel
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-semibold">Report Type:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none"
          >
            <option value="student">Student Performance & Progress</option>
            <option value="faculty">Faculty Course Completion Rates</option>
            <option value="assessment">Assessment & Question Analysis</option>
            <option value="attendance">Daily Activity & Attendance Log</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-semibold">Timeframe:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="year">Academic Year 2026</option>
          </select>
        </div>
      </div>

      {/* Analytics Summary Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center">
          <span className="text-xs text-gray-400 uppercase font-semibold">Average Score</span>
          <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">88.5%</h3>
          <p className="text-[11px] text-gray-400 mt-1">+4.2% from previous period</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center">
          <span className="text-xs text-gray-400 uppercase font-semibold">Course Completion Rate</span>
          <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">74.2%</h3>
          <p className="text-[11px] text-gray-400 mt-1">1,054 certificates issued</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center">
          <span className="text-xs text-gray-400 uppercase font-semibold">Exam Integrity Rate</span>
          <h3 className="text-3xl font-extrabold text-amber-400 mt-1">99.1%</h3>
          <p className="text-[11px] text-gray-400 mt-1">Proctoring violation rate &lt; 0.9%</p>
        </div>
      </div>
    </div>
  );
};
