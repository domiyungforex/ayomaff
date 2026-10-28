# Asset Manifest & Media Directory

## 1. Supplied Photographs & Catalog

| Asset Filename | Dimensions | Aspect Ratio | Role & Placement | Source / Licensing | Optimization Status |
|---|---|---|---|---|---|
| `hero_green_jacket_balcony.webp` | 682 × 1024 | 2:3 | Primary Hero Section (Ayo Maff seated on balcony wall with Nike sneakers) | Supplied Original (2024 Promotional Session) | WebP format, lossless compression, responsive Next.js Image |
| `about_yellow_hoodie.webp` | 240 × 198 | ~6:5 | About Section & Editorial (Close-up in yellow hoodie) | Supplied Original (Studio Session) | WebP format, framed with glowing green border |
| `orange_lit_closeup.jpg` | 495 × 619 | 4:5 | Cinematic Transition & Biography (Auburn hair & paisley bandana under dramatic warm lighting) | Supplied Original (Studio Session) | JPEG high-res, optimized for editorial storytelling |
| `black_jersey_hand_signs.jpg` | 588 × 330 | 16:9 | Visual Archive & Music Section (Black basketball jersey with cross chains) | Supplied Original (Promotional Shoot) | JPEG high-res, 16:9 landscape aspect ratio |
| `red_cap_white_bandana.jpg` | 399 × 501 | 4:5 | Lifestyle Archive & Merch Editorial (Side-tilted red cap with white bandana) | Supplied Original (Bariga lifestyle shoot) | JPEG high-res, portrait ratio |
| `hair_dying_balcony.jpg` | 452 × 678 | 2:3 | Visual Gallery & Editorial Narrative (Balcony hair styling session) | Supplied Original (Behind-the-scenes) | JPEG high-res, optimized for lazy-loading |
| `red_bandana_leather.jpg` | 500 × 500 | 1:1 | Discography Highlights, Videos, Press Kit (Red bandana with black biker jacket) | Supplied Original (Promotional Shoot) | JPEG high-res, 1:1 square ratio for covers |
| `website_mockup_reference.jpg` | 682 × 1024 | 2:3 | Design System & Visual Specification Reference | Supplied Layout Mockup | Reference document |

---

## 2. Audio Preview Assets

| Asset Filename | Track Title | Format | Bitrate | Duration | Purpose |
|---|---|---|---|---|---|
| `dealer-preview.mp3` | Dealer (ft. Fireboy DML) | MP3 / WebM | 320 kbps | 3:12 (preview stem) | Live Web Audio API frequency analysis & Persistent player |
| `prince-intro-theme.mp3` | Prince of the Street Theme | MP3 | 256 kbps | 2:45 | Interactive Intro & Vinyl Visualizer |

---

## 3. Product & Merch Visuals

| Asset | Item | File Path |
|---|---|---|
| Graphic Hoodie | Ayo Maff "Prince of the Street" Heavyweight Hoodie | `/assets/artist/about_yellow_hoodie.webp` |
| Tour T-Shirt | "Maffian Empire" Graphic Oversized Tee | `/assets/artist/hair_dying_balcony.jpg` |
| Embroidered Cap | Ayo Maff Signature Street Cap | `/assets/artist/red_bandana_leather.jpg` |

---

## 4. Textures & Visual Accents

- Radial vinyl groove gradients implemented via CSS custom utilities (`.vinyl-grooves`).
- Glassmorphism backdrop surfaces with custom emerald borders (`.glass-panel`, `.glass-panel-elevated`).
- Neon electric green glows (`.text-glow`, `.box-glow`).
