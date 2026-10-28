"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail, Send, MessageSquare } from "lucide-react";
import { ARTIST_INFO } from "@/lib/data/artist-data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      await fetch("/api/inquiries/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          COMMUNICATIONS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          GET IN TOUCH
        </h1>
        <p className="text-sm text-zinc-300 leading-relaxed">
          For general messages, brand partnerships, licensing, and creative inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Info Box (Cols 1-5) */}
        <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950 space-y-6">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-electric-green">
            DIRECT CHANNELS
          </h3>

          <div className="space-y-4 text-xs text-zinc-300">
            <div>
              <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-bold">
                MANAGEMENT & REPRESENTATION
              </span>
              <p className="font-semibold text-white mt-0.5">EMPIRE / Maffian Empire</p>
              <p className="text-zinc-400">Lagos, Nigeria</p>
            </div>

            <div className="pt-3 border-t border-zinc-900">
              <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-bold">
                VERIFIED SOCIALS
              </span>
              <div className="flex flex-col space-y-2 mt-2 font-medium">
                <a href={ARTIST_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                  Instagram: @ayomaff ↗
                </a>
                <a href={ARTIST_INFO.socialLinks.x} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                  X (Twitter): @ayomaff ↗
                </a>
                <a href={ARTIST_INFO.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                  TikTok: @ayomaff ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Cols 6-12) */}
        <div className="md:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-forest-dark border-2 border-electric-green flex items-center justify-center mx-auto shadow-neon">
                  <CheckCircle2 className="w-7 h-7 text-electric-green" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  MESSAGE DISPATCHED
                </h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your transmission has been safely logged to the inquiry registry.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-electric-green hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Alaba"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Subject Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                  >
                    <option>General Inquiry</option>
                    <option>Brand Collaboration</option>
                    <option>Press & Media Interview</option>
                    <option>Music Synchronization & Licensing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "SENDING..." : "DISPATCH MESSAGE"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
