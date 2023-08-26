/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'light':'rgb(241,243,245)',
        'dark':'#222227',
        'dark-sec':'rgba(80,80,100,0.1)'
      }
    },
  },
  plugins: [],
  darkMode:'class'
}
