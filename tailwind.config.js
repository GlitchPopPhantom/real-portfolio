/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%': { opacity: '0.98' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        flicker: 'flicker 0.1s infinite',
      },
    },
  },
  plugins: [],
}