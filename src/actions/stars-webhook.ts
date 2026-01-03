import { defineAction } from 'astro:actions'
import { webhook } from '@dino/github-webhook'
import { edgeCache } from 'utils/cache'
import { getConvexHttpClient, api } from 'src/lib/convex-client'

const webhookHandler = webhook(import.meta.env.WEBHOOK_SECRET).on('star', async event => {
  const stars = event.repository.stargazers_count
  const convex = getConvexHttpClient()
  await convex.mutation(api.system.updateStars, { stars })
  await edgeCache.invalidate(['stars'])
  console.log({ stars }, 'updated!')
})

export const starsWebhook = defineAction({
  handler: (_, ctx) => webhookHandler.handle(ctx.request)
})
