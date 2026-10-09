'use client';

import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, LearningFingerprint } from '@/lib/types';
import CelestialMoonHero from './CelestialMoonHero';
import { Send, Sparkles, Moon, Compass, Orbit, Flame } from 'lucide-react';

interface DiscoverHubProps {
  profile: StudentProfile;
  fingerprint: LearningFingerprint;
  onLaunchExperiment: () => void;
  onUpdateTelemetry: (type: 'Challenge' | 'Game' | 'Visual', delta: number) => void;
}

export default function DiscoverHub({
  profile,
  fingerprint,
  onLaunchExperiment,
  onUpdateTelemetry,
}: DiscoverHubProps) {
  const [promptInput, setPromptInput] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'curio'; text: string }>>([
    {
      sender: 'curio',
      text: `Greetings ${profile.name}! I am Curio, your local Ollama tutor aligned with the celestial learning cycle. What shall we explore or test today?`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, loading]);

  const handleAsk = async (text?: string) => {
    const q = text || promptInput.trim();
    if (!q || loading) return;

    setChatLog((prev) => [...prev, { sender: 'user', text: q }]);
    if (!text) setPromptInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: q }],
          profile,
          fingerprint,
        }),
      });

      if (!res.ok) throw new Error('Ollama call error');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let streamText = '';

      setChatLog((prev) => [...prev, { sender: 'curio', text: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          streamText += decoder.decode(value, { stream: true });
          setChatLog((prev) => {
            const next = [...prev];
            next[next.length - 1] = { sender: 'curio', text: streamText };
            return next;
          });
        }
      }
      onUpdateTelemetry('Challenge', 15);
    } catch {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'curio',
          text: `⚠️ Ollama inference paused. Run \`ollama serve\` with \`llama3.2:1b\` active on your machine.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Celestial Moon Artwork Hero Banner */}
      <CelestialMoonHero />

      {/* Orbit KPI Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="celestial-card rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Quests</p>
            <p className="text-2xl font-black text-white">{profile.questsCompleted}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-celestial-gold/15 text-celestial-gold border border-celestial-border flex items-center justify-center font-bold">
            <Orbit className="w-6 h-6" />
          </div>
        </div>

        <div className="celestial-card rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Cognitive Alignment</p>
            <p className="text-2xl font-black celestial-gold-text">
              {profile.successRate}%
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-celestial-gold/15 text-celestial-gold border border-celestial-border flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
        </div>

        <div className="celestial-card rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Lunar Streak</p>
            <p className="text-2xl font-black text-white">{profile.streakDays} Days</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D89079]/20 text-[#D89079] border border-celestial-border flex items-center justify-center font-bold">
            <Flame className="w-6 h-6 fill-[#D89079]" />
          </div>
        </div>
      </div>

      {/* Instant Curiosity Orbits */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider font-mono text-celestial-gold">
            Curiosity Orbits & Explorations
          </h3>
          <button
            onClick={onLaunchExperiment}
            className="text-xs font-mono text-celestial-goldLight hover:underline flex items-center gap-1"
          >
            Launch Moon Lab →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: 'Python Slicing', icon: '🐍', query: 'Show me an interactive code experiment with Python string slicing!' },
            { title: 'Moon Gravity', icon: '🌑', query: 'Explain lunar tides and planetary gravitational orbits with a micro-challenge!' },
            { title: 'Quantum Logic', icon: '⚛️', query: 'Give me a prediction quiz on binary AND/OR gates vs quantum superposition!' },
            { title: 'Atomic Clash', icon: '🧪', query: 'Start an Atomic Clash quiz on valence electrons and orbital energy levels!' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(item.query)}
              className="celestial-card p-4 rounded-2xl text-left flex items-center gap-3 transition-all cursor-pointer group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-celestial-goldLight">{item.title}</p>
                <p className="text-[10px] text-slate-400 font-mono">Tap to start orbit</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ollama Interactive Console */}
      <div className="celestial-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-celestial-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-celestial-gold" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Curio On-Device Copilot (Ollama 1B)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-celestial-gold/80 px-2 py-0.5 rounded-full bg-[#180E26] border border-celestial-border">
            100% Offline Capable
          </span>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {chatLog.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'celestial-gold-gradient text-[#050308] font-bold ml-auto max-w-xl shadow-glow-celestial'
                  : 'bg-[#120A1D] text-slate-200 border border-celestial-border max-w-xl whitespace-pre-wrap'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-xs text-celestial-gold font-mono italic animate-pulse">
              Synthesizing response through local Ollama...
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Ask Curio anything or request an adaptive experiment..."
            className="flex-1 px-4 py-3 rounded-2xl bg-[#0E0617] border border-celestial-border text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-celestial-gold font-medium"
          />
          <button
            type="submit"
            disabled={!promptInput.trim() || loading}
            className="p-3 rounded-2xl celestial-gold-gradient text-[#050308] font-black hover:opacity-95 disabled:opacity-40 shadow-glow-celestial cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
