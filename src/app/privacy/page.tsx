import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data governance for Ayo Maff concept digital experience.",
};

export default function PrivacyPage() {
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
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-zinc-500 font-mono">
          Last Updated: October 2026
        </p>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            1. Overview & Commitment
          </h2>
          <p>
            We respect your privacy and are committed to safeguarding any personal data you share when interacting with this independent artist concept platform. We adhere to the Nigeria Data Protection Act (NDPA) and global privacy standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            2. Information We Collect
          </h2>
          <p>
            We only collect information directly provided by you through form submissions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Fan Club:</strong> Email address, optional full name, and communication preferences.</li>
            <li><strong>Bookings & Inquiries:</strong> Contact name, organization, email, telephone number, event specifications, and budget ranges.</li>
            <li><strong>Concept Orders:</strong> Simulated shipping addresses and order histories stored locally.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            3. Data Use & Protection
          </h2>
          <p>
            Your information is never sold, leased, or distributed to third-party ad networks. It is utilized exclusively to provide updates, respond to verified inquiries, and process requests.
          </p>
        </section>
      </div>
    </div>
  );
}
