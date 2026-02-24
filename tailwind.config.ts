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
          hover: "#C04A7A",
          soft: "#FBEAF2",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "fade-down": "fade-down 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
