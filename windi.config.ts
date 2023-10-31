import { defineConfig } from 'windicss/helpers'
import type { FullConfig } from 'windicss/types/interfaces'
// import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

export const COLORS = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  green: 'var(--green)',
  blue: 'var(--blue)',
  red: 'var(--red)',
  gray: 'var(--gray)',
  yellow: 'var(--yellow)',
  text: 'var(--text)',
  'text-light': 'var(--text-light)',
  white: 'var(--white)',
  dark: 'var(--dark)',
  'border-dark': 'var(--border-dark)',
  'border-light': 'var(--border-light)'
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
      xl: '1.25rem', // final
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
      borderRadius: {
        borderRadius: {
          none: '0',
          sm: '0.125rem', // 2px
          DEFAULT: '0.188rem', // 4px -> 3px
          md: '0.375rem', // 6px
          lg: '0.5rem', // 8px
          xl: '0.5rem', // 12px
          full: '9999px'
        }
      },
      colors: COLORS,
      width: {
        fit: 'fit-content'
      },
      margin: {
        bigcenter: 'max(1rem, (100dvh - 950px) / 2)',
        smallcenter: 'max(0dvh, (60dvh - 300px) / 2)'
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
        spinning: 'spinning 1s linear infinite, fade 0.5s linear forwards',
        blink: 'blink 1.5s linear forwards'
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
        },
        blink: {
          '0%': { 'background-color': 'var(--border-light)' },
          '5%, 90%': { 'background-color': '#983c2d' },
          '100%': { 'background-color': 'var(--border-light)' }
        }
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.28, 0.54, 0.49, 0.88)'
      },
      transitionProperty: {
        text: 'font-size box-shadow',
        inset: 'font-size left right bottom top',
        margin: 'margin'
      }
    }
  },
  plugins: [],
  safelist: 'text-yellow text-blue text-green fill-blue fill-yellow fill-red fill-green',
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
    },
    'transition-comments-input': {
      transitionProperty: 'font-size, box-shadow, color, width, padding',
      transitionDuration: '500ms, 200ms, 200ms, 500ms, 100ms',
      transitionTimingFunction: 'cubic-bezier(0.28, 0.54, 0.49, 0.88)',
      '&::placeholder': {
        transition: 'color 200ms cubic-bezier(0.28, 0.54, 0.49, 0.88)'
      }
    }
  }
})

export type Color = keyof typeof COLORS
