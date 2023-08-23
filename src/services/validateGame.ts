import { getGameDetailsById, type CGABotGameDetails } from '../cgabot'
import type { PostDetailsDTO } from './createPost'
import { isCGABotGameDetails } from '../utils/hepers'

const linesMatch = (value: string, i: number, array: string[]) => {
  return value === array[0]
}

const toComparisonString = (game: CGABotGameDetails): string => {
  return game.q.startFen + JSON.stringify(game.q.ruleVariants)
}

const compareApproveGames = (approveGames: CGABotGameDetails[]) => {
  return approveGames.map(toComparisonString).every(linesMatch)
}

export const validateGame = async (
  postDetails: PostDetailsDTO
): Promise<CGABotGameDetails> => {
  const mainGame = await getGameDetailsById(postDetails.gameId)

  if (mainGame === undefined) {
    throw Error('Main game is undefined')
  }

  const gamesOrUndefined = await Promise.all(
    postDetails.approveIds.map(getGameDetailsById)
  )

  if (
    gamesOrUndefined.length !== 8 ||
    gamesOrUndefined.some((game) => game === undefined)
  ) {
    console.log(
      `[api/posts/create] [${mainGame.gameNr}] - Failed - One or more approve games is undefined`
    )
    throw Error('One or more games is undefined')
  }
  // fix typing
  const approveGames = gamesOrUndefined.filter(isCGABotGameDetails)
  const isApproveGamesOkay = compareApproveGames(approveGames)

  if (isApproveGamesOkay) {
    return mainGame
  } else {
    throw Error('Games not related')
  }
}
