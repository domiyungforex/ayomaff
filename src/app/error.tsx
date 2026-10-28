"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

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
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(98,255,112,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg w-full">
        {/* Big ERROR heading */}
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#62FF70] mb-4 opacity-80">
          Signal Disruption
        </p>
        <h1
          className="font-display font-black text-[clamp(5rem,18vw,12rem)] leading-none tracking-tighter text-white mb-2"
          style={{ textShadow: "0 0 60px rgba(98,255,112,0.25)" }}
        >
          ERROR
          <span className="text-[#62FF70]">.</span>
        </h1>

        {/* Divider */}
        <div className="w-16 h-px bg-[#62FF70] mx-auto mb-6 opacity-60" />

        {/* Error message */}
        <p className="text-sm text-[#A2A8A2] max-w-sm mx-auto mb-2 leading-relaxed">
          An unexpected error occurred while rendering this music experience.
        </p>
        {error?.message && (
          <p className="text-xs text-[#62FF70]/50 font-mono mb-8 break-words max-w-sm mx-auto">
            {error.message}
          </p>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-6">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#62FF70] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#B2FF59] transition-colors shadow-[0_0_25px_rgba(98,255,112,0.4)] rounded-full"
          >
            <RefreshCcw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#62FF70]/40 text-[#62FF70] font-bold text-xs uppercase tracking-widest hover:border-[#62FF70] hover:bg-[#62FF70]/10 transition-all rounded-full"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
        </div>

        {error?.digest && (
          <p className="mt-8 text-[10px] text-[#A2A8A2]/40 font-mono">
            Digest: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
