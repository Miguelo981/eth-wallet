import type { Config } from "tailwindcss";

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;