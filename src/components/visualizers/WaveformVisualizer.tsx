"use client";

import React, { useEffect, useRef } from "react";
import { useAudio } from "@/lib/audio/AudioContext";

interface WaveformVisualizerProps {
  height?: number;
  barCount?: number;
  className?: string;
}

export function WaveformVisualizer({
  height = 36,
  barCount = 48,
  className = "",
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { getFrequencyData, isPlaying } = useAudio();
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = canvas.clientWidth || 300;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      const data = getFrequencyData();
      ctx.clearRect(0, 0, width, height);

      const spacing = width / barCount;
      const barWidth = Math.max(2, spacing * 0.55);
      const halfHeight = height / 2;

      for (let i = 0; i < barCount; i++) {
        // Sample frequency data proportionally
        const dataIndex = Math.floor((i / barCount) * data.length);
        const value = data[dataIndex] || 15;
        const normalized = value / 255; // 0 to 1

        // Center-aligned dynamic vertical bars
        const minHeight = isPlaying ? 4 : 2;
        const barH = Math.max(minHeight, normalized * (height * 0.85));
        const x = i * spacing + (spacing - barWidth) / 2;
        const y = halfHeight - barH / 2;

        // Gradient coloring: Electric green (#62FF70) to acid green (#B2FF59)
        const gradient = ctx.createLinearGradient(0, y, 0, y + barH);
        gradient.addColorStop(0, "rgba(178, 255, 89, 0.95)");
        gradient.addColorStop(0.5, "rgba(98, 255, 112, 1)");
        gradient.addColorStop(1, "rgba(15, 41, 26, 0.8)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Rounded pill bars
        const radius = barWidth / 2;
        ctx.roundRect(x, y, barWidth, barH, radius);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.clientWidth || 300;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [getFrequencyData, height, barCount, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-[${height}px] block cursor-pointer transition-opacity duration-300 ${
        isPlaying ? "opacity-100" : "opacity-60 hover:opacity-85"
      } ${className}`}
      style={{ height: `${height}px` }}
      aria-label="Real-time live audio frequency visualizer"
    />
  );
}
