// tailwind.config.cjs
module.exports = {
  darkMode: 'class', // <--- use class toggling (we'll add/remove 'dark' on <html>)
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // semantic names you can use in components: text, surface, muted, accent
        primary: {
          50:  '#eef2ff', // optional light shades
          100: '#e0e7ff',
          500: '#6366f1', // Indigo-500
        },
        surface: {
          light: '#ffffff',
          dark: '#0b1220',   // deep dark surface
        },
        muted: {
          light: '#6b7280', // gray-500
          dark: '#9ca3af'   // lighter text for dark
        },
        accent: {
          500: '#7c3aed' // purple-ish accent
        }
      },
      boxShadow: {
        'glass-lg': '0 8px 30px rgba(2,6,23,0.35)'
      }
    }
  },
  plugins: [],
}
