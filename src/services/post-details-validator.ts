import { CGABotGameDetails, getGameDetailsById } from 'cgabot'
import {
  type Output,
  arrayAsync,
  enumType,
  length as exactLength,
  minLength,
  numberAsync,
  object,
  objectAsync,
  string,
  stringAsync
} from 'valibot'
import { isCGABotGameDetails } from 'utils/hepers'
import prisma from 'db/prisma/prisma'

const linesMatch = (value: string, i: number, array: string[]) => {
  return value === array[0]
}

const toComparisonString = (game: CGABotGameDetails): string => {
  return game.q.startFen + JSON.stringify(game.q.ruleVariants)
}

const compareApproveGames = (approveGames: CGABotGameDetails[]) => {
  return approveGames.map(toComparisonString).every(linesMatch)
}

const gameExist = async (gameNr: string) => {
  const game = getGameDetailsById(gameNr)

  if (game === undefined)
    return {
      issue: { input: gameNr, message: 'Game not found', validation: '' }
    }
  else return { output: gameNr }
}

const userExist = async (userId: number) => {
  const count = await prisma.user.count({
    where: {
      id: userId
    }
  })

  if (count === 0)
    return {
      issue: { input: userId, message: 'User not found', validation: '' }
    }
  else return { output: userId }
}

export const PostDetailsValidator = objectAsync(
  {
    userId: numberAsync([userExist]),
    gameId: stringAsync('Main game is not provided', [gameExist]),
    approveIds: arrayAsync(stringAsync([gameExist]), [exactLength(8)]),
    data: object({
      description: string(),
      title: string('Title is not provided', [minLength(3)]),
      type: enumType(['NCV', 'WOF'])
    })
  },
  [
    // all approve games are checked for belonging to the main game
    async postDetails => {
      const mainGame = await getGameDetailsById(postDetails.gameId)

      if (mainGame === undefined) {
        return {
          issue: {
            input: postDetails,
            message: 'Main game not found',
            validation: ''
          }
        }
      }

      const gamesOrUndefined = await Promise.all(postDetails.approveIds.map(getGameDetailsById))

      if (gamesOrUndefined.length !== 8 || gamesOrUndefined.some(game => game === undefined)) {
        return {
          issue: {
            input: postDetails,
            message: 'One or more games is undefined',
            validation: ''
          }
        }
      }

      const approveGames = gamesOrUndefined.filter(isCGABotGameDetails)
      const isApproveGamesOkay = compareApproveGames(approveGames)

      if (isApproveGamesOkay) {
        return {
          output: postDetails
        }
      } else {
        return {
          issue: {
            input: postDetails,
            message: 'Approve gamas//',
            validation: ''
          }
        }
      }
    }
  ]
)

export type PostDetails = Output<typeof PostDetailsValidator>
