"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, MapPin, DollarSign, Send } from "lucide-react";

export default function BookingsPage() {
  const [formData, setFormData] = useState({
    contactName: "",
    organization: "",
    email: "",
    phone: "",
    eventType: "Festival Headline",
    proposedDate: "",
    location: "",
    budgetRange: "$25,000 - $50,000",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.email || !formData.proposedDate) return;

    setLoading(true);
    try {
      await fetch("/api/inquiries/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          LIVE PERFORMANCE INQUIRIES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          BOOK AYO MAFF
        </h1>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Submit concert, festival, corporate, and private booking inquiries for Ayo Maff.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-950/80 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-forest-dark border-2 border-electric-green flex items-center justify-center mx-auto shadow-neon">
              <CheckCircle2 className="w-8 h-8 text-electric-green" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              BOOKING INQUIRY TRANSMITTED
            </h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.contactName}</strong>. Your inquiry for{" "}
              <strong>{formData.proposedDate}</strong> has been logged into the concept inquiry queue.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold uppercase tracking-wider text-electric-green hover:underline"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-3.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-zinc-400">
              <strong className="text-electric-green uppercase block mb-0.5">
                Concept Booking Interface Notice
              </strong>
              Inquiries submitted through this concept form are logged to the demonstrative CMS database. This demo is not directly routed to artist representation unless authorized.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Afro Nation / Live Nation"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@agency.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+44 20 7946 0991"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                >
                  <option>Festival Headline</option>
                  <option>Concert Arena</option>
                  <option>Club Appearance</option>
                  <option>College / Campus Show</option>
                  <option>Private Event</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Proposed Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.proposedDate}
                  onChange={(e) => setFormData({ ...formData, proposedDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Budget Bracket
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                >
                  <option>$15,000 - $25,000</option>
                  <option>$25,000 - $50,000</option>
                  <option>$50,000 - $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Event City & Country *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. London, United Kingdom"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Event Details & Scope
              </label>
              <textarea
                rows={4}
                required
                placeholder="Include venue capacity, performance duration, sound rider details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "TRANSMITTING INQUIRY..." : "SUBMIT BOOKING INQUIRY"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
