"use client";

import React, { useState } from "react";
import { Download, Users, CheckCircle2, Search } from "lucide-react";

export default function AdminSubscribersPage() {
  const [search, setSearch] = useState("");
  const [exported, setExported] = useState(false);

  const [subscribers] = useState([
    {
      id: "sub-1",
      email: "seun@example.com",
      fullName: "Oluwaseun Adeleke",
      interests: ["Music", "Tour", "Merch"],
      date: "2026-10-25",
      status: "active",
    },
    {
      id: "sub-2",
      email: "chinedu@example.com",
      fullName: "Chinedu Okafor",
      interests: ["Music", "Tour"],
      date: "2026-10-22",
      status: "active",
    },
    {
      id: "sub-3",
      email: "amina@example.com",
      fullName: "Amina Bello",
      interests: ["Music"],
      date: "2026-10-20",
      status: "active",
    },
    {
      id: "sub-4",
      email: "sarah@ukfans.co.uk",
      fullName: "Sarah Jenkins",
      interests: ["Tour", "Merch"],
      date: "2026-10-18",
      status: "active",
    },
    {
      id: "sub-5",
      email: "david@press.ng",
      fullName: "David Alaba",
      interests: ["Music", "Tour", "Merch"],
      date: "2026-10-12",
      status: "active",
    },
  ]);

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    let csv = "Email,Full Name,Preferences,Date,Status\n";
    filtered.forEach((s) => {
      csv += `"${s.email}","${s.fullName}","${s.interests.join(" | ")}","${s.date}","${s.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ayo_Maff_Fan_Subscribers_List.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            FAN CLUB SUBSCRIBERS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Registered Maffian Empire community members and newsletter recipients.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-electric-green text-black text-xs font-extrabold hover:bg-acid-green transition-colors shadow-neon"
        >
          {exported ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CSV DOWNLOADED!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </>
          )}
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-electric-green"
        />
      </div>

      <div className="glass-panel rounded-3xl border border-emerald-950/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest-dark border-b border-zinc-900 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-4 px-6">Subscriber</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Preferences</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/80 text-zinc-300">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-forest-surface/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{s.fullName}</td>
                  <td className="py-4 px-6 font-mono text-zinc-300">{s.email}</td>
                  <td className="py-4 px-6 space-x-1">
                    {s.interests.map((int, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-bold text-zinc-300 inline-block"
                      >
                        {int}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-6 font-mono text-zinc-400">{s.date}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-950 text-electric-green border border-green-800">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
