"use client";

import React, { useState } from "react";
import { CheckCircle2, Music, Ticket, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";

export default function FanClubPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [preferences, setPreferences] = useState({
    music: true,
    tour: true,
    merch: true,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await fetch("/api/fan-club/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, interests: preferences }),
      });
      setSuccess(true);
    } catch {
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          COMMUNITY & VIP
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          THE MAFFIAN EMPIRE
        </h1>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Join Ayo Maff&apos;s inner circle. Get first access to unreleased music snippets, priority tour presales, and secret merchandise drops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Perks Column (Cols 1-5) */}
        <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950 space-y-6">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-electric-green">
            MEMBER BENEFITS
          </h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-xs">
              <Sparkles className="w-4 h-4 text-electric-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Secret Audio Previews</strong>
                <span className="text-zinc-400">Hear demo cuts and acoustic versions before global release.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <Ticket className="w-4 h-4 text-electric-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Priority Tour Codes</strong>
                <span className="text-zinc-400">Exclusive 24-hour advance access to headline concert tickets.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <ShoppingBag className="w-4 h-4 text-electric-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Private Merch Drops</strong>
                <span className="text-zinc-400">Access limited numbered hoodies, caps, and vinyl editions.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Form (Cols 6-12) */}
        <div className="md:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950">
            {success ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-electric-green mx-auto" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  YOU&apos;RE IN THE EMPIRE
                </h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Welcome! We have registered <strong>{email}</strong>. Look out for exclusive Maffian updates directly in your inbox.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                    setFullName("");
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-electric-green hover:underline"
                >
                  Register Another Fan
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-white pb-2 border-b border-zinc-900">
                  MEMBERSHIP REGISTRATION
                </h3>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oluwaseun Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    placeholder="seun@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                  />
                </div>

                {/* Notification Preferences */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Notification Preferences:
                  </span>
                  <div className="space-y-2 text-xs text-zinc-300">
                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.music}
                        onChange={(e) =>
                          setPreferences({ ...preferences, music: e.target.checked })
                        }
                        className="rounded accent-electric-green"
                      />
                      <span>New music releases & listening parties</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.tour}
                        onChange={(e) =>
                          setPreferences({ ...preferences, tour: e.target.checked })
                        }
                        className="rounded accent-electric-green"
                      />
                      <span>Tour dates & ticket pre-sale codes</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.merch}
                        onChange={(e) =>
                          setPreferences({ ...preferences, merch: e.target.checked })
                        }
                        className="rounded accent-electric-green"
                      />
                      <span>Exclusive merchandise capsule drops</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
                >
                  {loading ? "REGISTERING..." : "JOIN MAFFIAN EMPIRE"}
                </button>

                <p className="text-[10px] text-zinc-500 text-center">
                  Zero spam. Unsubscribe at any time with one click.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
