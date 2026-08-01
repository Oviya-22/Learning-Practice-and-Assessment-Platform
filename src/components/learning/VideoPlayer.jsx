import React, { useState, useRef } from 'react';
import { CheckCircle2, Volume2, Maximize, Settings, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Map lesson titles to relevant YouTube video IDs
const LESSON_YOUTUBE_MAP = {
  default: 'dGcsHjkRkKg',           // React full course (Programming with Mosh)
  'react': 'SqcY0GlETPk',           // React 18 crash course
  'node': 'Oe421EPjeBE',            // Node.js crash course
  'docker': 'pTFZFxd5V2Q',          // Docker tutorial
  'postgresql': '8rzy5TLDC4',        // PostgreSQL full course
  'machine learning': 'NWONeJKn6kc', // ML with Python (freeCodeCamp)
  'python': 'rfscVS0vtbw',           // Python full course
  'algorithm': 'pkYVOmU3MgA',        // Algorithms course
  'aws': '3hLmDS179Et0',             // AWS beginner course
  'vite': 'KCrXgy8qtjM',            // Vite crash course
};

const getYouTubeId = (lessonTitle = '') => {
  const lower = lessonTitle.toLowerCase();
  for (const [key, id] of Object.entries(LESSON_YOUTUBE_MAP)) {
    if (lower.includes(key)) return id;
  }
  return LESSON_YOUTUBE_MAP.default;
};

export const VideoPlayer = ({ title, duration, onComplete }) => {
  const { addToast } = useApp();
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const videoId = getYouTubeId(title);
  // Use YouTube embed with autoplay controlled via param
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;

  const handlePlayPause = () => {
    if (!isPlaying) {
      // First click: hide overlay and let iframe autoplay
      setIsPlaying(true);
      setShowOverlay(false);
    } else {
      // Toggle back to paused — reload iframe without autoplay
      setIsPlaying(false);
      setShowOverlay(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* YouTube Embed Area */}
      <div
        className="relative w-full bg-black"
        style={{ aspectRatio: '16/9' }}
        onClick={handlePlayPause}
      >
        {/* YouTube iFrame */}
        <iframe
          ref={iframeRef}
          key={`${videoId}-${isPlaying}`}
          src={embedUrl}
          title={title || 'Lesson Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
        />

        {/* Play Overlay (shown when paused) */}
        {showOverlay && (
          <div
            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-10 transition-opacity"
            onClick={handlePlayPause}
          >
            {/* YouTube Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            {/* Play Button */}
            <div className="relative z-20 w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full">
              ▶ Tap to Play
            </div>
          </div>
        )}

        {/* Pause Overlay (tap to pause while playing) */}
        {!showOverlay && isPlaying && (
          <div
            className="absolute inset-0 bg-transparent z-10 cursor-pointer"
            title="Tap to pause"
          />
        )}
      </div>

      {/* Video Details & Controls Row */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 truncate">
            {title || '1.1 Introduction to Vite & React Component Design'}
          </h3>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-medium">
            <span>📺 YouTube · {duration || '18 min'}</span>
            <span>•</span>
            <span className={isPlaying ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {isPlaying ? '● Playing' : '⏸ Paused'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isPlaying
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/20"
          >
            <CheckCircle2 className="w-4 h-4" /> Complete
          </button>
        </div>
      </div>
    </div>
  );
};
