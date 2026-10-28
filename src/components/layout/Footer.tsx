"use client";

import React from "react";
import Link from "next/link";
import { ARTIST_INFO } from "@/lib/data/artist-data";

export function Footer() {
  const footerLinks = [
    { label: "HOME", href: "/" },
    { label: "MUSIC", href: "/music" },
    { label: "TOUR", href: "/tour" },
    { label: "VIDEOS", href: "/videos" },
    { label: "GALLERY", href: "/gallery" },
    { label: "ABOUT", href: "/about" },
    { label: "MERCH", href: "/merch" },
    { label: "FAN CLUB", href: "/fan-club" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#050806] border-t border-emerald-950/60 pt-16 pb-28 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Wordmark & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900/90">
          <Link href="/" className="group focus:outline-none">
            <span className="font-extrabold text-3xl tracking-tighter text-white font-display">
              AYO <span className="text-electric-green">MAFF</span>
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-bold tracking-widest text-zinc-400">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-electric-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle Row: Unofficial Disclosure Notice */}
        <div className="py-8 my-4 rounded-xl bg-forest-dark/40 border border-emerald-950/40 p-4 text-center max-w-3xl mx-auto">
          <p className="text-xs text-zinc-400 leading-relaxed">
            <span className="font-bold text-electric-green uppercase tracking-wider block mb-1">
              Independent Concept Proposal
            </span>
            This website is an independent, unofficial artistic concept developed for presentation and portfolio demonstration. It is not affiliated with, authorized, or officially endorsed by Ayorinde Mafoluku Ayodele (Ayo Maff), EMPIRE, or his official artist management. All music trademarks, song titles, and artist photography remain the property of their respective owners.
          </p>
        </div>

        {/* Bottom Row: Legal, Socials, Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-zinc-500">
          <p>© 2026 {ARTIST_INFO.name}. All rights reserved.</p>

          <div className="flex items-center space-x-6 text-zinc-400">
            <Link href="/privacy" className="hover:text-electric-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-electric-green transition-colors">
              Terms of Use
            </Link>
            <Link href="/press" className="hover:text-electric-green transition-colors">
              Press Kit
            </Link>
            <Link href="/admin" className="hover:text-electric-green transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
