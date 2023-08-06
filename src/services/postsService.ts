import type { GameRule, GameStatus, GameType } from '@prisma/client'
import type { CGABotGameDetails } from './cgabot'
import { mapRuleVariantsToString } from '../hepers'


type Post = {
  id?: number | string
  title: string
  type: GameType | string
  status: GameStatus
  description: string
  authorId: number | string
  gamerules: GameRule[]
}


export const createPost = (
  gameDetails: CGABotGameDetails,
  authorId: number
) => {
  console.log('row rules: ', gameDetails.q.ruleVariants)

  console.log('rules: ', mapRuleVariantsToString(gameDetails.q.ruleVariants))

  const post = {
    title: gameDetails.q.title,
    authorId: authorId,
    description: gameDetails.q.description,
    gamerules: [],
    status: 'PENDING_REPLY',
    type: gameDetails.q.typeName
  } as Post


  console.log('CREATION POST: ', post)
}
