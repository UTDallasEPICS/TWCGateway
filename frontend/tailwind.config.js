/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        warrenBlue: '#24bae9',
        warrenBlueDark: '#187c9c',
        warrenPurple: '#7f3f98',
        warrenYellow: '#fbe34b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
