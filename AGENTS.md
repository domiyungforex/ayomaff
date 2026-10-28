# AGENTS.md — SYSTEM GOVERNANCE & ENGINEERING STANDARDS

> **Target Application**: Ayo Maff Cinematic Artist Website Concept  
> **Status**: Independent, Unofficial Concept Experience  
> **Version**: 1.0.0-production  
> **Last Updated**: October 2026

---

## 2.1 Project Mission

The mission of this project is to design, engineer, test, and deliver a production-quality, cinematic digital experience concept for Nigerian Afrobeats phenomenon **Ayo Maff** ("Prince of the Street"). 

The website operates at the intersection of a premier international recording artist's official portal, a digital music visualizer, and a sophisticated editorial storytelling publication. It honors Ayo Maff's Bariga roots, his rise through street-hop storytelling and chart-topping records like *"Dealer"* (ft. Fireboy DML) and *"Are You There?"*, and his evolving sound world.

### Audience
1. **Global Fans & Street-Hop Community**: Experiencing music, visualizers, lyrics, tour dates, and VIP fan club access.
2. **Music Industry, Booking Agents & Press**: Seeking verified tour itineraries, electronic press kit (EPK) media assets, biography, and professional booking inquiries.
3. **Creative Directors & Design Observers**: Exploring benchmark interactive music web engineering, audio reactivity, and bespoke typography.

### Core Principles
- **Atmospheric & Immersive**: Cinematic dark aesthetic (`#050806`), deep emerald undertones (`#07140C`), and vibrant electric green neon accents (`#62FF70`, `#B2FF59`).
- **Music-First Architecture**: Audio playback with real-time Web Audio API frequency analysis, reactive waveforms, and persistent player state across navigation.
- **Authenticity & Integrity**: Strict adherence to verified artist history. No fabricated streaming statistics, false ticket availability, or deceptive official endorsements.

---

## 2.2 Architecture Rules

- **Framework**: Next.js 15+ App Router.
- **Language**: TypeScript in strict mode (`strict: true`, no implicit any, comprehensive typing).
- **Rendering Strategy**:
  - Prefer React Server Components (RSC) for metadata, static content, SEO, and layout performance.
  - Reserve Client Components (`"use client"`) strictly for interactive UI, Web Audio API analysis, client state (cart, audio player, modal lightboxes), and event handlers.
- **Component Design**:
  - Modular, atomic structure in `src/components/` grouped by domain (`audio/`, `visualizers/`, `hero/`, `music/`, `merch/`, `gallery/`, `admin/`, `ui/`).
  - Separation of concerns: business logic in hooks/services, pure presentation in components.
- **State Management**:
  - React Context for global audio state (`AudioEngineContext`) and shopping cart (`CartContext`).
  - URL search params for discography and gallery filtering.
- **Security & Validation**:
  - Validate all untrusted input with Zod schemas.
  - Never expose secrets, service-role tokens, or private credentials in client bundles.
  - Server actions and route handlers must enforce authorization for administrative actions.

---

## 2.3 Design Rules

- **Anti-Generic Mandate**:
  - No generic SaaS dashboard look on public artist pages.
  - No cookie-cutter rounded cards or bland corporate drop shadows.
  - No generic stock photography. Use only supplied high-resolution artist photography.
  - No fake audio visualizers (e.g. looped GIFs pretending to react to music). Visualizers must bind directly to Web Audio `AnalyserNode` or fall back to an authentic mathematical idle wave.
- **Typography & Layout**:
  - Large condensed display headers, high-contrast tracking, and brutalist-meets-luxury editorial layout.
  - Asymmetric editorial compositions with layered photography and gradient masks.
  - Text placed over imagery must maintain high contrast (WCAG AA compliant) with dark overlays and backdrop filters.
- **Motion & Accessibility**:
  - Microinteractions must feel snappy and purposeful.
  - Respect `prefers-reduced-motion` across all GSAP/Framer Motion and canvas animations.
  - Audio must never autoplay without direct user interaction.

---

## 2.4 Engineering Rules

- **Functional Completeness**:
  - Every navigation link, button, and tab must lead to a functioning screen or trigger a real action.
  - Forms (Contact, Booking, Fan Club) must validate inputs, provide user feedback (loading, success toast, error states), and persist data.
  - Audio player must support play, pause, seek, volume control, mute, and media session API.
- **Error Handling**:
  - Every API route and server action must catch errors and return standardized JSON responses.
  - Implement Next.js `error.tsx` and `not-found.tsx` boundaries.
- **Data Integrity**:
  - No hardcoded production credentials.
  - Dual-mode data access: Supabase PostgreSQL tables when configured, backed by an in-memory / mock repository layer for immediate zero-config local evaluation.

---

## 2.5 Definition of Done (DoD)

A feature is considered **Done** only when:
1. **Implementation**: Fully coded with TypeScript strict typing and zero lint warnings.
2. **Accessibility**: Keyboard navigable, valid ARIA labels, semantic markup, and contrast verified.
3. **Responsiveness**: Verified across mobile (375px), tablet (768px), and desktop (1280px+).
4. **Resilience**: Loading, empty, and error states are implemented.
5. **Testing**: Automated unit/component test written and passing.

---

## 2.6 Development Workflow

Follow this cycle for every phase:
$$\text{Plan} \longrightarrow \text{Implement} \longrightarrow \text{Test} \longrightarrow \text{Review} \longrightarrow \text{Fix} \longrightarrow \text{Document}$$

Always update `docs/IMPLEMENTATION_PROGRESS.md` as milestones are reached.

---

## 2.7 Code Review & Security Checklist

- [ ] Does any code expose sensitive API keys or admin secrets to the client?
- [ ] Are all forms protected by Zod schemas and rate-limiting safeguards?
- [ ] Are image aspect ratios preserved without distortion or stretching?
- [ ] Does audio pause/clean up nodes on component unmount to prevent memory leaks?
- [ ] Do animations cease when the browser tab is hidden (`document.visibilityState`)?
- [ ] Is the unofficial concept disclaimer clearly visible in the footer?

---

## 2.8 Specialized Agent Directives

- **Audio Subagent**: Prioritize low-latency Web Audio API nodes, avoid unnecessary re-renders in `requestAnimationFrame` loops, and ensure graceful fallback when audio files are loading or muted.
- **Admin Subagent**: Ensure role-based access control (RBAC), audit logging for content mutations, and clean transactional database boundaries.
