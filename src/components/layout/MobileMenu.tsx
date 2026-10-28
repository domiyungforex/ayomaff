"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X as CloseIcon, Music, Disc, Ticket, Film, Image as GalleryIcon, User, ShoppingBag, Mail, Sparkles } from "lucide-react";
import { ARTIST_INFO } from "@/lib/data/artist-data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const iconMap: Record<string, React.ReactNode> = {
    HOME: <Sparkles className="w-5 h-5 text-electric-green" />,
    MUSIC: <Disc className="w-5 h-5 text-electric-green" />,
    TOUR: <Ticket className="w-5 h-5 text-electric-green" />,
    VIDEOS: <Film className="w-5 h-5 text-electric-green" />,
    GALLERY: <GalleryIcon className="w-5 h-5 text-electric-green" />,
    ABOUT: <User className="w-5 h-5 text-electric-green" />,
    MERCH: <ShoppingBag className="w-5 h-5 text-electric-green" />,
    "FAN CLUB": <Music className="w-5 h-5 text-electric-green" />,
    CONTACT: <Mail className="w-5 h-5 text-electric-green" />,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 bg-[#050806]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-fadeIn"
    >
      {/* Top Header Row with Close */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
        <span className="font-extrabold text-2xl tracking-tighter text-white font-display">
          AYO <span className="text-electric-green">MAFF</span>
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-forest-dark border border-zinc-700 text-zinc-300 hover:text-electric-green hover:border-electric-green transition-colors focus:outline-none focus:ring-2 focus:ring-electric-green"
          aria-label="Close navigation menu"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links in Vertical Stack */}
      <nav className="flex flex-col space-y-4 my-auto overflow-y-auto max-h-[60vh] py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center space-x-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-200 hover:text-electric-green transition-colors py-2 group"
          >
            <span className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/50 group-hover:border-electric-green/60 transition-colors">
              {iconMap[link.label] || <Sparkles className="w-5 h-5 text-electric-green" />}
            </span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Footer Info */}
      <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p>© 2026 {ARTIST_INFO.name}. Prince of the Street.</p>
        <div className="flex items-center space-x-5 text-zinc-400">
          <a href={ARTIST_INFO.socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
            Spotify
          </a>
          <a href={ARTIST_INFO.socialLinks.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
            Apple Music
          </a>
          <a href={ARTIST_INFO.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
            YouTube
          </a>
          <a href={ARTIST_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-electric-green">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
