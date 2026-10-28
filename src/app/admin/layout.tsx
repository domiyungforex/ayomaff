"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Disc,
  Film,
  Ticket,
  Image as GalleryIcon,
  ShoppingBag,
  Inbox,
  Users,
  Settings,
  ArrowLeft,
  Shield,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNav = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Music Catalogue", href: "/admin/music", icon: Disc },
    { label: "Videos", href: "/admin/videos", icon: Film },
    { label: "Tour Dates", href: "/admin/tour", icon: Ticket },
    { label: "Gallery", href: "/admin/gallery", icon: GalleryIcon },
    { label: "Merchandise", href: "/admin/merch", icon: ShoppingBag },
    { label: "Inquiries Inbox", href: "/admin/inquiries", icon: Inbox },
    { label: "Fan Subscribers", href: "/admin/subscribers", icon: Users },
    { label: "Settings & Logs", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#040605] flex text-zinc-300">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#07140C] border-r border-emerald-950 flex flex-col justify-between p-5 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Admin Header */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-900 mb-6">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-lg bg-electric-green/20 border border-electric-green/60 text-electric-green flex items-center justify-center font-extrabold text-xs">
                AM
              </span>
              <div>
                <h2 className="font-extrabold text-sm text-white tracking-tight">
                  AYO MAFF CMS
                </h2>
                <span className="text-[10px] font-mono text-electric-green uppercase tracking-wider block">
                  Admin Portal
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-electric-green text-black shadow-neon"
                      : "text-zinc-400 hover:text-white hover:bg-forest-surface"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User & Return to Site */}
        <div className="pt-6 border-t border-zinc-900 space-y-3">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-forest-surface text-xs">
            <Shield className="w-4 h-4 text-electric-green" />
            <div className="min-w-0">
              <p className="text-white font-bold truncate">Management Admin</p>
              <span className="text-[10px] text-zinc-500 font-mono">Role: Super Admin</span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center space-x-2 py-2 rounded-xl border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar for Mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#07140C] border-b border-emerald-950">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-forest-surface text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-sm text-white font-display">
            AYO MAFF CMS
          </span>
          <Link href="/" className="text-xs text-electric-green font-bold">
            Exit
          </Link>
        </div>

        <main className="p-4 sm:p-8 lg:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
