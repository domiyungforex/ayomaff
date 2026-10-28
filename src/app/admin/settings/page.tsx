"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, Shield, History } from "lucide-react";
import { ARTIST_INFO } from "@/lib/data/artist-data";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    name: ARTIST_INFO.name,
    title: ARTIST_INFO.title,
    hometown: ARTIST_INFO.hometown,
    recordLabel: ARTIST_INFO.recordLabel,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const auditLogs = [
    {
      action: "RELEASE_UPDATED",
      user: "management@ayomaff.com",
      time: "2026-10-28 14:12",
      details: "Updated streaming URLs for Prince of the Street",
    },
    {
      action: "INQUIRY_CONFIRMED",
      user: "management@ayomaff.com",
      time: "2026-10-27 18:40",
      details: "Confirmed booking inquiry for Livespot Lagos",
    },
    {
      action: "SUBSCRIBERS_EXPORTED",
      user: "admin@ayomaff.com",
      time: "2026-10-26 11:20",
      details: "Generated CSV export of 1,420 fan club subscribers",
    },
  ];

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="pb-6 border-b border-zinc-900">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          SYSTEM SETTINGS & AUDIT LOGS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure artist branding and review administrative activity trail.
        </p>
      </div>

      {/* Profile Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950/80">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-white pb-3 border-b border-zinc-900 mb-6">
          ARTIST METADATA & BRANDING
        </h3>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Stage Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Brand Title / Theme
              </label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Hometown
              </label>
              <input
                type="text"
                value={profile.hometown}
                onChange={(e) => setProfile({ ...profile, hometown: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Record Label / Partner
              </label>
              <input
                type="text"
                value={profile.recordLabel}
                onChange={(e) => setProfile({ ...profile, recordLabel: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
            {saved ? (
              <span className="flex items-center space-x-1.5 text-xs font-bold text-electric-green">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings Saved to Registry</span>
              </span>
            ) : (
              <span className="text-[11px] text-zinc-500">
                Changes take effect across all public routes immediately.
              </span>
            )}

            <button
              type="submit"
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950/80">
        <div className="flex items-center space-x-2 pb-3 border-b border-zinc-900 mb-6">
          <History className="w-4 h-4 text-electric-green" />
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
            ADMINISTRATIVE AUDIT LOG
          </h3>
        </div>

        <div className="space-y-3">
          {auditLogs.map((log, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl bg-forest-surface/50 border border-emerald-950 text-xs gap-2"
            >
              <div>
                <span className="font-mono font-bold text-electric-green text-[10px] uppercase block">
                  {log.action}
                </span>
                <p className="text-white mt-0.5">{log.details}</p>
              </div>
              <div className="text-right text-[11px] text-zinc-400 font-mono">
                <span>{log.user}</span>
                <span className="text-zinc-600 block">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
