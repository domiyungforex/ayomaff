import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050806",
        foreground: "#F7F8F4",
        "forest-dark": "#07140C",
        "forest-surface": "#0B1C10",
        "emerald-border": "#0F291A",
        "emerald-glow": "#1A3D24",
        "electric-green": "#62FF70",
        "acid-green": "#B2FF59",
        "muted-gray": "#A2A8A2",
        "dark-gray": "#232D25",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Trebuchet MS", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(98, 255, 112, 0.4)",
        "neon-lg": "0 0 45px rgba(98, 255, 112, 0.6)",
        "emerald-subtle": "0 8px 32px 0 rgba(7, 20, 12, 0.8)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "wave-idle": "waveIdle 4s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        waveIdle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
