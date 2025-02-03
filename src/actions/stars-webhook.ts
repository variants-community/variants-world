import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const starsWebhook = defineAction({
  input: z.any(),
  handler: async payload => {
    console.dir({ payload }, { depth: null })
    return 2
  }
})
