"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { useAudio } from "@/lib/audio/AudioContext";
import { WaveformVisualizer } from "@/components/visualizers/WaveformVisualizer";
import { formatDuration } from "@/lib/utils";

export function PersistentPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-300 ${
        isExpanded ? "pb-4" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="glass-panel-elevated rounded-2xl p-2.5 sm:p-3.5 mb-2.5 sm:mb-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl border border-emerald-900/60">
          {/* Left: Track Thumbnail & Meta */}
          <div className="flex items-center space-x-3 w-full md:w-1/4">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-lg overflow-hidden border border-emerald-950 flex-shrink-0 bg-black">
              <Image
                src="/assets/artist/about_yellow_hoodie.webp"
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate tracking-tight">
                {currentTrack.title}
              </p>
              <p className="text-xs text-zinc-400 truncate">
                Ayo Maff {currentTrack.featuringArtists?.length ? `ft. ${currentTrack.featuringArtists.join(", ")}` : ""}
              </p>
            </div>
          </div>

          {/* Center: Play Controls & Waveform */}
          <div className="flex items-center space-x-3 sm:space-x-4 w-full md:w-2/4 justify-center">
            {/* Prev Track */}
            <button
              onClick={prevTrack}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-forest-dark border-2 border-electric-green text-electric-green flex items-center justify-center shadow-neon hover:bg-electric-green hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-green"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={nextTrack}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Live Audio Frequency Waveform Visualizer */}
            <div
              className="flex-1 max-w-[280px] h-9 flex items-center px-2 cursor-pointer relative group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                seek(ratio * duration);
              }}
              title="Click to seek"
            >
              <WaveformVisualizer height={30} barCount={36} />
            </div>

            {/* Time Stamp */}
            <div className="text-[11px] font-mono font-medium text-zinc-400 whitespace-nowrap min-w-[65px] text-right">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>

          {/* Right: Volume & Expand */}
          <div className="hidden sm:flex items-center space-x-3 w-full md:w-1/4 justify-end">
            <button
              onClick={toggleMute}
              className="text-zinc-400 hover:text-electric-green transition-colors focus:outline-none"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 sm:w-20 accent-electric-green bg-zinc-800 h-1 rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-zinc-400 hover:text-white transition-colors p-1 focus:outline-none"
              aria-label={isExpanded ? "Collapse player view" : "Expand player view"}
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Drawer View: Lyrics & Track queue */}
        {isExpanded && (
          <div className="glass-panel rounded-2xl p-6 mb-4 max-h-[300px] overflow-y-auto border border-emerald-900/40 text-center animate-fadeIn">
            <h3 className="text-xs font-bold uppercase tracking-widest text-electric-green mb-2">
              LYRICS PREVIEW
            </h3>
            <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed font-sans max-w-lg mx-auto">
              {currentTrack.lyrics || "Lyrics for this track are being synchronized with official DSP streaming providers."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
