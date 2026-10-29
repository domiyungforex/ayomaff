"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ChevronLeft, ChevronRight, ExternalLink, X, Disc3, Sparkles } from "lucide-react";
import { RELEASES } from "@/lib/data/artist-data";
import { Release } from "@/types";
import { useAudio } from "@/lib/audio/AudioContext";

export function MusicalCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();

  // Update scroll buttons state
  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollState();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollState);
      window.addEventListener("resize", checkScrollState);
      return () => {
        el.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, []);

  // Handle ESC key to close streaming modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedRelease(null);
      }
    };
    if (selectedRelease) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedRelease]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Carousel Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-electric-green animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            COMPLETE CATALOG ({RELEASES.length} RELEASES)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous music releases"
            className="w-9 h-9 rounded-full bg-forest-dark border border-emerald-900/80 flex items-center justify-center text-zinc-300 hover:text-white hover:border-electric-green disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next music releases"
            className="w-9 h-9 rounded-full bg-forest-dark border border-emerald-900/80 flex items-center justify-center text-zinc-300 hover:text-white hover:border-electric-green disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-5 overflow-x-auto scrollbar-none scroll-smooth pb-6 pt-2 px-1 focus:outline-none"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {RELEASES.map((release) => {
          const isCurrentReleasePlaying = currentTrack?.releaseId === release.id && isPlaying;
          const isThisReleaseActive = currentTrack?.releaseId === release.id;

          return (
            <div
              key={release.id}
              className={`flex-shrink-0 w-[260px] sm:w-[280px] rounded-3xl glass-panel p-4 border transition-all duration-300 group ${
                isThisReleaseActive
                  ? "border-electric-green/80 bg-forest-surface/90 shadow-[0_0_30px_rgba(98,255,112,0.18)]"
                  : "border-emerald-950/80 hover:border-emerald-700/80 hover:shadow-xl"
              }`}
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Artwork Container with Vinyl Record Reveal effect */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-black shadow-lg">
                <Image
                  src={release.coverImage}
                  alt={release.title}
                  fill
                  sizes="(max-width: 640px) 260px, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge: Type & Year */}
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-extrabold text-electric-green uppercase tracking-wider">
                    {release.releaseType}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold text-zinc-300">
                    {release.year}
                  </span>
                </div>

                {/* Animated Equalizer Wave when playing */}
                {isCurrentReleasePlaying && (
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-electric-green/60 flex items-center space-x-1.5">
                    <div className="flex items-end space-x-0.5 h-3">
                      <span className="w-0.5 h-3 bg-electric-green rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" />
                      <span className="w-0.5 h-2 bg-electric-green rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.2s]" />
                      <span className="w-0.5 h-3.5 bg-electric-green rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.4s]" />
                      <span className="w-0.5 h-2 bg-electric-green rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.1s]" />
                    </div>
                    <span className="text-[9px] font-mono font-extrabold text-electric-green uppercase tracking-wider">
                      PLAYING
                    </span>
                  </div>
                )}

                {/* Quick Play Center Overlay */}
                <button
                  onClick={() => {
                    if (release.tracks[0]) {
                      if (currentTrack?.id === release.tracks[0].id) {
                        togglePlay();
                      } else {
                        playTrack(release.tracks[0]);
                      }
                    }
                  }}
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all ${
                    isCurrentReleasePlaying
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  aria-label={isCurrentReleasePlaying ? `Pause ${release.title}` : `Play preview of ${release.title}`}
                >
                  <span className="w-12 h-12 rounded-full bg-electric-green text-black flex items-center justify-center shadow-neon hover:scale-110 active:scale-95 transition-transform">
                    {isCurrentReleasePlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </span>
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="mb-3">
                <Link href={`/music/${release.slug}`}>
                  <h3 className="font-extrabold text-base text-white tracking-tight truncate hover:text-electric-green transition-colors">
                    {release.title}
                  </h3>
                </Link>
                <p className="text-xs text-zinc-400 mt-0.5 flex items-center space-x-1.5 truncate">
                  <span>Ayo Maff</span>
                  <span>•</span>
                  <span>{release.tracks.length} {release.tracks.length === 1 ? "track" : "tracks"}</span>
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-900/80">
                {/* 1. Preview In Site */}
                <button
                  onClick={() => {
                    if (release.tracks[0]) {
                      if (currentTrack?.id === release.tracks[0].id) {
                        togglePlay();
                      } else {
                        playTrack(release.tracks[0]);
                      }
                    }
                  }}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                    isCurrentReleasePlaying
                      ? "bg-electric-green text-black shadow-neon"
                      : "bg-forest-dark border border-electric-green/60 text-electric-green hover:bg-electric-green hover:text-black"
                  }`}
                >
                  {isCurrentReleasePlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>PREVIEW</span>
                    </>
                  )}
                </button>

                {/* 2. Stream On (Pops where you want to stream) */}
                <button
                  onClick={() => setSelectedRelease(release)}
                  className="flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl bg-forest-surface border border-zinc-700/60 text-zinc-200 hover:text-white hover:border-electric-green/80 hover:bg-forest-surface/90 text-[10px] font-extrabold uppercase tracking-wider transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>STREAM</span>
                </button>
              </div>

              {/* Deep Link to Music Page */}
              <Link
                href={`/music/${release.slug}`}
                className="mt-2.5 block text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-electric-green transition-colors"
              >
                VIEW FULL TRACKLIST & LYRICS →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Interactive Where-To-Stream Popover / Modal */}
      {selectedRelease && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Stream ${selectedRelease.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative max-w-md w-full bg-[#07140C] border border-emerald-800/80 rounded-3xl p-6 shadow-2xl overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-electric-green to-emerald-400" />
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-electric-green/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header & Close */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
              <div className="flex items-center space-x-2">
                <Disc3 className="w-4 h-4 text-electric-green animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs font-extrabold tracking-widest text-electric-green uppercase">
                  WHERE TO STREAM
                </span>
              </div>
              <button
                onClick={() => setSelectedRelease(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close streaming platform options"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Release Highlight Card */}
            <div className="flex items-center space-x-4 p-3 rounded-2xl bg-forest-surface/80 border border-emerald-950 mb-5">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black">
                <Image
                  src={selectedRelease.coverImage}
                  alt={selectedRelease.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-white text-base truncate">
                  {selectedRelease.title}
                </h4>
                <p className="text-xs text-zinc-400 capitalize mt-0.5">
                  Ayo Maff • {selectedRelease.year} {selectedRelease.releaseType}
                </p>
                <p className="text-[11px] text-electric-green font-mono mt-0.5">
                  {selectedRelease.tracks.length} {selectedRelease.tracks.length === 1 ? "Official Track" : "Official Tracks"}
                </p>
              </div>
            </div>

            {/* Streaming Platform Links */}
            <p className="text-xs text-zinc-400 mb-3 font-medium">
              Choose your preferred official streaming service:
            </p>

            <div className="space-y-2.5 mb-5">
              {/* Spotify */}
              {selectedRelease.streamingLinks.spotify && (
                <a
                  href={selectedRelease.streamingLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-forest-dark border border-emerald-950/90 hover:border-[#1DB954] hover:bg-[#1DB954]/10 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-[#1DB954]" />
                    <span className="text-sm font-bold text-white group-hover:text-[#1DB954] transition-colors">
                      Spotify
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#1DB954] uppercase tracking-wider flex items-center space-x-1">
                    <span>Stream</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              )}

              {/* Apple Music */}
              {selectedRelease.streamingLinks.appleMusic && (
                <a
                  href={selectedRelease.streamingLinks.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-forest-dark border border-emerald-950/90 hover:border-[#FA243C] hover:bg-[#FA243C]/10 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-[#FA243C]" />
                    <span className="text-sm font-bold text-white group-hover:text-[#FA243C] transition-colors">
                      Apple Music
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FA243C] uppercase tracking-wider flex items-center space-x-1">
                    <span>Listen</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              )}

              {/* Audiomack */}
              {selectedRelease.streamingLinks.audiomack && (
                <a
                  href={selectedRelease.streamingLinks.audiomack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-forest-dark border border-emerald-950/90 hover:border-[#FFA200] hover:bg-[#FFA200]/10 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-[#FFA200]" />
                    <span className="text-sm font-bold text-white group-hover:text-[#FFA200] transition-colors">
                      Audiomack
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FFA200] uppercase tracking-wider flex items-center space-x-1">
                    <span>Play</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              )}

              {/* YouTube Music */}
              {selectedRelease.streamingLinks.youtube && (
                <a
                  href={selectedRelease.streamingLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-forest-dark border border-emerald-950/90 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-[#FF0000]" />
                    <span className="text-sm font-bold text-white group-hover:text-[#FF0000] transition-colors">
                      YouTube Music
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF0000] uppercase tracking-wider flex items-center space-x-1">
                    <span>Watch</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              )}
            </div>

            {/* In-Site Audio Preview Alternative */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (selectedRelease.tracks[0]) {
                    playTrack(selectedRelease.tracks[0]);
                  }
                  setSelectedRelease(null);
                }}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY IN SITE NOW</span>
              </button>

              <Link
                href={`/music/${selectedRelease.slug}`}
                onClick={() => setSelectedRelease(null)}
                className="py-2.5 px-3 rounded-xl bg-forest-dark border border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              >
                DETAILS
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
