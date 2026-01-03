import type { GameType } from 'db/convex/types'
import { createPostPayloadSchema } from 'actions/types'
import { defineAction } from 'astro:actions'
import { descriptionValid, doesGameExist, titleValid } from 'utils/post-validation'
import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import { edgeCache } from 'utils/cache'
import { ConvexHttpClient } from 'convex/browser'

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL

const getConvexClient = () => {
  if (!convexUrl) throw new Error('PUBLIC_CONVEX_URL not set')
  return new ConvexHttpClient(convexUrl)
}

export const createPost = defineAction({
  input: createPostPayloadSchema,
  handler: async payload => {
    try {
      const convex = getConvexClient()
      const { api } = await import('../../convex/_generated/api')

      // Validate game exists
      const game = await doesGameExist(payload.gameNr)

      // Validate user exists
      const userCount = await convex.query(api.users.countByVisibleId, { visibleId: payload.userId })
      if (userCount === 0) throw new Error('User not found')

      // Validate description and title
      await descriptionValid(payload.description)
      await titleValid(payload.title)

      // Check if post with title exists
      const postCount = await convex.query(api.posts.countByTitle, { title: payload.title })
      if (postCount > 0) throw new Error('A post with this title already exists')

      // Check if post with gameNr exists
      const gameNrCount = await convex.query(api.posts.countByGameNr, { gameNr: game.gameNr })
      if (gameNrCount > 0) throw new Error('A post with this game already exists')

      // Get user's Convex ID
      const user = await convex.query(api.users.getByVisibleId, { visibleId: payload.userId })
      if (!user) throw new Error('User not found')

      // Get next visible ID for post
      const nextPostId = await convex.query(api.posts.getNextVisibleId, {})

      const rules = mapRuleVariantsToString(game.q.ruleVariants).map(rule => ({ name: rule }))

      // Create post
      const postId = await convex.mutation(api.posts.create, {
        visibleId: nextPostId,
        gameNr: game.gameNr,
        gameNrs: payload.confirmingGameNrs.map(Number),
        fen: game.q.startFen,
        title: payload.title,
        description: payload.description,
        status: 'UNDER_REVIEW',
        variantLink: payload.title,
        type: (payload.type as GameType) ?? 'NCV',
        authorId: user._id
      })

      // Add game rules
      for (const rule of [...rules, { name: game.q.timeControl }]) {
        const ruleId = await convex.mutation(api.gameRules.getOrCreate, { name: rule.name })
        await convex.mutation(api.gameRules.addToPost, { gameRuleId: ruleId, postId })
      }

      await edgeCache.invalidate(['posts'])
      return { confirmedGameId: nextPostId }
    } catch (e) {
      let message = 'Whoopsie! CGA is having a coffee break now. Please protest on the forum.'
      if (e instanceof Error) message = e.message
      return { error: message }
    }
  }
})
