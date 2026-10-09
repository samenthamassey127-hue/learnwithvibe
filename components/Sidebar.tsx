'use client';

import React from 'react';
import { Sparkles, Moon, Compass, Shield, Orbit, Flame } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  streakDays: number;
}

export default function Sidebar({ activeTab, onSelectTab, streakDays }: SidebarProps) {
  const navItems = [
    { id: 'explore', label: 'Cosmic Hub', icon: Compass },
    { id: 'experiments', label: 'Moon Lab (Predict)', icon: Moon },
    { id: 'analytics', label: 'Orbital Fingerprint', icon: Orbit },
    { id: 'offline', label: 'Continuity Vault', icon: Shield },
  ];

  return (
    <aside className="w-64 bg-[#0B0612]/90 border-r border-celestial-border flex flex-col justify-between p-4 h-full shrink-0 backdrop-blur-xl">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ECC09B] to-[#D89079] flex items-center justify-center text-[#050308] shadow-glow-celestial font-bold">
            <Moon className="w-5 h-5 fill-[#050308]" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-wider celestial-gold-text">
              VIBELEARN
            </h1>
            <p className="text-[10px] text-celestial-gold/80 font-mono tracking-tight">Celestial Studio</p>
          </div>
        </div>

        {/* Orbit Streak Pill */}
        <div className="bg-[#180E26]/70 border border-celestial-border rounded-2xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-celestial-gold/15 text-celestial-gold">
              <Flame className="w-4 h-4 fill-celestial-gold" />
            </div>
            <div>
              <p className="text-xs font-black text-white">{streakDays} Lunar Cycles</p>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Curiosity Orbit</p>
            </div>
          </div>
          <span className="text-xs">✨</span>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 font-mono">
            Navigation Orbits
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'celestial-gold-gradient text-[#0B0612] font-black shadow-glow-celestial'
                    : 'text-slate-300 hover:text-celestial-gold hover:bg-[#180E26]/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B0612]' : 'text-celestial-gold/70'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Edge Offline Footer Note */}
      <div className="p-3 bg-[#180E26]/60 rounded-2xl border border-celestial-border/60 text-center space-y-1">
        <p className="text-[11px] font-bold celestial-gold-text">On-Device Ollama</p>
        <p className="text-[9px] text-slate-400 font-mono">Zero latency • Sacred privacy</p>
      </div>
    </aside>
  );
}
