const colors = require('tailwindcss/colors')

/**
 * Theme Color Palettes:
 *
 * `next-themes` gives use 'light' *& 'dark' by default.
 *
 * Light:
 * bg-primary: bg-gradient-to-b from-blue-500 to-blue-100
 * bg-secondary: bg-coolGray-50
 * border-primary: border-coolGray-900
 * text-primary: text-coolGray-900
 * text-secondary: text-coolGray-700
 *
 * Dark:
 * bg-primary: bg-gradient-to-b from-coolGray-900 to-warmGray-600
 * bg-secondary: bg-coolGray-800
 * border-primary: border-coolGray-50
 * text-primary: text-coolGray-50
 * text-secondary: text-coolGray-300
 */

module.exports = {
  darkMode: 'class',
  important: true,
  plugins: [],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      // These must be included manually.
      current: 'currentColor',
      transparent: 'transparent',
      ...colors,
    },
  },
  variants: {
    extend: {
      animation: ['motion-reduce'],
      cursor: ['disabled'],
      opacity: ['disabled'],
      transitionDelay: ['motion-reduce'],
      transitionDuration: ['motion-reduce'],
      transitionProperty: ['motion-reduce'],
      transitionTimingFunction: ['motion-reduce'],
    },
  },
}
