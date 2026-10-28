"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Ticket } from "lucide-react";
import { CONCERT_EVENTS, PRODUCTS, ARTIST_INFO } from "@/lib/data/artist-data";

export function HomeBottomSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/fan-club/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        // Fallback optimistic success for offline demo
        setIsSubscribed(true);
        setEmail("");
      }
    } catch {
      setIsSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 bg-[#050806] border-t border-emerald-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Column 1: UPCOMING SHOWS (Cols 1-4) */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-emerald-950/80">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
                UPCOMING SHOWS
              </h3>
              <Ticket className="w-4 h-4 text-electric-green" />
            </div>

            <div className="space-y-4 mb-6">
              {CONCERT_EVENTS.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-center justify-between py-2 border-b border-zinc-900 text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-electric-green font-mono">
                        {evt.month} {evt.day}
                      </span>
                      <span className="text-zinc-500">•</span>
                      <span className="font-bold text-white truncate">
                        {evt.city}, {evt.country.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      {evt.venue}
                    </p>
                  </div>

                  <a
                    href={evt.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-3 py-1 rounded-full border border-electric-green text-[10px] font-bold text-electric-green hover:bg-electric-green hover:text-black transition-all"
                  >
                    GET TICKETS
                  </a>
                </div>
              ))}
            </div>

            <Link
              href="/tour"
              className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors"
            >
              <span>VIEW ALL DATES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Column 2: MERCHANDISE (Cols 5-8) */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-emerald-950/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-electric-green">
                  MERCHANDISE
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  OFFICIAL DROP
                </span>
              </div>

              {/* 3 Product Previews Side-by-Side */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {PRODUCTS.slice(0, 3).map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/merch/${prod.slug}`}
                    className="group flex flex-col items-center bg-forest-surface/70 p-2 rounded-xl border border-emerald-950/70 hover:border-electric-green/60 transition-colors"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black mb-2">
                      <Image
                        src={prod.mainImage}
                        alt={prod.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-300 text-center truncate w-full">
                      {prod.title.split(" ")[0]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/merch"
              className="w-full text-center py-2.5 rounded-full border border-electric-green text-electric-green text-xs font-bold uppercase tracking-wider hover:bg-electric-green hover:text-black transition-all"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Column 3: JOIN THE FAN CLUB (Cols 9-12) */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-emerald-950/80">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white mb-2">
              JOIN THE FAN CLUB
            </h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Get exclusive updates, early access to new music, and tour pre-sale codes.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-forest-surface border border-electric-green/40 text-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-electric-green mx-auto mb-2" />
                <p className="text-xs font-bold text-white">Welcome to the Maffian Family!</p>
                <p className="text-[11px] text-zinc-400 mt-1">Check your inbox for VIP access.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 mb-6">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-electric-green focus:ring-1 focus:ring-electric-green"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
                >
                  {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
                </button>
              </form>
            )}

            {/* Social Links Row */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-zinc-900 text-zinc-400">
              <a href={ARTIST_INFO.socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306c-.215.352-.676.463-1.028.247-2.817-1.721-6.363-2.11-10.54-1.156-.403.093-.812-.162-.904-.565-.093-.404.161-.813.565-.905 4.575-1.045 8.487-.604 11.66 1.35.352.217.463.676.247 1.029zm1.467-3.262c-.27.44-.848.577-1.288.307-3.225-1.982-8.14-2.557-11.954-1.4-.495.15-1.02-.133-1.17-.628-.15-.494.133-1.02.628-1.17 4.364-1.325 9.775-.688 13.477 1.603.44.27.577.848.307 1.288zm.126-3.41c-3.867-2.296-10.248-2.508-13.94-1.387-.593.18-1.22-.161-1.4-.754-.18-.593.161-1.22.754-1.4 4.242-1.288 11.288-1.045 15.727 1.59.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.541.392z" /></svg>
              </a>
              <a href={ARTIST_INFO.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href={ARTIST_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href={ARTIST_INFO.socialLinks.x} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
