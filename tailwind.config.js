/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#256af4",
        "accent": "#00f2ff",
        "background-light": "#f5f6f8",
        "background-dark": "#0a0c10",
        "obsidian": "#0a0c10",
        "terminal-green": "#4ade80",
      },
      fontFamily: {
        "sans": ["Space Grotesk", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      animation: {
        'matrix-scroll': 'matrix 20s linear infinite',
        'scanline': 'scanline 4s linear infinite',
        'rapid-pulse': 'pulse-ring 0.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-glow': 'neon-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        matrix: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        },
        scanline: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' }
        },
        'pulse-ring': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.5)' }
        },
        'neon-pulse': {
          '0%, 100%': { borderColor: 'rgba(74, 222, 128, 0.3)', boxShadow: '0 0 5px rgba(74, 222, 128, 0.1)' },
          '50%': { borderColor: 'rgba(74, 222, 128, 1)', boxShadow: '0 0 15px rgba(74, 222, 128, 0.4)' }
        }
      }
    },
  },
  plugins: [],
}
