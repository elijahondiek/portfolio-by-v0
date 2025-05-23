import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
          primary: "#00d4ff",
          secondary: "#00ff88",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b4bcd0",
        },
        glass: "rgba(255,255,255,0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "12px",
        "2xl": "16px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "3xl": "1.75rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3.5rem",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      spacing: {
        // Keep Tailwind's default spacing scale intact and add custom values
        // Tailwind uses a scale where 4 = 1rem (16px)
        // We'll add our custom values without overriding the defaults
        "4px": "4px",
        "8px": "8px",
        "16px": "16px",
        "24px": "24px",
        "32px": "32px",
        "48px": "48px",
        "64px": "64px",
        "96px": "96px",
      },
      backdropBlur: {
        md: "12px",
      },
      transitionDuration: {
        "300": "300ms",
      },
      transitionTimingFunction: {
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
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
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 20%, 53%, 80%, 100%": { transform: "translateY(0)" },
          "40%, 43%": { transform: "translateY(-10px)" },
          "70%": { transform: "translateY(-5px)" },
          "90%": { transform: "translateY(-2px)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 15s infinite ease-in-out",
        blink: "blink 1s infinite step-end",
        pulse: "pulse 3s infinite",
        bounce: "bounce 2s infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
