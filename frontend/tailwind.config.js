/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import textShadow from 'tailwindcss-textshadow';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Novecento', 'sans-serif'], // substituirá o padrão
      },
      colors: {
        fuerza: {
          azul: '#004AAD',
          laranja: '#F7931E',
        },
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0,0,0,0.7)',
        DEFAULT: '2px 2px 4px rgba(0,0,0,0.8)',
        lg: '3px 3px 6px rgba(0,0,0,0.9)',
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [lineClamp, textShadow],
};