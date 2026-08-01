import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoPlayer } from '../../components/learning/VideoPlayer';
import { CodingLab } from '../../components/learning/CodingLab';
import { PDFViewer } from '../../components/learning/PDFViewer';
import { FlashcardDeck } from '../../components/learning/FlashcardDeck';
import { 
  CheckCircle2, PlayCircle, Code, FileText, Brain, ChevronLeft, 
  ChevronRight, Bot, BookMarked, Download, Edit3, MessageSquare 
} from 'lucide-react';

export const LearningView = () => {
  const { activeCourse, activeLesson, setActiveLesson, setCurrentView, addToast } = useApp();
  const [rightTab, setRightTab] = useState('notes'); // 'notes' | 'ai' | 'resources'
  const [notesText, setNotesText] = useState('Key concept: React 19 Automatic Batching works across promises and async timers.\n\nTODO: Practice Kadane algorithm in Coding Lab.');

  const chapters = activeCourse?.chapters || [];

  const handleSelectLesson = (les) => {
    setActiveLesson(les);
    addToast(`Switched to: ${les.title}`, 'info');
  };

  const handleLessonComplete = () => {
    addToast('Lesson marked complete! +30 XP Gained', 'success');
  };

  const renderContentRenderer = () => {
    if (!activeLesson) return <VideoPlayer onComplete={handleLessonComplete} />;

    switch (activeLesson.type) {
      case 'code':
        return <CodingLab starterCode={activeLesson.starterCode} />;
      case 'pdf':
        return <PDFViewer title={activeLesson.title} />;
      case 'flashcards':
        return <FlashcardDeck />;
      case 'video':
      default:
        return (
          <VideoPlayer
            title={activeLesson.title}
            duration={activeLesson.duration}
            onComplete={handleLessonComplete}
          />
        );
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Classroom Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('courses')}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-slate-900 truncate max-w-md">{activeCourse?.title}</h2>
            <p className="text-[11px] text-slate-500">Current: {activeLesson?.title || '1.1 Introduction'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-600 font-mono font-bold">
            {activeCourse?.completedLessons || 18}/{activeCourse?.totalLessons || 42} Completed ({activeCourse?.progressPercent || 43}%)
          </span>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Sidebar: Chapters & Lessons (3 cols) */}
        <div className="lg:col-span-3 bg-white border-r border-slate-200 p-4 overflow-y-auto space-y-4 hidden lg:block">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Curriculum</h3>
          
          <div className="space-y-3">
            {chapters.map((ch) => (
              <div key={ch.id} className="space-y-1.5">
                <div className="text-xs font-bold text-indigo-300 py-1">{ch.title}</div>
                <div className="space-y-1 pl-2 border-l border-white/10">
                  {ch.lessons.map((les) => {
                    const isActive = activeLesson?.id === les.id;
                    let IconComp = PlayCircle;
                    if (les.type === 'code') IconComp = Code;
                    if (les.type === 'pdf') IconComp = FileText;
                    if (les.type === 'flashcards') IconComp = Brain;

                    return (
                      <button
                        key={les.id}
                        onClick={() => handleSelectLesson(les)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left transition-colors ${
                          isActive
                            ? 'bg-indigo-600/30 text-white border border-indigo-500/40 font-semibold'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                          <span className="truncate">{les.title}</span>
                        </div>
                        {les.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Main Content Area (6 cols) */}
        <div className="lg:col-span-6 p-4 overflow-y-auto flex flex-col justify-between space-y-4">
          <div className="flex-1">
            {renderContentRenderer()}
          </div>

          {/* Bottom Lesson Nav Bar */}
          <div className="glass-panel p-3 rounded-2xl border border-white/10 flex items-center justify-between">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Previous Lesson
            </button>
            <button
              onClick={handleLessonComplete}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Complete (+30 XP)
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors">
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar: Notes & Resources (3 cols) */}
        <div className="lg:col-span-3 glass-panel border-l border-white/10 p-4 flex flex-col justify-between hidden lg:flex">
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
              <button
                onClick={() => setRightTab('notes')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  rightTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Notes
              </button>
              <button
                onClick={() => setRightTab('resources')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  rightTab === 'resources' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" /> Files
              </button>
            </div>

            {/* Tab Content */}
            {rightTab === 'notes' ? (
              <div className="space-y-2">
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Type personal study notes here..."
                  rows={14}
                  className="w-full bg-slate-950 p-3 rounded-xl border border-white/10 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
                <button
                  onClick={() => addToast('Notes saved to your cloud profile!', 'success')}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
                >
                  Save Notes
                </button>
              </div>
            ) : (
              <div className="space-y-2 font-sans">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs flex items-center justify-between">
                  <span>Chapter_1_Slides.pdf</span>
                  <button onClick={() => addToast('Downloading slides...', 'success')} className="text-indigo-400 hover:underline">Download</button>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs flex items-center justify-between">
                  <span>Starter_Source_Code.zip</span>
                  <button onClick={() => addToast('Downloading code zip...', 'success')} className="text-indigo-400 hover:underline">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
