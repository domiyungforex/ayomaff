"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { formatNaira, formatUSD } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, currency, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Nigeria",
  });
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderNumber: string;
    total: number;
    email: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.address) return;

    setLoading(true);
    const orderNumber = `ORD-AYO-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          customer: formData,
          items,
          currency,
          total: subtotal,
        }),
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setOrderConfirmed({
        orderNumber,
        total: subtotal,
        email: formData.email,
      });
      clearCart();
      setLoading(false);
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="pt-32 pb-32 max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-forest-dark border-2 border-electric-green flex items-center justify-center mx-auto mb-6 shadow-neon">
          <CheckCircle2 className="w-8 h-8 text-electric-green" />
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display mb-2">
          ORDER CONFIRMED
        </h1>
        <p className="font-mono text-xs text-electric-green mb-6">
          Order Reference: {orderConfirmed.orderNumber}
        </p>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-950 text-left space-y-3 mb-8 text-xs text-zinc-300">
          <p>
            Thank you for ordering Ayo Maff official concept merchandise. A confirmation receipt has been simulated for{" "}
            <strong>{orderConfirmed.email}</strong>.
          </p>
          <div className="pt-3 border-t border-zinc-900 flex justify-between font-mono font-bold text-white text-sm">
            <span>Total Paid (Simulated)</span>
            <span className="text-electric-green">
              {currency === "NGN" ? formatNaira(orderConfirmed.total) : formatUSD(orderConfirmed.total)}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
        >
          <span>RETURN TO HOME</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-electric-green mb-2 block">
          SECURE CHECKOUT
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          PAYSTACK ORDER PROCESSING
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Customer Information Form (Cols 1-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-950 space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white pb-3 border-b border-zinc-900">
              SHIPPING & CUSTOMER DETAILS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tunde"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alabi"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="tunde@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Delivery Address
              </label>
              <input
                type="text"
                required
                placeholder="15 Admiralty Way, Lekki Phase 1"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lagos"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-electric-green"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-surface border border-emerald-950 text-xs text-white focus:outline-none focus:border-electric-green"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-electric-green text-black font-extrabold text-xs uppercase tracking-wider hover:bg-acid-green shadow-neon transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>
                {loading
                  ? "INITIALIZING GATEWAY..."
                  : `PAY ${currency === "NGN" ? formatNaira(subtotal) : formatUSD(subtotal)} VIA PAYSTACK`}
              </span>
            </button>
          </form>
        </div>

        {/* Order Summary (Cols 8-12) */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-950 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white pb-3 border-b border-zinc-900">
              ORDER SUMMARY ({items.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((i) => {
                const price = currency === "NGN" ? i.product.priceNgn : i.product.priceUsd;
                return (
                  <div key={i.variant.id} className="flex justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{i.product.title}</p>
                      <p className="text-[10px] text-zinc-400">
                        Qty: {i.quantity} • Size: {i.variant.size}
                      </p>
                    </div>
                    <span className="font-mono text-zinc-300">
                      {currency === "NGN" ? formatNaira(price * i.quantity) : formatUSD(price * i.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-zinc-900 space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-white">
                  {currency === "NGN" ? formatNaira(subtotal) : formatUSD(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tracked Express Shipping</span>
                <span className="text-electric-green font-bold">FREE</span>
              </div>
              <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-sm font-bold text-white">
                <span>Total Due</span>
                <span className="font-mono text-electric-green text-base">
                  {currency === "NGN" ? formatNaira(subtotal) : formatUSD(subtotal)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-forest-surface border border-emerald-950 flex items-center space-x-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-electric-green flex-shrink-0" />
              <span>Simulated Sandbox Payment. Real cards will not be charged.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
