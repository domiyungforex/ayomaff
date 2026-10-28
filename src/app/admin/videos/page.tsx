"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Film, CheckCircle2 } from "lucide-react";
import { VIDEOS as initialVideos } from "@/lib/data/artist-data";
import { Video } from "@/types";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newYoutubeId, setNewYoutubeId] = useState("");
  const [newCategory, setNewCategory] = useState<"music_video" | "live" | "visualizer" | "documentary">("music_video");

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newYoutubeId) return;

    const newVid: Video = {
      id: `vid-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      title: newTitle,
      youtubeId: newYoutubeId,
      thumbnailUrl: "/assets/artist/hero_green_jacket_balcony.webp",
      category: newCategory,
      duration: "3:30",
      releaseDate: "2026-01-01",
      viewsCount: "0",
      description: "Official video addition.",
    };

    setVideos([newVid, ...videos]);
    setNewTitle("");
    setNewYoutubeId("");
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            VIDEO EMBED MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Organize official YouTube visualizers, live recordings, and documentaries.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-electric-green text-black text-xs font-extrabold hover:bg-acid-green transition-colors shadow-neon"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Video</span>
        </button>
      </div>

      <div className="glass-panel rounded-3xl border border-emerald-950/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest-dark border-b border-zinc-900 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-4 px-6">Video Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">YouTube ID</th>
                <th className="py-4 px-6">Duration</th>
                <th className="py-4 px-6">Views</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/80 text-zinc-300">
              {videos.map((vid) => (
                <tr key={vid.id} className="hover:bg-forest-surface/50 transition-colors">
                  <td className="py-4 px-6 flex items-center space-x-3">
                    <div className="relative w-12 h-8 rounded overflow-hidden bg-black flex-shrink-0">
                      <Image src={vid.thumbnailUrl} alt={vid.title} fill className="object-cover" />
                    </div>
                    <span className="font-bold text-white truncate max-w-xs">{vid.title}</span>
                  </td>
                  <td className="py-4 px-6 uppercase font-mono text-[10px] text-zinc-400">
                    {vid.category.replace("_", " ")}
                  </td>
                  <td className="py-4 px-6 font-mono text-electric-green">{vid.youtubeId}</td>
                  <td className="py-4 px-6 font-mono text-zinc-400">{vid.duration}</td>
                  <td className="py-4 px-6 font-mono text-zinc-400">{vid.viewsCount}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(vid.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      aria-label={`Delete ${vid.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Video Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white tracking-tight mb-4 pb-2 border-b border-zinc-800">
              ADD OFFICIAL VIDEO
            </h3>

            <form onSubmit={handleAddVideo} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dealer (Live at O2)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  YouTube Video ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. dQw4w9WgXcQ"
                  value={newYoutubeId}
                  onChange={(e) => setNewYoutubeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as "music_video" | "live" | "visualizer" | "documentary")}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                >
                  <option value="music_video">Music Video</option>
                  <option value="visualizer">Visualizer</option>
                  <option value="live">Live Performance</option>
                  <option value="documentary">Documentary</option>
                </select>
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
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
