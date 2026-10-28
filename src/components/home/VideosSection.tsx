"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { VIDEOS } from "@/lib/data/artist-data";
import { Video } from "@/types";

export function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <section className="relative py-24 bg-[#050806] border-t border-emerald-950/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-1 block">
              OFFICIAL VIDEOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              MUSIC VIDEOS
            </h2>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link
              href="/videos"
              className="group flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {VIDEOS.slice(0, 5).map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer glass-panel p-2.5 rounded-2xl border border-emerald-950/80 hover:border-electric-green/60 transition-all duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Play Button Icon */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                  <span className="w-9 h-9 rounded-full bg-forest-dark/90 border border-electric-green text-electric-green flex items-center justify-center shadow-neon group-hover:scale-110 group-hover:bg-electric-green group-hover:text-black transition-all">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                </div>

                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                  {video.duration}
                </span>
              </div>

              <h3 className="font-bold text-xs text-white truncate tracking-tight group-hover:text-electric-green transition-colors">
                {video.title}
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">Ayo Maff</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-4xl w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-zinc-400">Ayo Maff Official Video</p>
              </div>
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
    </section>
  );
}
