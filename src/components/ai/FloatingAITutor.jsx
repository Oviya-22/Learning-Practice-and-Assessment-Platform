import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, X, Send, Sparkles, Mic, Copy, ThumbsUp, ThumbsDown, 
  RotateCcw, Code, HelpCircle, FileText, Minimize2, Check
} from 'lucide-react';

export const FloatingAITutor = () => {
  const { aiTutorOpen, setAiTutorOpen, addToast } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello Alex! I am your LearnSphere AI Tutor powered by advanced LLMs. Ask me anything about React 19, Machine Learning, Data Structures, or your current lesson code!',
      timestamp: 'Just now',
      copied: false
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const suggestedPrompts = [
    '💡 Explain React Automatic Batching like I am 5',
    '💻 Explain the Kadane algorithm code step-by-step',
    '📝 Summarize Chapter 1 key learning outcomes',
    '🎯 Generate 3 practice quiz questions on JWT Security'
  ];

  const handleSendMessage = (textToSend) => {
    const queryText = textToSend || inputQuery;
    if (!queryText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // AI Response simulation
    setTimeout(() => {
      let aiReplyText = "Here is a breakdown of your query:\n\n1. **Core Concept**: Automatic batching combines state updates across promises, async handlers, and native browser events into one render step.\n2. **Code Example**:\n```js\n// React 19 handles both state calls in 1 re-render!\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n}, 1000);\n```\nWould you like a quick practice quiz on this topic?";
      
      if (queryText.toLowerCase().includes('kadane')) {
        aiReplyText = "Kadane’s algorithm calculates the max sum subarray in **O(N) time** by tracking `currentMax = max(x, currentMax + x)` at each index. It avoids nested O(N²) loops by resetting negative subarray accumulators immediately.";
      } else if (queryText.toLowerCase().includes('jwt') || queryText.toLowerCase().includes('quiz')) {
        aiReplyText = "Here is your custom practice question:\n\n**Q**: Why should JWT access tokens have short expiration times (e.g. 15 mins)?\n**Ans**: Short expiration minimizes the vulnerability window if an access token is intercepted, requiring client refresh tokens for extension.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          copied: false
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      addToast('Voice input listening... Speak now', 'info');
      setTimeout(() => {
        setInputQuery('Explain how Virtual DOM reconciliation works in React 19');
        setIsRecording(false);
        addToast('Voice transcribed successfully', 'success');
      }, 3000);
    }
  };

  const handleCopyText = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, copied: true } : m));
    addToast('Copied AI response to clipboard', 'success');
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, copied: false } : m));
    }, 2000);
  };

  if (!aiTutorOpen) {
    return (
      <button
        onClick={() => setAiTutorOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold shadow-2xl shadow-indigo-600/50 hover:scale-105 transition-all duration-300 animate-pulse-glow"
      >
        <div className="p-1 bg-white/20 rounded-full">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm">Ask AI Tutor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[550px] glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              LearnSphere AI Tutor
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-[11px] text-indigo-300">Powered by Gemini 1.5 Pro & Claude 3.5</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAiTutorOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 bg-slate-900/60 border-b border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt.replace(/^[^a-zA-Z0-9]+/, ''))}
            className="px-2.5 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-800/80 border border-slate-600/50 text-cyan-100 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans text-cyan-100 leading-relaxed">{msg.text}</div>
            </div>

            {/* Action Bar for AI replies */}
            {msg.sender === 'ai' && (
              <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-gray-400">
                <span>{msg.timestamp}</span>
                <span>•</span>
                <button
                  onClick={() => handleCopyText(msg.id, msg.text)}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {msg.copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {msg.copied ? 'Copied' : 'Copy'}
                </button>
                <button 
                  onClick={() => handleSendMessage(messages[messages.length - 2]?.text || 'Regenerate answer')}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Retry
                </button>
                <button onClick={() => addToast('Feedback recorded: Helpful', 'success')} className="hover:text-emerald-400">
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button onClick={() => addToast('Feedback recorded: Needs improvement', 'info')} className="hover:text-rose-400">
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 p-2">
            <Bot className="w-4 h-4 animate-bounce text-cyan-400" />
            <span className="text-cyan-300 font-semibold">AI Tutor is thinking...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2">
        <button
          onClick={handleVoiceToggle}
          title="Simulate Voice Input"
          className={`p-2.5 rounded-xl border transition-all ${
            isRecording 
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse' 
              : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder="Ask a question or request code breakdown..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
        />

        <button
          onClick={() => handleSendMessage()}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
