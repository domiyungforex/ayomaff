"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { formatNaira, formatUSD } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    currency,
    setCurrency,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07140C] border-l border-emerald-950 flex flex-col justify-between shadow-2xl p-6 animate-slideLeft">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-bold text-white tracking-tight">SHOPPING CART</h2>
              {/* Currency Toggle */}
              <div className="flex rounded-md bg-forest-surface p-0.5 border border-emerald-900">
                <button
                  onClick={() => setCurrency("NGN")}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    currency === "NGN" ? "bg-electric-green text-black" : "text-zinc-400"
                  }`}
                >
                  NGN (₦)
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    currency === "USD" ? "bg-electric-green text-black" : "text-zinc-400"
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                <p className="text-sm">Your shopping bag is empty.</p>
                <Link
                  href="/merch"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-electric-green hover:underline"
                >
                  Explore Official Merch →
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const price = currency === "NGN" ? item.product.priceNgn : item.product.priceUsd;
                return (
                  <div
                    key={item.variant.id}
                    className="flex items-center space-x-4 bg-forest-surface/60 border border-emerald-950/80 p-3 rounded-xl"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0">
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Size: {item.variant.size} • {item.variant.color}
                      </p>
                      <p className="text-xs font-mono font-bold text-electric-green mt-1">
                        {currency === "NGN" ? formatNaira(price) : formatUSD(price)}
                      </p>
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                          className="p-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          className="p-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.variant.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-zinc-800 pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-mono font-bold text-white text-base">
                  {currency === "NGN" ? formatNaira(subtotal) : formatUSD(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Taxes and shipping calculated at checkout.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-center py-2.5 rounded-full border border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-full bg-electric-green text-black text-xs font-bold uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
