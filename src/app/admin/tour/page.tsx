"use client";

import React, { useState } from "react";
import { Plus, Trash2, Ticket, CheckCircle2 } from "lucide-react";
import { CONCERT_EVENTS as initialEvents } from "@/lib/data/artist-data";
import { ConcertEvent } from "@/types";

export default function AdminTourPage() {
  const [events, setEvents] = useState<ConcertEvent[]>(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [date, setDate] = useState("");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venue || !city || !date) return;

    const d = new Date(date);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const newEvt: ConcertEvent = {
      id: `evt-${Date.now()}`,
      title: title || `${city} Live Showcase`,
      venue,
      city,
      country,
      date,
      day: d.getDate().toString(),
      month: months[d.getMonth()] || "TBA",
      ticketProvider: "Direct Partner",
      ticketUrl: "https://livespot360.com",
      isSoldOut: false,
      status: "confirmed",
    };

    setEvents([newEvt, ...events]);
    setTitle("");
    setVenue("");
    setCity("");
    setDate("");
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            TOUR & LIVE PERFORMANCES
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage concert dates, venues, ticketing links, and sold-out states.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-electric-green text-black text-xs font-extrabold hover:bg-acid-green transition-colors shadow-neon"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Tour Date</span>
        </button>
      </div>

      <div className="glass-panel rounded-3xl border border-emerald-950/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest-dark border-b border-zinc-900 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">City & Country</th>
                <th className="py-4 px-6">Venue</th>
                <th className="py-4 px-6">Event Title</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/80 text-zinc-300">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-forest-surface/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-electric-green">
                    {evt.month} {evt.day}, 2025
                  </td>
                  <td className="py-4 px-6 font-bold text-white">
                    {evt.city}, {evt.country}
                  </td>
                  <td className="py-4 px-6 text-zinc-300">{evt.venue}</td>
                  <td className="py-4 px-6 text-zinc-400 truncate max-w-xs">{evt.title}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        evt.isSoldOut
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-green-950 text-electric-green border border-green-800"
                      }`}
                    >
                      {evt.isSoldOut ? "Sold Out" : "Active"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      aria-label={`Delete event in ${evt.city}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tour Date Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full bg-[#07140C] border border-emerald-900 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white tracking-tight mb-4 pb-2 border-b border-zinc-800">
              ADD TOUR DATE
            </h3>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maffian Night in London"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nigeria"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Livespot Entertainment Center"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-electric-green text-black font-extrabold text-xs uppercase hover:bg-acid-green transition-all"
                >
                  Save Tour Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
