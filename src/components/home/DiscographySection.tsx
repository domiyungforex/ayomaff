"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Disc3 } from "lucide-react";
import { MusicalCarousel } from "@/components/music/MusicalCarousel";
import { VinylRecord } from "@/components/visualizers/VinylRecord";
import { useAudio } from "@/lib/audio/AudioContext";

export function DiscographySection() {
  const { currentTrack, isPlaying } = useAudio();

  return (
    <section className="relative py-24 bg-[#050806] border-t border-emerald-950/40 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-electric-green/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-electric-green mb-1.5">
              <Disc3 className="w-3.5 h-3.5 text-electric-green" />
              <span>OFFICIAL SOUND ARCHIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              DISCOGRAPHY
            </h2>
          </div>

          <Link
            href="/music"
            className="group flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors mt-4 sm:mt-0"
          >
            <span>EXPLORE ALL MUSIC</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1. All Music Interactive Carousel */}
        <div className="mb-14">
          <MusicalCarousel />
        </div>

        {/* 2. Interactive Vinyl Record Studio Experience */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950/80 bg-gradient-to-r from-forest-dark/80 via-[#07140C] to-forest-dark/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Turntable Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-electric-green bg-emerald-950/60 border border-emerald-900/60 px-3 py-1 rounded-full mb-3">
                <span>ACOUSTIC FREQUENCY ENGINE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-3">
                {isPlaying ? `NOW SPINNING: ${currentTrack?.title}` : "Interactive Sound Reactive Vinyl"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl mb-6">
                Directly bound to the Web Audio API AnalyserNode. The vinyl disc rotates and reacts live to the audio frequency spectrum as you preview tracks across the catalogue.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/music"
                  className="px-5 py-2.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
                >
                  BROWSE ALL TRACKS
                </Link>
                <Link
                  href="/videos"
                  className="px-5 py-2.5 rounded-full bg-forest-surface border border-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider hover:text-white hover:border-zinc-500 transition-colors"
                >
                  WATCH VIDEOS
                </Link>
              </div>
            </div>

            {/* Rotating Vinyl Record Centerpiece */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <VinylRecord size={240} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
