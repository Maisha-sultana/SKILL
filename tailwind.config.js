// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // এটি আপনার সব JSX ফাইলকে টার্গেট করবে
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}