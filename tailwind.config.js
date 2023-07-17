const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      colors: {
        'storj-blue': {
          50: '#e8f7ff',
          100: '#d5f0ff',
          200: '#b3e1ff',
          300: '#85cbff',
          400: '#56a6ff',
          500: '#2f80ff',
          600: '#0c53ff',
          700: '#0149ff', // base
          800: '#0641cd',
          900: '#103e9f',
          950: '#0a225c',
        },
        'storj-blue-dark': '#0218A7',
        'storj-black': '#091c45',
        'smoke-grey': '#F5F6F8',
        'storj-green': {
          50: '#edfff6',
          100: '#d5ffeb',
          200: '#aeffd8',
          300: '#70ffbc',
          400: '#2bfd98',
          500: '#00d36e', // base
          600: '#00c05f',
          700: '#00964e',
          800: '#067541',
          900: '#076038',
          950: '#00371d',
        },

        'storj-yellow': {
          50: '#ffffea',
          100: '#fffdc5',
          200: '#fffc85',
          300: '#fff346',
          400: '#ffe61b',
          500: '#fac300', // base
          600: '#e29a00',
          700: '#bb6e02',
          800: '#985508',
          900: '#7c450b',
          950: '#482400',
        },

        'storj-pink': '#FF458B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss'),
  ],
}
