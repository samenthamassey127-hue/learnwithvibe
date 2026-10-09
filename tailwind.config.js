/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        celestial: {
          bg: '#050308',
          deep: '#0B0612',
          surface: '#120A1D',
          card: '#180E26',
          border: 'rgba(236, 178, 146, 0.2)',
          borderGlow: 'rgba(247, 197, 159, 0.45)',
          gold: '#ECC09B',
          goldLight: '#FCE6D2',
          roseGold: '#D89079',
          amberGlow: '#F59E0B',
          starWhite: '#FFF8F0',
        }
      },
      boxShadow: {
        'glow-celestial': '0 0 30px -4px rgba(236, 178, 146, 0.35)',
        'glow-moon': '0 0 40px 2px rgba(252, 230, 210, 0.4)',
        'glow-card': '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(236, 178, 146, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-very-slow': 'spin 90s linear infinite',
      }
    },
  },
  plugins: [],
};
