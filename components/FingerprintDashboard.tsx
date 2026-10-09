'use client';

import React from 'react';
import { LearningFingerprint, ActivityType } from '@/lib/types';
import { Orbit, Moon, Sparkles, Clock, Compass, Zap } from 'lucide-react';

interface FingerprintDashboardProps {
  fingerprint: LearningFingerprint;
}

const TYPE_EMOJI: Record<ActivityType, string> = {
  Game: '🎮',
  Visual: '🎨',
  Challenge: '🧩',
  Text: '📖',
  Experiment: '🧪',
  Quiz: '📝',
};

export default function FingerprintDashboard({ fingerprint }: FingerprintDashboardProps) {
  const { bestActivities, preferredSessionMinutes, difficultyTrajectory, bestRecoveryStrategy } =
    fingerprint;

  return (
    <div className="celestial-card rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ECC09B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-celestial-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-celestial-gold/15 text-celestial-gold border border-celestial-border">
            <Orbit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>Personal Learning Fingerprint</span>
              <span className="text-xs font-mono text-celestial-gold px-2.5 py-0.5 rounded-full bg-[#180E26] border border-celestial-border">
                Live Telemetry
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Calibrated from actual behavioral responses (Game +8%, Visual +24%, Challenge +31%, Long Text -10%).
            </p>
          </div>
        </div>
      </div>

      {/* 4 Quadrants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#120A1D]/80 border border-celestial-border rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-celestial-gold" />
            <span>Optimal Modalities</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {bestActivities.map((a) => (
              <span
                key={a}
                className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#1C0E2D] text-celestial-goldLight border border-celestial-border"
              >
                {TYPE_EMOJI[a]} {a}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#120A1D]/80 border border-celestial-border rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Clock className="w-4 h-4 text-celestial-gold" />
            <span>Optimal Orbit Session</span>
          </div>
          <p className="text-2xl font-black celestial-gold-text pt-1">{preferredSessionMinutes} Minutes</p>
        </div>

        <div className="bg-[#120A1D]/80 border border-celestial-border rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Compass className="w-4 h-4 text-celestial-gold" />
            <span>Difficulty Trajectory</span>
          </div>
          <p className="text-2xl font-black text-white pt-1">{difficultyTrajectory}</p>
        </div>

        <div className="bg-[#120A1D]/80 border border-celestial-border rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Zap className="w-4 h-4 text-celestial-gold" />
            <span>Engagement Recovery</span>
          </div>
          <p className="text-xs font-bold text-celestial-goldLight pt-2 truncate">{bestRecoveryStrategy}</p>
        </div>
      </div>

      {/* PPT Key Line Quote Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#180E26] to-[#0E0617] border border-celestial-border flex items-center gap-3">
        <Moon className="w-6 h-6 text-celestial-gold shrink-0" />
        <p className="text-xs md:text-sm italic text-slate-200">
          <strong className="celestial-gold-text font-black not-italic">“Instead of asking students how they learn, VibeLearn learns how they actually learn.”</strong>
        </p>
      </div>

      {/* History timeline */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-celestial-gold">
          Live Engagement Telemetry Ledger
        </h3>
        <div className="bg-[#0D0716] border border-celestial-border/70 rounded-2xl p-3 divide-y divide-celestial-border/40">
          {fingerprint.engagementHistory.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-3">
              No interactions recorded yet. Run a prediction challenge in the Moon Lab!
            </p>
          ) : (
            fingerprint.engagementHistory.slice(-5).reverse().map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  <span>{TYPE_EMOJI[item.type]}</span>
                  <span>{item.type} Interaction</span>
                </span>
                <span
                  className={`font-mono font-bold ${
                    item.engagementDelta > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.engagementDelta > 0 ? `+${item.engagementDelta}%` : `${item.engagementDelta}%`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
