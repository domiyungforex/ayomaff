"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, CheckCircle2, Music, ExternalLink } from "lucide-react";
import { RELEASES as initialReleases } from "@/lib/data/artist-data";
import { Release } from "@/types";

export default function AdminMusicPage() {
  const [releases, setReleases] = useState<Release[]>(initialReleases);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"album" | "ep" | "single">("single");
  const [newYear, setNewYear] = useState("2026");

  const handleAddRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newRel: Release = {
      id: `rel-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      title: newTitle,
      releaseType: newType,
      year: parseInt(newYear, 10),
      releaseDate: `${newYear}-01-01`,
      coverImage: "/assets/artist/about_yellow_hoodie.webp",
      description: "Newly registered catalogue release.",
      streamingLinks: {},
      tracks: [
        {
          id: `trk-${Date.now()}`,
          releaseId: `rel-${Date.now()}`,
          title: newTitle,
          trackNumber: 1,
          durationSeconds: 180,
          audioPreviewUrl: "",
        },
      ],
    };

    setReleases([newRel, ...releases]);
    setNewTitle("");
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setReleases(releases.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            DISCOGRAPHY MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage albums, EPs, tracklists, and digital streaming platform links.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-electric-green text-black text-xs font-extrabold hover:bg-acid-green transition-colors shadow-neon"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Release</span>
        </button>
      </div>

      {/* Releases Table */}
      <div className="glass-panel rounded-3xl border border-emerald-950/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest-dark border-b border-zinc-900 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-4 px-6">Release</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Year</th>
                <th className="py-4 px-6">Tracks</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/80 text-zinc-300">
              {releases.map((rel) => (
                <tr key={rel.id} className="hover:bg-forest-surface/50 transition-colors">
                  <td className="py-4 px-6 flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black flex-shrink-0">
                      <Image src={rel.coverImage} alt={rel.title} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">{rel.title}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">/{rel.slug}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 uppercase font-mono text-[11px] text-zinc-400">
                    {rel.releaseType}
                  </td>
                  <td className="py-4 px-6 font-mono text-zinc-400">{rel.year}</td>
                  <td className="py-4 px-6 font-mono text-zinc-400">{rel.tracks.length}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-950 text-electric-green border border-green-800">
                      Published
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(rel.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      title="Delete release"
                      aria-label={`Delete ${rel.title}`}
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

      {/* Add Release Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white tracking-tight mb-4 pb-2 border-b border-zinc-800">
              CREATE NEW RELEASE
            </h3>

            <form onSubmit={handleAddRelease} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Release Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bariga Nights"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Release Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as "album" | "ep" | "single")}
                    className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                  >
                    <option value="single">Single</option>
                    <option value="ep">EP</option>
                    <option value="album">Album</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Release Year
                  </label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                  />
                </div>
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
                  Save Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
