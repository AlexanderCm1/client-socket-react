const colors = require('tailwindcss/colors');


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      point : "#1f441e",
      you : "#caf7e3",
      other: '#1c1427',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
