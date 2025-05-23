import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        accent: {
          primary: "#00d4ff",
          secondary: "#00ff88",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b4bcd0",
        },
        glass: "rgba(255,255,255,0.1)",
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
        "4": "4px",
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "96": "96px",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      animation: {
        float: "float 15s infinite ease-in-out",
        blink: "blink 1s infinite step-end",
        pulse: "pulse 3s infinite",
        bounce: "bounce 2s infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
