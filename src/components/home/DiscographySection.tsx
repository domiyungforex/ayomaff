"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Disc } from "lucide-react";
import { RELEASES } from "@/lib/data/artist-data";
import { VinylRecord } from "@/components/visualizers/VinylRecord";
import { useAudio } from "@/lib/audio/AudioContext";

export function DiscographySection() {
  const { playTrack, currentTrack, isPlaying } = useAudio();

  return (
    <section className="relative py-24 bg-[#050806] border-t border-emerald-950/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-1 block">
              LATEST MUSIC
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              DISCOGRAPHY
            </h2>
          </div>

          <Link
            href="/music"
            className="group flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors mt-4 sm:mt-0"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid containing release cards and the Interactive Rotating Vinyl Record */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Release Cards Carousel / Grid (Cols 1-8) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {RELEASES.slice(0, 5).map((release) => {
              const isCurrent = currentTrack?.releaseId === release.id;
              return (
                <div
                  key={release.id}
                  className="group relative flex flex-col glass-panel p-3 rounded-2xl border border-emerald-950/70 hover:border-electric-green/60 transition-all duration-300"
                >
                  {/* Artwork with play overlay */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-black">
                    <Image
                      src={release.coverImage}
                      alt={release.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => {
                        if (release.tracks[0]) {
                          playTrack(release.tracks[0]);
                        }
                      }}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      aria-label={`Play ${release.title}`}
                    >
                      <span className="w-10 h-10 rounded-full bg-electric-green text-black flex items-center justify-center shadow-neon hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </span>
                    </button>

                    {isCurrent && isPlaying && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 border border-electric-green text-[9px] font-bold text-electric-green uppercase tracking-widest animate-pulse">
                        PLAYING
                      </span>
                    )}
                  </div>

                  <Link href={`/music/${release.slug}`}>
                    <h3 className="font-bold text-sm text-white truncate hover:text-electric-green transition-colors tracking-tight">
                      {release.title}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-zinc-400 capitalize mt-0.5">
                    {release.year} • {release.releaseType}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Rotating Vinyl Record Showcase (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center pt-8 lg:pt-0">
            <div className="text-center mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1">
                AUDIO EXPERIENCE
              </span>
              <p className="text-xs text-zinc-400">
                Interactive sound reactive vinyl
              </p>
            </div>

            <VinylRecord size={270} />
          </div>
        </div>
      </div>
    </section>
  );
}
