import { MAX_SIMILAR_GAME_COUNT, MIN_PLAYERS_COUNT, MIN_SIMILARITY, MIN_TIME_BETWEEN_GAMES } from 'src/config'
import { getGameDetailsById } from 'cgabot'
import { similar } from 'utils/hepers'
import type { CGABotGameDetails } from 'cgabot/types'

export enum CommonViolationType {
  MaxSimilarGames,
  MinimalPlayers,
  MinimalTimeSpan
}

export enum GameViolationType {
  NotFound,
  Similarity,
  Identical,
  AuthorParticipates,
  NoBots,
  NoResignations,
  NoAborts
}

export enum ValidationStatus {
  Unknown,
  Success,
  Warning,
  Failure
}

export interface ValidationRequest {
  mainGameNr: string
  confirmingGameNrs: string[]
}

export interface ValidationResponse {
  mainGameStatus: ValidationStatus
  confirmingGameNrsStatus: ValidationStatus[]
  gameViolations: GameViolations[]
  commonViolations: CommonViolations[]
  details: {
    timestamp: number
    players: number
    similarGames: number
    finalGames: number
  }
}

export type CommonViolations = {
  type: CommonViolationType
  value: string | number
  limitation: string | number
}

export type GameViolations = {
  type: GameViolationType
  gameIndex: number
}

export const validateGames = async (
  validationRequest: ValidationRequest,
  author: {
    id: number
    profileUrl: string
    username: string
  }
): Promise<ValidationResponse | undefined> => {
  // validation result
  let result: ValidationResponse

  // violation for all games
  const commonViolations: CommonViolations[] = []

  const mainGame = await getGameDetailsById(validationRequest.mainGameNr)

  // 404 if main game not found
  if (!mainGame) {
    return undefined
  } else {
    result = {
      mainGameStatus: ValidationStatus.Success,
      confirmingGameNrsStatus: [],
      gameViolations: [],
      commonViolations: [],
      details: {
        finalGames: 0,
        similarGames: 0,
        players: 0,
        timestamp: 0
      }
    }
  }

  // Extend games array with the main game, to validate it as well
  validationRequest.confirmingGameNrs.unshift(validationRequest.mainGameNr)

  // Confirming games first validation
  const gamesOrUndefined = await Promise.all(validationRequest.confirmingGameNrs.map(getGameDetailsById))

  for (const [index, gameNr] of validationRequest.confirmingGameNrs.entries()) {
    if (gamesOrUndefined[index]) {
      result.confirmingGameNrsStatus.push(ValidationStatus.Success)
    } else {
      if (gameNr) {
        result.gameViolations.push({ type: GameViolationType.NotFound, gameIndex: index })
        result.confirmingGameNrsStatus.push(ValidationStatus.Failure)
      } else {
        result.confirmingGameNrsStatus.push(ValidationStatus.Unknown)
      }
    }
  }

  // validation values
  const mainGameFen = generateRowFen(mainGame.q.startFen)
  const playersForAllGames = new Set<number>()
  let lowSimilarGamesCount = 0

  let firstDate = new Date(mainGame.endDate)
  let lastDate = new Date(mainGame.endDate)

  // for counting
  addGamePlayers(playersForAllGames, mainGame)

  for (const [gameIndex, game] of gamesOrUndefined.entries()) {
    if (game) {
      const gameFen = generateRowFen(game.q.startFen)

      // for counting
      addGamePlayers(playersForAllGames, game)

      // update max and min date
      const confirmimgGameDate = new Date(game.date)
      if (firstDate.getTime() - confirmimgGameDate.getTime() > 0) firstDate = confirmimgGameDate
      else if (lastDate.getTime() - confirmimgGameDate.getTime() < 0) lastDate = confirmimgGameDate

      // all games without current
      const allOtherGames = validationRequest.confirmingGameNrs.filter((g, i) => i !== gameIndex)

      // (similar gameNr)
      if (allOtherGames.includes(`${game.gameNr}`)) {
        result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
        result.gameViolations.push({ type: GameViolationType.Identical, gameIndex })
      } else {
        // absolutely simalar
        if (mainGameFen === gameFen) {
          result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Success
        }
        // simalar
        else if (similar(mainGameFen, gameFen, false) >= MIN_SIMILARITY) {
          if (lowSimilarGamesCount > MAX_SIMILAR_GAME_COUNT) {
            result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
          } else {
            result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Warning
          }
          lowSimilarGamesCount++
        }
        // invalid game
        else {
          result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
          result.gameViolations.push({ type: GameViolationType.Similarity, gameIndex })
        }
      }

      if (withBots(game)) {
        result.gameViolations.push({ type: GameViolationType.NoBots, gameIndex })
        result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
      }

      if (isAborted(game)) {
        result.gameViolations.push({ type: GameViolationType.NoAborts, gameIndex })
        result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
      }

      if (haveResignations(game)) {
        result.gameViolations.push({ type: GameViolationType.NoResignations, gameIndex })
        result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
      }

      if (withoutAuthor(game, author.id)) {
        result.gameViolations.push({ type: GameViolationType.AuthorParticipates, gameIndex })
        result.confirmingGameNrsStatus[gameIndex] = ValidationStatus.Failure
      }
    }
  }

  if (lowSimilarGamesCount > MAX_SIMILAR_GAME_COUNT) {
    commonViolations.push({
      type: CommonViolationType.MaxSimilarGames,
      value: lowSimilarGamesCount,
      limitation: MAX_SIMILAR_GAME_COUNT
    })
  }
  result.details.similarGames = lowSimilarGamesCount
  result.details.finalGames = 8 - lowSimilarGamesCount

  // time between first and last games
  const diff = Math.abs(lastDate.getTime() - firstDate.getTime())
  if (diff < MIN_TIME_BETWEEN_GAMES && diff !== 0)
    commonViolations.push({
      type: CommonViolationType.MinimalTimeSpan,
      value: diff,
      limitation: MIN_TIME_BETWEEN_GAMES
    })
  result.details.timestamp = diff

  // players count for all games

  if (playersForAllGames.size < MIN_PLAYERS_COUNT)
    commonViolations.push({
      type: CommonViolationType.MinimalPlayers,
      value: playersForAllGames.size,
      limitation: MIN_PLAYERS_COUNT
    })
  result.details.players = playersForAllGames.size

  return {
    ...result,
    commonViolations
  } as ValidationResponse
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

const addGamePlayers = (set: Set<number>, game: CGABotGameDetails) => {
  game.uid1 && set.add(game.uid1)
  game.uid2 && set.add(game.uid2)
  game.uid3 && set.add(game.uid3)
  game.uid4 && set.add(game.uid4)
}

const withBots = (game: CGABotGameDetails) => {
  return game.isBot1 || game.isBot2 || game.isBot3 || game.isBot4
}

const isAborted = (game: CGABotGameDetails) => {
  return !!game.abortedBy
}

const haveResignations = (game: CGABotGameDetails) => {
  return game.resigned
}

const withoutAuthor = (game: CGABotGameDetails, authorId: number) => {
  return !(game.uid1 === authorId || game.uid2 === authorId || game.uid3 === authorId || game.uid4 === authorId)
}
