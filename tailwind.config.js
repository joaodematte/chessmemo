/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateRows: {
        8: 'repeat(8, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
};
