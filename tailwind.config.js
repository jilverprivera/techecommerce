/** @type {import('tailwindcss').Config} */

const { fontFamily, screens } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: { xxs: '270px', xs: '350px', ...screens },
    extend: {
      fontFamily: {
        textLight: ['ClashGrotesk-Light', ...fontFamily.sans],
        textRegular: ['ClashGrotesk-Regular', ...fontFamily.sans],
        textMedium: ['ClashGrotesk-Medium', ...fontFamily.sans],
        textSemibold: ['ClashGrotesk-Semibold', ...fontFamily.sans],
        textBold: ['ClashGrotesk-Bold', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
