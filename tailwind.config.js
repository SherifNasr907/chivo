/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#070a12',
          900: '#0b1020',
          850: '#0f1526',
          800: '#141b30',
          700: '#1d263f',
          600: '#2a3550',
        },
        accent: {
          DEFAULT: '#6366f1',
          soft: '#818cf8',
        },
      },
      boxShadow: {
        panel: '0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
