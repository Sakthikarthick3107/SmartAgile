/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : '#4d989d',
        background : '#F0F8FF'
      }
      
    },
  },
  plugins: [],
}

