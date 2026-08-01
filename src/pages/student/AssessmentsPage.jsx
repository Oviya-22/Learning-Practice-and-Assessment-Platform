import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { 
  ShieldCheck, Clock, ArrowRight, RefreshCw, 
  FileText, PlayCircle, BookOpen, BarChart2 
} from 'lucide-react';

export const AssessmentsPage = () => {
  const { setCurrentView, setActiveExam, addToast } = useApp();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.fetchAssessments().then(data => {
      setAssessments(data);
      setLoading(false);
    });
  }, []);

  const handleStartExam = (exam) => {
    setActiveExam(exam);
    setCurrentView('exam-session');
    addToast(`Starting: ${exam.title} — Secure proctoring enabled`, 'info');
  };

  const statusColor = (status) => {
    if (status === 'Available') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Upcoming') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const typeIcon = (type) => {
    if (type === 'Coding Contest') return '💻';
    if (type === 'Final Exam') return '🎓';
    if (type === 'Mid Exam') return '📝';
    return '🛡️';
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs">
          <RefreshCw className="w-8 h-8 text-blue-600 mx-auto animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-600">Fetching assessments from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Assessment & Examination Center</h2>
            <p className="text-xs text-blue-100">{assessments.length} exams available · Questions fetched from database</p>
          </div>
        </div>
        <div className="text-right bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
          <div className="text-xl font-extrabold">{assessments.filter(a => a.status === 'Available').length}</div>
          <div className="text-[10px] text-blue-100 uppercase font-bold">Available Now</div>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assessments.map(exam => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{typeIcon(exam.type)}</span>
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{exam.type}</p>
                </div>
              </div>
              {exam.proctoringEnabled && (
                <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase shrink-0">
                  🛡️ Proctored
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-slate-800 text-base leading-snug">{exam.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{exam.description}</p>

            {/* Sections */}
            <div className="flex flex-wrap gap-1.5">
              {exam.sections?.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-semibold">
                  {s}
                </span>
              ))}
            </div>

            {/* Meta Info Row */}
            <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
              <div>
                <div className="text-xs font-extrabold text-slate-800">{exam.totalMarks}</div>
                <div className="text-[10px] text-slate-400 font-medium">Total Marks</div>
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-800">{exam.durationMinutes} min</div>
                <div className="text-[10px] text-slate-400 font-medium">Duration</div>
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-800">{exam.passPercentage}%</div>
                <div className="text-[10px] text-slate-400 font-medium">Pass Mark</div>
              </div>
            </div>

            {/* DB Info */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              {exam.questionIds?.length || 0} questions loaded from database
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleStartExam(exam)}
              disabled={exam.status !== 'Available'}
              className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                exam.status === 'Available'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {exam.status === 'Available' ? (
                <><PlayCircle className="w-4 h-4" /> Launch Secure Exam Session</>
              ) : (
                <><Clock className="w-4 h-4" /> Upcoming — Not Yet Available</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
