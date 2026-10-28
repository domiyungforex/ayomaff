"use client";

import React, { useState } from "react";
import { Inbox, CheckCircle2, Clock, XCircle, Phone, Mail, MapPin } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([
    {
      id: "b-1",
      name: "Sarah Jenkins",
      org: "Afro Nation Festival",
      email: "sarah@afronation.com",
      phone: "+44 20 7946 0991",
      type: "Festival Headline",
      date: "2026-11-20",
      location: "Portimão, Portugal",
      budget: "$50,000 - $100,000",
      message: "We would like to book Ayo Maff for a 45-minute festival headline slot at Afro Nation 2026.",
      status: "pending",
    },
    {
      id: "b-2",
      name: "Tunde Bakare",
      org: "Livespot Entertainment",
      email: "tunde@livespot.ng",
      phone: "+234 802 345 6789",
      type: "Concert Arena",
      date: "2026-12-18",
      location: "Lagos, Nigeria",
      budget: "$25,000 - $50,000",
      message: "Headline guest performance for December festive rave.",
      status: "contacted",
    },
    {
      id: "b-3",
      name: "David Adeleke",
      org: "Native Mag",
      email: "david@nativemag.com",
      phone: "+234 810 987 6543",
      type: "Press Interview",
      date: "2026-11-05",
      location: "Lekki, Lagos",
      budget: "Editorial",
      message: "Cover story interview and photo session.",
      status: "confirmed",
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setInquiries(
      inquiries.map((inq) =>
        inq.id === id ? { ...inq, status: newStatus } : inq
      )
    );
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            INQUIRIES REGISTRY
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review live performance booking requests and editorial inquiries.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-forest-surface border border-emerald-950 text-xs font-mono text-zinc-400">
          {inquiries.length} Active Records
        </span>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="glass-panel p-6 rounded-3xl border border-emerald-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="font-extrabold text-base text-white">{inq.name}</h3>
                {inq.org && (
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-bold text-zinc-300">
                    {inq.org}
                  </span>
                )}
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    inq.status === "confirmed"
                      ? "bg-green-950 text-electric-green border border-green-800"
                      : inq.status === "contacted"
                      ? "bg-blue-950 text-blue-400 border border-blue-800"
                      : "bg-yellow-950 text-yellow-400 border border-yellow-800"
                  }`}
                >
                  {inq.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-electric-green" />
                  <span>{inq.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-electric-green" />
                  <span>{inq.phone}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-electric-green" />
                  <span>{inq.location}</span>
                </span>
              </div>

              <p className="text-xs text-zinc-300 bg-forest-surface/70 p-3 rounded-xl border border-emerald-950/60 leading-relaxed max-w-2xl">
                &ldquo;{inq.message}&rdquo;
              </p>

              <div className="text-[11px] font-mono text-zinc-400">
                Event Type: <strong className="text-white">{inq.type}</strong> • Proposed Date:{" "}
                <strong className="text-white">{inq.date}</strong> • Budget:{" "}
                <strong className="text-electric-green">{inq.budget}</strong>
              </div>
            </div>

            {/* Status Update Actions */}
            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
              <button
                onClick={() => updateStatus(inq.id, "contacted")}
                className="flex-1 md:flex-none px-3 py-1.5 rounded-xl border border-blue-800/80 bg-blue-950/30 text-blue-400 text-xs font-bold hover:bg-blue-900/40 transition-colors"
              >
                Mark Contacted
              </button>
              <button
                onClick={() => updateStatus(inq.id, "confirmed")}
                className="flex-1 md:flex-none px-3 py-1.5 rounded-xl border border-green-800/80 bg-green-950/30 text-electric-green text-xs font-bold hover:bg-green-900/40 transition-colors"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => updateStatus(inq.id, "declined")}
                className="flex-1 md:flex-none px-3 py-1.5 rounded-xl border border-red-800/80 bg-red-950/30 text-red-400 text-xs font-bold hover:bg-red-900/40 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
