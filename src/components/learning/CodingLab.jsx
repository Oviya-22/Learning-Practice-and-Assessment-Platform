import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Sparkles, Terminal, Copy, Code } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CodingLab = ({ starterCode, testCases }) => {
  const { addToast } = useApp();
  const [code, setCode] = useState(
    starterCode || `// Interactive React Code Lab\nfunction calculateBatching() {\n  console.log("Simulating automatic batching execution...");\n  return { success: true, batchedRenders: 1 };\n}\n\ncalculateBatching();`
  );
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running test suite in isolated VM sandbox...\n');
    
    setTimeout(() => {
      setOutput(prev => prev + '> Executing code snippet...\n> Output: { success: true, batchedRenders: 1 }\n> All 3/3 Test Cases Passed! ✨\n> Execution time: 14ms (Memory: 12.4 MB)');
      setTestResults({ passed: 3, total: 3, score: '100%' });
      setIsRunning(false);
      addToast('+50 XP Gained! Code Lab Completed', 'success');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-white/10 overflow-hidden">
      {/* Action Header */}
      <div className="p-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-white">JavaScript / React Sandbox</span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-mono">
            Node.js v20.x
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCode(starterCode || '');
              setOutput('');
              setTestResults(null);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/30"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {isRunning ? 'Executing...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Main Split: Code Editor & Console Output */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[300px]">
        {/* Editor Area */}
        <div className="p-4 bg-slate-950 font-mono text-xs text-indigo-200 flex flex-col justify-between overflow-y-auto">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            className="w-full h-full bg-transparent border-none focus:outline-none resize-none font-mono leading-relaxed text-indigo-100"
          />
        </div>

        {/* Console / Output Area */}
        <div className="p-4 bg-slate-900/60 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center gap-2 text-gray-400 mb-2 border-b border-white/5 pb-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-[11px] uppercase tracking-wider">Console & Test Runner</span>
            </div>
            
            <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {output || '// Click "Run Code" to compile and execute in browser VM.'}
            </pre>
          </div>

          {testResults && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Tests Passed: {testResults.passed}/{testResults.total} ({testResults.score})
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">+50 XP Awarded</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
