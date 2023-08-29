import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import prisma from 'db/prisma/prisma'
import type { CGABotGameDetails, CGABotRuleVariants } from 'cgabot'
import type { GameType } from '@prisma/client'
import type { Output } from 'valibot'
import type { PostDetailsValidator } from 'services/post-details-validator'

export type PostDetails = Output<typeof PostDetailsValidator>

const mapRules = (ruleVariants: CGABotRuleVariants) => {
  return mapRuleVariantsToString(ruleVariants).map(rule => ({ name: rule }))
}

export const createPost = async (mainGame: CGABotGameDetails, postDetailsDTO: PostDetails) => {
  const post = await prisma.post.create({
    data: {
      gameNr: mainGame.gameNr,
      title: postDetailsDTO.data.title,
      authorUserId: postDetailsDTO.userId,
      description: postDetailsDTO.data.description,
      status: 'UNDER_REVIEW',
      variantLink: postDetailsDTO.data.title,
      type: (postDetailsDTO.data.type as GameType) ?? 'NCV',
      PostDetails: { create: {} },
      gamerules: {
        connectOrCreate: [...mapRules(mainGame.q.ruleVariants), { name: mainGame.q.timeControl }].map(rule => ({
          where: { name: rule.name },
          create: { name: rule.name }
        }))
      }
    },
    select: { id: true }
  })

  return post.id
}
