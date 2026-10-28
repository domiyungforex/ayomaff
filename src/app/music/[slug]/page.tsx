"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Pause, ArrowLeft, Disc, Clock, Share2 } from "lucide-react";
import { RELEASES } from "@/lib/data/artist-data";
import { useAudio } from "@/lib/audio/AudioContext";
import { formatDuration } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ReleaseDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const release = RELEASES.find((r) => r.slug === slug);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();

  if (!release) {
    notFound();
  }

  const isCurrentReleasePlaying = currentTrack?.releaseId === release.id && isPlaying;

  return (
    <div className="pt-28 pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/music"
        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO DISCOGRAPHY</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Big Artwork & Action Buttons (Cols 1-5) */}
        <div className="md:col-span-5">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-emerald-950/80 bg-black mb-6">
            <Image
              src={release.coverImage}
              alt={release.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Quick Play & Stream Buttons */}
          <div className="space-y-3">
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
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
            >
              {isCurrentReleasePlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>PAUSE PLAYBACK</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY FULL RELEASE</span>
                </>
              )}
            </button>

            {/* Direct Streaming Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {release.streamingLinks.spotify && (
                <a
                  href={release.streamingLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-forest-surface border border-emerald-950 text-center text-xs font-bold text-zinc-300 hover:text-white hover:border-electric-green/60 transition-colors"
                >
                  Spotify ↗
                </a>
              )}
              {release.streamingLinks.appleMusic && (
                <a
                  href={release.streamingLinks.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-forest-surface border border-emerald-950 text-center text-xs font-bold text-zinc-300 hover:text-white hover:border-electric-green/60 transition-colors"
                >
                  Apple Music ↗
                </a>
              )}
              {release.streamingLinks.audiomack && (
                <a
                  href={release.streamingLinks.audiomack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-forest-surface border border-emerald-950 text-center text-xs font-bold text-zinc-300 hover:text-white hover:border-electric-green/60 transition-colors"
                >
                  Audiomack ↗
                </a>
              )}
              {release.streamingLinks.youtube && (
                <a
                  href={release.streamingLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-forest-surface border border-emerald-950 text-center text-xs font-bold text-zinc-300 hover:text-white hover:border-electric-green/60 transition-colors"
                >
                  YouTube Music ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Tracklist (Cols 6-12) */}
        <div className="md:col-span-7">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-electric-green mb-2">
            <span>{release.releaseType}</span>
            <span>•</span>
            <span>{release.year}</span>
            <span>•</span>
            <span>{release.tracks.length} TRACKS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            {release.title}
          </h1>

          <p className="text-sm text-zinc-300 leading-relaxed mb-8">
            {release.description}
          </p>

          {/* Tracklist Table */}
          <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-emerald-950/80">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 pb-2 border-b border-zinc-900">
              TRACKLIST
            </h3>

            <div className="space-y-1">
              {release.tracks.map((track) => {
                const isPlayingThis = currentTrack?.id === track.id && isPlaying;
                return (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      isPlayingThis
                        ? "bg-electric-green/10 border border-electric-green/40 text-electric-green"
                        : "hover:bg-forest-surface text-zinc-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-4 min-w-0 pr-4">
                      <span className="w-5 text-center font-mono text-xs text-zinc-500 font-bold">
                        {isPlayingThis ? (
                          <span className="text-electric-green animate-pulse">▶</span>
                        ) : (
                          track.trackNumber
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${isPlayingThis ? "text-electric-green" : "text-white"}`}>
                          {track.title}
                        </p>
                        {track.featuringArtists && track.featuringArtists.length > 0 && (
                          <p className="text-[11px] text-zinc-400 truncate">
                            feat. {track.featuringArtists.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
                      <span>{formatDuration(track.durationSeconds)}</span>
                      <span className="p-1 rounded-full bg-forest-dark border border-zinc-700 text-zinc-300 hover:text-electric-green hover:border-electric-green transition-colors">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
