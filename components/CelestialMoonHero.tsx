'use client';

import React from 'react';

export default function CelestialMoonHero() {
  return (
    <div className="relative w-full h-72 md:h-84 rounded-3xl overflow-hidden celestial-card flex items-center justify-center p-6 border border-celestial-border">
      {/* Background Starry Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-65 mix-blend-screen scale-105 transition-transform duration-1000 hover:scale-100"
        style={{ backgroundImage: "url('/celestial_moon.png')" }}
      />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050308]/80 via-transparent to-[#050308]/80" />
      <div className="absolute w-96 h-96 rounded-full bg-[#D89079]/15 blur-3xl pointer-events-none" />

      {/* Sacred Geometry Decorative Rings */}
      <div className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border border-celestial-gold/20 animate-spin-very-slow pointer-events-none" />
      <div className="absolute w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full border border-dashed border-celestial-gold/30 pointer-events-none" />

      {/* Floating Center Badge & Title */}
      <div className="relative z-10 text-center max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#180E26]/80 border border-celestial-border backdrop-blur-md shadow-glow-celestial">
          <span className="w-2 h-2 rounded-full bg-celestial-gold animate-ping" />
          <span className="text-[11px] font-mono tracking-widest uppercase celestial-gold-text">
            Celestial Cognitive Alignment
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
          Learn With <span className="celestial-gold-text">Vibe</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
          Harmonizing curiosity and mastery. An adaptive cosmic study space guided by your personal learning orbit and local Ollama intelligence.
        </p>

        {/* Phase Cycle Indicator */}
        <div className="flex items-center justify-center gap-4 pt-2 text-[10px] font-mono text-celestial-gold/80">
          <span>🌑 PREDICT</span>
          <span>•</span>
          <span>🌓 EXPERIMENT</span>
          <span>•</span>
          <span>🌕 DISCOVER</span>
          <span>•</span>
          <span>🌔 ADAPT</span>
        </div>
      </div>
    </div>
  );
}
