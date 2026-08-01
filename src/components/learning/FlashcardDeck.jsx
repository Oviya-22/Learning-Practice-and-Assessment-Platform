import React, { useState } from 'react';
import { RotateCw, CheckCircle2, XCircle, Sparkles, Brain } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FlashcardDeck = () => {
  const { addToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = [
    {
      id: 1,
      front: 'What is the primary benefit of React 19 Automatic Batching?',
      back: 'It batches multiple state updates across promises, timeouts, and native handlers into a single re-render, eliminating unnecessary UI paint frames.',
      category: 'React Architecture'
    },
    {
      id: 2,
      front: 'How does JWT Stateless Authentication maintain user sessions securely?',
      back: 'The server signs the payload with a secret key (HMAC/RSA). The client includes the token in the Authorization header. No database session query is required for validation.',
      category: 'Web Security'
    },
    {
      id: 3,
      front: 'What is Kadane’s Algorithm time & space complexity?',
      back: 'Time Complexity: O(N)\nSpace Complexity: O(1)\nIt finds the max subarray sum in a single linear pass.',
      category: 'Algorithms'
    }
  ];

  const handleNext = (known) => {
    setIsFlipped(false);
    if (known) {
      addToast('+15 XP! Flashcard Mastered', 'success');
    }
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  const activeCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-white/10 p-6 items-center justify-between">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm text-white">Spaced Repetition Flashcards</h3>
        </div>
        <span className="text-xs font-mono text-gray-400">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full max-w-lg h-72 my-6 perspective cursor-pointer"
      >
        <div
          className={`w-full h-full glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-2xl transition-all duration-500 transform ${
            isFlipped ? 'bg-indigo-950/80 border-indigo-500/50' : 'bg-slate-900/80'
          }`}
        >
          <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
              {activeCard.category}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <RotateCw className="w-3.5 h-3.5" /> Tap card to flip
            </span>
          </div>

          <div className="my-auto text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold mb-2">
              {isFlipped ? 'Answer' : 'Question Prompt'}
            </p>
            <h3 className="text-lg font-semibold text-white leading-relaxed">
              {isFlipped ? activeCard.back : activeCard.front}
            </h3>
          </div>

          <div className="text-center text-[11px] text-gray-400">
            {isFlipped ? 'Click again to view question' : 'Click to reveal answer'}
          </div>
        </div>
      </div>

      {/* Rating Buttons */}
      <div className="w-full max-w-lg flex items-center gap-4">
        <button
          onClick={() => handleNext(false)}
          className="flex-1 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <XCircle className="w-4 h-4" /> Still Learning
        </button>
        <button
          onClick={() => handleNext(true)}
          className="flex-1 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Got It Right (+15 XP)
        </button>
      </div>
    </div>
  );
};
