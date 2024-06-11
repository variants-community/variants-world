import { defineConfig, envField, passthroughImageService } from 'astro/config'
import preact from '@astrojs/preact'
import windi from 'astro-windi'

import deno from '@deno/astro-adapter'

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), windi()],
  output: 'server',
  server: { port: 3000 },
  adapter: deno(),
  image: {
    service: passthroughImageService()
  },
  experimental: {
    env: {
      schema: {
        DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
        DIRECT_DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),

        PUBLIC_SUPABASE_URL: envField.string({ context: 'server', access: 'secret' }),
        PUBLIC_SUPABASE_ANON_KEY: envField.string({ context: 'server', access: 'secret' }),
        SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret' }),
        JWT_SECRET: envField.string({ context: 'server', access: 'secret' }),

        CGABOT_URL: envField.string({ context: 'server', access: 'secret' }),
        CGABOT_API_TOKEN: envField.string({ context: 'server', access: 'secret' }),

        SUPABASE_PROJECT_ID: envField.string({ context: 'server', access: 'secret' }),

        PRISMA_OUTPUT: envField.string({ context: 'server', access: 'secret' }),

        /**
         * Secret haha
         */
        OAUTH_CLIENT_ID: envField.string({ context: 'server', access: 'secret' })
      }
    }
  }
})
