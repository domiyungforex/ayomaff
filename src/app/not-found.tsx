import React from "react";
import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: "#050806" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(98,255,112,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-xl w-full">
        {/* Overline label */}
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#62FF70] mb-4 opacity-80">
          Page Not Found
        </p>

        {/* Giant 404 */}
        <h1
          className="font-display font-black leading-none tracking-tighter text-white mb-2"
          style={{
            fontSize: "clamp(7rem, 22vw, 16rem)",
            textShadow: "0 0 80px rgba(98,255,112,0.2)",
          }}
        >
          4<span className="text-[#62FF70]">0</span>4
        </h1>

        {/* Divider */}
        <div className="w-16 h-px bg-[#62FF70] mx-auto mb-6 opacity-60" />

        {/* Message */}
        <p className="text-[#A2A8A2] text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10">
          The page you&apos;re looking for has gone underground. Even the
          streets of Bariga couldn&apos;t find it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#62FF70] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#B2FF59] transition-colors shadow-[0_0_25px_rgba(98,255,112,0.4)] rounded-full"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/music"
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#62FF70]/40 text-[#62FF70] font-bold text-xs uppercase tracking-widest hover:border-[#62FF70] hover:bg-[#62FF70]/10 transition-all rounded-full"
          >
            <Music className="w-4 h-4" aria-hidden="true" />
            Explore Music
          </Link>
        </div>
      </div>
    </div>
  );
}
