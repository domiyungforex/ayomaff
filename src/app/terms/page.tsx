import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Use",
  description: "Terms and intellectual property notice for Ayo Maff concept digital experience.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO HOME</span>
      </Link>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-950/80 space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
          TERMS OF USE
        </h1>
        <p className="text-xs text-zinc-500 font-mono">
          Last Updated: October 2026
        </p>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-electric-green">
            1. Independent Artist Concept Notice
          </h2>
          <p>
            This website represents an independent, unofficial concept proposal engineered for creative and technical demonstration. It does not represent an endorsement, binding representation, or official agreement with Ayorinde Mafoluku Ayodele (Ayo Maff), his record label (EMPIRE), or his official management.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            2. Intellectual Property Rights
          </h2>
          <p>
            All trademarks, artist photographs, recording titles, lyrics, and musical elements are the exclusive intellectual property of Ayo Maff and their respective copyright holders. The software engineering codebase is licensed under the MIT License.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            3. E-Commerce & Ticketing Disclaimers
          </h2>
          <p>
            Merchandise checkout is currently operated in demonstration mode. No live financial charges will occur. Tour dates and ticket availability link outward to established ticketing partners.
          </p>
        </section>
      </div>
    </div>
  );
}
