/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // for /app directory (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}",    // for traditional /pages directory
    "./components/**/*.{js,ts,jsx,tsx}" // for components
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
