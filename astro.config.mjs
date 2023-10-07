import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import windi from 'astro-windi'

import deno from '@astrojs/deno'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), windi()],
  output: 'server',
  server: { port: 3000 },
  adapter: deno()
})
