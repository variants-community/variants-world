import { defineConfig } from 'windicss/helpers'
// import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

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
    extend: {
      fontFamily: {
        sans: ['Glory', 'sans-serif']
      },
      colors: {
        primary: '#AE4939',
        secondary: '#D3543F',
        green: '#61AD14',
        blue: '#2B99EA',
        red: '#CD2740',
        gray: '#2D2D32',
        yellow: '#CDBF27',
        text: '#959595',
        white: '#F6F6F6',
        dark: '#141415',
        'border-dark': '#0E0E10',
        'border-light': '#1E1E20'
      },
      boxShadow: {
        dark: '2px 4px 20px -5px rgba(0, 0, 0, 0.80)',
        light: '0px 0px 20px 0px rgba(255, 255, 255, 0.10)'
      },
      textShadow: {
        light: '0px 0px 15px rgba(255, 255, 255, 0.15)'
      },
      scale: {
        inverse: '-1'
      }
    }
  },
  plugins: [],
  safelist: 'text-yellow text-blue text-green',
  alias: {
    'border-bold': 'border border-[2px] border-border-dark'
  }
})
