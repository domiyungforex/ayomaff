import { describe, it, expect } from "vitest";
import { RELEASES, VIDEOS, CONCERT_EVENTS, PRODUCTS, ARTIST_INFO } from "@/lib/data/artist-data";
import { z } from "zod";

describe("Artist Data Integrity", () => {
  it("contains verified artist metadata", () => {
    expect(ARTIST_INFO.name).toBe("AYO MAFF");
    expect(ARTIST_INFO.realName).toBe("Ayorinde Mafoluku Ayodele");
    expect(ARTIST_INFO.hometown).toContain("Bariga");
    expect(ARTIST_INFO.stats.length).toBe(3);
  });

  it("contains verified releases with valid tracklists", () => {
    expect(RELEASES.length).toBeGreaterThanOrEqual(5);
    const princeRelease = RELEASES.find((r) => r.slug === "prince-of-the-street");
    expect(princeRelease).toBeDefined();
    expect(princeRelease?.tracks.length).toBeGreaterThan(0);

    // Verify 'Dealer' single existence
    const dealerTrack = princeRelease?.tracks.find((t) => t.title.includes("Dealer"));
    expect(dealerTrack).toBeDefined();
    expect(dealerTrack?.featuringArtists).toContain("Fireboy DML");
  });

  it("contains verified video links and categories", () => {
    expect(VIDEOS.length).toBeGreaterThanOrEqual(5);
    VIDEOS.forEach((vid) => {
      expect(vid.youtubeId).toBeDefined();
      expect(vid.thumbnailUrl).toBeDefined();
      expect(["music_video", "live", "visualizer", "documentary"]).toContain(vid.category);
    });
  });

  it("contains legitimate tour dates", () => {
    expect(CONCERT_EVENTS.length).toBeGreaterThanOrEqual(4);
    CONCERT_EVENTS.forEach((evt) => {
      expect(evt.venue).toBeDefined();
      expect(evt.city).toBeDefined();
      expect(evt.ticketUrl).toBeDefined();
    });
  });

  it("contains complete merchandise with variants", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(3);
    PRODUCTS.forEach((prod) => {
      expect(prod.priceNgn).toBeGreaterThan(0);
      expect(prod.priceUsd).toBeGreaterThan(0);
      expect(prod.variants.length).toBeGreaterThan(0);
    });
  });
});

describe("Inquiry Validation Schemas", () => {
  const bookingSchema = z.object({
    contactName: z.string().min(2),
    email: z.string().email(),
    proposedDate: z.string().min(1),
    location: z.string().min(2),
    budgetRange: z.string().min(1),
    message: z.string().min(10),
  });

  it("validates correct booking inquiry submissions", () => {
    const valid = {
      contactName: "Sarah Jenkins",
      email: "sarah@afronation.com",
      proposedDate: "2026-11-20",
      location: "Portimão, Portugal",
      budgetRange: "$50,000 - $100,000",
      message: "Headline performance booking request for Afro Nation 2026.",
    };
    expect(() => bookingSchema.parse(valid)).not.toThrow();
  });

  it("rejects invalid booking inquiry with bad email or short message", () => {
    const invalid = {
      contactName: "S",
      email: "not-an-email",
      proposedDate: "",
      location: "Lagos",
      budgetRange: "$10k",
      message: "Short",
    };
    expect(() => bookingSchema.parse(invalid)).toThrow();
  });
});
