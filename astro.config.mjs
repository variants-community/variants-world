import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import windi from 'astro-windi'

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true
  },
  integrations: [preact(), windi()],
  output: 'server'
})
