# Audio Engine & Visualization Architecture

## 1. Engine Fundamentals

The audio experience is powered by the Web Audio API coupled with an HTML5 `<audio>` element to deliver hardware-accelerated playback and real-time frequency analysis.

```
┌─────────────────────┐
│  HTMLAudioElement   │
└──────────┬──────────┘
           │ createMediaElementSource
           ▼
┌─────────────────────┐
│   MediaElementSource│
└──────────┬──────────┘
           ├───────────────────────────────┐
           ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│    AnalyserNode     │         │      GainNode       │
│  (fftSize = 256)    │         │  (Volume / Mute)    │
└──────────┬──────────┘         └──────────┬──────────┘
           │ getByteFrequencyData          ▼
           ▼                    ┌─────────────────────┐
┌─────────────────────┐         │AudioDestinationNode │
│ Reactive Visualizer │         │      (Speakers)     │
│   (Canvas / RAF)    │         └─────────────────────┘
└─────────────────────┘
```

## 2. Real-Time Audio Extraction

The `AnalyserNode` is configured with:
- `fftSize = 256`: Generates 128 discrete frequency bins from 0Hz to ~22,050Hz.
- `smoothingTimeConstant = 0.8`: Provides fluid visual motion between frames, preventing harsh jitter.
- Analysis Frequency Bands:
  - **Sub-bass & Bass (20Hz - 250Hz)**: Bins 0-6. Drives the vinyl pulsing and particle vibration.
  - **Mid-range (250Hz - 4000Hz)**: Bins 7-45. Drives waveform curvature and ring expansions.
  - **Treble & Brilliance (4000Hz - 20,000Hz)**: Bins 46-128. Drives fine wave oscillations and particle shimmer.

## 3. The 8 Music-Reactive Visualizers

1. **Hero Live Waveform**:
   - Located on the hero bar.
   - Computes a dynamic bezier curve connecting 32 normalized frequency nodes.
   - When paused, smoothly interpolates to a calm mathematical sine wave (`Math.sin(time + x * 0.05) * 6`).
2. **Rotating Vinyl Record**:
   - Grooved vinyl disc with high-gloss sheen and album center sticker.
   - Rotates at 33 1/3 RPM during playback (`rotate: 360deg linear`).
   - Smooth deceleration on pause via easing curve.
   - Audio energy pulses the vinyl's outer shadow glow.
3. **Particle Field**:
   - Canvas-based particle simulation with 40-80 floating glowing embers.
   - Bass energy imparts kinetic impulse vectors, scattering particles outward.
4. **Frequency Rings**:
   - 3 Concentric rings pulsating around the vinyl or album art.
   - Ring radii scale with low, mid, and high frequency RMS values.
5. **Reactive Typography**:
   - Header text "MAFF" features an audio-reactive text-shadow glow (`0 0 ${energy * 30}px #62FF70`).
6. **Spectrum Analyzer**:
   - 24 vertical bars with variable heights representing frequency spectrum, complete with peak-hold decay meters.
7. **Album Artwork 3D Perspective Tilt**:
   - Tracks cursor position on hover to render subtle 3D perspective shifts (`rotateX`, `rotateY`).
8. **Scroll-Driven Sound Journey**:
   - Section backgrounds dynamically shift hue and glow opacity as the user journeys down the page.

## 4. Performance & Resource Cleanup

- `requestAnimationFrame` loops automatically suspend when audio is paused or when `document.visibilityState === 'hidden'`.
- Audio nodes and event listeners are systematically disconnected on component unmount.
- Respects `prefers-reduced-motion` by reducing particle counts and clamping scale transforms to 1.0.
