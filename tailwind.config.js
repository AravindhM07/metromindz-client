/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn-cblue': 'rgb(5, 16, 93)',
        'btn-cblueHover': 'rgb(5 16 93 / 90%)'
      }
    },
  },
  plugins: [],
}

