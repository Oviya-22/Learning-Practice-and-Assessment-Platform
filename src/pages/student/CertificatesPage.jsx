import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CERTIFICATES } from '../../data/mockData';
import { Award, Download, CheckCircle2, QrCode, Search, Share2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificatesPage = () => {
  const { addToast } = useApp();
  const [selectedCert, setSelectedCert] = useState(MOCK_CERTIFICATES[0]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleDownloadPDF = () => {
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 } });
    addToast(`Generating official PDF certificate: ${selectedCert.id}`, 'success');
    window.print();
  };

  const handleVerify = () => {
    if (!searchId.trim()) return;
    const found = MOCK_CERTIFICATES.find(c => c.id.toLowerCase() === searchId.trim().toLowerCase());
    setSearchResult(found || 'not_found');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/20">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Verified Certifications</h2>
            <p className="text-xs text-gray-400">Official cryptographic diplomas backed by LearnSphere verification standard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" /> Download PDF Diploma
          </button>
        </div>
      </div>

      {/* Main Certificate Preview Canvas */}
      <div className="glass-panel rounded-3xl border-2 border-amber-500/30 p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 shadow-2xl">
        {/* Certificate Watermark Background Decorative Elements */}
        <div className="absolute top-4 left-4 border-t-2 border-l-2 border-amber-500/40 w-12 h-12"></div>
        <div className="absolute top-4 right-4 border-t-2 border-r-2 border-amber-500/40 w-12 h-12"></div>
        <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-amber-500/40 w-12 h-12"></div>
        <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-amber-500/40 w-12 h-12"></div>

        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <span className="px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Official Certificate of Excellence
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold gradient-text-gold tracking-tight">
            LearnSphere Academy
          </h1>

          <p className="text-xs text-gray-400 uppercase tracking-widest">This is to certify that</p>

          <h2 className="text-2xl md:text-3xl font-bold text-white underline decoration-amber-500/50 underline-offset-8">
            {selectedCert.studentName}
          </h2>

          <p className="text-xs text-gray-300 max-w-xl mx-auto leading-relaxed">
            has successfully completed the comprehensive coursework, practical code labs, and final assessment evaluation for
          </p>

          <h3 className="text-xl font-extrabold text-indigo-300">
            {selectedCert.courseName}
          </h3>

          <p className="text-xs text-amber-300 font-semibold font-mono">
            {selectedCert.grade}
          </p>

          {/* Signatures & QR Seal Row */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-left">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Course Director Signature</p>
              <p className="text-xs font-bold text-white mt-1 italic font-serif">{selectedCert.instructor}</p>
              <p className="text-[10px] text-gray-400">LearnSphere Faculty Board</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-lg border border-amber-500/50 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-slate-900" />
              </div>
              <p className="text-[10px] text-amber-400 font-mono mt-1.5">{selectedCert.id}</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Date Granted</p>
              <p className="text-xs font-bold text-white mt-1">{selectedCert.issueDate}</p>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" /> Blockchain Verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Verification Search Tool */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Search className="w-4 h-4 text-indigo-400" /> Certificate Verification Portal
        </h3>
        <p className="text-xs text-gray-400">Employers and institutions can verify certificate authenticity by entering a Certificate ID.</p>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter Certificate ID (e.g. CERT-LQ-2026-9812)..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <button
            onClick={handleVerify}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
          >
            Verify Credential
          </button>
        </div>

        {searchResult === 'not_found' && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            No record found matching Certificate ID "{searchId}". Please verify the ID.
          </div>
        )}

        {searchResult && searchResult !== 'not_found' && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certificate Verified Authentic
            </p>
            <p>Issued to: <span className="font-semibold text-white">{searchResult.studentName}</span></p>
            <p>Course: <span className="font-semibold text-white">{searchResult.courseName}</span></p>
            <p>Issue Date: {searchResult.issueDate} • Digital Signature: {searchResult.digitalSignature}</p>
          </div>
        )}
      </div>
    </div>
  );
};
