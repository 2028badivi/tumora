/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f1c', // Deep dark blue
        surface: '#121b2d', // Slightly lighter blue surface
        primary: '#f97316', // Orange
        secondary: '#3b82f6', // Bright blue
        danger: '#ef4444', // Red
        success: '#22c55e', // Green
        warning: '#eab308' // Yellow
      }
    },
  },
  plugins: [],
}
