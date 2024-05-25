/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': '#F0F5F9',
        'light-sec':'#eee',
        'dark': 'rgb(24,25,26)',
        'dark-sec': 'rgb(36,37,38)',
        'primary':'#FEB941'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
