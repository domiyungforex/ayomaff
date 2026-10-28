"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, MapPin } from "lucide-react";
import { GALLERY_IMAGES as initialGallery } from "@/lib/data/artist-data";
import { GalleryImage } from "@/types";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialGallery);
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<"editorial" | "studio" | "lifestyle" | "live">("editorial");
  const [location, setLocation] = useState("Lagos, Nigeria");

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption) return;

    const newImg: GalleryImage = {
      id: `gal-${Date.now()}`,
      imageUrl: "/assets/artist/hero_green_jacket_balcony.webp",
      caption,
      category,
      location,
      aspectRatio: "2:3",
    };

    setImages([newImg, ...images]);
    setCaption("");
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            GALLERY ARCHIVE MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Organize official photo shoots, studio sessions, and lifestyle imagery.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-electric-green text-black text-xs font-extrabold hover:bg-acid-green transition-colors shadow-neon"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="glass-panel p-3 rounded-2xl border border-emerald-950/80 flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black mb-3">
              <Image src={img.imageUrl} alt={img.caption} fill className="object-cover" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-electric-green uppercase tracking-wider">
                {img.category}
              </span>
            </div>

            <div>
              <p className="text-xs text-white line-clamp-2 leading-relaxed mb-1">
                {img.caption}
              </p>
              <div className="flex items-center space-x-1 text-[10px] text-zinc-400 mb-3">
                <MapPin className="w-3 h-3 text-electric-green" />
                <span>{img.location || "Lagos, Nigeria"}</span>
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="w-full flex items-center justify-center space-x-1 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-900 text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white tracking-tight mb-4 pb-2 border-b border-zinc-800">
              UPLOAD GALLERY PHOTO
            </h3>

            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Caption / Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Studio session recording Prince of the Street"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as "editorial" | "studio" | "lifestyle" | "live")}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                >
                  <option value="editorial">Editorial</option>
                  <option value="studio">Studio</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="live">Live Show</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Victoria Island, Lagos"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-electric-green text-black font-extrabold text-xs uppercase hover:bg-acid-green transition-all"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
