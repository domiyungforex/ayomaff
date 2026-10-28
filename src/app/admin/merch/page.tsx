"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ShoppingBag, DollarSign } from "lucide-react";
import { PRODUCTS as initialProducts } from "@/lib/data/artist-data";
import { Product } from "@/types";
import { formatNaira, formatUSD } from "@/lib/utils";

export default function AdminMerchPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [tab, setTab] = useState<"products" | "orders">("products");

  // Mock orders
  const [orders] = useState([
    {
      id: "ord-1",
      orderNumber: "ORD-AYO-829104",
      customer: "Oluwaseun Adeleke",
      email: "seun@example.com",
      item: "Prince of the Street Hoodie (L)",
      amount: "₦45,000",
      status: "paid",
      date: "2026-10-27",
    },
    {
      id: "ord-2",
      orderNumber: "ORD-AYO-392019",
      customer: "David Alaba",
      email: "david@example.com",
      item: "Maffian Empire Graphic Tee (M)",
      amount: "₦25,000",
      status: "pending",
      date: "2026-10-26",
    },
  ]);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            COMMERCE & INVENTORY
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage merchandise catalog, variant stock levels, and customer orders.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-2 bg-forest-dark p-1 rounded-xl border border-emerald-950">
          <button
            onClick={() => setTab("products")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab === "products"
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab === "orders"
                ? "bg-electric-green text-black shadow-neon"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {tab === "products" ? (
        <div className="glass-panel rounded-3xl border border-emerald-950/80 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest-dark border-b border-zinc-900 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Price (NGN)</th>
                  <th className="py-4 px-6">Price (USD)</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Total Stock</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/80 text-zinc-300">
                {products.map((prod) => {
                  const totalStock = prod.variants.reduce((sum, v) => sum + v.stockCount, 0);
                  return (
                    <tr key={prod.id} className="hover:bg-forest-surface/50 transition-colors">
                      <td className="py-4 px-6 flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black flex-shrink-0">
                          <Image src={prod.mainImage} alt={prod.title} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">{prod.title}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">/{prod.slug}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-white">
                        {formatNaira(prod.priceNgn)}
                      </td>
                      <td className="py-4 px-6 font-mono text-zinc-400">
                        {formatUSD(prod.priceUsd)}
                      </td>
                      <td className="py-4 px-6 uppercase text-[10px] font-mono text-zinc-400">
                        {prod.category}
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-electric-green">
                        {totalStock} units
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-950 text-electric-green border border-green-800">
                          In Stock
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-emerald-950/80 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest-dark border-b border-zinc-900 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="py-4 px-6">Order Ref</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Item</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/80 text-zinc-300">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-forest-surface/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-electric-green">
                      {ord.orderNumber}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-white block">{ord.customer}</span>
                      <span className="text-[10px] text-zinc-500">{ord.email}</span>
                    </td>
                    <td className="py-4 px-6 text-zinc-300">{ord.item}</td>
                    <td className="py-4 px-6 font-mono font-bold text-white">{ord.amount}</td>
                    <td className="py-4 px-6 font-mono text-zinc-400">{ord.date}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === "paid"
                            ? "bg-green-950 text-electric-green border border-green-800"
                            : "bg-yellow-950 text-yellow-400 border border-yellow-800"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
