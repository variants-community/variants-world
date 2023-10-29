import { type CGABotGameDetails, getGameDetailsById } from 'cgabot'
import { MIN_PLAYERS_COUNT, MIN_TIME_BETWEEN_GAMES, VALID_GAMES_NUMBER } from 'src/config'
import { isCGABotGameDetails } from 'utils/hepers'

enum Violations {
  MinimalGames,
  Similarity,
  Final
}

export const ViolationMessages: Record<Violations, string> = {
  [Violations.MinimalGames]: '',
  [Violations.Similarity]: '',
  [Violations.Final]: ''
}

export const validateGames = async (gameNr: string, approveIds: string[]) => {
  const mainGame = await getGameDetailsById(gameNr)
  const gamesOrUndefined = await Promise.all(approveIds.map(getGameDetailsById))

  if (
    gamesOrUndefined.length !== VALID_GAMES_NUMBER ||
    gamesOrUndefined.some(game => game === undefined) ||
    mainGame === undefined
  )
    throw Error('One or more games is not exist')

  const approveGames = gamesOrUndefined.filter(isCGABotGameDetails)

  const mainGameFen = generateRowFen(mainGame.q.startFen)
  let firstDate = new Date(mainGame.endDate)
  let lastDate = new Date(mainGame.endDate)

  const palyers = new Set<number>()

  for (const approveGame of approveGames) {
    palyers.add(approveGame.uid1)
    palyers.add(approveGame.uid2)
    palyers.add(approveGame.uid3)
    palyers.add(approveGame.uid4)

    if (approveGame.isBot1 || approveGame.isBot2 || approveGame.isBot3 || approveGame.isBot4) {
      throw Error('One or more approve games contains bots')
    }
    const approveGameDate = new Date(approveGame.date)
    if (firstDate.getTime() - approveGameDate.getTime() > 0) firstDate = approveGameDate
    else if (lastDate.getTime() - approveGameDate.getTime() < 0) lastDate = approveGameDate

    if (mainGameFen !== generateRowFen(approveGame.q.startFen)) throw Error('One or more approve games is invalid')
  }

  if (Math.abs(lastDate.getTime() - firstDate.getTime()) < MIN_TIME_BETWEEN_GAMES) {
    throw Error('Not enough time has passed between the first and last game played')
  }

  if (palyers.size < MIN_PLAYERS_COUNT) {
    throw Error('Too few different players have played the game')
  }
}

const generateRowFen = (fen: string) =>
  fen
    .split('-')[0]
    ?.split(/[,/]/)
    .map(x => (isNaN(+x) ? (x.length === 1 ? x + x : x) : new Array(+x).fill('__').join('')))
    .join('') ?? ''

// TODO: actually compare similarity
export const isValidSimilarity = (games: CGABotGameDetails[]) => {
  return games.map(game => generateRowFen(game.q.startFen)).every(isSimilar)
}

const isSimilar = (value: string, i: number, array: string[]) => {
  return value === array[0]
}
