/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          300: '#86efac',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        calm: {
          50:  '#eff6ff',
          100: '#dbeafe',
          300: '#93c5fd',
          500: '#3b82f6',
          600: '#2563eb',
        },
        mood: {
          great:    '#22c55e',
          okay:     '#eab308',
          meh:      '#f97316',
          stressed: '#ef4444',
          sad:      '#8b5cf6',
        }
      },
    },
  },
  plugins: [],
}
