/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        capa: "url('/logo-capa.png')",
        network: "url('src/assets/images/network.png')",
      }
    },
  },
  plugins: [],
};