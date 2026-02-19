/** @type {import('tailwindcss').Config} */
export default {
  content:  ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F766E",     // Main brand color (Ocean Green)
        secondary: "#14B8A6",   // Hover / lighter green
        accent: "#5EEAD4",      // Borders, badges, highlights
        bg: "#F0FDFA",           // Page background
        dark: "#0F172A",         // Text color (dark)
      },
    },
  },
  plugins: [],
}

