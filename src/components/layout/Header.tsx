"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X as CloseIcon } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "MUSIC", href: "/music" },
    { label: "TOUR", href: "/tour" },
    { label: "VIDEOS", href: "/videos" },
    { label: "GALLERY", href: "/gallery" },
    { label: "ABOUT", href: "/about" },
    { label: "MERCH", href: "/merch" },
    { label: "FAN CLUB", href: "/fan-club" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050806]/90 backdrop-blur-md border-b border-emerald-950/60 py-3.5 shadow-lg"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Ayo Maff Home"
          >
            <span className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-electric-green transition-colors font-display">
              AYO <span className="text-electric-green">MAFF</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-[12px] font-bold tracking-widest text-zinc-300">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-electric-green ${
                    isActive ? "text-electric-green font-extrabold border-b border-electric-green pb-0.5" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search, Socials, Cart, Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search link */}
            <Link
              href="/music"
              className="text-zinc-400 hover:text-white transition-colors p-1.5 focus:outline-none focus:ring-1 focus:ring-electric-green rounded-full"
              aria-label="Search discography"
            >
              <Search className="w-4 h-4" />
            </Link>

            <span className="hidden sm:inline-block w-px h-4 bg-zinc-800" aria-hidden="true" />

            {/* Social Icons matching mockup */}
            <div className="hidden md:flex items-center space-x-3 text-zinc-400">
              <a
                href="https://open.spotify.com/artist/ayomaff"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-electric-green transition-colors"
                aria-label="Spotify Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306c-.215.352-.676.463-1.028.247-2.817-1.721-6.363-2.11-10.54-1.156-.403.093-.812-.162-.904-.565-.093-.404.161-.813.565-.905 4.575-1.045 8.487-.604 11.66 1.35.352.217.463.676.247 1.029zm1.467-3.262c-.27.44-.848.577-1.288.307-3.225-1.982-8.14-2.557-11.954-1.4-11.954-1.4-.495.15-1.02-.133-1.17-.628-.15-.494.133-1.02.628-1.17 4.364-1.325 9.775-.688 13.477 1.603.44.27.577.848.307 1.288zm.126-3.41c-3.867-2.296-10.248-2.508-13.94-1.387-.593.18-1.22-.161-1.4-.754-.18-.593.161-1.22.754-1.4 4.242-1.288 11.288-1.045 15.727 1.59.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.541.392z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@AyoMaffOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-electric-green transition-colors"
                aria-label="YouTube Channel"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/ayomaff"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-electric-green transition-colors"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://x.com/ayomaff"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-electric-green transition-colors"
                aria-label="X Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-300 hover:text-electric-green transition-colors focus:outline-none"
              aria-label={`Shopping cart containing ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-electric-green text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 text-zinc-300 hover:text-electric-green transition-colors focus:outline-none"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
