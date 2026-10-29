# AYO MAFF: Cinematic Artist Digital Experience

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Interactive-62FF70?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Status](https://img.shields.io/badge/Concept-Independent%20Proposal-brightgreen?style=flat)]()

An immersive, production-quality editorial web experience concept for Nigerian street-pop and Afrobeats artist **Ayo Maff** ("Prince of the Street"). 

Blending a dark cinematic aesthetic (`#050806`), electric green neon signatures (`#62FF70`), a real-time Web Audio API frequency analysis engine, interactive vinyl record physics, comprehensive discography, official music video theater, verified tour itineraries, merchandise storefront, VIP fan club, and an administrative content management system.

> **Independent Concept Disclosure**: This website is an independent creative proposal designed for demonstration and portfolio purposes. It is not currently endorsed or affiliated with Ayo Maff or his official management.

---

## Key Highlights

- **Live Audio Engine & Reactive Visualizers**: Built directly with HTML5 Audio & the Web Audio API (`AudioContext`, `AnalyserNode`). Includes a live waveform visualizer, rotating 3D vinyl record, frequency rings, and particle effects.
- **Editorial Design System**: Custom typography, layered artist photography, deep emerald gradients, and high-contrast brutalist aesthetics.
- **Complete Discography**: Tracks, albums, lyrics, and verified streaming links (*Prince of the Street*, *Maffian* EP, *Dealer* ft. Fireboy DML, *Malaria*, *Lifestyle*).
- **Tour & Performance Calendar**: Verified concert listings with direct ticketing links and `.ics` calendar export.
- **Visual Archive**: Masonry photo gallery with full-screen lightbox, keyboard navigation, and touch swipe gestures.
- **Merchandise & Commerce**: Storefront with product variants, shopping cart drawer, and Paystack-ready checkout architecture.
- **Admin CMS Dashboard**: Secure administrative portal to manage releases, videos, tour dates, gallery images, inquiries, and newsletter subscribers.
- **Production-Ready & Accessible**: WCAG 2.2 AA compliant, SEO optimized with Open Graph and JSON-LD structured data, strict TypeScript types, and comprehensive tests.

---

## Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS, CSS Custom Properties |
| **Motion & Audio** | Framer Motion, HTML5 Canvas, Web Audio API |
| **Icons** | Lucide React |
| **Backend & Storage** | Next.js API Routes, Supabase PostgreSQL with RLS (with mock repository fallback) |
| **Testing** | Vitest, React Testing Library |

---

## Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/example/ayo-maff-experience.git
cd ayo-maff-experience

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `npm run dev`: Launch development server on port 3000
- `npm run build`: Compile production-ready optimized build
- `npm run start`: Start production server
- `npm run test`: Run unit and integration tests with Vitest
- `npm run lint`: Run ESLint checks

---

## License

Code is distributed under the MIT License. See [LICENSE](file:///Users/mac/Downloads/AYO%20MAFF/LICENSE) for details. Photography, music titles, and artist trademarks remain the intellectual property of their respective rights holders.
