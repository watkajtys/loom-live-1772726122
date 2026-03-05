/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "primary": "#256af4",
          "accent": "#00f2ff", // Neon Cyan
          "background-light": "#f5f6f8",
          "background-dark": "#0a0c10", // Deeper charcoal
      },
      fontFamily: {
          "display": ["Space Grotesk", "sans-serif"],
          "mono": ["JetBrains Mono", "monospace"]
      },
      borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
    },
  },
  plugins: [],
}