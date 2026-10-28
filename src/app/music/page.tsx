"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Play, Disc, ArrowRight } from "lucide-react";
import { RELEASES } from "@/lib/data/artist-data";
import { useAudio } from "@/lib/audio/AudioContext";
import { ReleaseType } from "@/types";

export default function MusicPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { playTrack, currentTrack, isPlaying } = useAudio();

  const filteredReleases = RELEASES.filter((release) => {
    const matchesFilter = filter === "all" || release.releaseType === filter;
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.tracks.some((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          DISCOGRAPHY
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          ALL RELEASES
        </h1>
        <p className="text-sm text-zinc-400">
          Explore albums, EPs, and breakout singles from Ayo Maff — streaming across all official global platforms.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-900">
        {/* Category Tabs */}
        <div className="flex items-center space-x-2 bg-forest-dark p-1 rounded-full border border-emerald-950">
          {["all", "album", "ep", "single"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === type
                  ? "bg-electric-green text-black shadow-neon"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {type === "all" ? "ALL" : type.toUpperCase() + "S"}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tracks or titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-electric-green"
          />
        </div>
      </div>

      {/* Release Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReleases.map((release) => {
          const isCurrent = currentTrack?.releaseId === release.id;
          return (
            <div
              key={release.id}
              className="group glass-panel rounded-2xl p-4 border border-emerald-950/80 hover:border-electric-green/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Art with Hover Play */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-black">
                  <Image
                    src={release.coverImage}
                    alt={release.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => {
                      if (release.tracks[0]) playTrack(release.tracks[0]);
                    }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    aria-label={`Play ${release.title}`}
                  >
                    <span className="w-12 h-12 rounded-full bg-electric-green text-black flex items-center justify-center shadow-neon hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </button>

                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-electric-green uppercase tracking-wider">
                    {release.releaseType}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-electric-green transition-colors tracking-tight">
                    {release.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">{release.year}</span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {release.description}
                </p>

                {/* Track highlights list */}
                <div className="space-y-1.5 mb-4">
                  {release.tracks.slice(0, 3).map((track, i) => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-forest-surface text-zinc-300 hover:text-white cursor-pointer transition-colors"
                    >
                      <span className="truncate">
                        {i + 1}. {track.title}
                      </span>
                      <Play className="w-3 h-3 text-electric-green opacity-0 group-hover:opacity-100" />
                    </div>
                  ))}
                  {release.tracks.length > 3 && (
                    <span className="text-[10px] font-bold text-zinc-500 block px-2">
                      +{release.tracks.length - 3} more tracks
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <Link
                  href={`/music/${release.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-electric-green hover:underline"
                >
                  <span>Release Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {release.streamingLinks.spotify && (
                  <a
                    href={release.streamingLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
                  >
                    Stream ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
