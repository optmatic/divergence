import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        cursive: ["Cormorant Garamond", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Forest-inspired colors
        forest: {
          50: "#f2f7f4",
          100: "#e6f0e8",
          200: "#cce0d1",
          300: "#b3d1ba",
          400: "#99c2a3",
          500: "#80b38c",
          600: "#669975",
          700: "#4d805e",
          800: "#336647",
          900: "#1a4d30",
        },
        // Even darker woody green color
        wood: {
          50: "#edf2ed",
          100: "#dbe5db",
          200: "#b7cbb7",
          300: "#93b193",
          400: "#6f976f",
          500: "#4b7d4b",
          600: "#3c643c",
          700: "#2d4b2d",
          800: "#1e321e",
          900: "#0a1a0a", // Darker than before
          950: "#050a05", // Almost black with green tint
        },
        earth: {
          50: "#f7f4f2",
          100: "#f0e8e6",
          200: "#e0d1cc",
          300: "#d1bab3",
          400: "#c2a399",
          500: "#b38c80",
          600: "#997566",
          700: "#805e4d",
          800: "#664733",
          900: "#4d301a",
        },
        sky: {
          50: "#f2f7fa",
          100: "#e6f0f5",
          200: "#cce0eb",
          300: "#b3d1e0",
          400: "#99c2d6",
          500: "#80b3cc",
          600: "#6699b3",
          700: "#4d8099",
          800: "#336680",
          900: "#1a4d66",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
