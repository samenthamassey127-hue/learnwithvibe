'use client';

import React, { useState } from 'react';
import { ExperimentBlock } from '@/lib/types';
import { Play, CheckCircle2, XCircle, Moon, Sparkles, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SandboxLabProps {
  onExperimentDone: (correct: boolean) => void;
}

const DEFAULT_EXPERIMENTS: ExperimentBlock[] = [
  {
    id: 'exp-range-loop',
    code: `for i in range(5):\n    print(i)`,
    language: 'python',
    question: 'What do you think this code will print?',
    options: [
      { label: 'A', value: '1 2 3 4 5' },
      { label: 'B', value: '0 1 2 3 4' },
      { label: 'C', value: '0 1 2 3 4 5' },
    ],
    correctAnswer: '0 1 2 3 4',
    explanation: 'Python `range(5)` starts from index 0 and generates 5 values up to (but excluding) 5: [0, 1, 2, 3, 4].',
    followUp: 'Why do you think the loop starts from 0? What happens if we change range(5) to range(10)?',
    status: 'idle',
  },
  {
    id: 'exp-list-slicing',
    code: `planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter"]\nprint(planets[1:4])`,
    language: 'python',
    question: 'What slice of the solar orbit will be printed?',
    options: [
      { label: 'A', value: '["Venus", "Earth", "Mars"]' },
      { label: 'B', value: '["Mercury", "Venus", "Earth"]' },
      { label: 'C', value: '["Venus", "Earth", "Mars", "Jupiter"]' },
    ],
    correctAnswer: '["Venus", "Earth", "Mars"]',
    explanation: 'List slicing `[1:4]` starts at index 1 ("Venus") and stops right before index 4 ("Jupiter").',
    followUp: 'How would you write the slice to only get Earth and Mars?',
    status: 'idle',
  }
];

export default function SandboxLab({ onExperimentDone }: SandboxLabProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const experiment = DEFAULT_EXPERIMENTS[currentIdx];

  const handleRun = () => {
    if (!selected) return;
    setRevealed(true);
    const correct = selected === experiment.correctAnswer;
    onExperimentDone(correct);
  };

  const nextChallenge = () => {
    setSelected(null);
    setRevealed(false);
    setCurrentIdx((prev) => (prev + 1) % DEFAULT_EXPERIMENTS.length);
  };

  const isCorrect = selected === experiment.correctAnswer;

  return (
    <div className="celestial-card rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-celestial-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-celestial-gold/15 text-celestial-gold border border-celestial-border">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>Experiment Mode — Moon Lab</span>
              <span className="text-xs font-mono text-celestial-gold px-2.5 py-0.5 rounded-full bg-[#180E26] border border-celestial-border">
                Predict → Run → Observe → Understand
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Active Discovery: Guess first. Never just receive passive answers.
            </p>
          </div>
        </div>

        <button
          onClick={nextChallenge}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold celestial-gold-gradient text-[#050308] hover:opacity-90 shadow-glow-celestial font-mono"
        >
          Next Orbit Experiment →
        </button>
      </div>

      {/* Code window */}
      <div className="rounded-2xl overflow-hidden border border-celestial-border shadow-xl">
        <div className="bg-[#120A1D] px-4 py-2.5 flex items-center justify-between border-b border-celestial-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D89079]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ECC09B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFF0E2]" />
            <span className="ml-2 text-xs text-slate-300 font-mono">experiment_sandbox.py</span>
          </div>
          <span className="text-[10px] text-celestial-gold font-mono uppercase tracking-wider">
            Local Ollama Runner
          </span>
        </div>
        <pre className="bg-[#08040E] text-celestial-goldLight text-sm p-5 overflow-x-auto font-mono leading-relaxed border-l-2 border-celestial-gold">
          <code>{experiment.code}</code>
        </pre>
      </div>

      {/* Question prompt */}
      <div className="p-4 rounded-2xl bg-[#120A1D] border border-celestial-border flex items-center gap-3">
        <span className="text-lg">🎯</span>
        <p className="text-sm font-bold text-slate-100">{experiment.question}</p>
      </div>

      {/* Prediction Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {experiment.options.map((opt) => {
          const isSelected = selected === opt.value;
          const showResult = revealed;
          const isRight = opt.value === experiment.correctAnswer;

          return (
            <button
              key={opt.label}
              disabled={showResult}
              onClick={() => setSelected(opt.value)}
              className={cn(
                'p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center gap-3 text-left',
                showResult
                  ? isRight
                    ? 'border-emerald-500 bg-emerald-950/70 text-emerald-200'
                    : isSelected
                    ? 'border-rose-500 bg-rose-950/70 text-rose-200'
                    : 'border-celestial-border/50 bg-[#0E0617]/50 text-slate-500 opacity-40'
                  : isSelected
                  ? 'border-celestial-gold bg-celestial-gold/20 text-white shadow-glow-celestial'
                  : 'border-celestial-border bg-[#120A1D]/70 text-slate-300 hover:border-celestial-gold/70'
              )}
            >
              <span
                className={cn(
                  'w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-black shrink-0 font-mono',
                  isSelected
                    ? 'bg-celestial-gold text-[#0B0612] border-celestial-gold'
                    : 'border-celestial-border text-celestial-gold bg-[#0E0617]'
                )}
              >
                {opt.label}
              </span>
              <span className="font-mono text-sm">{opt.value}</span>
              {showResult && isRight && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />
              )}
              {showResult && isSelected && !isRight && (
                <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Run execution button */}
      {!revealed && (
        <button
          onClick={handleRun}
          disabled={!selected}
          className="w-full py-4 rounded-2xl celestial-gold-gradient hover:opacity-95 disabled:opacity-40 text-[#08040E] font-black uppercase tracking-wider text-xs md:text-sm shadow-glow-celestial transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
        >
          <Play className="w-4 h-4 fill-[#08040E]" /> Run Code & Verify Mental Model
        </button>
      )}

      {/* Outcome Analysis */}
      {revealed && (
        <div className="space-y-4 pt-2">
          <div
            className={cn(
              'p-4 rounded-2xl text-sm font-bold flex items-center gap-3 border',
              isCorrect
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Your prediction was exact! Actual Result: {experiment.correctAnswer}</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Your prediction: {selected} • Actual Result: {experiment.correctAnswer}</span>
              </>
            )}
          </div>

          <div className="bg-[#120A1D] border border-celestial-border p-4 rounded-2xl text-xs md:text-sm text-slate-300">
            <p className="font-black celestial-gold-text mb-1">💡 Underlying Mechanism:</p>
            <p>{experiment.explanation}</p>
          </div>

          <div className="bg-[#1C0E2D] border border-celestial-border p-4 rounded-2xl text-xs md:text-sm text-celestial-goldLight flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-celestial-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold celestial-gold-text mb-0.5">Adaptive Curiosity Query:</p>
              <p>{experiment.followUp}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
