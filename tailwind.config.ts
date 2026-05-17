import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0E12",
        surface: "#111823",
        elevated: "#161D2B",
        border: {
          DEFAULT: "#1E2D3D",
          active: "#26354A",
        },
        accent: {
          DEFAULT: "#00E5FF",
          dim: "#00E5FF20",
        },
        text: {
          primary: "#E2E8F0",
          secondary: "#64748B",
          muted: "#334155",
        },
        success: "#00D68F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-pulse": {
          "0%, 100%": { borderColor: "#1E2D3D" },
          "50%": { borderColor: "#00E5FF" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "border-pulse": "border-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
