"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTIST_INFO } from "@/lib/data/artist-data";

export function AboutSection() {
  return (
    <section className="relative py-24 bg-[#050806] border-t border-emerald-950/40 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-electric-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Yellow-Hoodie Portrait in Glowing Framed Box (Cols 1-5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-[300px] h-[340px] sm:w-[360px] sm:h-[400px]">
              {/* Outer Neon Glow Border */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-950 via-electric-green/20 to-transparent blur-sm" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-emerald-900/60 shadow-2xl bg-black">
                <Image
                  src="/assets/artist/about_yellow_hoodie.webp"
                  alt="Ayo Maff portrait in yellow hoodie"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative & Key Callouts (Cols 6-12) */}
          <div className="lg:col-span-7 text-left">
            <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
              ABOUT
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-6">
              AYO MAFF
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8 font-sans">
              {ARTIST_INFO.shortBio}
            </p>

            {/* 3 Callout Stats matching mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-zinc-900/90 mb-8">
              {ARTIST_INFO.stats.map((stat, idx) => (
                <div key={idx} className="border-l-2 border-electric-green pl-4">
                  <h4 className="text-xs font-extrabold tracking-wider text-white uppercase">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] font-medium tracking-wider text-zinc-400 uppercase mt-0.5">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-electric-green text-electric-green text-xs font-bold uppercase tracking-wider hover:bg-electric-green hover:text-black transition-all group"
            >
              <span>LEARN MORE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
