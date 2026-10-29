import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Award, Music2 } from "lucide-react";
import { ARTIST_INFO } from "@/lib/data/artist-data";

export const metadata = {
  title: "About",
  description: "The official story, Bariga roots, and musical philosophy of Nigerian street-pop artist Ayo Maff.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          THE ARTIST STORY
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display mb-6">
          FROM BARIGA TO <br />
          <span className="text-electric-green text-glow">THE WORLD</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
          The sound, struggle, and poetic resilience of Ayorinde Mafoluku Ayodele, known universally to millions as Ayo Maff.
        </p>
      </div>

      {/* Narrative Section 1: The Roots & Bariga */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-24">
        <div className="md:col-span-5 relative">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-emerald-950 shadow-2xl bg-black">
            <Image
              src="/assets/artist/about_yellow_hoodie.webp"
              alt="Ayo Maff in yellow hoodie"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 p-4 rounded-xl bg-forest-surface border border-emerald-900 shadow-xl max-w-[200px]">
            <p className="text-[10px] font-bold text-electric-green uppercase tracking-widest">
              HOMETOWN
            </p>
            <p className="text-xs font-extrabold text-white">Bariga, Lagos, NG</p>
          </div>
        </div>

        <div className="md:col-span-7 space-y-5 text-zinc-300 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            The Streets That Raised Me
          </h2>
          <p>
            Bariga is not merely a geographic coordinate in Lagos State; it is a crucible of raw Nigerian street-hop culture. Growing up facing financial turbulence and the sudden bereavement of his father at an impressionable age, Ayo Maff learned early that survival demanded both quiet fortitude and unrelenting hunger.
          </p>
          <p>
            Leaving home at 15 to hustle on the streets and contribute to his family&apos;s sustenance, he began documenting the rhythms, pressures, and prayers of his everyday reality into voice notes. Those notes evolved into anthemic melodies that street boys and dreamers across West Africa immediately recognized as their own truth.
          </p>
        </div>
      </div>

      {/* Verified Quotes Banner */}
      <div className="my-20 p-8 sm:p-12 rounded-3xl bg-forest-dark border border-emerald-900/60 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-electric-green/10 rounded-full blur-3xl pointer-events-none" />
        <span className="text-4xl text-electric-green/30 font-serif block mb-2">&ldquo;</span>
        <blockquote className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug max-w-2xl mx-auto mb-4 font-display">
          {ARTIST_INFO.verifiedQuotes[0].quote}
        </blockquote>
        <cite className="text-xs font-mono font-medium text-electric-green uppercase tracking-widest block">
          • {ARTIST_INFO.name}, {ARTIST_INFO.verifiedQuotes[0].source}
        </cite>
      </div>

      {/* Narrative Section 2: The Breakthrough & Sound */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-24">
        <div className="md:col-span-7 space-y-5 text-zinc-300 leading-relaxed text-sm sm:text-base order-2 md:order-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            The Dealer Era & Afro-Adura
          </h2>
          <p>
            In early 2024, the breakthrough single <strong>&ldquo;Dealer&rdquo;</strong>, featuring Afrobeats titan <strong>Fireboy DML</strong>, arrived like a lightning bolt. Contrasting somber baritone introspections with an unforgettable melodic hook, the record soared to #1 across major streaming platforms in Nigeria and charted internationally.
          </p>
          <p>
            Unlike conventional pop tropes, Ayo Maff&apos;s songwriting belongs to the tradition of <em>Afro-Adura</em>: music steeped in prayers for protection, spiritual clarity, and generational wealth amidst structural struggle.
          </p>
        </div>

        <div className="md:col-span-5 relative order-1 md:order-2">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-emerald-950 shadow-2xl bg-black">
            <Image
              src="/assets/artist/hair_dying_balcony.jpg"
              alt="Ayo Maff balcony styling"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-950/80 mb-20">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-electric-green mb-8 text-center">
          CAREER MILESTONES
        </h3>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-emerald-900/60">
          {[
            {
              year: "2023",
              title: "Early Street Anthems",
              desc: "Releases 'Jama Jama' and 'Journey', gaining underground recognition in Bariga and on TikTok.",
            },
            {
              year: "2024",
              title: "Global Breakthrough: 'Dealer' (ft. Fireboy DML)",
              desc: "Collaborates with Fireboy DML to produce one of the biggest street-pop anthems of 2024, amassing tens of millions of streams.",
            },
            {
              year: "2024",
              title: "'MAFFIAN' Debut EP",
              desc: "Releases critically acclaimed 7-track project featuring 'Are You There?' and '7 Days'. Signed distribution partnership with EMPIRE.",
            },
            {
              year: "2025",
              title: "'Prince of the Street' Era",
              desc: "Announces full-length studio album and international tour dates in London, New York, and Portugal.",
            },
          ].map((item, idx) => (
            <div key={idx} className="relative flex items-start space-x-6 pl-2">
              <div className="w-7 h-7 rounded-full bg-forest-dark border-2 border-electric-green flex items-center justify-center flex-shrink-0 z-10 shadow-neon">
                <span className="w-2 h-2 rounded-full bg-electric-green" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-electric-green uppercase tracking-wider block">
                  {item.year}
                </span>
                <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Photo Collage Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-emerald-950 shadow-xl bg-black group">
          <Image
            src="/assets/artist/orange_lit_closeup.jpg"
            alt="Ayo Maff under dramatic orange studio lighting"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-[10px] font-bold text-electric-green uppercase tracking-wider">
              Studio Vision • 2025
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-emerald-950 shadow-xl bg-black group">
          <Image
            src="/assets/artist/red_cap_white_bandana.jpg"
            alt="Ayo Maff in red cap and white bandana"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-[10px] font-bold text-electric-green uppercase tracking-wider">
              Bariga Swagger
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-emerald-950 shadow-xl bg-black group">
          <Image
            src="/assets/artist/black_jersey_hand_signs.jpg"
            alt="Ayo Maff in black jersey throwing signs"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-[10px] font-bold text-electric-green uppercase tracking-wider">
              Maffian Empire
            </span>
          </div>
        </div>
      </div>

      {/* CTA Row */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/music"
          className="px-6 py-3 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
        >
          EXPLORE DISCOGRAPHY
        </Link>
        <Link
          href="/bookings"
          className="px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider hover:text-white hover:border-zinc-500 transition-colors"
        >
          SUBMIT BOOKING INQUIRY
        </Link>
      </div>
    </div>
  );
}
