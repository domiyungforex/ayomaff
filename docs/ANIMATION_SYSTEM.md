# Animation System & Motion Language

## 1. Philosophy: Purposeful Cinematic Energy

The motion design avoids gratuitous distraction and focuses on reinforcing musical storytelling and street energy. Animations are categorized into three distinct levels:

1. **Level 1 — Microinteractions**: Immediate feedback (buttons, cursor hover states, tab indicators).
2. **Level 2 — Section Transitions**: Atmospheric scroll reveals, image masking, staggered text reveals.
3. **Level 3 — Immersive Reactive Experiences**: Live Web Audio API frequency waveform, rotating 3D vinyl record, pulsating frequency rings, and particle field.

---

## 2. Motion Levels

### Level 1: Microinteractions
- **Button Hover**: Fast scale transition (`transform: scale(1.04)`) with electric green neon glow blur.
- **Card Hover**: Slight elevation (`translateY(-4px)`), border lighting transition from `#0F291A` to `#62FF70`.
- **Navigation Underline**: Active pill or underline that slides smoothly across active links.
- **Custom Cursor**: Desktop pointer trailing circle that expands over interactive elements (`button`, `a`, `canvas`).

### Level 2: Section & Page Transitions
- **Scroll Reveals**: IntersectionObserver / Framer Motion `whileInView` triggers with staggered fades (`opacity: 0, y: 24 -> opacity: 1, y: 0`).
- **Image Masking**: Cinematic diagonal gradient cuts that dissolve as photographs enter the viewport.
- **Typography Stagger**: Splitting display headlines like "PRINCE OF THE STREET" into staggered letter entrances.

### Level 3: Real-Time Audio-Reactive Motion
- **Hero Waveform**: Canvas 2D render loop drawing smooth bezier spline based on real-time FFT frequency bins.
- **Vinyl Physics**: Rotational velocity tied to playback state with deceleration physics (`velocity *= 0.96`).
- **Bass Embers**: Canvas particles experiencing radial outward force proportional to sub-bass energy (0-100Hz).

---

## 3. Reduced Motion Support

All animations honor the user's OS preference (`@media (prefers-reduced-motion: reduce)`):
- Parallax scrolls are disabled.
- Canvas particles are rendered in static or gentle float modes.
- Staggered translations are converted to direct opacity cross-fades.
- 3D transforms are flattened.
