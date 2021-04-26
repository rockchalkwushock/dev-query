const colors = require('tailwindcss/colors')

/**
 * Theme Color Palettes:
 *
 * `next-themes` gives use 'light' *& 'dark' by default.
 *
 * Light:
 * bg-indigo-300
 * border-
 * text-
 *
 * Dark:
 * bg-coolGray-800
 * border-
 * text-
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
