"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, ProductVariant } from "@/types";

interface CartContextType {
  items: CartItem[];
  currency: "NGN" | "USD";
  setCurrency: (c: "NGN" | "USD") => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ayo_maff_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ayo_maff_cart", JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variant.id === variant.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, variant, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variant.id !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variant.id === variantId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = currency === "NGN" ? item.product.priceNgn : item.product.priceUsd;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        setCurrency,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
