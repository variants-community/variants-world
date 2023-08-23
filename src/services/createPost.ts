import prisma from '../db/prisma/prisma'
import { CGABotRuleVariants, getGameDetailsById } from '../cgabot'
import { mapRuleVariantsToString } from '../utils/hepers'
import type { GameType } from '@prisma/client'

export interface PostDetailsDTO {
  userId: number
  gameId: string
  approveIds: string[]
  data: {
    description: string
    title: string
    type: string
  }
}

const mapRules = (ruleVariants: CGABotRuleVariants) => {
  return mapRuleVariantsToString(ruleVariants).map((rule) => ({ name: rule }))
}

export const createPost = async (postDetailsDTO: PostDetailsDTO) => {
  const mainGame = await getGameDetailsById(postDetailsDTO.gameId)
  console.log('create post:\n', postDetailsDTO)
  if (mainGame) {
    try {
      const post = await prisma.post.create({
        data: {
          title: postDetailsDTO.data.title,
          authorUserId: postDetailsDTO.userId,
          description: postDetailsDTO.data.description,
          status: 'UNDER_REVIEW',
          variantLink: postDetailsDTO.data.title,
          type: (postDetailsDTO.data.type as GameType) ?? 'NCV',
          PostDetails: { create: {}},
          gamerules: {
            connectOrCreate: mapRules(mainGame.q.ruleVariants).map((rule) => ({
              where: { name: rule.name },
              create: { name: rule.name }
            }))
          }
        },
        select: { id: true }
      })

      return { status: 200, id: post.id }
    } catch (error) {
      console.log('create post error: ', error)
      return { status: 500 }
    }
  }
  return { status: 400 }
}
