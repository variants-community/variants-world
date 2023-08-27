import { defineConfig } from 'windicss/helpers'
import type { FullConfig } from 'windicss/types/interfaces'
// import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

export const COLORS = {
  primary: '#AE4939',
  secondary: '#D3543F',
  green: '#61AD14',
  blue: '#2B99EA',
  red: '#CD2740',
  gray: '#2D2D32',
  yellow: '#CDBF27',
  text: '#959595',
  'text-light': '#A8A8A8',
  white: '#F6F6F6',
  dark: '#141415',
  'border-dark': '#0E0E10',
  'border-light': '#1E1E20'
} as const satisfies NonNullable<FullConfig['theme']>['colors']

export default defineConfig({
  darkMode: 'class', // or 'media'
  extract: {
    include: ['index.html', 'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    exclude: ['node_modules/**/*', '.git/**/*']
  },
  theme: {
    container: {
      screens: {
        sm: '984px',
        md: '984px',
        lg: '984px',
        xl: '984px',
        '2xl': '984px'
      }
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem', // final
      xl: '1.25rem',
      '2xl': '1.5rem', // final
      '3xl': '1.75rem',
      '4xl': '2rem', // final
      '5xl': '3rem', // +/-
      '6xl': '4.4rem', // +/-
      '7xl': '5.3rem' // final
    },
    extend: {
      fontFamily: {
        sans: ['Glory', 'sans-serif']
      },
      colors: COLORS,
      margin: {
        bigcenter: 'max(0px, (100vh - 950px) / 2)',
        smallcenter: 'max(0px, (100vh - 250px) / 2)'
      },
      letterSpacing: {
        glory: '2.55px'
      },
      boxShadow: {
        dark: '2px 4px 20px -5px rgba(0, 0, 0, 0.80)',
        light: '0px 0px 20px 0px rgba(255, 255, 255, 0.1)',
        lightHover: '0px 0px 25px 0px rgba(255, 255, 255, 0.2), 0px 0px 10px -8px rgba(255, 255, 255, 0.5)',
        lightSmall: '0px 0px 15px 0px rgba(255, 255, 255, 0.1)',
        lightSmallHover: '0px 0px 18px 0px rgba(255, 255, 255, 0.2), 0px 0px 10px -8px rgba(255, 255, 255, 0.5)'
      },
      textShadow: {
        light: '0px 0px 15px rgba(255, 255, 255, 0.15)'
      },
      scale: {
        inverse: '-1'
      },
      animation: {
        fade: 'fade 1s linear forwards',
        fadefast: 'fade 0.5s linear forwards',
        postfade: 'postfade 0.8s 0.1s linear forwards',
        spinning: 'spinning 1s linear infinite, fade 0.5s linear forwards'
      },
      keyframes: {
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        postfade: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1' }
        },
        spinning: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.28, 0.54, 0.49, 0.88)'
      },
      transitionProperty: {
        text: 'font-size box-shadow',
        inset: 'font-size left right bottom top'
      }
    }
  },
  plugins: [],
  safelist: 'text-yellow text-blue text-green',
  shortcuts: {
    darkborder: 'border border-[2px] border-border-dark',
    'transition-title': {
      transitionProperty: 'height, margin-top, opacity, margin-bottom, font-size',
      transitionDuration: '550ms, 550ms, 300ms, 550ms, 550ms, 200ms',
      transitionTimingFunction: 'ease, ease, cubic-bezier(0.28, 0.54, 0.49, 0.88), ease, ease'
    },
    'transition-search': {
      transitionProperty: 'font-size, box-shadow, color, width, padding',
      transitionDuration: '500ms, 200ms, 200ms, 500ms, 500ms',
      transitionTimingFunction: 'cubic-bezier(0.28, 0.54, 0.49, 0.88)',
      '&::placeholder': {
        transition: 'color 200ms cubic-bezier(0.28, 0.54, 0.49, 0.88)'
      }
    }
  }
})

export type Color = keyof typeof COLORS