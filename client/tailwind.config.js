/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",  // 👈 Must be "class", not "media"
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};