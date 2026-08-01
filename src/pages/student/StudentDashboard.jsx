import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_COURSES, MOCK_ASSIGNMENTS } from '../../data/mockData';
import { ASSESSMENT_LIST } from '../../data/assessmentData';
import { Flame, Zap, Trophy, Clock, BookOpen, ArrowRight, PlayCircle, AlertCircle, Award, CheckCircle2 } from 'lucide-react';

export const StudentDashboard = () => {
  const { user, setCurrentView, setActiveCourse, setActiveExam, addToast } = useApp();

  const activeCourse = MOCK_COURSES[0];

  const handleStartCourse = (course) => {
    setActiveCourse(course);
    setCurrentView('learning-view');
  };

  const getInitials = (name) => {
    if (!name) return 'AR';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white font-black text-xl flex items-center justify-center border border-white/30 shadow-md shrink-0">
            {getInitials(user.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold">Welcome back, {user.name}!</h2>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-extrabold flex items-center gap-1 border border-amber-300/30">
                <Flame className="w-3.5 h-3.5 fill-amber-400" /> {user.streakDays || 14} Day Streak
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-1">You are on track to complete 2 certificates this month. Keep up the great pace!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] text-blue-100 uppercase font-bold tracking-wider">Level</span>
            <p className="text-xl font-black text-white mt-0.5">Level {user.level || 12}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] text-blue-100 uppercase font-bold tracking-wider">Earned XP</span>
            <p className="text-xl font-black text-amber-300 mt-0.5">{user.xp || 3450} XP</p>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Continue Learning & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Featured Card (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" /> In Progress Course
              </span>
              <span className="text-xs text-slate-500 font-semibold">{activeCourse.completedLessons}/{activeCourse.totalLessons} Lessons</span>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
              <img src={activeCourse.thumbnail} alt={activeCourse.title} className="w-full md:w-36 h-24 rounded-xl object-cover shrink-0 border border-slate-100" />
              <div className="space-y-1.5 flex-1">
                <h3 className="font-bold text-base text-slate-900">{activeCourse.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{activeCourse.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 font-medium">
                  <span>Instructor: {activeCourse.instructor}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">Progress: 65%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Next Lesson: <strong>{activeCourse.chapters[0]?.lessons[1]?.title || 'Advanced Hooks'}</strong></span>
              <button
                onClick={() => handleStartCourse(activeCourse)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
              >
                Resume Learning <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Assessments & Deadlines (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> Upcoming Assessments
            </h3>
            <button onClick={() => setCurrentView('assessments')} className="text-xs text-blue-600 hover:underline font-bold">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {ASSESSMENT_LIST.slice(0, 2).map((asm) => (
              <div key={asm.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors">
                <div className="space-y-0.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 font-bold uppercase">{asm.type}</span>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">{asm.title}</h4>
                  <p className="text-[10px] text-slate-500">{asm.durationMinutes} min • {asm.totalMarks} Marks</p>
                </div>
                <button
                  onClick={() => {
                    setActiveExam(asm);
                    setCurrentView('exam-session');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors shrink-0"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 2: Enrolled Courses & Learning Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-lg text-slate-900">Enrolled Courses & Progress</h3>
          <button onClick={() => setCurrentView('courses')} className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">
            Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_COURSES.slice(0, 3).map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-300 hover:shadow-md transition-all">
              <img src={c.thumbnail} alt={c.title} className="w-full h-32 rounded-2xl object-cover border border-slate-100" />
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold uppercase">{c.level}</span>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{c.title}</h4>
                <p className="text-xs text-slate-500">{c.instructor}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-600">
                  <span>Progress</span>
                  <span className="text-blue-600">60%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <button
                onClick={() => handleStartCourse(c)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-all"
              >
                Continue Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
