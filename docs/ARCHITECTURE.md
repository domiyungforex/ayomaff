# Architecture Specification — Ayo Maff Cinematic Experience

## 1. System Overview

The Ayo Maff application is engineered using Next.js 15 App Router, React 19, TypeScript (Strict Mode), and Tailwind CSS. The architecture is modular, event-driven, and designed with high performance standards for real-time audio visualization, streaming media playback, and content management.

```
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│  ┌──────────────────┐  ┌─────────────────────────────┐ │
│  │   Pages & UI     │  │   Audio Engine & Visualizer │ │
│  │  (Framer Motion) │  │   (Web Audio API Analyser)  │ │
│  └────────┬─────────┘  └──────────────┬──────────────┘ │
│           │                           │                │
│           ▼                           ▼                │
│     React Context (Player, Cart, UI State)             │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / Server Actions
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Next.js Backend                      │
│  ┌──────────────────┐  ┌─────────────────────────────┐ │
│  │  Route Handlers  │  │   Admin Auth (RBAC Guard)   │ │
│  │  (/api/*)        │  │   Server-side Validation    │ │
│  └────────┬─────────┘  └──────────────┬──────────────┘ │
└───────────┼───────────────────────────┼────────────────┘
            │                           │
            ▼                           ▼
┌────────────────────────────────────────────────────────┐
│             Data Layer (Dual-Mode Access)              │
│  ┌──────────────────────┐  ┌────────────────────────┐  │
│  │ Supabase PostgreSQL  │  │ Local Mock Repository  │  │
│  │ (RLS Policies)       │  │ (Zero-Config Fallback) │  │
│  └──────────────────────┘  └────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

## 2. Rendering Strategy

- **Static Generation & Server Components (RSC)**:
  - Homepage shell, metadata, Open Graph tags, JSON-LD structured data.
  - Release catalogue (`/music`), press kit (`/press`), and about page (`/about`).
  - Ensures near-instant initial render, optimal LCP (< 1.2s), and clean SEO crawlability.
- **Client Components (`"use client"`)**:
  - `AudioEngineProvider`: Manages the singleton `AudioContext`, `AnalyserNode`, and track audio element.
  - `PersistentPlayer`: Floats globally above the viewport, retaining track playback across client-side route transitions.
  - Interactive Visualizers: Waveform, Vinyl Record, Particle Canvas.
  - Dynamic interactive forms: Booking, Contact, Fan Club, Cart & Checkout.

## 3. Directory Layout

```text
src/
├── app/
│   ├── (public)/              # Public artist routes (Home, Music, Tour, Gallery, etc.)
│   ├── admin/                 # Content management portal (Role-protected)
│   ├── api/                   # Server endpoints (Inquiries, Fan club, Checkout)
│   ├── layout.tsx             # Root layout with persistent audio provider & cursor
│   ├── loading.tsx            # Cinematic skeleton loader
│   ├── error.tsx              # Error boundary
│   └── not-found.tsx          # 404 page
├── components/
│   ├── audio/                 # Audio player, volume controls, scrubber, waveform
│   ├── visualizers/           # Vinyl record, particle canvas, frequency rings
│   ├── layout/                # Header, footer, mobile navigation drawer
│   ├── hero/                  # Homepage hero section and intro modal
│   ├── music/                 # Discography cards, tracklist, lyrics viewer
│   ├── gallery/               # Masonry grid, full-screen lightbox
│   ├── merch/                 # Product cards, variant selectors, cart drawer
│   ├── admin/                 # CMS table components, stat cards, editor forms
│   └── ui/                    # Button, input, modal, badge, toast
├── lib/
│   ├── audio/                 # Web Audio API utilities, frequency bin smoothing
│   ├── data/                  # Static artist data, discography, tour dates, merch
│   ├── db/                    # Dual-mode repository (Supabase + fallback)
│   └── utils/                 # Classname merging, currency formatters, date formatters
└── types/                     # TypeScript definitions for entities and API payloads
```

## 4. State Management

1. **Audio State**: Managed via `AudioContext` exposed through `useAudio()`. Maintains:
   - `isPlaying: boolean`
   - `currentTrack: Track | null`
   - `currentTime: number`
   - `duration: number`
   - `volume: number` (0 to 1)
   - `isMuted: boolean`
   - `analyserData: Uint8Array` (real-time frequency bins for visualizers)
2. **Cart State**: Managed via `CartContext` exposed through `useCart()`. Persisted in `localStorage` with optimistic UI updates.
3. **Admin State**: Session state with role authentication guard (`admin`, `editor`).

## 5. Security & Isolation

- All mutating API endpoints require payload validation via Zod schemas.
- Anti-spam honeypot fields on public booking and contact forms.
- Sensitive environment keys (`SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`) strictly restricted to server environments.
