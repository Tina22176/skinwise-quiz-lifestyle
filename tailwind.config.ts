import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "#C45589",
          soft: "#F0B3CF",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Niveaux de texte
        "text-muted": "#9B8FA3",
        gold: "#C9A87C",
        // Couleurs Majoliepeau
        rose: {
          DEFAULT: "#D4649A",
          bright: "#E077AD",
          soft: "#F0B3CF",
          whisper: "#FBEAF2",
          glow: "#F9D5E5",
        },
        violet: {
          DEFAULT: "#6B4E7D",
          deep: "#3D2B45",
          mid: "#8A6BA0",
          soft: "#C4AEDA",
          whisper: "#EDE5F4",
        },
        lilas: {
          DEFAULT: "#D8C4EC",
          mid: "#C9ADE2",
          soft: "#EBE0F5",
          whisper: "#F5F0FA",
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(61, 43, 69, 0.05), 0 1px 2px rgba(61, 43, 69, 0.06)",
        md: "0 4px 14px rgba(61, 43, 69, 0.06), 0 2px 4px rgba(61, 43, 69, 0.04)",
        lg: "0 12px 32px rgba(61, 43, 69, 0.08), 0 4px 8px rgba(61, 43, 69, 0.04)",
        glow: "0 8px 30px rgba(196, 75, 133, 0.30), 0 2px 8px rgba(196, 75, 133, 0.15)",
        "glow-sm": "0 4px 15px rgba(212, 100, 154, 0.20), 0 1px 4px rgba(212, 100, 154, 0.10)",
        "glow-lg": "0 12px 40px rgba(212, 100, 154, 0.35), 0 4px 12px rgba(212, 100, 154, 0.20)",
        "glow-xl": "0 20px 60px rgba(212, 100, 154, 0.45), 0 8px 20px rgba(212, 100, 154, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(212, 100, 154, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(212, 100, 154, 0.35)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(212, 100, 154, 0.15), 0 0 20px rgba(212, 100, 154, 0.10)" },
          "50%": { boxShadow: "0 0 20px rgba(212, 100, 154, 0.40), 0 0 40px rgba(212, 100, 154, 0.20)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 50%, 90%": { transform: "translateX(-4px)" },
          "30%, 70%": { transform: "translateX(4px)" },
        },
        "flip-3d": {
          "0%": { transform: "perspective(600px) rotateY(0deg)", opacity: "1" },
          "50%": { transform: "perspective(600px) rotateY(90deg)", opacity: "0" },
          "100%": { transform: "perspective(600px) rotateY(0deg)", opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up-fade": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width, 100%)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "fade-down": "fade-down 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        "flip-3d": "flip-3d 0.6s ease-in-out",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "slide-up-fade": "slide-up-fade 0.4s ease-out",
        "progress-fill": "progress-fill 1.2s ease-out forwards",
        confetti: "confetti 3s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
