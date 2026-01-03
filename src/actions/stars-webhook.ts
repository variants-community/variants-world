import { defineAction } from 'astro:actions'
import { webhook } from '@dino/github-webhook'
import { edgeCache } from 'utils/cache'
import { ConvexHttpClient } from 'convex/browser'

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL

const getConvexClient = () => {
  if (!convexUrl) throw new Error('PUBLIC_CONVEX_URL not set')
  return new ConvexHttpClient(convexUrl)
}

const webhookHandler = webhook(import.meta.env.WEBHOOK_SECRET).on('star', async event => {
  const stars = event.repository.stargazers_count
  const convex = getConvexClient()
  const { api } = await import('../../convex/_generated/api')
  await convex.mutation(api.system.updateStars, { stars })
  await edgeCache.invalidate(['stars'])
  console.log({ stars }, 'updated!')
})

export const starsWebhook = defineAction({
  handler: (_, ctx) => webhookHandler.handle(ctx.request)
})
