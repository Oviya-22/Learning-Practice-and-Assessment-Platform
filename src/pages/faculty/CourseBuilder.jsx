import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Upload, Plus, Trash2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const CourseBuilder = () => {
  const { setCurrentView, addToast } = useApp();
  const [step, setStep] = useState(1);
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [description, setDescription] = useState('');
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Chapter 1: Foundations & Architecture', lessons: ['1.1 Core Principles', '1.2 Hands-On Setup'] }
  ]);

  const handlePublish = () => {
    addToast('Course successfully published to LearnSphere global catalog!', 'success');
    setCurrentView('courses');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Wizard Step Progress */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Step {step} of 4</span>
          <h2 className="text-xl font-extrabold text-white">Faculty Course Studio</h2>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map(s => (
            <span
              key={s}
              className={`w-8 h-8 rounded-xl font-bold font-mono text-xs flex items-center justify-center ${
                s === step ? 'bg-emerald-600 text-white' : s < step ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-white/5 text-gray-500'
              }`}
            >
              {s < step ? '✓' : s}
            </span>
          ))}
        </div>
      </div>

      {/* Step Forms */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-white">Basic Course Metadata</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Advanced Distributed Microservices with Go"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option>Web Development</option>
                  <option>Artificial Intelligence</option>
                  <option>Cloud & DevOps</option>
                  <option>Computer Science</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option>Beginner to Advanced</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Description & Objectives</label>
              <textarea
                rows={4}
                placeholder="Describe what students will achieve upon course completion..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-center py-6">
            <h3 className="font-bold text-sm text-white">Upload Thumbnail & Promotional Assets</h3>
            <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 hover:border-emerald-500/50 cursor-pointer transition-colors max-w-md mx-auto space-y-3">
              <Upload className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-xs text-gray-300 font-medium">Drag & Drop course banner image here</p>
              <p className="text-[11px] text-gray-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">Syllabus & Chapter Structure</h3>
              <button
                onClick={() => setChapters(prev => [...prev, { id: Date.now(), title: `Chapter ${prev.length + 1}: New Module`, lessons: ['1.1 Introductory Lesson'] }])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold"
              >
                <Plus className="w-4 h-4" /> Add Chapter
              </button>
            </div>

            <div className="space-y-3">
              {chapters.map((ch) => (
                <div key={ch.id} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                  <h4 className="font-bold text-xs text-white">{ch.title}</h4>
                  <div className="pl-3 border-l border-white/10 space-y-1">
                    {ch.lessons.map((l, idx) => (
                      <div key={idx} className="text-xs text-gray-300 font-mono">• {l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-lg text-white">Ready to Publish</h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto">Your course metadata, thumbnail, and syllabus structure are validated and ready for student enrollment.</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-semibold text-gray-300"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(prev => Math.min(4, prev + 1))}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="flex items-center gap-1.5 px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              Publish Course Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
