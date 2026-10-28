# SEO Strategy & Structured Data

## 1. Technical SEO Foundation

- **Next.js Metadata API**: Centralized dynamic metadata generated per route (`generateMetadata()`).
- **Semantic HTML**: Proper heading hierarchies (`h1` -> `h2` -> `h3`), `<main>`, `<nav>`, `<article>`, `<section>`, and `<footer>`.
- **Open Graph & Twitter Cards**: Dynamic social share previews showing high-resolution artist photography, release titles, and track metadata.
- **Sitemap & Robots**: Automatic `sitemap.xml` and `robots.txt` generation in `src/app/`.

---

## 2. Structured Data (JSON-LD)

### MusicGroup Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Ayo Maff",
  "alternateName": "Prince of the Street",
  "description": "Nigerian Afrobeats, Street-Pop, and African Rap artist from Bariga, Lagos.",
  "genre": ["Afrobeats", "Street-Pop", "African Rap", "Afro-Adura"],
  "sameAs": [
    "https://open.spotify.com/artist/ayomaff",
    "https://music.apple.com/artist/ayo-maff",
    "https://www.youtube.com/@AyoMaffOfficial",
    "https://instagram.com/ayomaff",
    "https://x.com/ayomaff"
  ]
}
```

### MusicAlbum Schema (`/music/[slug]`)
- `@type`: `MusicAlbum` or `MusicRelease`
- Includes album title, release date, artist name, and tracklisting with duration.

### Event Schema (`/tour`)
- `@type`: `MusicEvent`
- Venue name, address, start date, performer, and verified ticketing URL.
