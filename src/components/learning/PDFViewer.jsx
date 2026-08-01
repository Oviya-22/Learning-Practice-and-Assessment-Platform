import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, FileText, Highlighter } from 'lucide-react';
import { useApp } from '../../context/AppContext';


export const PDFViewer = ({ title }) => {
  const { addToast } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    addToast('Downloading PDF Document reference...', 'success');
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-white/10 overflow-hidden">
      {/* PDF Controls Header */}
      <div className="p-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-white truncate max-w-xs">{title || 'Chapter Slide Deck & PDF Reference.pdf'}</span>
        </div>

        {/* Page Nav & Zoom */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-0.5 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-gray-200 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-0.5 hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(prev => Math.max(75, prev - 25))}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-gray-300 w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(150, prev + 25))}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>
        </div>
      </div>

      {/* PDF Document Canvas View */}
      <div className="flex-1 bg-slate-950 p-6 overflow-auto flex justify-center">
        <div 
          className="w-full max-w-2xl bg-white text-slate-900 rounded-xl p-8 shadow-2xl transition-all font-sans leading-relaxed"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <div className="border-b pb-4 mb-6 flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>LearnSphere Architecture Series</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Slide {currentPage}: State Reconciliation & Fiber Tree Architecture
          </h2>

          <p className="text-sm text-slate-700 mb-4">
            React's reconciliation algorithm operates on a virtual representation of the DOM. Rather than re-rendering every physical node on state changes, React constructs a lightweight fiber node tree to compute minimal DOM mutations.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800">
            <p className="font-bold text-indigo-700 mb-2">// Key Takeaway:</p>
            <p>1. Fiber nodes contain return, child, and sibling pointers.</p>
            <p>2. Double buffering swaps current tree with workInProgress tree seamlessly.</p>
          </div>

          <p className="text-sm text-slate-700">
            This design ensures 60 FPS smooth rendering for complex dashboard layouts without blocking the main event thread.
          </p>
        </div>
      </div>
    </div>
  );
};
