"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, X } from "lucide-react";
import { ARTIST_INFO, RELEASES } from "@/lib/data/artist-data";
import { useAudio } from "@/lib/audio/AudioContext";

export function HeroSection() {
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const { playTrack, currentTrack, isPlaying, pause } = useAudio();
  const latestRelease = RELEASES[0];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#050806]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-green/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-950/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Typography & CTAs (Cols 1-5) */}
          <div className="lg:col-span-5 z-20 text-center lg:text-left">
            {/* Live Musical Status Badge */}
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-widest uppercase text-electric-green bg-emerald-950/70 border border-emerald-900/80 px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
              <div className="flex items-end space-x-0.5 h-3 w-3.5">
                <span className={`w-0.5 bg-electric-green rounded-full transition-all ${isPlaying ? "animate-[bounce_0.8s_ease-in-out_infinite] h-3" : "h-1.5"}`} />
                <span className={`w-0.5 bg-electric-green rounded-full transition-all ${isPlaying ? "animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-2.5" : "h-2"}`} />
                <span className={`w-0.5 bg-electric-green rounded-full transition-all ${isPlaying ? "animate-[bounce_0.7s_ease-in-out_infinite_0.4s] h-3" : "h-1"}`} />
                <span className={`w-0.5 bg-electric-green rounded-full transition-all ${isPlaying ? "animate-[bounce_0.9s_ease-in-out_infinite_0.1s] h-2" : "h-1.5"}`} />
              </div>
              <span>{isPlaying ? `PLAYING: ${currentTrack?.title || "SOUND WAVE"}` : ARTIST_INFO.descriptor}</span>
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
                onClick={() => {
                  pause();
                  setIntroModalOpen(true);
                }}
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

          {/* Center Column: Dominant Ayo Maff Cutout Portrait with Acoustic Resonance Aura (Cols 6-9) */}
          <div className="lg:col-span-4 relative flex items-center justify-center z-10 my-4 lg:my-0">
            {/* Real-time Acoustic Soundwave Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute w-[340px] h-[460px] sm:w-[400px] sm:h-[540px] rounded-[32px] border border-electric-green/30 transition-all duration-700 ${
                  isPlaying ? "scale-105 opacity-80 animate-pulse shadow-[0_0_35px_rgba(98,255,112,0.2)]" : "scale-100 opacity-20"
                }`}
              />
              <div
                className={`absolute w-[380px] h-[500px] sm:w-[440px] sm:h-[580px] rounded-[40px] border border-emerald-500/20 transition-all duration-1000 ${
                  isPlaying ? "scale-110 opacity-60" : "scale-100 opacity-10"
                }`}
              />
              <div
                className={`absolute w-[420px] h-[540px] sm:w-[480px] sm:h-[620px] rounded-[48px] border border-emerald-400/10 transition-all duration-1000 ${
                  isPlaying ? "scale-115 opacity-40" : "scale-100 opacity-5"
                }`}
              />
            </div>

            <div className="relative w-[320px] h-[440px] sm:w-[380px] sm:h-[520px] max-w-full">
              <div className="relative w-full h-full overflow-hidden rounded-3xl border border-emerald-900/50 shadow-2xl bg-gradient-to-t from-black via-transparent to-transparent">
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

              {/* Floating Acoustic Wave Pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-panel border border-emerald-900/90 shadow-xl flex items-center space-x-2.5 whitespace-nowrap z-20">
                <div className={`w-3.5 h-3.5 rounded-full border border-electric-green/80 flex items-center justify-center ${isPlaying ? "animate-spin" : ""}`}>
                  <span className="w-1 h-1 rounded-full bg-electric-green" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase">
                  {isPlaying ? (currentTrack?.title || "BARIGA FREQUENCY") : "BARIGA SOUND WAVE"}
                </span>
                <div className="flex items-end space-x-0.5 h-2.5">
                  <span className={`w-0.5 bg-electric-green rounded-full ${isPlaying ? "animate-[bounce_0.6s_ease-in-out_infinite] h-2.5" : "h-1"}`} />
                  <span className={`w-0.5 bg-electric-green rounded-full ${isPlaying ? "animate-[bounce_0.8s_ease-in-out_infinite_0.1s] h-3" : "h-1.5"}`} />
                  <span className={`w-0.5 bg-electric-green rounded-full ${isPlaying ? "animate-[bounce_0.7s_ease-in-out_infinite_0.3s] h-2" : "h-1"}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Latest Release Card with Grooved Vinyl Peek (Cols 10-12) */}
          <div className="lg:col-span-3 z-20 flex justify-center lg:justify-end">
            <div className="relative group max-w-[240px] w-full">
              {/* Spinning Vinyl Record Peek */}
              <div
                className={`hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-black border-2 border-zinc-800 shadow-2xl items-center justify-center transition-all duration-700 pointer-events-none z-0 ${
                  isPlaying ? "translate-x-6 rotate-180 opacity-100" : "translate-x-0 opacity-40 group-hover:translate-x-3 group-hover:opacity-80"
                }`}
              >
                <div className={`w-full h-full rounded-full border border-zinc-700/40 flex items-center justify-center ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}>
                  <div className="w-12 h-12 rounded-full border border-zinc-700/60 flex items-center justify-center bg-black">
                    <div className="w-6 h-6 rounded-full bg-electric-green/90 flex items-center justify-center text-[7px] font-black text-black">
                      MAFF
                    </div>
                  </div>
                </div>
              </div>

              {/* Front Glass Panel */}
              <div className="relative glass-panel p-4 rounded-2xl border border-emerald-900/70 w-full text-left shadow-xl group hover:border-electric-green/60 transition-all duration-300 z-10 bg-[#07140C]/90 backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-3">
                  <span>LATEST RELEASE</span>
                  <span className="text-electric-green">★</span>
                </div>

                {/* Cover Artwork with Crown / Badge overlay */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-black">
                  <Image
                    src={latestRelease.coverImage}
                    alt={latestRelease.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-extrabold text-electric-green">
                    {latestRelease.year}
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white truncate tracking-tight">
                  {latestRelease.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-4">Ayo Maff</p>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (latestRelease.tracks[0]) {
                        playTrack(latestRelease.tracks[0]);
                      }
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-2 rounded-full bg-forest-dark border border-electric-green text-electric-green hover:bg-electric-green hover:text-black transition-all text-xs font-extrabold uppercase tracking-wider shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>LISTEN NOW</span>
                  </button>

                  <Link
                    href={`/music/${latestRelease.slug}`}
                    className="w-full block text-center py-1.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all text-[11px] font-bold uppercase tracking-wider"
                  >
                    VIEW ALBUM
                  </Link>
                </div>
              </div>
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
                Ayo Maff: The Journey (Dealer Official Video)
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
                src="https://www.youtube.com/embed/JUWxpWD71VA?autoplay=1"
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
