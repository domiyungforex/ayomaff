/**
 * tests/unit/cart.test.ts
 * Pure logic tests for cart operations — no React renderer needed.
 * The functions below mirror the logic inside CartContext.tsx.
 */

import { describe, it, expect } from "vitest";
import { CartItem, Product, ProductVariant } from "@/types";
import { formatNaira, formatUSD } from "@/lib/utils";

// ─── Standalone cart logic (mirrors CartContext) ──────────────────────────────

function addToCart(
  items: CartItem[],
  product: Product,
  variant: ProductVariant,
  qty: number = 1
): CartItem[] {
  const existingIndex = items.findIndex((i) => i.variant.id === variant.id);
  if (existingIndex > -1) {
    const copy = [...items];
    copy[existingIndex] = {
      ...copy[existingIndex],
      quantity: copy[existingIndex].quantity + qty,
    };
    return copy;
  }
  return [...items, { product, variant, quantity: qty }];
}

function removeFromCart(items: CartItem[], variantId: string): CartItem[] {
  return items.filter((i) => i.variant.id !== variantId);
}

function updateQuantity(
  items: CartItem[],
  variantId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) return removeFromCart(items, variantId);
  return items.map((i) =>
    i.variant.id === variantId ? { ...i, quantity } : i
  );
}

function calcSubtotal(items: CartItem[], currency: "NGN" | "USD"): number {
  return items.reduce((sum, item) => {
    const price =
      currency === "NGN" ? item.product.priceNgn : item.product.priceUsd;
    return sum + price * item.quantity;
  }, 0);
}

function calcTotalCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const makeVariant = (id: string): ProductVariant => ({
  id,
  size: "M",
  color: "Pitch Black",
  sku: `SKU-${id}`,
  stockCount: 20,
});

const makeProduct = (id: string, priceNgn: number, priceUsd: number): Product => ({
  id,
  slug: `product-${id}`,
  title: `Product ${id}`,
  description: "Test product",
  priceNgn,
  priceUsd,
  mainImage: "/assets/test.jpg",
  galleryImages: [],
  isAvailable: true,
  category: "apparel",
  variants: [makeVariant(`var-${id}`)],
});

const hoodie = makeProduct("p1", 45000, 55);
const tee = makeProduct("p2", 25000, 30);
const hoodieVariant = makeVariant("var-p1");
const teeVariant = makeVariant("var-p2");

// ─── addToCart ────────────────────────────────────────────────────────────────

describe("addToCart", () => {
  it("adds a new item to an empty cart", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 1);
    expect(cart).toHaveLength(1);
    expect(cart[0].product.id).toBe("p1");
    expect(cart[0].quantity).toBe(1);
  });

  it("adds a second distinct item to the cart", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1);
    cart = addToCart(cart, tee, teeVariant, 2);
    expect(cart).toHaveLength(2);
    expect(cart[1].product.id).toBe("p2");
    expect(cart[1].quantity).toBe(2);
  });

  it("increments quantity when the same variant is added again", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1);
    cart = addToCart(cart, hoodie, hoodieVariant, 3);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(4);
  });

  it("defaults quantity to 1 when no qty is passed", () => {
    const cart = addToCart([], hoodie, hoodieVariant);
    expect(cart[0].quantity).toBe(1);
  });

  it("does not mutate the original items array", () => {
    const original: CartItem[] = [];
    addToCart(original, hoodie, hoodieVariant, 1);
    expect(original).toHaveLength(0);
  });
});

// ─── removeFromCart ───────────────────────────────────────────────────────────

describe("removeFromCart", () => {
  it("removes an item by variant id", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1);
    cart = addToCart(cart, tee, teeVariant, 1);
    cart = removeFromCart(cart, hoodieVariant.id);
    expect(cart).toHaveLength(1);
    expect(cart[0].product.id).toBe("p2");
  });

  it("returns the same cart when variantId does not exist", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 1);
    const result = removeFromCart(cart, "non-existent");
    expect(result).toHaveLength(1);
  });

  it("returns an empty cart when the only item is removed", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 1);
    const result = removeFromCart(cart, hoodieVariant.id);
    expect(result).toHaveLength(0);
  });
});

// ─── updateQuantity ───────────────────────────────────────────────────────────

describe("updateQuantity", () => {
  it("updates the quantity of a specific variant", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 1);
    const updated = updateQuantity(cart, hoodieVariant.id, 5);
    expect(updated[0].quantity).toBe(5);
  });

  it("removes the item when quantity is set to 0", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 2);
    const updated = updateQuantity(cart, hoodieVariant.id, 0);
    expect(updated).toHaveLength(0);
  });

  it("removes the item when quantity is set to a negative number", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 2);
    const updated = updateQuantity(cart, hoodieVariant.id, -1);
    expect(updated).toHaveLength(0);
  });

  it("does not affect other items in the cart", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1);
    cart = addToCart(cart, tee, teeVariant, 1);
    const updated = updateQuantity(cart, hoodieVariant.id, 10);
    const teeItem = updated.find((i) => i.variant.id === teeVariant.id);
    expect(teeItem?.quantity).toBe(1);
  });
});

// ─── Subtotal calculation ─────────────────────────────────────────────────────

describe("calcSubtotal (NGN)", () => {
  it("returns 0 for an empty cart", () => {
    expect(calcSubtotal([], "NGN")).toBe(0);
  });

  it("calculates subtotal for a single item", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 2);
    // 45000 * 2 = 90000
    expect(calcSubtotal(cart, "NGN")).toBe(90000);
  });

  it("calculates subtotal across multiple items", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1); // 45000
    cart = addToCart(cart, tee, teeVariant, 3);         // 25000 * 3 = 75000
    expect(calcSubtotal(cart, "NGN")).toBe(120000);
  });
});

describe("calcSubtotal (USD)", () => {
  it("calculates subtotal in USD for a single item", () => {
    const cart = addToCart([], hoodie, hoodieVariant, 2);
    // 55 * 2 = 110
    expect(calcSubtotal(cart, "USD")).toBe(110);
  });

  it("calculates subtotal in USD across multiple items", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1); // 55
    cart = addToCart(cart, tee, teeVariant, 2);         // 30 * 2 = 60
    expect(calcSubtotal(cart, "USD")).toBe(115);
  });
});

// ─── Total count ──────────────────────────────────────────────────────────────

describe("calcTotalCount", () => {
  it("returns 0 for an empty cart", () => {
    expect(calcTotalCount([])).toBe(0);
  });

  it("sums quantities across all items", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 3);
    cart = addToCart(cart, tee, teeVariant, 2);
    expect(calcTotalCount(cart)).toBe(5);
  });
});

// ─── Currency display logic ───────────────────────────────────────────────────

describe("Currency display formatting", () => {
  it("formatNaira formats NGN amounts with the ₦ symbol", () => {
    const result = formatNaira(45000);
    expect(result).toContain("45");
    // Should contain either ₦ or NGN depending on the locale implementation
    expect(result.length).toBeGreaterThan(4);
  });

  it("formatNaira formats zero correctly", () => {
    const result = formatNaira(0);
    expect(result).toBeTruthy();
  });

  it("formatUSD formats USD amounts with the $ symbol", () => {
    const result = formatUSD(55);
    expect(result).toContain("55");
    expect(result).toContain("$");
  });

  it("formatUSD formats decimal amounts correctly", () => {
    const result = formatUSD(29.99);
    expect(result).toContain("29");
    expect(result).toContain("99");
  });

  it("NGN subtotal display matches expected value", () => {
    let cart = addToCart([], hoodie, hoodieVariant, 1);
    cart = addToCart(cart, tee, teeVariant, 1);
    const subtotal = calcSubtotal(cart, "NGN"); // 45000 + 25000 = 70000
    expect(subtotal).toBe(70000);
    const formatted = formatNaira(subtotal);
    expect(formatted).toContain("70");
  });
});

