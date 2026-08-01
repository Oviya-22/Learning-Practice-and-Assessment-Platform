import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, XCircle, ArrowLeft, Award, BarChart2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResultCard = ({ exam, questions = [], userAnswers = {} }) => {
  const { setCurrentView } = useApp();

  let correctCount = 0;
  let totalMarks = 0;
  let earnedMarks = 0;

  questions.forEach(q => {
    if (q.type === 'mcq') {
      totalMarks += q.marks || 5;
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
        earnedMarks += q.marks || 5;
      }
    } else if (q.type === 'code') {
      totalMarks += q.marks || 15;
      // Partial credit simulation
      if (userAnswers[q.id]) {
        earnedMarks += Math.floor((q.marks || 15) * 0.9);
      }
    }
  });

  const percentage = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 75;
  const passPercentage = exam?.passPercentage || 70;
  const isPassed = percentage >= passPercentage;

  useEffect(() => {
    if (isPassed) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  }, [isPassed]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Result Banner */}
      <div className={`p-8 rounded-3xl border-2 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
        isPassed
          ? 'bg-gradient-to-r from-blue-50 via-emerald-50 to-white border-emerald-300'
          : 'bg-gradient-to-r from-rose-50 via-white to-slate-50 border-rose-300'
      }`}>
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${
            isPassed ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-600' : 'bg-rose-100 border-2 border-rose-400 text-rose-600'
          }`}>
            {isPassed ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
              isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {isPassed ? 'PASSED — DISTINCTION' : 'NEEDS IMPROVEMENT'}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{exam?.title || 'Exam'}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Official Result Report · {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-extrabold text-slate-900">{percentage}%</div>
          <div className="text-xs text-slate-500 mt-1">Pass Mark: {passPercentage}% · Score: {earnedMarks}/{totalMarks}</div>
        </div>
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">Correct Answers</span>
          <p className="text-2xl font-extrabold text-emerald-600">{correctCount} / {questions.filter(q => q.type === 'mcq').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">Score Earned</span>
          <p className="text-2xl font-extrabold text-blue-600">{earnedMarks} / {totalMarks}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">XP Reward</span>
          <p className="text-2xl font-extrabold text-amber-600">+{isPassed ? 200 : 50} XP</p>
        </div>
      </div>

      {/* Answer Key Breakdown */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" /> Answer Review & Explanation
        </h3>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            if (q.type !== 'mcq') return null;
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div key={q.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Q{idx + 1} · {q.section}</span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">{q.question}</p>
                  </div>
                  {isCorrect
                    ? <span className="px-2.5 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 shrink-0"><CheckCircle2 className="w-3 h-3" /> +{q.marks} pts</span>
                    : <span className="px-2.5 py-0.5 rounded text-[11px] bg-rose-100 text-rose-800 font-bold flex items-center gap-1 shrink-0"><XCircle className="w-3 h-3" /> 0 pts</span>
                  }
                </div>

                {!isCorrect && q.options && (
                  <div className="text-[11px] text-slate-500 pl-1">
                    <span className="font-bold text-emerald-700">Correct Answer: </span>
                    {q.options[q.correctAnswer]}
                  </div>
                )}

                <div className="text-[11px] text-slate-600 leading-relaxed border-l-2 border-blue-300 pl-2">
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('assessments')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Assessments
        </button>

        {isPassed && (
          <button
            onClick={() => setCurrentView('certificates')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/20"
          >
            <Award className="w-4 h-4" /> Claim Certificate
          </button>
        )}
      </div>
    </div>
  );
};
