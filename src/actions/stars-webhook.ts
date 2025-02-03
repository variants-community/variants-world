import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const starsWebhook = defineAction({
  input: z.any(),
  handler: async payload => {
    console.log({ payload })
    return 2
  }
})
