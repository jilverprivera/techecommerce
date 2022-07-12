/** @type {import('tailwindcss').Config} */

const {fontFamily, screens} = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layout/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xxs: '270px',
      xs: '350px',
      ...screens,
    },
    extend: {
      fontFamily: {
        supremeLight: ['Supreme-Light', ...fontFamily.sans],
        supremeRegular: ['Supreme-Regular', ...fontFamily.sans],
        supremeMedium: ['Supreme-Medium', ...fontFamily.sans],
        supremeBold: ['Supreme-Bold', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
