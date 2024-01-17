import { type CreatePostDetails, doesPostWithTitleExist } from 'db/prisma/queries'
import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import { prisma } from 'db/prisma/prisma'
import type { CGABotGameDetails } from 'cgabot'
import type { GameClassification, GameType, GameplayClassification } from 'prisma/generated'
import type { GameStatus } from '@prisma/client'

export const createShadowUser = async (username: string): Promise<number> => {
  return (await prisma.user.create({ data: { username, uuid: crypto.randomUUID() }, select: { id: true } })).id
}

type Details = {
  notes?: string
  type?: GameType
  verdict?: string
  gameStatus?: GameStatus
  gameClassification?: GameClassification
  gameplayClassification?: GameplayClassification
}

export const createPostMig = async (
  mainGame: CGABotGameDetails,
  postDetailsDTO: CreatePostDetails,
  details: Details
) => {
  const rules = mapRuleVariantsToString(mainGame.q.ruleVariants).map(rule => ({ name: rule }))
  const notExist = await doesPostWithTitleExist(postDetailsDTO.data.title)

  if (notExist) {
    console.log('Post name: ', postDetailsDTO.data.title)
    const post = await prisma.post.create({
      data: {
        // TODO: add confirmingGameNrs to db
        gameNr: mainGame.gameNr,
        fen: mainGame.q.startFen,
        title: postDetailsDTO.data.title,
        verdict: details.verdict,
        authorUserId: postDetailsDTO.userId,
        description: postDetailsDTO.data.description,
        status: details.gameStatus ?? 'PENDING_REPLY',
        variantLink: postDetailsDTO.data.title,
        type: details.type ?? (postDetailsDTO.data.type as GameType) ?? 'NCV',
        PostDetails: {
          create: {
            notes: details.notes,
            gameClassification: details.gameClassification,
            gameplayClassification: details.gameplayClassification
          }
        },
        gamerules: {
          connectOrCreate: [...rules, { name: mainGame.q.timeControl }].map(rule => ({
            where: { name: rule.name },
            create: { name: rule.name }
          }))
        }
      },
      select: { id: true }
    })

    console.log('CREATED')
    return post.id
  } else {
    console.log('WRONG')
    return undefined
  }
}
