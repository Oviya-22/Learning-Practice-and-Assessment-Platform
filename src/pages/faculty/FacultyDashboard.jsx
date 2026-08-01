import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Users, FileCheck, PlusCircle, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { MOCK_COURSES, MOCK_ASSIGNMENTS } from '../../data/mockData';

export const FacultyDashboard = () => {
  const { setCurrentView, addToast } = useApp();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Faculty Instructor Portal
          </span>
          <h2 className="text-2xl font-extrabold text-white">Instructor Control Center</h2>
          <p className="text-xs text-gray-300">Manage course syllabi, grade student submissions, and analyze assessment metrics.</p>
        </div>

        <button
          onClick={() => setCurrentView('faculty-course-create')}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* Widget Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">4 Courses</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Total Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">1,420</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Pending Grading Queue</span>
            <FileCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 mt-2">14 Submissions</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Class Pass Average</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">91.4%</p>
        </div>
      </div>

      {/* Grading Queue Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Pending Assignments Grading Queue</h3>
          <span className="text-xs text-gray-400 font-mono">14 Pending Reviews</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[11px] text-gray-400 uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-3">Assignment Title</th>
                <th className="p-3">Course</th>
                <th className="p-3">Submissions</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_ASSIGNMENTS.map((asg) => (
                <tr key={asg.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-white">{asg.title}</td>
                  <td className="p-3 text-indigo-400">{asg.courseName}</td>
                  <td className="p-3 font-mono">{asg.submittedCount}/{asg.totalStudents}</td>
                  <td className="p-3">
                    <button
                      onClick={() => addToast(`Opening grading rubric for ${asg.title}`, 'info')}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
                    >
                      Grade Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
