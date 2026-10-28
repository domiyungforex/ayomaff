"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, X } from "lucide-react";
import { ARTIST_INFO, RELEASES } from "@/lib/data/artist-data";
import { useAudio } from "@/lib/audio/AudioContext";

export function HeroSection() {
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const latestRelease = RELEASES[0];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#050806]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-green/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-950/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Vertical Scroll Indicator */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 items-center space-x-3 -rotate-90 origin-left text-[10px] font-bold tracking-widest text-zinc-500 uppercase select-none">
        <span className="w-8 h-px bg-electric-green" />
        <span>SCROLL</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Typography & CTAs (Cols 1-5) */}
          <div className="lg:col-span-5 z-20 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-widest uppercase text-electric-green bg-emerald-950/60 border border-emerald-900/60 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-electric-green" />
              <span>{ARTIST_INFO.descriptor}</span>
            </div>

            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-extrabold tracking-tighter text-white font-display leading-[0.88] mb-4">
              AYO <br />
              <span className="text-electric-green text-glow">MAFF</span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 font-sans">
              {ARTIST_INFO.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setIntroModalOpen(true)}
                className="flex items-center space-x-3 px-6 py-3 rounded-full bg-forest-dark border border-emerald-900/80 text-white font-bold text-xs uppercase tracking-wider hover:border-electric-green hover:text-electric-green transition-all shadow-md group"
              >
                <span className="w-6 h-6 rounded-full bg-electric-green/20 flex items-center justify-center group-hover:bg-electric-green group-hover:text-black transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>WATCH INTRO</span>
              </button>

              <button
                onClick={() => {
                  if (latestRelease.tracks[0]) {
                    playTrack(latestRelease.tracks[0]);
                  }
                }}
                className="px-6 py-3 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
              >
                {isPlaying && currentTrack?.id === latestRelease.tracks[0]?.id ? "PAUSE PREVIEW" : "PLAY LATEST"}
              </button>
            </div>
          </div>

          {/* Center Column: Dominant Ayo Maff Cutout Portrait (Cols 6-9) */}
          <div className="lg:col-span-4 relative flex items-center justify-center z-10 my-4 lg:my-0">
            <div className="relative w-[320px] h-[440px] sm:w-[380px] sm:h-[520px] max-w-full">
              {/* Back subtle emerald aura ring */}
              <div className="absolute inset-0 rounded-full border border-electric-green/20 scale-95 blur-sm" />

              <div className="relative w-full h-full overflow-hidden rounded-3xl border border-emerald-900/40 shadow-2xl bg-gradient-to-t from-black via-transparent to-transparent">
                <Image
                  src="/assets/artist/hero_green_jacket_balcony.webp"
                  alt="Ayo Maff seated on balcony in vibrant neon green jacket"
                  fill
                  priority
                  className="object-cover object-center scale-105 hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Bottom gradient mask for seamless layout blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-transparent opacity-90" />
              </div>
            </div>
          </div>

          {/* Right Column: Latest Release Card (Cols 10-12) */}
          <div className="lg:col-span-3 z-20 flex justify-center lg:justify-end">
            <div className="glass-panel p-4 rounded-2xl border border-emerald-900/60 max-w-[240px] w-full text-left shadow-xl group hover:border-electric-green/50 transition-all duration-300">
              <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-3">
                <span>LATEST RELEASE</span>
                <span className="text-electric-green">★</span>
              </div>

              {/* Cover Artwork with Crown / Badge overlay */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-black">
                <Image
                  src="/assets/artist/about_yellow_hoodie.webp"
                  alt={latestRelease.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-extrabold text-electric-green">
                  2025
                </div>
              </div>

              <h3 className="font-bold text-sm text-white truncate tracking-tight">
                {latestRelease.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-4">Ayo Maff</p>

              <button
                onClick={() => {
                  if (latestRelease.tracks[0]) {
                    playTrack(latestRelease.tracks[0]);
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-full bg-forest-dark border border-electric-green text-electric-green hover:bg-electric-green hover:text-black transition-all text-xs font-extrabold uppercase tracking-wider"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>LISTEN NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Video Modal */}
      {introModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-3xl w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                Ayo Maff — The Journey Intro
              </h3>
              <button
                onClick={() => setIntroModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
                aria-label="Close intro video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Ayo Maff Introduction"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
