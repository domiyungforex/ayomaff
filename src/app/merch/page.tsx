"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data/artist-data";
import { useCart } from "@/lib/cart/CartContext";
import { formatNaira, formatUSD } from "@/lib/utils";

export default function MerchPage() {
  const [filter, setFilter] = useState<string>("all");
  const { currency, setCurrency, addItem } = useCart();

  const filteredProducts = PRODUCTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Currency Switcher */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-zinc-900">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-1 block">
            OFFICIAL COLLECTION
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            MERCHANDISE
          </h1>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center space-x-3 bg-forest-dark p-1.5 rounded-full border border-emerald-950">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 pl-3">
            CURRENCY:
          </span>
          <button
            onClick={() => setCurrency("NGN")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              currency === "NGN"
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            NGN (₦)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              currency === "USD"
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 bg-forest-dark p-1 rounded-full border border-emerald-950 w-max mb-10">
        {["all", "apparel", "headwear"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === cat
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredProducts.map((product) => {
          const price =
            currency === "NGN" ? product.priceNgn : product.priceUsd;
          return (
            <div
              key={product.id}
              className="group glass-panel rounded-2xl p-4 border border-emerald-950/80 hover:border-electric-green/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Link
                  href={`/merch/${product.slug}`}
                  className="relative block aspect-square rounded-xl overflow-hidden mb-4 bg-black"
                >
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-electric-green uppercase tracking-wider">
                    IN STOCK
                  </span>
                </Link>

                <Link href={`/merch/${product.slug}`}>
                  <h3 className="font-bold text-base text-white hover:text-electric-green transition-colors tracking-tight truncate">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mt-1 mb-4">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-base font-mono font-bold text-white">
                  {currency === "NGN" ? formatNaira(price) : formatUSD(price)}
                </span>

                <button
                  onClick={() => {
                    if (product.variants[0]) {
                      addItem(product, product.variants[0], 1);
                    }
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-forest-dark border border-electric-green text-electric-green text-xs font-bold uppercase tracking-wider hover:bg-electric-green hover:text-black transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conceptual Store Disclosure */}
      <div className="p-4 rounded-xl bg-forest-dark/50 border border-emerald-950 text-center max-w-xl mx-auto text-xs text-zinc-500">
        Merchandise shop concept. Orders and inventory management operate in sandbox demonstration mode. Live card transactions disabled.
      </div>
    </div>
  );
}
