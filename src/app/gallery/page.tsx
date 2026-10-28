"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data/artist-data";
import { GalleryImage } from "@/types";

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => filter === "all" || img.category === filter
  );

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % filteredImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, filteredImages.length]);

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          VISUAL ARCHIVE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          PHOTOGRAPHY
        </h1>
        <p className="text-sm text-zinc-400">
          Editorial shoots, candid moments, and studio sessions documenting the Prince of the Street era.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 bg-forest-dark p-1 rounded-full border border-emerald-950 w-max mx-auto mb-12">
        {["all", "editorial", "studio", "lifestyle"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === tab
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Masonry / Staggered Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setActiveImageIndex(idx)}
            className="group cursor-pointer relative rounded-2xl overflow-hidden glass-panel border border-emerald-950/80 hover:border-electric-green/60 transition-all duration-300"
          >
            <div className="relative aspect-[3/4] bg-black">
              <Image
                src={img.imageUrl}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-electric-green uppercase tracking-wider mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{img.location || "Lagos, Nigeria"}</span>
                </div>
                <p className="text-xs text-white line-clamp-2 leading-relaxed">
                  {img.caption}
                </p>
                <span className="mt-2 inline-flex items-center space-x-1 text-[10px] font-bold text-zinc-400">
                  <Maximize2 className="w-3 h-3" />
                  <span>Click to view full screen</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeImageIndex !== null && filteredImages[activeImageIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700 hover:border-white transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={() =>
              setActiveImageIndex(
                (activeImageIndex - 1 + filteredImages.length) % filteredImages.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700 hover:border-white transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((activeImageIndex + 1) % filteredImages.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700 hover:border-white transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative w-full h-[65vh] max-h-[700px] mb-4">
              <Image
                src={filteredImages[activeImageIndex].imageUrl}
                alt={filteredImages[activeImageIndex].caption}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="text-center max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-electric-green block mb-1">
                {filteredImages[activeImageIndex].category} • {filteredImages[activeImageIndex].location}
              </span>
              <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                {filteredImages[activeImageIndex].caption}
              </p>
              <span className="text-xs text-zinc-500 font-mono mt-2 block">
                {activeImageIndex + 1} of {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
