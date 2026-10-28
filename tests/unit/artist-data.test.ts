/**
 * tests/unit/artist-data.test.ts
 * Deep integrity checks on the static artist data module.
 */

import { describe, it, expect } from "vitest";
import {
  RELEASES,
  VIDEOS,
  CONCERT_EVENTS,
  GALLERY_IMAGES,
  PRODUCTS,
} from "@/lib/data/artist-data";
import { formatDate } from "@/lib/utils";

// ─── Releases ────────────────────────────────────────────────────────────────

describe("RELEASES data integrity", () => {
  it("contains at least 5 releases", () => {
    expect(RELEASES.length).toBeGreaterThanOrEqual(5);
  });

  it("every release has a valid slug (lowercase, no spaces)", () => {
    for (const release of RELEASES) {
      expect(
        release.slug,
        `Release "${release.title}" has an invalid slug: "${release.slug}"`
      ).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("every release has a non-empty id and title", () => {
    for (const release of RELEASES) {
      expect(release.id.trim().length).toBeGreaterThan(0);
      expect(release.title.trim().length).toBeGreaterThan(0);
    }
  });

  it("every release has a valid releaseType", () => {
    const validTypes = ["album", "ep", "single"] as const;
    for (const release of RELEASES) {
      expect(validTypes).toContain(release.releaseType);
    }
  });

  it("every track across all releases has durationSeconds > 0", () => {
    for (const release of RELEASES) {
      for (const track of release.tracks) {
        expect(
          track.durationSeconds,
          `Track "${track.title}" in release "${release.title}" has durationSeconds ≤ 0`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("every track has a valid id, title, and trackNumber ≥ 1", () => {
    for (const release of RELEASES) {
      for (const track of release.tracks) {
        expect(track.id.trim().length).toBeGreaterThan(0);
        expect(track.title.trim().length).toBeGreaterThan(0);
        expect(track.trackNumber).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("every release has at least one track", () => {
    for (const release of RELEASES) {
      expect(
        release.tracks.length,
        `Release "${release.title}" has no tracks`
      ).toBeGreaterThanOrEqual(1);
    }
  });
});

// ─── Products ────────────────────────────────────────────────────────────────

describe("PRODUCTS data integrity", () => {
  it("contains at least 1 product", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(1);
  });

  it("every product has priceNgn > 0", () => {
    for (const product of PRODUCTS) {
      expect(
        product.priceNgn,
        `Product "${product.title}" has priceNgn ≤ 0`
      ).toBeGreaterThan(0);
    }
  });

  it("every product has priceUsd > 0", () => {
    for (const product of PRODUCTS) {
      expect(
        product.priceUsd,
        `Product "${product.title}" has priceUsd ≤ 0`
      ).toBeGreaterThan(0);
    }
  });

  it("every product has a non-empty slug with no spaces", () => {
    for (const product of PRODUCTS) {
      expect(product.slug).not.toContain(" ");
      expect(product.slug.trim().length).toBeGreaterThan(0);
    }
  });

  it("every product has a valid category", () => {
    const validCategories = ["apparel", "headwear", "accessories"] as const;
    for (const product of PRODUCTS) {
      expect(validCategories).toContain(product.category);
    }
  });

  it("every product has at least one variant", () => {
    for (const product of PRODUCTS) {
      expect(
        product.variants.length,
        `Product "${product.title}" has no variants`
      ).toBeGreaterThanOrEqual(1);
    }
  });
});

// ─── Gallery Images ──────────────────────────────────────────────────────────

describe("GALLERY_IMAGES data integrity", () => {
  it("contains at least 1 gallery image", () => {
    expect(GALLERY_IMAGES.length).toBeGreaterThanOrEqual(1);
  });

  it("every gallery image has imageUrl starting with '/assets/'", () => {
    for (const image of GALLERY_IMAGES) {
      expect(
        image.imageUrl,
        `Gallery image "${image.id}" has invalid imageUrl: "${image.imageUrl}"`
      ).toMatch(/^\/assets\//);
    }
  });

  it("every gallery image has a non-empty id and caption", () => {
    for (const image of GALLERY_IMAGES) {
      expect(image.id.trim().length).toBeGreaterThan(0);
      expect(image.caption.trim().length).toBeGreaterThan(0);
    }
  });

  it("every gallery image has a valid category", () => {
    const validCategories = ["editorial", "live", "studio", "lifestyle"] as const;
    for (const image of GALLERY_IMAGES) {
      expect(validCategories).toContain(image.category);
    }
  });
});

// ─── Videos ──────────────────────────────────────────────────────────────────

describe("VIDEOS data integrity", () => {
  it("has at least 5 video items", () => {
    expect(VIDEOS.length).toBeGreaterThanOrEqual(5);
  });

  it("every video has a non-empty youtubeId string", () => {
    for (const video of VIDEOS) {
      expect(typeof video.youtubeId).toBe("string");
      expect(
        video.youtubeId.trim().length,
        `Video "${video.title}" has an empty youtubeId`
      ).toBeGreaterThan(0);
    }
  });

  it("every video has a non-empty id, slug, and title", () => {
    for (const video of VIDEOS) {
      expect(video.id.trim().length).toBeGreaterThan(0);
      expect(video.slug.trim().length).toBeGreaterThan(0);
      expect(video.title.trim().length).toBeGreaterThan(0);
    }
  });

  it("every video has a valid category", () => {
    const validCategories = [
      "music_video",
      "live",
      "visualizer",
      "documentary",
    ] as const;
    for (const video of VIDEOS) {
      expect(validCategories).toContain(video.category);
    }
  });
});

// ─── Concert Events ──────────────────────────────────────────────────────────

describe("CONCERT_EVENTS data integrity", () => {
  it("contains at least 1 concert event", () => {
    expect(CONCERT_EVENTS.length).toBeGreaterThanOrEqual(1);
  });

  it("every event status is one of 'confirmed' | 'postponed' | 'cancelled'", () => {
    const validStatuses = ["confirmed", "postponed", "cancelled"] as const;
    for (const event of CONCERT_EVENTS) {
      expect(
        validStatuses,
        `Event "${event.title}" has an invalid status: "${event.status}"`
      ).toContain(event.status);
    }
  });

  it("every event has a non-empty title, venue, city, and country", () => {
    for (const event of CONCERT_EVENTS) {
      expect(event.title.trim().length).toBeGreaterThan(0);
      expect(event.venue.trim().length).toBeGreaterThan(0);
      expect(event.city.trim().length).toBeGreaterThan(0);
      expect(event.country.trim().length).toBeGreaterThan(0);
    }
  });

  it("every event has a valid ISO date string (YYYY-MM-DD)", () => {
    for (const event of CONCERT_EVENTS) {
      expect(
        event.date,
        `Event "${event.title}" has invalid date format: "${event.date}"`
      ).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

// ─── formatDate utility ───────────────────────────────────────────────────────

describe("formatDate utility", () => {
  it("formats a known ISO date string correctly", () => {
    const result = formatDate("2024-04-12");
    // Should include Apr, 12, and 2024 — locale-independent parts check
    expect(result).toContain("2024");
    expect(result).toMatch(/Apr/i);
    expect(result).toContain("12");
  });

  it("formats a second known date", () => {
    const result = formatDate("2025-08-15");
    expect(result).toContain("2025");
    expect(result).toMatch(/Aug/i);
    expect(result).toContain("15");
  });

  it("returns something non-empty for any valid date string", () => {
    expect(formatDate("2025-01-01").trim().length).toBeGreaterThan(0);
  });

  it("returns a fallback for a nonsensical string", () => {
    // Should not throw; returns something (the input or an empty-ish string)
    const result = formatDate("not-a-date");
    expect(typeof result).toBe("string");
  });
});

