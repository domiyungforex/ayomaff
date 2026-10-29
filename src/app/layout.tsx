import type { Metadata } from "next";
import "@/styles/globals.css";
import { AudioEngineProvider } from "@/lib/audio/AudioContext";
import { CartProvider } from "@/lib/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PersistentPlayer } from "@/components/layout/PersistentPlayer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ParticleCanvas } from "@/components/visualizers/ParticleCanvas";
import { CartDrawer } from "@/components/merch/CartDrawer";
import { ARTIST_INFO } from "@/lib/data/artist-data";

export const metadata: Metadata = {
  metadataBase: new URL('https://ayomaff.com'),
  title: {
    default: `${ARTIST_INFO.name}: ${ARTIST_INFO.title} | Digital Music Experience`,
    template: `%s | ${ARTIST_INFO.name}`,
  },
  description: ARTIST_INFO.shortBio,
  keywords: [
    "Ayo Maff",
    "Prince of the Street",
    "Dealer",
    "Fireboy DML",
    "Maffian",
    "Afrobeats",
    "Nigerian Music",
    "Bariga",
    "Street-Pop",
  ],
  authors: [{ name: "Ayo Maff Concept Studio" }],
  openGraph: {
    title: `${ARTIST_INFO.name}: ${ARTIST_INFO.title}`,
    description: ARTIST_INFO.tagline,
    url: "https://ayomaff.com",
    siteName: "Ayo Maff Official Concept Experience",
    images: [
      {
        url: "/assets/artist/hero_green_jacket_balcony.webp",
        width: 682,
        height: 1024,
        alt: "Ayo Maff: Prince of the Street",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${ARTIST_INFO.name}: ${ARTIST_INFO.title}`,
    description: ARTIST_INFO.tagline,
    images: ["/assets/artist/hero_green_jacket_balcony.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#050806] text-[#F7F8F4] min-h-screen antialiased flex flex-col selection:bg-electric-green selection:text-black">
        <AudioEngineProvider>
          <CartProvider>
            {/* Visual Ambiance */}
            <ParticleCanvas />
            <CustomCursor />

            {/* Global Header */}
            <Header />

            {/* Main Page Content */}
            <main className="flex-1 z-10">{children}</main>

            {/* Persistent Music Player */}
            <PersistentPlayer />

            {/* Slide-over Cart Drawer */}
            <CartDrawer />

            {/* Global Footer */}
            <Footer />
          </CartProvider>
        </AudioEngineProvider>
      </body>
    </html>
  );
}
