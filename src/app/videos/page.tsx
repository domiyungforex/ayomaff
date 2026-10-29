"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Film, X } from "lucide-react";
import { VIDEOS } from "@/lib/data/artist-data";
import { Video } from "@/types";
import { useAudio } from "@/lib/audio/AudioContext";

export default function VideosPage() {
  const [filter, setFilter] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const { pause } = useAudio();

  const handleOpenVideo = (video: Video) => {
    pause();
    setActiveVideo(video);
  };

  const filteredVideos = VIDEOS.filter(
    (v) => filter === "all" || v.category === filter
  );

  const featuredVideo = VIDEOS[0];

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          VISUAL CINEMA
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          OFFICIAL VIDEOS
        </h1>
        <p className="text-sm text-zinc-400">
          Cinematic storytelling, behind-the-scenes documentaries, and electrifying live performance archives.
        </p>
      </div>

      {/* Featured Hero Video Player */}
      {featuredVideo && (
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-emerald-950/80 mb-16 shadow-2xl">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`}
              title={featuredVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-electric-green mb-1 block">
                FEATURED VIDEO
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {featuredVideo.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                {featuredVideo.description}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-forest-surface border border-emerald-900 text-xs font-mono text-zinc-300">
              {featuredVideo.viewsCount} Views
            </span>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 bg-forest-dark p-1 rounded-full border border-emerald-950 w-max mx-auto mb-10 overflow-x-auto">
        {[
          { id: "all", label: "ALL" },
          { id: "music_video", label: "MUSIC VIDEOS" },
          { id: "visualizer", label: "VISUALIZERS" },
          { id: "live", label: "LIVE PERFORMANCES" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              filter === tab.id
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleOpenVideo(video)}
            className="group cursor-pointer glass-panel p-3 rounded-2xl border border-emerald-950/80 hover:border-electric-green/60 transition-all duration-300"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                <span className="w-12 h-12 rounded-full bg-forest-dark/90 border border-electric-green text-electric-green flex items-center justify-center shadow-neon group-hover:scale-110 group-hover:bg-electric-green group-hover:text-black transition-all">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                {video.duration}
              </span>
            </div>

            <h3 className="font-bold text-sm text-white tracking-tight group-hover:text-electric-green transition-colors truncate">
              {video.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Ayo Maff • {video.category.replace("_", " ").toUpperCase()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Video Player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-4xl w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
