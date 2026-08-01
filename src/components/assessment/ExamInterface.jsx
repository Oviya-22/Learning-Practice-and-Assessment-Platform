import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { SecureProctorSim } from './SecureProctorSim';
import { ResultCard } from './ResultCard';
import { 
  Clock, CheckCircle2, ChevronRight, ChevronLeft, Save, 
  ArrowLeft, RefreshCw, ShieldCheck, Code, HelpCircle
} from 'lucide-react';

export const ExamInterface = () => {
  const { setCurrentView, activeExam, setIsExamActive, setProctorWarnings, addToast } = useApp();
  const exam = activeExam;

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState((exam?.durationMinutes || 45) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Initialize exam state & fetch questions from DB
  useEffect(() => {
    setIsExamActive(true);
    setProctorWarnings(0);

    apiService.fetchAssessmentQuestions(exam?.questionIds).then(qs => {
      setQuestions(qs);
      setLoadingQuestions(false);
    });

    return () => setIsExamActive(false);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || loadingQuestions) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        // Auto-save every 30 seconds
        if (prev % 30 === 0) {
          setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, loadingQuestions]);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timePercent = Math.round((timeLeftSeconds / ((exam?.durationMinutes || 45) * 60)) * 100);
  const isWarningTime = timeLeftSeconds < 300; // less than 5 mins

  const handleSelectAnswer = (questionId, value) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsExamActive(false);
    addToast('Exam submitted and evaluated successfully!', 'success');
  };

  if (loadingQuestions) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-blue-600 mx-auto animate-spin" />
          <h2 className="font-bold text-slate-800">Loading Exam Questions from Database...</h2>
          <p className="text-xs text-slate-500">Fetching {exam?.questionIds?.length || 'all'} questions for {exam?.title}</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return <ResultCard exam={exam} questions={questions} userAnswers={userAnswers} />;
  }

  const activeQuestion = questions[currentQuestionIdx];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Secure Proctor Bar */}
      <SecureProctorSim onAutoSubmit={handleSubmitExam} />

      {/* Top Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('assessments')} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 leading-tight">{exam?.title}</h2>
            <p className="text-[11px] text-slate-500 font-medium">
              {questions.length} Questions · {exam?.totalMarks} Marks · Pass: {exam?.passPercentage}%
              {lastSaved && <span className="ml-3 text-emerald-600 font-bold">✓ Saved at {lastSaved}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm ${
            isWarningTime 
              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
              : 'bg-blue-50 border-blue-300 text-blue-700'
          }`}>
            <Clock className={`w-4 h-4 ${isWarningTime ? 'text-rose-500' : 'text-blue-500'}`} />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          {/* Auto-save indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
            <Save className="w-3.5 h-3.5" /> Auto-Saving
          </div>

          <button
            onClick={handleSubmitExam}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/20"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
        {/* Left: Question Navigator */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col gap-4 overflow-y-auto">
          <h3 className="font-extrabold text-[11px] text-slate-500 uppercase tracking-widest">Question Navigator</h3>

          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`h-10 rounded-xl font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300 shadow-md'
                      : isAnswered
                      ? 'bg-emerald-100 border border-emerald-400 text-emerald-800 font-bold'
                      : 'bg-slate-100 border border-slate-300 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="text-[10px] text-slate-500 space-y-1 mt-2 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-600 inline-block"></span> Current</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-400 inline-block"></span> Answered</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-slate-100 border border-slate-300 inline-block"></span> Unanswered</div>
          </div>

          {/* Timer Progress Bar */}
          <div className="mt-auto">
            <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
              <span>Time Remaining</span>
              <span className={isWarningTime ? 'text-rose-600 font-bold' : ''}>{timePercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isWarningTime ? 'bg-rose-500' : 'bg-blue-500'}`}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center: Active Question */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col">
          {activeQuestion ? (
            <>
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                    activeQuestion.type === 'code'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {activeQuestion.type === 'code' ? '💻 Coding' : '📝 MCQ'} — {activeQuestion.section}
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                    activeQuestion.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    activeQuestion.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-slate-400">Question {currentQuestionIdx + 1}/{questions.length}</span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-lg">{activeQuestion.marks} Marks</span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-sm font-semibold text-slate-800 leading-relaxed mb-6">
                {activeQuestion.question}
              </h3>

              {/* MCQ Options */}
              {activeQuestion.type === 'mcq' && activeQuestion.options && (
                <div className="space-y-3 flex-1">
                  {activeQuestion.options.map((opt, oIdx) => {
                    const isSelected = userAnswers[activeQuestion.id] === oIdx;
                    return (
                      <div
                        key={oIdx}
                        onClick={() => handleSelectAnswer(activeQuestion.id, oIdx)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-400 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </div>
                        <span className="text-xs leading-relaxed">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Coding Question Editor */}
              {activeQuestion.type === 'code' && (
                <div className="flex-1 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-mono font-semibold">JavaScript Solution</span>
                    <span className="text-[11px] text-emerald-400 font-bold">Exam Mode — No Hints</span>
                  </div>
                  <textarea
                    value={userAnswers[activeQuestion.id] || activeQuestion.starterCode || '// Write your solution here\n'}
                    onChange={(e) => handleSelectAnswer(activeQuestion.id, e.target.value)}
                    spellCheck={false}
                    className="w-full bg-slate-900 text-emerald-300 font-mono text-xs p-4 min-h-[200px] resize-none focus:outline-none leading-relaxed"
                  />
                </div>
              )}

              {/* Navigation Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-bold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <span className="text-[11px] text-slate-400 font-medium">
                  {Object.keys(userAnswers).length} / {questions.length} answered
                </span>

                <button
                  onClick={() => setCurrentQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestionIdx === questions.length - 1}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
              No questions loaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
