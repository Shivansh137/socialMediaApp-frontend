/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': '#fafafa',
        'light-sec':'#ececec',
        'dark': 'rgb(24,25,26)',
        'dark-sec': 'rgb(36,37,38)',
        'primary':'#FEB941'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
