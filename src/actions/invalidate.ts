import { defineAction } from 'astro:actions'
import { edgeCache } from 'utils/cache'
import { z } from 'astro:schema'

export const invalidate = defineAction({
  input: z.array(z.string()),
  handler: async tags => {
    await edgeCache.invalidate(tags)
  }
})
