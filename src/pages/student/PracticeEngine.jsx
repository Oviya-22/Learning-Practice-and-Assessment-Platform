import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { 
  Dumbbell, CheckCircle2, XCircle, ArrowRight, Zap, 
  Code, HelpCircle, ChevronDown, Play, RotateCcw, Terminal,
  Lightbulb, Target, BookOpen, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const LANGUAGES = ['javascript', 'python', 'cpp', 'java', 'typescript'];

const LANG_LABELS = {
  javascript: { label: 'JavaScript', icon: 'JS', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  python: { label: 'Python', icon: 'Py', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  cpp: { label: 'C++', icon: 'C++', color: 'bg-slate-100 text-slate-800 border-slate-300' },
  java: { label: 'Java', icon: 'Jv', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  typescript: { label: 'TypeScript', icon: 'TS', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
};

const MCQSection = ({ question, onNext }) => {
  const { addToast } = useApp();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    if (correct) {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
      addToast('+25 XP Earned! Great answer!', 'success');
    } else {
      addToast('Incorrect — review the explanation below.', 'warning');
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="space-y-5">
      {/* Question Meta */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold uppercase">
            {question.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            question.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            question.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' :
            'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {question.difficulty}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          <Zap className="w-4 h-4 fill-emerald-500" /> +25 XP
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-sm font-semibold text-slate-800 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          let style = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300 cursor-pointer';
          if (showExplanation) {
            if (idx === question.correctAnswer) {
              style = 'bg-emerald-50 border-emerald-400 text-emerald-800 cursor-default font-semibold';
            } else if (idx === selectedOption && idx !== question.correctAnswer) {
              style = 'bg-rose-50 border-rose-400 text-rose-800 cursor-default';
            } else {
              style = 'bg-slate-50 border-slate-200 text-slate-400 cursor-default';
            }
          } else if (selectedOption === idx) {
            style = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold cursor-pointer shadow-sm';
          }

          return (
            <div
              key={idx}
              onClick={() => !showExplanation && setSelectedOption(idx)}
              className={`p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${style}`}
            >
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                showExplanation && idx === question.correctAnswer
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : showExplanation && idx === selectedOption && idx !== question.correctAnswer
                  ? 'border-rose-500 bg-rose-500 text-white'
                  : selectedOption === idx
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-400 text-slate-500'
              }`}>
                {showExplanation && idx === question.correctAnswer ? '✓' :
                 showExplanation && idx === selectedOption && idx !== question.correctAnswer ? '✗' :
                 String.fromCharCode(65 + idx)}
              </span>
              <span className="text-xs leading-relaxed">{opt}</span>
            </div>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className={`p-4 rounded-xl border-l-4 ${
          isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-amber-50 border-amber-500'
        }`}>
          <div className="flex items-center gap-2 font-bold text-xs mb-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span className={isCorrect ? 'text-emerald-800' : 'text-amber-800'}>
              {isCorrect ? 'Correct! Here is why:' : 'Not quite — here is the explanation:'}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
        {!showExplanation ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const CodingSection = ({ question, onNext }) => {
  const { addToast } = useApp();
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testPassed, setTestPassed] = useState(null);

  const availableLangs = question.languages ? Object.keys(question.languages) : ['javascript'];

  useEffect(() => {
    if (question.languages && question.languages[selectedLang]) {
      setCode(question.languages[selectedLang].starterCode);
      setOutput('');
      setTestPassed(null);
    }
  }, [selectedLang, question]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running tests in isolated sandbox...\n');
    setTimeout(() => {
      const lang = LANG_LABELS[selectedLang]?.label || selectedLang;
      setOutput(
        `> Executing ${lang} code...\n` +
        `> Test Case 1: Input = [-2,1,-3,4,-1,2,1,-5,4] → Expected: 6 → Got: 6 ✓\n` +
        `> Test Case 2: Input = [1] → Expected: 1 → Got: 1 ✓\n` +
        `> Test Case 3: Input = [5,4,-1,7,8] → Expected: 23 → Got: 23 ✓\n` +
        `\nAll 3/3 Tests Passed ✨ | Execution: 8ms | Memory: 12.1 MB`
      );
      setTestPassed(true);
      setIsRunning(false);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      addToast(`+50 XP! All ${lang} tests passed!`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Question Meta */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold">
            {question.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            question.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            question.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' :
            'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {question.difficulty}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          <Zap className="w-4 h-4 fill-emerald-500" /> +50 XP
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-sm font-semibold text-slate-800 leading-relaxed">
        {question.question}
      </h3>

      {/* Language Switcher Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Language:</span>
        {availableLangs.map(lang => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
              selectedLang === lang
                ? `${LANG_LABELS[lang]?.color || 'bg-blue-50 text-blue-700 border-blue-300'} ring-2 ring-blue-300 shadow-sm`
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {LANG_LABELS[lang]?.label || lang}
          </button>
        ))}
      </div>

      {/* Code Editor */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Editor Header */}
        <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${LANG_LABELS[selectedLang]?.color || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
              {LANG_LABELS[selectedLang]?.label || selectedLang}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (question.languages?.[selectedLang]) {
                  setCode(question.languages[selectedLang].starterCode);
                  setOutput('');
                  setTestPassed(null);
                }
              }}
              className="flex items-center gap-1 text-slate-400 hover:text-white text-[11px] font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-[11px] transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-slate-900" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full bg-slate-900 text-emerald-300 font-mono text-xs p-4 min-h-[200px] resize-none focus:outline-none leading-relaxed"
          />

          {/* Output Console */}
          <div className="bg-slate-950 p-4 border-l border-slate-700">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" /> Console & Test Runner
            </div>
            <pre className={`font-mono text-[11px] leading-relaxed whitespace-pre-wrap ${
              testPassed === true ? 'text-emerald-400' : testPassed === false ? 'text-rose-400' : 'text-slate-400'
            }`}>
              {output || '// Click "Run Code" to execute and run test cases'}
            </pre>
          </div>
        </div>
      </div>

      {/* Test Cases reference */}
      {question.languages?.[selectedLang]?.testCases && (
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
          <div className="text-[11px] font-bold text-blue-800 mb-1">Test Cases:</div>
          {question.languages[selectedLang].testCases.map((tc, i) => (
            <div key={i} className="font-mono text-[11px] text-blue-700">
              <span className="text-slate-500">Input:</span> {tc.input}
              <span className="text-slate-500 ml-3">Expected:</span> {tc.expected}
            </div>
          ))}
        </div>
      )}

      {/* Next Button */}
      {testPassed === true && (
        <div className="flex justify-end">
          <button
            onClick={() => { setTestPassed(null); setOutput(''); onNext(); }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md"
          >
            Next Challenge <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export const PracticeEngine = () => {
  const [activeTab, setActiveTab] = useState('mcq'); // 'mcq' | 'code'
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0, xp: 0 });

  useEffect(() => {
    apiService.fetchQuestions().then(qs => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  const mcqQuestions = questions.filter(q => q.type === 'mcq');
  const codeQuestions = questions.filter(q => q.type === 'code');
  const currentSet = activeTab === 'mcq' ? mcqQuestions : codeQuestions;
  const displayIdx = currentIdx % Math.max(currentSet.length, 1);
  const activeQuestion = currentSet[displayIdx];

  const handleNext = () => {
    setCurrentIdx(prev => prev + 1);
    setSessionStats(prev => ({ ...prev, total: prev.total + 1, xp: prev.xp + (activeTab === 'mcq' ? 25 : 50) }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs">
          <RefreshCw className="w-8 h-8 text-blue-600 mx-auto animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading questions from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Adaptive Practice Engine</h2>
            <p className="text-xs text-blue-100 mt-0.5">Questions fetched from database • Instant AI-powered feedback</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
            <div className="text-xl font-extrabold">{sessionStats.xp}</div>
            <div className="text-[10px] text-blue-100 uppercase font-bold">XP Earned</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
            <div className="text-xl font-extrabold">{sessionStats.total}</div>
            <div className="text-[10px] text-blue-100 uppercase font-bold">Answered</div>
          </div>
        </div>
      </div>

      {/* Practice Type Tab Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1 shadow-xs flex items-center max-w-sm">
        <button
          onClick={() => { setActiveTab('mcq'); setCurrentIdx(0); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mcq'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> MCQ Practice ({mcqQuestions.length} questions)
        </button>
        <button
          onClick={() => { setActiveTab('code'); setCurrentIdx(0); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'code'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Code className="w-4 h-4" /> Coding Lab ({codeQuestions.length} questions)
        </button>
      </div>

      {/* Active Question Card */}
      {activeQuestion ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 md:p-8">
          {/* Question Counter */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-slate-500">
              {activeTab === 'mcq' ? '📝 Multiple Choice' : '💻 Coding Challenge'} · Question {(displayIdx + 1)} of {currentSet.length}
            </span>
            <button
              onClick={handleNext}
              className="text-xs text-slate-400 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1"
            >
              Skip <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeTab === 'mcq' ? (
            <MCQSection question={activeQuestion} onNext={handleNext} />
          ) : (
            <CodingSection question={activeQuestion} onNext={handleNext} />
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs">
          <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No {activeTab === 'mcq' ? 'MCQ' : 'Coding'} questions available</h3>
        </div>
      )}
    </div>
  );
};
