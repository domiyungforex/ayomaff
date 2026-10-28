"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck } from "lucide-react";
import { PRODUCTS } from "@/lib/data/artist-data";
import { useCart } from "@/lib/cart/CartContext";
import { formatNaira, formatUSD } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { currency, addItem } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    notFound();
  }

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const price = currency === "NGN" ? product.priceNgn : product.priceUsd;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="pt-28 pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/merch"
        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-electric-green transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO STORE</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column: Product Imagery (Cols 1-6) */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel border border-emerald-950/80 bg-black shadow-2xl">
            <Image
              src={product.mainImage}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Additional thumbnails if available */}
          {product.galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-emerald-950 bg-black cursor-pointer"
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Purchasing Controls (Cols 7-12) */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-3">
              {product.title}
            </h1>
            <p className="text-2xl font-mono font-bold text-electric-green">
              {currency === "NGN" ? formatNaira(price) : formatUSD(price)}
            </p>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selector (Sizes) */}
          {product.variants.length > 1 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                SELECT SIZE:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedVariantId === v.id
                        ? "bg-electric-green text-black border border-electric-green shadow-neon"
                        : "bg-forest-surface text-zinc-300 border border-emerald-950 hover:border-zinc-700"
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              QUANTITY:
            </span>
            <div className="inline-flex items-center space-x-3 bg-forest-surface p-1 rounded-xl border border-emerald-950">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-forest-dark text-white hover:text-electric-green flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="font-mono text-sm font-bold text-white px-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-forest-dark text-white hover:text-electric-green flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{addedToast ? "ADDED TO BAG!" : "ADD TO SHOPPING BAG"}</span>
          </button>

          {/* Assurance Badges */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900 text-xs text-zinc-400">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-electric-green" />
              <span>Worldwide Tracked Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-electric-green" />
              <span>Secure Paystack Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
