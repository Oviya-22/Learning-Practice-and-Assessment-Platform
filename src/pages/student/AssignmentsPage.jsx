import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_ASSIGNMENTS } from '../../data/mockData';
import {
  Upload, FileText, CheckCircle2, Clock, Star,
  X, Paperclip, AlertCircle, CloudUpload, Eye
} from 'lucide-react';

const FileUploadModal = ({ assignment, onClose, onSubmit }) => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      setTimeout(() => {
        onSubmit(assignment.id, files);
        onClose();
      }, 1200);
    }, 2000);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return '📄';
    if (['zip', 'rar', '7z'].includes(ext)) return '📦';
    if (['py', 'js', 'ts', 'jsx', 'tsx', 'java', 'cpp', 'c'].includes(ext)) return '💻';
    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) return '🖼️';
    if (['doc', 'docx'].includes(ext)) return '📝';
    return '📎';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Submit Assignment</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-xs">{assignment.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.zip,.py,.js,.ts,.jsx,.tsx,.java,.cpp,.c,.doc,.docx,.png,.jpg,.txt"
            />
            <CloudUpload className={`w-10 h-10 mx-auto mb-3 transition-colors ${dragOver ? 'text-blue-600' : 'text-slate-400'}`} />
            <p className="font-bold text-sm text-slate-700">
              {dragOver ? 'Drop files here!' : 'Drag & drop files, or click to browse'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports: PDF, ZIP, Python, JS/TS, Java, C++, Images, Word docs
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span className="text-lg">{getFileIcon(file.name)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-400">{formatSize(file.size)}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                    className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Rubrics reminder */}
          <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-[11px] font-bold text-amber-800 mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Grading Rubrics
            </p>
            {assignment.rubrics?.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-[10px] text-amber-700 py-0.5">
                <span>{r.criteria}</span>
                <span className="font-bold">{r.points} pts</span>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading || uploaded}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
              uploaded
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : uploading
                ? 'bg-blue-500 text-white shadow-blue-500/20 animate-pulse'
                : files.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {uploaded ? (
              <><CheckCircle2 className="w-4 h-4" /> Submitted Successfully!</>
            ) : uploading ? (
              <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Uploading files...</>
            ) : (
              <><Upload className="w-4 h-4" /> Submit {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''}` : 'Assignment'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const AssignmentsPage = () => {
  const { addToast } = useApp();
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [uploadModal, setUploadModal] = useState(null); // assignment object or null
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'submitted'

  const handleSubmit = (assignmentId, files) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === assignmentId
          ? { ...a, status: 'Submitted', uploadedFiles: files.map(f => f.name) }
          : a
      )
    );
    addToast(`Assignment submitted with ${files.length} file(s)! 🎉`, 'success');
  };

  const filtered = assignments.filter(a => {
    if (activeTab === 'pending') return a.status === 'Pending';
    if (activeTab === 'submitted') return a.status === 'Submitted';
    return true;
  });

  const pendingCount = assignments.filter(a => a.status === 'Pending').length;
  const submittedCount = assignments.filter(a => a.status === 'Submitted').length;

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Student Assignments</h1>
            <p className="text-sm text-slate-500 mt-0.5 font-medium">
              {submittedCount} submitted · {pendingCount} pending submission
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              ✅ {submittedCount} Submitted
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
              ⏳ {pendingCount} Pending
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs w-fit">
          {['all', 'pending', 'submitted'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab === 'all' ? 'All Assignments' : tab}
            </button>
          ))}
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(asg => (
            <div
              key={asg.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md hover:border-blue-200 transition-all"
            >
              {/* Status Bar */}
              <div className={`h-1 w-full ${asg.status === 'Submitted' ? 'bg-emerald-500' : 'bg-amber-400'}`} />

              <div className="p-6 space-y-4">
                {/* Title & Status */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{asg.title}</h3>
                  <span className={`shrink-0 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    asg.status === 'Submitted'
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {asg.status === 'Submitted' ? '✅ Submitted' : '⏳ Pending'}
                  </span>
                </div>

                {/* Meta */}
                <div className="space-y-1 text-[11px]">
                  <p className="text-blue-600 font-semibold">{asg.courseName}</p>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    Deadline: <span className="font-bold text-slate-700">{asg.deadline}</span>
                  </div>
                </div>

                {/* Grade */}
                {asg.grade && (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    asg.grade === 'Not Graded'
                      ? 'bg-slate-50 text-slate-500 border-slate-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    <Star className="w-3.5 h-3.5" />
                    Grade: {asg.grade}
                  </div>
                )}

                {/* Feedback */}
                {asg.feedback && (
                  <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl leading-relaxed">
                    💬 {asg.feedback}
                  </p>
                )}

                {/* Uploaded Files (if any) */}
                {asg.uploadedFiles?.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submitted Files</p>
                    {asg.uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
                        <Paperclip className="w-3 h-3 text-blue-500" />
                        <span className="truncate font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setUploadModal(asg)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      asg.status === 'Submitted'
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {asg.status === 'Submitted' ? 'Resubmit' : 'Upload & Submit'}
                  </button>
                  <button className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <FileUploadModal
          assignment={uploadModal}
          onClose={() => setUploadModal(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
