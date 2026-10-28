# Design System — Ayo Maff Cinematic Experience

## 1. Design Direction: "Prince of the Street — Digital Experience"

The visual language bridges gritty street authenticity from Bariga, Lagos with high-fashion brutalist editorial aesthetics. The mood is dark, electric, tactile, and cinematic.

---

## 2. Color Palette

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--color-bg-black` | `#050806` | Primary Canvas | Background across all public pages, hero backdrop |
| `--color-forest-deep` | `#07140C` | Secondary Canvas | Section cards, audio bar container, modals |
| `--color-emerald-dark`| `#0F291A` | Surface Border | Card strokes, dividing rules, subtle glowing borders |
| `--color-electric-green`| `#62FF70`| Primary Accent | Active states, waveform peaks, buttons, logo glow |
| `--color-acid-green` | `#B2FF59` | Secondary Accent | Badges, release highlights, hover effects |
| `--color-white-pure` | `#F7F8F4` | Primary Text | Display headers, artist name, active navigation |
| `--color-gray-muted` | `#A2A8A2` | Secondary Text | Subheadings, release dates, track duration, metadata |
| `--color-gray-dark` | `#232D25` | Inactive Elements | Scrubber track background, inactive tab indicators |

---

## 3. Typography Scale

- **Display Header (Hero / Sections)**: Bold, condensed uppercase lettering.
  - Large: `clamp(3.5rem, 8vw, 7.5rem)` with tight tracking (`tracking-tighter`), font weight 800.
- **Section Title**: `clamp(2rem, 4vw, 3.5rem)` uppercase with accent labels above.
- **Subheadings**: `1.25rem` to `1.75rem`, medium weight (600).
- **Body Copy**: `1rem` to `1.125rem`, relaxed line height (`leading-relaxed`), text color `#A2A8A2`.
- **Micro-labels & Tags**: `0.75rem` uppercase, wide tracking (`tracking-widest`), font weight 700.

---

## 4. UI Primitives & Components

### Buttons
1. **Primary Neon Button**:
   - Background: Electric Green (`#62FF70`)
   - Text: Dark Black (`#050806`), font-bold uppercase
   - Border radius: Full rounded pill (`rounded-full`)
   - Hover: Slight scale (1.04), neon box shadow `0 0 20px rgba(98, 255, 112, 0.4)`
2. **Ghost Outline Button**:
   - Border: 1px solid `#62FF70`
   - Text: Electric Green (`#62FF70`) or Pure White (`#F7F8F4`)
   - Hover: Background `#62FF70` with text `#050806`
3. **Circular Media Button**:
   - Translucent dark emerald circle with neon play/pause icon.

### Form Controls
- **Inputs**: Dark emerald background (`#0B1C10`), light borders (`#1A3D24`), high-contrast focus ring with electric green glow (`focus:border-[#62FF70] focus:ring-1 focus:ring-[#62FF70]`).
- **Placeholder**: Muted gray (`#4E5B50`).

### Cards & Media Frames
- Deep green glassmorphism with backdrop blur (`backdrop-blur-md bg-[#07140C]/80 border border-[#0F291A]`).
- Image masks with subtle inner shadows to blend artist photography seamlessly into the dark background.
