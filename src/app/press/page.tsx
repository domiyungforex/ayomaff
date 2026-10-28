"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Award, Music, ExternalLink, Mail, FileText } from "lucide-react";
import { ARTIST_INFO, RELEASES, GALLERY_IMAGES } from "@/lib/data/artist-data";

export default function PressPage() {
  return (
    <div className="pt-28 pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          MEDIA & INDUSTRY RESOURCES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          ELECTRONIC PRESS KIT (EPK)
        </h1>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Official biography, high-resolution editorial press photography, streaming milestones, and booking inquiries for journalists, promoters, and festivals.
        </p>
      </div>

      {/* Key Quick Facts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {[
          { label: "STAGE NAME", val: "Ayo Maff" },
          { label: "GENRE", val: "Afrobeats / Street-Pop" },
          { label: "ORIGIN", val: "Bariga, Lagos, NG" },
          { label: "PARTNER", val: "EMPIRE Distribution" },
        ].map((item, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl border border-emerald-950 text-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              {item.label}
            </span>
            <p className="font-extrabold text-sm text-white">{item.val}</p>
          </div>
        ))}
      </div>

      {/* Bio One-Sheet */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-950/80 mb-16 space-y-4 text-zinc-300 text-sm leading-relaxed">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
          <h2 className="text-lg font-bold text-white tracking-tight">ARTIST BIOGRAPHY (ONE-SHEET)</h2>
          <span className="text-xs font-mono text-electric-green">VERIFIED 2026</span>
        </div>
        <p>
          <strong>Ayo Maff</strong> (born Ayorinde Mafoluku Ayodele on July 18, 2005) is a Nigerian singer, songwriter, and rapper hailing from Bariga, Lagos State. Recognized as the &ldquo;Prince of the Street&rdquo;, his distinct vocal baritone and evocative Afro-Adura storytelling explore the struggles, street hustle, and spiritual ambition of young Africans.
        </p>
        <p>
          Following independent releases like &ldquo;Jama Jama&rdquo;, his meteoric national breakthrough occurred with the hit single <strong>&ldquo;Dealer&rdquo; (ft. Fireboy DML)</strong>, which reached the apex of streaming charts across Nigeria and earned widespread acclaim from Native Mag, Culture Custodian, and The Guardian Nigeria.
        </p>
      </div>

      {/* High-Resolution Press Photography Downloads */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">
            APPROVED PRESS PHOTOGRAPHY
          </h2>
          <span className="text-xs text-zinc-500 font-mono">CREDIT: AYO MAFF ARCHIVE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.id}
              className="glass-panel p-3 rounded-2xl border border-emerald-950 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black mb-3">
                <Image src={img.imageUrl} alt={img.caption} fill className="object-cover" />
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mb-3">
                  {img.caption}
                </p>
                <a
                  href={img.imageUrl}
                  download
                  className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-[10px] font-bold uppercase tracking-wider text-electric-green hover:bg-electric-green hover:text-black transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Press Contacts & Inquiries CTA */}
      <div className="rounded-3xl bg-forest-dark border border-emerald-900/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight mb-1">
            MEDIA INQUIRIES & INTERVIEWS
          </h3>
          <p className="text-xs text-zinc-400">
            For press features, interview requests, and festival booking inquiries.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
          >
            CONTACT PRESS DESK
          </Link>
          <Link
            href="/bookings"
            className="px-6 py-2.5 rounded-full border border-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider hover:text-white transition-colors"
          >
            BOOKING REQUEST
          </Link>
        </div>
      </div>
    </div>
  );
}
