"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Disc,
  Film,
  Ticket,
  Users,
  Inbox,
  ShoppingBag,
  TrendingUp,
  Download,
  Plus,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { RELEASES, VIDEOS, CONCERT_EVENTS, PRODUCTS } from "@/lib/data/artist-data";

export default function AdminDashboardPage() {
  const [exported, setExported] = useState(false);

  // Mock initial inquiries
  const recentInquiries = [
    {
      id: "inq-1",
      name: "Afro Nation Festival",
      type: "Festival Headline",
      date: "2026-11-20",
      budget: "$50,000 - $100,000",
      status: "pending",
    },
    {
      id: "inq-2",
      name: "Native Mag Editorial",
      type: "Interview Request",
      date: "2026-11-05",
      budget: "Editorial",
      status: "contacted",
    },
    {
      id: "inq-3",
      name: "Livespot Entertainment",
      type: "Concert Arena",
      date: "2026-12-18",
      budget: "$25,000 - $50,000",
      status: "confirmed",
    },
  ];

  const handleExportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8,Email,Full Name,Subscribed Date,Status\n" +
      "fan1@example.com,Oluwaseun Adeleke,2026-10-15,Active\n" +
      "fan2@example.com,Chinedu Okafor,2026-10-18,Active\n" +
      "fan3@example.com,Amina Bello,2026-10-22,Active\n" +
      "fan4@example.com,David Alaba,2026-10-26,Active\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Ayo_Maff_Fan_Subscribers_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            CMS OVERVIEW
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage catalogue, media, bookings, and fan subscribers for Ayo Maff.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportSubscribers}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs font-bold text-electric-green hover:bg-forest-dark transition-colors"
          >
            {exported ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>EXPORTED!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Fans CSV</span>
              </>
            )}
          </button>

          <Link
            href="/admin/music"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-electric-green text-black text-xs font-extrabold hover:bg-acid-green transition-colors shadow-neon"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Release</span>
          </Link>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "RELEASES", count: RELEASES.length, icon: Disc, color: "text-electric-green" },
          { label: "OFFICIAL VIDEOS", count: VIDEOS.length, icon: Film, color: "text-acid-green" },
          { label: "TOUR DATES", count: CONCERT_EVENTS.length, icon: Ticket, color: "text-blue-400" },
          { label: "PRODUCTS", count: PRODUCTS.length, icon: ShoppingBag, color: "text-orange-400" },
          { label: "FAN SUBSCRIBERS", count: "1,420+", icon: Users, color: "text-purple-400" },
          { label: "INQUIRIES", count: "18 Pending", icon: Inbox, color: "text-yellow-400" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-4 rounded-2xl border border-emerald-950/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {kpi.label}
                </span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                {kpi.count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Inquiries & Content Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inquiries (Cols 1-8) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-emerald-950/80">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-900">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              RECENT BOOKING & PRESS INQUIRIES
            </h3>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-electric-green hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentInquiries.map((inq) => (
              <div
                key={inq.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-forest-surface/60 border border-emerald-950 text-xs"
              >
                <div>
                  <h4 className="font-bold text-white">{inq.name}</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {inq.type} • Proposed: {inq.date}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-[11px] text-zinc-300">
                    {inq.budget}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      inq.status === "confirmed"
                        ? "bg-green-950 text-green-400 border border-green-800"
                        : inq.status === "contacted"
                        ? "bg-blue-950 text-blue-400 border border-blue-800"
                        : "bg-yellow-950 text-yellow-400 border border-yellow-800"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Publishing Status (Cols 9-12) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-emerald-950/80 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-white pb-3 border-b border-zinc-900">
            PUBLISHING HEALTH
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Featured Release</span>
              <span className="text-electric-green font-bold">Prince of the Street</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Web Audio Visualizer</span>
              <span className="text-electric-green font-bold">Active (8 Modes)</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Upcoming Live Date</span>
              <span className="text-white font-bold">Jun 14 (Lagos)</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Paystack Gateway</span>
              <span className="text-acid-green font-bold">Sandbox Connected</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-zinc-400">Database Layer</span>
              <span className="text-white font-bold">Dual-Mode Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
