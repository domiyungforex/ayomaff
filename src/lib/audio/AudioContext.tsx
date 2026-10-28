"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { Track } from "@/types";
import { RELEASES } from "@/lib/data/artist-data";

interface AudioEnergy {
  bass: number;
  mid: number;
  treble: number;
  overall: number;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playlist: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  getFrequencyData: () => Uint8Array;
  getAudioEnergy: () => AudioEnergy;
}

const AudioEngineContext = createContext<AudioContextType | null>(null);

export function AudioEngineProvider({ children }: { children: React.ReactNode }) {
  // Collect all available tracks from releases
  const defaultPlaylist: Track[] = RELEASES.flatMap((r) => r.tracks);
  const [playlist] = useState<Track[]>(defaultPlaylist);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(defaultPlaylist[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(defaultPlaylist[0]?.durationSeconds || 192);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  // Audio nodes and references
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const frequencyArrayRef = useRef<Uint8Array>(new Uint8Array(64));
  const fallbackPhaseRef = useRef<number>(0);

  // Initialize Web Audio API nodes
  const initAudioEngine = useCallback(() => {
    if (audioContextRef.current) {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;

      const gainNode = ctx.createGain();
      gainNode.gain.value = volume;

      if (audioElementRef.current) {
        const source = ctx.createMediaElementSource(audioElementRef.current);
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(ctx.destination);
        sourceRef.current = source;
      }

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      gainNodeRef.current = gainNode;
      frequencyArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.warn("Web Audio API initialization deferred or not supported:", e);
    }
  }, [volume]);

  // Handle Play/Pause
  const playTrack = useCallback((track: Track) => {
    initAudioEngine();
    setCurrentTrack(track);
    setDuration(track.durationSeconds);
    setCurrentTime(0);
    setIsPlaying(true);

    if (audioElementRef.current) {
      if (track.audioPreviewUrl) {
        audioElementRef.current.src = track.audioPreviewUrl;
        audioElementRef.current.play().catch(() => {
          // Fall back gracefully to synthetic player simulation
          setIsPlaying(true);
        });
      } else {
        // Simulated playback for demo preview
        setIsPlaying(true);
      }
    }
  }, [initAudioEngine]);

  const togglePlay = useCallback(() => {
    initAudioEngine();
    if (!currentTrack && playlist.length > 0) {
      playTrack(playlist[0]);
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      audioElementRef.current?.pause();
    } else {
      setIsPlaying(true);
      if (audioElementRef.current && currentTrack?.audioPreviewUrl) {
        audioElementRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack, initAudioEngine, isPlaying, playlist, playTrack]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    audioElementRef.current?.pause();
  }, []);

  const seek = useCallback((seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = clamped;
    }
  }, [duration]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : clamped;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : clamped;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioElementRef.current) {
        audioElementRef.current.muted = next;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const nextTrack = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  }, [currentTrack, playlist, playTrack]);

  const prevTrack = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  }, [currentTrack, playlist, playTrack]);

  // Timer loop for simulated and real playback progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, nextTrack]);

  // Media Session API Support
  useEffect(() => {
    if (typeof window !== "undefined" && "mediaSession" in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: "Ayo Maff",
        album: "Prince of the Street",
        artwork: [
          { src: "/assets/artist/about_yellow_hoodie.webp", sizes: "512x512", type: "image/webp" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => togglePlay());
      navigator.mediaSession.setActionHandler("pause", () => togglePlay());
      navigator.mediaSession.setActionHandler("nexttrack", () => nextTrack());
      navigator.mediaSession.setActionHandler("previoustrack", () => prevTrack());
    }
  }, [currentTrack, togglePlay, nextTrack, prevTrack]);

  // Global Keyboard Shortcuts (Space, M, Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "KeyM") {
        e.preventDefault();
        toggleMute();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        seek(currentTime + 5);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        seek(currentTime - 5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleMute, seek, currentTime]);

  // Real-time Frequency Extractor with Fallback Synth
  const getFrequencyData = useCallback((): Uint8Array => {
    if (analyserRef.current && isPlaying) {
      analyserRef.current.getByteFrequencyData(frequencyArrayRef.current as any);
      // If analyser is picking up real audio data
      let sum = 0;
      for (let i = 0; i < frequencyArrayRef.current.length; i++) {
        sum += frequencyArrayRef.current[i];
      }
      if (sum > 0) {
        return frequencyArrayRef.current;
      }
    }

    // High-fidelity algorithmic fallback for visual continuity
    const data = frequencyArrayRef.current;
    if (!isPlaying) {
      // Smooth idle wave
      fallbackPhaseRef.current += 0.02;
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.max(12, Math.floor(Math.sin(fallbackPhaseRef.current + i * 0.15) * 16 + 24));
      }
      return data;
    }

    // Realistic musical frequency response simulation (Bass heavy, tapering treble)
    fallbackPhaseRef.current += 0.08;
    for (let i = 0; i < data.length; i++) {
      const bassWeight = Math.max(0, 1 - i / (data.length * 0.4));
      const midWeight = Math.sin((i / data.length) * Math.PI);
      const wave1 = Math.sin(fallbackPhaseRef.current * 1.5 + i * 0.2);
      const wave2 = Math.cos(fallbackPhaseRef.current * 2.8 + i * 0.4);
      const raw = (wave1 * 0.6 + wave2 * 0.4) * 128 + 128;
      const energy = (raw * 0.6 + bassWeight * 100 + midWeight * 60) * (isMuted ? 0.2 : volume);
      data[i] = Math.min(255, Math.max(15, Math.floor(energy)));
    }
    return data;
  }, [isPlaying, isMuted, volume]);

  const getAudioEnergy = useCallback((): AudioEnergy => {
    const data = getFrequencyData();
    let bassSum = 0;
    let midSum = 0;
    let trebleSum = 0;

    const bassEnd = Math.floor(data.length * 0.2);
    const midEnd = Math.floor(data.length * 0.6);

    for (let i = 0; i < bassEnd; i++) bassSum += data[i];
    for (let i = bassEnd; i < midEnd; i++) midSum += data[i];
    for (let i = midEnd; i < data.length; i++) trebleSum += data[i];

    const bass = bassSum / (bassEnd * 255);
    const mid = midSum / ((midEnd - bassEnd) * 255);
    const treble = trebleSum / ((data.length - midEnd) * 255);
    const overall = (bass + mid + treble) / 3;

    return { bass, mid, treble, overall };
  }, [getFrequencyData]);

  return (
    <AudioEngineContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playlist,
        playTrack,
        togglePlay,
        pause,
        seek,
        setVolume,
        toggleMute,
        nextTrack,
        prevTrack,
        getFrequencyData,
        getAudioEnergy,
      }}
    >
      <audio
        ref={audioElementRef}
        preload="metadata"
        onEnded={nextTrack}
        onTimeUpdate={() => {
          if (audioElementRef.current) {
            setCurrentTime(audioElementRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioElementRef.current && audioElementRef.current.duration) {
            setDuration(audioElementRef.current.duration);
          }
        }}
        className="hidden"
      />
      {children}
    </AudioEngineContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioEngineContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioEngineProvider");
  }
  return context;
}
