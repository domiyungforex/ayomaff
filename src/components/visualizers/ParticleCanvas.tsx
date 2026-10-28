"use client";

import React, { useEffect, useRef } from "react";
import { useAudio } from "@/lib/audio/AudioContext";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
}

export function ParticleCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { getAudioEnergy, isPlaying } = useAudio();
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2, // Drift upward like embers
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const { bass, overall } = getAudioEnergy();

      // Energy boost when playing
      const speedMultiplier = isPlaying ? 1 + bass * 2.2 : 0.8;
      const glowMultiplier = isPlaying ? 1 + overall * 1.5 : 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Wrap around bounds
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(98, 255, 112, ${Math.min(1, p.alpha * glowMultiplier)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + bass * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [getAudioEnergy, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 opacity-40 ${className}`}
      aria-hidden="true"
    />
  );
}
