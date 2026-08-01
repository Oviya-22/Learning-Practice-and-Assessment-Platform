import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, BookOpen, FileCheck, Award, Users, ArrowRight, X } from 'lucide-react';
import { MOCK_COURSES, MOCK_ASSESSMENTS, MOCK_ASSIGNMENTS, MOCK_CERTIFICATES, MOCK_USERS_ADMIN } from '../../data/mockData';

export const SearchModal = () => {
  const { searchOpen, setSearchOpen, setCurrentView, setActiveCourse } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd/Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  const filteredCourses = MOCK_COURSES.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAssessments = MOCK_ASSESSMENTS.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.type.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCertificates = MOCK_CERTIFICATES.filter(cert =>
    cert.courseName.toLowerCase().includes(query.toLowerCase()) ||
    cert.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    setActiveCourse(course);
    setCurrentView('course-detail');
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Input header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search courses, assessments, certificates, or users... (Press ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-white focus:outline-none text-base placeholder-gray-400"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="px-2 py-1 text-xs rounded bg-white/10 text-gray-300 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                Courses ({filteredCourses.length})
              </div>
              <div className="space-y-1.5">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => handleSelectCourse(course)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30 cursor-pointer transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-white">{course.title}</h4>
                      <p className="text-xs text-gray-400">{course.category} • {course.difficulty} • {course.instructor}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessments */}
          {filteredAssessments.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                Assessments & Exams ({filteredAssessments.length})
              </div>
              <div className="space-y-1.5">
                {filteredAssessments.map(asm => (
                  <div
                    key={asm.id}
                    onClick={() => {
                      setCurrentView('assessments');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 cursor-pointer transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-white">{asm.title}</h4>
                      <p className="text-xs text-gray-400">{asm.type} • {asm.durationMinutes} mins • {asm.totalMarks} marks</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {filteredCertificates.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                Certificates ({filteredCertificates.length})
              </div>
              <div className="space-y-1.5">
                {filteredCertificates.map(cert => (
                  <div
                    key={cert.id}
                    onClick={() => {
                      setCurrentView('certificates');
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 cursor-pointer transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-white">{cert.courseName}</h4>
                      <p className="text-xs text-gray-400">ID: {cert.id} • Issued: {cert.issueDate}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredCourses.length === 0 && filteredAssessments.length === 0 && filteredCertificates.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900/60 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
          <span>Search tip: Try keywords like "React", "AI", "Certification", or "Mid-Term"</span>
          <span>LearnSphere Global Index</span>
        </div>
      </div>
    </div>
  );
};
