import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Clock, BookOpen, CheckCircle2, ChevronDown, ArrowLeft, Play, Award, Users } from 'lucide-react';

export const CourseDetail = () => {
  const { activeCourse, setCurrentView, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'outcomes' | 'instructor'
  const [openChapterIdx, setOpenChapterIdx] = useState(0);

  if (!activeCourse) return null;

  const handleEnrollNow = () => {
    addToast(`Successfully enrolled in ${activeCourse.title}!`, 'success');
    setCurrentView('learning-view');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <button
        onClick={() => setCurrentView('courses')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Hero Course Header */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/40 shadow-2xl">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              {activeCourse.category}
            </span>
            <span className="text-gray-400 font-medium">• {activeCourse.difficulty}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {activeCourse.title}
          </h1>

          <p className="text-xs text-gray-300 leading-relaxed">{activeCourse.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-300 pt-2">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" /> {activeCourse.rating} ({activeCourse.ratingCount} reviews)
            </span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-400" /> {activeCourse.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-indigo-400" /> {activeCourse.totalLessons} Lessons</span>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={handleEnrollNow}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-600/40 hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Start Learning Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass-card rounded-2xl p-2 border border-white/10 overflow-hidden shadow-2xl">
            <img src={activeCourse.thumbnail} alt={activeCourse.title} className="w-full h-48 object-cover rounded-xl" />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex items-center gap-3 p-1 bg-white/5 rounded-2xl border border-white/10 max-w-md">
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'curriculum' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Curriculum
        </button>
        <button
          onClick={() => setActiveTab('outcomes')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'outcomes' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Outcomes & Requirements
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'curriculum' ? (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-white">Syllabus Breakdown ({activeCourse.chapters?.length || 3} Modules)</h3>

          <div className="space-y-3">
            {activeCourse.chapters?.map((ch, cIdx) => (
              <div key={ch.id} className="border border-white/10 rounded-2xl overflow-hidden bg-slate-900/60">
                <button
                  onClick={() => setOpenChapterIdx(openChapterIdx === cIdx ? -1 : cIdx)}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold text-white hover:bg-white/5 transition-colors text-left"
                >
                  <span>{ch.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openChapterIdx === cIdx ? 'rotate-180' : ''}`} />
                </button>

                {openChapterIdx === cIdx && (
                  <div className="p-4 pt-0 space-y-2 border-t border-white/5">
                    {ch.lessons.map((les) => (
                      <div key={les.id} className="flex items-center justify-between text-xs text-gray-300 p-2 rounded-xl hover:bg-white/5">
                        <span className="font-medium">{les.title}</span>
                        <span className="text-[11px] font-mono text-gray-400">{les.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <div>
            <h3 className="font-bold text-sm text-white mb-3">What You Will Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeCourse.learningOutcomes?.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
