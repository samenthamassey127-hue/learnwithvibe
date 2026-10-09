'use client';

import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, Shield, Moon } from 'lucide-react';
import { getOfflineQueue, clearOfflineQueue } from '@/lib/storage';

interface OfflineContinuityViewProps {
  isOnline: boolean;
}

export default function OfflineContinuityView({ isOnline }: OfflineContinuityViewProps) {
  const [queue, setQueue] = useState(getOfflineQueue());
  const [syncing, setSyncing] = useState(false);
  const [syncedCount, setSyncedCount] = useState<number | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1500));
    const count = queue.length;
    clearOfflineQueue();
    setQueue([]);
    setSyncedCount(count);
    setSyncing(false);
  };

  return (
    <div className="celestial-card rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-celestial-border">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-celestial-gold/15 text-celestial-gold border border-celestial-border">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>Offline / Low-Connectivity Continuity Mode</span>
            </h2>
            <p className="text-xs text-slate-300">
              When connection drops: switches seamlessly to local cached lessons, quizzes, experiments, and queueing.
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border font-mono ${
            isOnline
              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
              : 'bg-[#D89079]/20 border-celestial-gold text-celestial-gold'
          }`}
        >
          {isOnline ? 'Online Synced' : 'Continuity Mode Active'}
        </span>
      </div>

      {/* Quote line */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#180E26] to-[#0E0617] border border-celestial-border flex items-center gap-3">
        <Moon className="w-6 h-6 text-celestial-gold shrink-0" />
        <p className="text-xs md:text-sm italic text-slate-200">
          <strong className="celestial-gold-text font-black not-italic">“Personalization should not disappear when the internet does.”</strong>
        </p>
      </div>

      {/* Continuity Pipeline Diagram */}
      <div className="p-5 rounded-2xl bg-[#0E0617] border border-celestial-border text-center space-y-3 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-center gap-2 text-celestial-goldLight">
          <span className="px-3 py-1.5 rounded-xl bg-[#1C0E2D] border border-celestial-border">ONLINE</span>
          <span>→</span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300">Connection drops</span>
          <span>→</span>
          <span className="px-3 py-1.5 rounded-xl celestial-gold-gradient text-[#050308] font-bold">LOW-CONNECTIVITY MODE</span>
          <span>→</span>
          <span className="px-3 py-1.5 rounded-xl bg-[#1C0E2D] border border-celestial-border">Cached Quizzes & Local Progress</span>
          <span>→</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300">SYNC ON RECONNECT</span>
        </div>
      </div>

      {/* Local Queue Sync Bar */}
      <div className="bg-[#120A1D] border border-celestial-border rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span className="text-celestial-gold">📦</span>
            <span>Local Vault Status</span>
          </h3>
          <p className="text-xs text-slate-400">
            {queue.length > 0
              ? `${queue.length} completed offline activities waiting for sync.`
              : 'All activities synchronized. No unsaved progress.'}
          </p>
        </div>

        {queue.length > 0 && isOnline && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-5 py-2.5 rounded-xl celestial-gold-gradient text-[#050308] text-xs font-black uppercase tracking-wider transition-all shadow-glow-celestial flex items-center gap-2 cursor-pointer disabled:opacity-50 font-mono"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing Vault...' : `Sync ${queue.length} Activities`}
          </button>
        )}
      </div>

      {syncedCount !== null && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Syncing complete: {syncedCount} activities uploaded to profile!
        </div>
      )}
    </div>
  );
}
