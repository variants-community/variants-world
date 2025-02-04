import { defineAction } from 'astro:actions'
import { edgeCache } from 'utils/cache'
import { prisma } from 'db/prisma/prisma'
import { webhook } from '@dino/github-webhook'

const webhookHandler = webhook('secret').on('star', async event => {
  const stars = event.repository.stargazers_count
  await prisma.system.upsert({ create: { stars }, update: { stars }, where: { id: 1 } })
  await edgeCache.invalidate(['stars'])
  console.log({ stars }, 'updated!')
})

export const starsWebhook = defineAction({
  handler: (_, ctx) => webhookHandler.handle(ctx.request)
})
