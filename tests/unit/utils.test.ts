import { describe, it, expect } from "vitest";
import { formatDuration, formatNaira, formatUSD, cn } from "@/lib/utils";

describe("Formatting Utilities", () => {
  it("formats audio duration in mm:ss format correctly", () => {
    expect(formatDuration(0)).toBe("0:00");
    expect(formatDuration(45)).toBe("0:45");
    expect(formatDuration(60)).toBe("1:00");
    expect(formatDuration(192)).toBe("3:12");
    expect(formatDuration(365)).toBe("6:05");
  });

  it("handles negative or invalid seconds gracefully", () => {
    expect(formatDuration(-10)).toBe("0:00");
    expect(formatDuration(NaN)).toBe("0:00");
  });

  it("formats Nigerian Naira currency correctly", () => {
    const formatted = formatNaira(45000);
    expect(formatted).toContain("45,000");
  });

  it("formats US Dollar currency correctly", () => {
    const formatted = formatUSD(55);
    expect(formatted).toContain("$55.00");
  });

  it("merges class names correctly with twMerge and clsx", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
    expect(cn("text-white", false && "text-black", "font-bold")).toBe("text-white font-bold");
  });
});
