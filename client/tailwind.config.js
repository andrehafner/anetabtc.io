/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '80': '20rem'
      },
      borderColor: {
        'theme': 'var(--clickable-border-color-less)'
      },
      colors: {
        'agreen': '#68D04F',
        'ared': '#ff6c6c'
      }
    },
  },
  plugins: [],
}
