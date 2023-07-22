/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue':'#003588',
        'light-blue':'#3c69bb'
      }
    },
  },
  plugins: [],
}