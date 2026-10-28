"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { formatNaira, formatUSD } from "@/lib/utils";

export default function CartPage() {
  const { items, currency, removeItem, updateQuantity, clearCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-32 max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display mb-4">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-sm text-zinc-400 mb-8">
          You haven&apos;t added any items to your merchandise bag yet.
        </p>
        <Link
          href="/merch"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
        >
          <span>SHOP THE COLLECTION</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-900">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          SHOPPING BAG ({items.length})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items List (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const price =
              currency === "NGN" ? item.product.priceNgn : item.product.priceUsd;
            return (
              <div
                key={item.variant.id}
                className="glass-panel p-4 rounded-2xl border border-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0">
                    <Image
                      src={item.product.mainImage}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{item.product.title}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Size: {item.variant.size} • Color: {item.variant.color}
                    </p>
                    <p className="font-mono text-xs font-bold text-electric-green mt-1">
                      {currency === "NGN" ? formatNaira(price) : formatUSD(price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                  {/* Quantity */}
                  <div className="flex items-center space-x-2 bg-forest-surface p-1 rounded-xl border border-emerald-950">
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                      className="p-1 rounded text-zinc-400 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-bold text-white px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                      className="p-1 rounded text-zinc-400 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-mono font-bold text-white text-sm min-w-[70px] text-right">
                    {currency === "NGN"
                      ? formatNaira(price * item.quantity)
                      : formatUSD(price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.variant.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary (Cols 9-12) */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-950/80 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white pb-3 border-b border-zinc-900">
              SUMMARY
            </h3>

            <div className="flex justify-between text-xs text-zinc-400">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-white">
                {currency === "NGN" ? formatNaira(subtotal) : formatUSD(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-xs text-zinc-400">
              <span>Estimated Shipping</span>
              <span className="text-electric-green font-bold uppercase text-[10px]">
                Calculated at next step
              </span>
            </div>

            <div className="pt-3 border-t border-zinc-900 flex justify-between items-center">
              <span className="font-bold text-sm text-white">Estimated Total</span>
              <span className="font-mono text-lg font-bold text-electric-green">
                {currency === "NGN" ? formatNaira(subtotal) : formatUSD(subtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all mt-4"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
