import { MAX_SIMILAR_GAME_COUNT, MIN_PLAYERS_COUNT, MIN_SIMILARITY, MIN_TIME_BETWEEN_GAMES } from 'src/config'
import { convertToHours, similar } from 'utils/hepers'
import { getGameDetailsById } from 'cgabot'
import type { CGABotGameDetails } from 'cgabot/types'

enum CommonViolationEnum {
  MaxSimilarGames,
  MinimalPlayers,
  MinimalTimeSpan
}

enum GamesViolationEnum {
  NotFound,
  Similarity,
  AuthorParticipates,
  NoBots,
  NoResignations,
  NoAborts
}

const gamesViolationMessages: Record<GamesViolationEnum, (gameNrs: number[]) => string> = {
  [GamesViolationEnum.NotFound]: gameNrs => `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} not found`,
  [GamesViolationEnum.Similarity]: gameNrs =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} are not similar to the main version`,
  [GamesViolationEnum.AuthorParticipates]: gameNrs =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} ${
      gameNrs.length > 1 ? 'were' : 'is'
    } not held with the participation of the author`,
  [GamesViolationEnum.NoBots]: gameNrs =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} ${gameNrs.length > 1 ? 'were' : 'was'} played with bots`,
  [GamesViolationEnum.NoResignations]: gameNrs =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} have early resignations`,
  [GamesViolationEnum.NoAborts]: gameNrs =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} ${gameNrs.length > 1 ? 'are' : 'is'} aborted`
}

const commonViolationMessages: Record<
  CommonViolationEnum,
  (value: string | number, limitation: string | number) => string
> = {
  [CommonViolationEnum.MaxSimilarGames]: (value, limitation) =>
    `At most ${limitation} testing games are allowed to have minor changes. (provided ${value})`,
  [CommonViolationEnum.MinimalPlayers]: (value, limitation) =>
    `There are only ${value} unique players (required ${limitation})`,
  [CommonViolationEnum.MinimalTimeSpan]: value =>
    `The testing games are played within a span of only ${convertToHours(value)}`
}

export enum ValidationStatus {
  Success,
  Warning,
  Failure
}
export interface GamesConfirmationRequest {
  mainGame: string
  confirmingGames: string[]
}

export interface GamesConfirmationResponse {
  mainGame: ValidationStatus
  confirmingGames: ValidationStatus[]
  violations: GamesViolations[]
  commonViolations: CommonViolations[]
  details: {
    timestamp: number
    players: number
    similarGames: number
    finalGames: number
  }
}

export type CommonViolations = {
  violation: CommonViolationEnum
  value: string | number
  limitation: string | number
}

export type GamesViolations = {
  violation: GamesViolationEnum
  game: number
}

export const validateGames = async (
  confirmationRequest: GamesConfirmationRequest
): Promise<GamesConfirmationResponse | undefined> => {
  // validation result
  let result: GamesConfirmationResponse

  // violation for all games
  const commonViolations: CommonViolations[] = []

  const mainGame = await getGameDetailsById(confirmationRequest.mainGame)

  // 404 if main game not found
  if (!mainGame) {
    return undefined
  } else {
    result = {
      mainGame: ValidationStatus.Success,
      confirmingGames: [],
      violations: [],
      commonViolations: [],
      details: {
        finalGames: 0,
        similarGames: 0,
        players: 0,
        timestamp: 0
      }
    }
  }

  // Confirming games first validation
  const gamesOrUndefined = await Promise.all(confirmationRequest.confirmingGames.map(getGameDetailsById))

  for (let i = 0; i < confirmationRequest.confirmingGames.length; i++) {
    if (gamesOrUndefined[i]) {
      result.confirmingGames.push(ValidationStatus.Success)
    } else {
      if (confirmationRequest.confirmingGames[i].length > 0)
        result.violations.push({ violation: GamesViolationEnum.NotFound, game: i })
      result.confirmingGames.push(ValidationStatus.Failure)
    }
  }

  // validation values
  const mainGameFen = generateRowFen(mainGame.q.startFen)
  const playersForAllGames = new Set<number>()
  let gameIndex = 0
  let lowSimilarGamesCount = 0

  let firstDate = new Date(mainGame.endDate)
  let lastDate = new Date(mainGame.endDate)

  // for counting
  addGamePlayers(playersForAllGames, mainGame)

  for (const game of gamesOrUndefined) {
    if (game) {
      const gameFen = generateRowFen(game.q.startFen)

      // for counting
      addGamePlayers(playersForAllGames, game)

      // update max and min date
      const confirmimgGameDate = new Date(game.date)
      if (firstDate.getTime() - confirmimgGameDate.getTime() > 0) firstDate = confirmimgGameDate
      else if (lastDate.getTime() - confirmimgGameDate.getTime() < 0) lastDate = confirmimgGameDate

      // all games without current
      const allOtherGames = [
        ...confirmationRequest.confirmingGames.filter((g, i) => i !== gameIndex),
        confirmationRequest.mainGame
      ]

      // (similar gameNr)
      if (allOtherGames.includes(`${game.gameNr}`)) {
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      } else {
        // absolutely simalar
        if (mainGameFen === gameFen) {
          result.confirmingGames[gameIndex] = ValidationStatus.Success
        }
        // simalar
        else if (similar(mainGameFen, gameFen, false) < MIN_SIMILARITY) {
          if (lowSimilarGamesCount > MAX_SIMILAR_GAME_COUNT) {
            result.confirmingGames[gameIndex] = ValidationStatus.Failure
          } else {
            result.confirmingGames[gameIndex] = ValidationStatus.Warning
          }
          lowSimilarGamesCount++
        }
        // invalid game
        else {
          result.confirmingGames[gameIndex] = ValidationStatus.Failure
          result.violations.push({ violation: GamesViolationEnum.Similarity, game: gameIndex })
        }
      }

      if (withBots(game)) {
        result.violations.push({ violation: GamesViolationEnum.NoBots, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }

      if (isAborted(game)) {
        result.violations.push({ violation: GamesViolationEnum.NoAborts, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }

      if (haveResignations(game)) {
        result.violations.push({ violation: GamesViolationEnum.NoResignations, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }

      // not work
      if (withoutAuthor(game)) {
        result.violations.push({ violation: GamesViolationEnum.AuthorParticipates, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }
    }
    gameIndex++
  }

  if (lowSimilarGamesCount > MAX_SIMILAR_GAME_COUNT) {
    commonViolations.push({
      violation: CommonViolationEnum.MaxSimilarGames,
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
      violation: CommonViolationEnum.MinimalTimeSpan,
      value: diff,
      limitation: MIN_TIME_BETWEEN_GAMES
    })
  result.details.timestamp = diff

  // players count for all games

  if (playersForAllGames.size < MIN_PLAYERS_COUNT)
    commonViolations.push({
      violation: CommonViolationEnum.MinimalPlayers,
      value: playersForAllGames.size,
      limitation: MIN_PLAYERS_COUNT
    })
  result.details.players = playersForAllGames.size

  return {
    ...result,
    commonViolations
  } as GamesConfirmationResponse
}

export const createViolationMessages = (gamesViolations: GamesViolations[], commonViolations: CommonViolations[]) => {
  const violations: string[] = [
    ...commonViolations.map(v => commonViolationMessages[v.violation](v.value, v.limitation))
  ]

  const violationsMap: Record<GamesViolationEnum, number[]> = {
    [GamesViolationEnum.NotFound]: [],
    [GamesViolationEnum.Similarity]: [],
    [GamesViolationEnum.AuthorParticipates]: [],
    [GamesViolationEnum.NoBots]: [],
    [GamesViolationEnum.NoResignations]: [],
    [GamesViolationEnum.NoAborts]: []
  }

  for (const v of gamesViolations) {
    violationsMap[v.violation].push(v.game + 1)
  }

  for (const violationAsKey in violationsMap) {
    const enumKey = parseInt(violationAsKey) as GamesViolationEnum
    const value = violationsMap[enumKey]
    if (value.length > 0) violations.push(gamesViolationMessages[enumKey](value))
  }

  return violations
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

similar

const isSimilar = (value: string, i: number, array: string[]) => {
  return value === array[0]
}

const addGamePlayers = (set: Set<number>, game: CGABotGameDetails) => {
  set.add(game.uid1)
  set.add(game.uid2)
  set.add(game.uid3)
  set.add(game.uid4)
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

const withoutAuthor = (game: CGABotGameDetails) => {
  console.warn(`withoutAuthor: NOT implemented ${game.gameNr}`)
  return false
}
