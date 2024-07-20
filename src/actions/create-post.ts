import { type GameType } from 'db/prisma/types'
import { createPostPayloadSchema } from 'actions/types'
import { defineAction } from 'astro:actions'
import { descriptionValid, doesGameExist, titleValid } from 'utils/post-validation'
import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import Prisma, { prisma } from 'db/prisma/prisma'

const doesUserExist = async (userId: number) => (await prisma.user.count({ where: { id: userId } })) === 1
const doesPostWithTitleExist = async (title: string) => (await prisma.post.count({ where: { title } })) === 0

export const createPost = defineAction({
  input: createPostPayloadSchema,
  handler: async payload => {
    try {
      const [game] = await Promise.all([
        doesGameExist(payload.gameNr),
        doesUserExist(payload.userId),
        descriptionValid(payload.description),
        titleValid(payload.title),
        doesPostWithTitleExist(payload.title)
      ])

      const rules = mapRuleVariantsToString(game.q.ruleVariants).map(rule => ({ name: rule }))

      const post = await prisma.post.create({
        data: {
          // TODO: add confirmingGameNrs to db
          gameNr: game.gameNr,
          fen: game.q.startFen,
          title: payload.title,
          authorUserId: payload.userId,
          description: payload.description,
          status: 'UNDER_REVIEW',
          variantLink: payload.title,
          type: (payload.type as GameType) ?? 'NCV',
          PostDetails: { create: {} },
          gamerules: {
            connectOrCreate: [...rules, { name: game.q.timeControl }].map(rule => ({
              where: { name: rule.name },
              create: { name: rule.name }
            }))
          }
        },
        select: { id: true }
      })

      return { confirmedGameId: post.id }
    } catch (e) {
      let message = 'Unknow error'
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') message = 'A post with this game already exists'
        else if (e.code === 'P2003' && e.meta && String(e.meta.field_name).startsWith('Post_authorUserId_fkey'))
          message = 'User not found'
      } else if (e instanceof Error) message = e.message
      return { error: message }
    }
  }
})
