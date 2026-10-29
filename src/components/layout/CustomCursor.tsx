"use client";

import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops/laptops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (dot) dot.style.opacity = "1";
        if (ring) ring.style.opacity = "1";
      }

      // Zero-latency instant update for the main dot via direct GPU transform
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        Boolean(target.closest("button")) ||
        Boolean(target.closest("a")) ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      if (ring) {
        if (isInteractive) {
          ring.classList.add("scale-150", "border-electric-green", "bg-electric-green/20");
        } else {
          ring.classList.remove("scale-150", "border-electric-green", "bg-electric-green/20");
        }
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    };

    // Snappy high-frequency animation loop for outer ring
    const render = () => {
      // 0.40 response factor ensures snappy, immediate tracking without lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.4;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.4;

      if (ring) {
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Zero-latency instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-electric-green opacity-0 shadow-neon will-change-transform"
        aria-hidden="true"
      />
      {/* Snappy trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 rounded-full border border-electric-green/60 opacity-0 transition-[transform,background-color,border-color] duration-150 ease-out will-change-transform"
        aria-hidden="true"
      />
    </>
  );
}
