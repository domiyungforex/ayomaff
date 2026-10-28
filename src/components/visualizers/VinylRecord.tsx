"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/lib/audio/AudioContext";
import { RELEASES } from "@/lib/data/artist-data";

interface VinylRecordProps {
  size?: number;
  className?: string;
}

export function VinylRecord({ size = 260, className = "" }: VinylRecordProps) {
  const { isPlaying, togglePlay, getAudioEnergy } = useAudio();
  const { bass } = getAudioEnergy();

  // Highlight release cover
  const featuredRelease = RELEASES[0];

  return (
    <div
      className={`relative flex items-center justify-center select-none group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Outer Audio-Reactive Frequency Pulse Rings */}
      <div
        className="absolute inset-0 rounded-full border border-electric-green/20 pointer-events-none transition-all duration-150"
        style={{
          transform: `scale(${1 + (isPlaying ? bass * 0.18 : 0.02)})`,
          opacity: isPlaying ? 0.4 + bass * 0.5 : 0.2,
          boxShadow: isPlaying ? `0 0 ${20 + bass * 30}px rgba(98, 255, 112, 0.4)` : "none",
        }}
      />
      <div
        className="absolute -inset-3 rounded-full border border-electric-green/10 pointer-events-none transition-all duration-200"
        style={{
          transform: `scale(${1 + (isPlaying ? bass * 0.25 : 0.04)})`,
          opacity: isPlaying ? 0.2 + bass * 0.4 : 0.1,
        }}
      />

      {/* Vinyl Disc Body with Grooves */}
      <div
        className={`w-full h-full rounded-full vinyl-grooves relative p-3 shadow-2xl flex items-center justify-center border border-zinc-800/80 transition-transform duration-700 ease-out ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
        style={{
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.9), 0 10px 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Vinyl Sheen Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Center Label Artwork */}
        <div className="relative w-1/2 h-1/2 rounded-full overflow-hidden border-2 border-emerald-950 shadow-inner flex items-center justify-center bg-black">
          <Image
            src={featuredRelease.coverImage}
            alt={featuredRelease.title}
            fill
            className="object-cover"
          />
          {/* Spindle hole */}
          <div className="absolute w-3 h-3 rounded-full bg-[#050806] border border-white/20 z-10" />
        </div>
      </div>

      {/* Center Interactive Play Button Overlay */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-forest-dark/90 border border-electric-green/60 text-electric-green flex flex-col items-center justify-center shadow-neon hover:scale-110 active:scale-95 transition-all duration-200 z-20 group-hover:bg-electric-green group-hover:text-black group-hover:border-electric-green focus:outline-none focus:ring-2 focus:ring-electric-green"
        aria-label={isPlaying ? "Pause music playback" : "Play music"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 fill-current ml-0.5" />
        )}
        <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5">
          {isPlaying ? "PAUSE" : "PLAY"}
        </span>
      </button>
    </div>
  );
}
