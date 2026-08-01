import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_COURSES } from '../../data/mockData';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CourseCatalog = () => {
  const { setActiveCourse, setCurrentView, addToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Cloud & DevOps', 'Computer Science'];

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleEnroll = (crs) => {
    setActiveCourse(crs);
    setCurrentView('course-detail');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Course Catalog & Learning Paths</h2>
          <p className="text-xs text-gray-400">Explore production-ready software engineering and AI courses</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar & Search Input */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by topic, instructor, or skill keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner to Advanced">Beginner to Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((crs) => (
          <div
            key={crs.id}
            className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 group"
          >
            <div>
              <div className="relative">
                <img src={crs.thumbnail} alt={crs.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                  {crs.difficulty}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="text-indigo-400 font-semibold">{crs.category}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {crs.rating} ({crs.ratingCount})
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {crs.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{crs.description}</p>

                <div className="flex items-center gap-4 text-[11px] text-gray-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {crs.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {crs.totalLessons} Lessons</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => handleEnroll(crs)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                View Course Syllabus <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
