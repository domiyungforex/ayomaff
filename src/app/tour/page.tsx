"use client";

import React, { useState } from "react";
import { Ticket, Calendar, MapPin, Download, CheckCircle2 } from "lucide-react";
import { CONCERT_EVENTS, ARTIST_INFO } from "@/lib/data/artist-data";

export default function TourPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Generate .ics iCalendar file for fans
  const handleCalendarExport = (evt: typeof CONCERT_EVENTS[0]) => {
    const startDate = evt.date.replace(/-/g, "") + "T200000Z";
    const endDate = evt.date.replace(/-/g, "") + "T230000Z";
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ayo Maff Live//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${evt.id}@ayomaff.com
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${evt.title} - Ayo Maff Live
LOCATION:${evt.venue}, ${evt.city}, ${evt.country}
DESCRIPTION:Official live concert performance by Ayo Maff. Tickets: ${evt.ticketUrl}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Ayo_Maff_${evt.city}_${evt.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(evt.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="pt-28 pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          LIVE EXPERIENCES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          TOUR & CONCERTS
        </h1>
        <p className="text-sm text-zinc-400">
          Witness Ayo Maff live in concert across Nigeria, the United Kingdom, Europe, and North America.
        </p>
      </div>

      {/* Tour Itinerary List */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-950/80 mb-16 shadow-2xl">
        <div className="divide-y divide-zinc-900">
          {CONCERT_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-forest-surface/30 px-4 rounded-2xl transition-colors"
            >
              {/* Date Box */}
              <div className="flex items-center space-x-6 min-w-[180px]">
                <div className="w-14 h-14 rounded-2xl bg-forest-dark border border-emerald-900 flex flex-col items-center justify-center text-center flex-shrink-0 shadow-inner">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-electric-green">
                    {evt.month}
                  </span>
                  <span className="text-xl font-extrabold text-white font-mono leading-none">
                    {evt.day}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white tracking-tight">
                    {evt.city}, {evt.country}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{evt.venue}</p>
                </div>
              </div>

              {/* Event Title & Status */}
              <div className="flex-1 md:px-6">
                <span className="text-sm font-semibold text-zinc-300 block">
                  {evt.title}
                </span>
                <span className="text-[11px] text-zinc-500 font-mono mt-0.5 inline-block">
                  Provider: {evt.ticketProvider}
                </span>
              </div>

              {/* Action Buttons: Calendar Sync & Tickets */}
              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => handleCalendarExport(evt)}
                  className="p-2.5 rounded-full bg-forest-surface border border-emerald-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  title="Add to Calendar (.ics)"
                  aria-label={`Add ${evt.city} show to calendar`}
                >
                  {downloadSuccess === evt.id ? (
                    <CheckCircle2 className="w-4 h-4 text-electric-green" />
                  ) : (
                    <Calendar className="w-4 h-4" />
                  )}
                </button>

                {evt.isSoldOut ? (
                  <span className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    SOLD OUT
                  </span>
                ) : (
                  <a
                    href={evt.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
                  >
                    GET TICKETS
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Notification Banner */}
      <div className="rounded-3xl bg-forest-dark/70 border border-emerald-950 p-8 text-center max-w-2xl mx-auto">
        <MapPin className="w-8 h-8 text-electric-green mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white tracking-tight mb-2">
          DON&apos;T SEE YOUR CITY?
        </h3>
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Sign up to get notified the second Ayo Maff announces dates in your city or region.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter your city (e.g. Manchester, Paris)"
            className="w-full px-4 py-2.5 rounded-full bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-electric-green"
          />
          <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-forest-dark border border-electric-green text-electric-green font-bold text-xs uppercase tracking-wider hover:bg-electric-green hover:text-black transition-all whitespace-nowrap">
            REQUEST CITY
          </button>
        </div>
      </div>
    </div>
  );
}
