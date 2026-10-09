'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DiscoverHub from '@/components/DiscoverHub';
import SandboxLab from '@/components/SandboxLab';
import FingerprintDashboard from '@/components/FingerprintDashboard';
import OfflineContinuityView from '@/components/OfflineContinuityView';
import { StudentProfile, LearningFingerprint } from '@/lib/types';
import {
  getStoredProfile,
  getFingerprint,
  updateFingerprint,
  enqueueOfflineAction,
} from '@/lib/storage';
import { Cpu, Wifi, WifiOff, Moon } from 'lucide-react';

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [fingerprint, setFingerprint] = useState<LearningFingerprint | null>(null);
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setProfile(getStoredProfile());
    setFingerprint(getFingerprint());

    const checkOllama = async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        return;
      }
      try {
        const res = await fetch('/api/ollama-status');
        const json = await res.json();
        setIsOnline(json.ok);
      } catch {
        setIsOnline(false);
      }
    };

    checkOllama();
    const interval = setInterval(checkOllama, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleExperimentDone = (correct: boolean) => {
    if (!fingerprint) return;
    const delta = correct ? 31 : 8;
    const updated = updateFingerprint(fingerprint, 'Experiment', delta);
    setFingerprint(updated);
    enqueueOfflineAction({
      id: Date.now().toString(),
      type: 'experiment',
      title: 'Python Lunar Loop Sandbox Prediction',
      timestamp: Date.now(),
    });
  };

  const handleUpdateTelemetry = (type: 'Challenge' | 'Game' | 'Visual', delta: number) => {
    if (!fingerprint) return;
    const updated = updateFingerprint(fingerprint, type, delta);
    setFingerprint(updated);
  };

  if (!profile || !fingerprint) return null;

  return (
    <main className="flex h-screen w-screen overflow-hidden celestial-stars-bg text-slate-100 font-sans">
      {/* Sacred Celestial Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        streakDays={profile.streakDays}
      />

      {/* Main Celestial Arena */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Cosmic Navigation Header */}
        <header className="px-6 py-3.5 border-b border-celestial-border bg-[#090410]/80 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-celestial-gold" />
              <span className="text-xs font-mono font-bold celestial-gold-text uppercase tracking-wider">
                Grade {profile.grade} • {profile.group} Orbit
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-celestial-gold/50" />
            <span className="text-xs text-slate-400 font-mono">Cognitive State: {profile.mood}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#180E26] border border-celestial-border">
              <Cpu className="w-3.5 h-3.5 text-celestial-gold" />
              <span className="text-slate-300 font-mono text-[11px]">Ollama (llama3.2:1b)</span>
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${
                isOnline
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                  : 'bg-[#D89079]/20 border-celestial-gold text-celestial-gold'
              }`}
            >
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{isOnline ? 'Celestial Sync' : 'Continuity Mode'}</span>
            </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'explore' && (
              <DiscoverHub
                profile={profile}
                fingerprint={fingerprint}
                onLaunchExperiment={() => setActiveTab('experiments')}
                onUpdateTelemetry={handleUpdateTelemetry}
              />
            )}

            {activeTab === 'experiments' && (
              <SandboxLab onExperimentDone={handleExperimentDone} />
            )}

            {activeTab === 'analytics' && (
              <FingerprintDashboard fingerprint={fingerprint} />
            )}

            {activeTab === 'offline' && (
              <OfflineContinuityView isOnline={isOnline} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
