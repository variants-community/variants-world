import { MAX_SIMILAR_GAME_COUNT, MIN_PLAYERS_COUNT, MIN_SIMILARITY, MIN_TIME_BETWEEN_GAMES } from 'src/config'
import { getGameDetailsById } from 'cgabot'
import { similar } from 'utils/hepers'
import type { CGABotGameDetails } from 'cgabot/types'

// enum CommonViolationEnum {
//   MinimalGames,
//   MinimalPlayers,
//   MinimalTimeSpan
// }

enum GamesViolationEnum {
  Similarity,
  AuthorParticipates,
  NoBots,
  NoResignations,
  NoAborts
}
const gamesViolationMessages: Record<GamesViolationEnum, (gameNrs: number[]) => string> = {
  [GamesViolationEnum.Similarity]: (gameNrs: number[]) =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} are not similar to the main version`,
  [GamesViolationEnum.AuthorParticipates]: (gameNrs: number[]) =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} ${
      gameNrs.length > 1 ? 'were' : 'is'
    } not held with the participation of the author`,
  [GamesViolationEnum.NoBots]: (gameNrs: number[]) =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} ${gameNrs.length > 1 ? 'were' : 'was'} played with bots`,
  [GamesViolationEnum.NoResignations]: (gameNrs: number[]) =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} have early resignations`,
  [GamesViolationEnum.NoAborts]: (gameNrs: number[]) =>
    `${gameNrs.length > 1 ? 'Games' : 'Game'} ${gameNrs} ${gameNrs.length > 1 ? 'are' : 'is'} aborted`
}

// The testing games are played within a span of only 11 minutes
// There are only 5 unique players
// Games 3, 5 are played without the author
// Games 1, 2, 3 have early resignations
// Game 6 is aborted
// Game 7 is player with a bot player
// Games 2, 4 are not similar to the main version
// At most 4 testing games are allowed to have minor changes

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
  violations: string[]
}

type CommonViolations = {
  message: string
}

type GamesViolations = {
  violation: GamesViolationEnum
  game: number
}

export const validateGames = async (
  confirmationRequest: GamesConfirmationRequest
): Promise<GamesConfirmationResponse | undefined> => {
  // validation result
  let result: GamesConfirmationResponse
  // violation for each game
  const gamesViolations: GamesViolations[] = []
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
      violations: []
    }
  }

  // Confirming games first validation
  const gamesOrUndefined = await Promise.all(confirmationRequest.confirmingGames.map(getGameDetailsById))

  for (let i = 0; i < confirmationRequest.confirmingGames.length; i++) {
    result.confirmingGames.push(gamesOrUndefined[i] ? ValidationStatus.Success : ValidationStatus.Failure)
  }

  // how many games are left to add
  // if (gamesOrUndefined.length !== VALID_GAMES_NUMBER) {
  //   commonViolations.push({ message: `You need to specify ${VALID_GAMES_NUMBER - gamesOrUndefined.length} more games` })
  // }

  // validation values
  const mainGameFen = generateRowFen(mainGame.q.startFen)
  const playersForAllGames = new Set<number>()
  let gameIndex = 0
  let lowSimilarGamesCount = 1

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
          if (lowSimilarGamesCount === MAX_SIMILAR_GAME_COUNT) {
            commonViolations.push({
              message: `At most ${MAX_SIMILAR_GAME_COUNT} testing games are allowed to have minor changes`
            })
            result.confirmingGames[gameIndex] = ValidationStatus.Warning
          } else if (lowSimilarGamesCount > MAX_SIMILAR_GAME_COUNT) {
            result.confirmingGames[gameIndex] = ValidationStatus.Failure
          } else {
            result.confirmingGames[gameIndex] = ValidationStatus.Warning
          }
          lowSimilarGamesCount++
        }
        // invalid game
        else {
          result.confirmingGames[gameIndex] = ValidationStatus.Failure
          gamesViolations.push({ violation: GamesViolationEnum.Similarity, game: gameIndex })
        }
      }

      if (withBots(game)) {
        gamesViolations.push({ violation: GamesViolationEnum.NoBots, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }

      if (isAborted(game)) {
        gamesViolations.push({ violation: GamesViolationEnum.NoAborts, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }

      if (haveResignations(game)) {
        gamesViolations.push({ violation: GamesViolationEnum.NoResignations, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }

      // not work
      if (withoutAuthor(game)) {
        gamesViolations.push({ violation: GamesViolationEnum.AuthorParticipates, game: gameIndex })
        result.confirmingGames[gameIndex] = ValidationStatus.Failure
      }
    }
    gameIndex++
  }

  // time between first and last games
  const diff = Math.abs(lastDate.getTime() - firstDate.getTime())
  if (diff < MIN_TIME_BETWEEN_GAMES && diff !== 0)
    commonViolations.push({
      message: `The testing games are played within a span of only ${convertTime(
        lastDate.getTime() - firstDate.getTime()
      )}`
    })

  // players count for all games
  if (playersForAllGames.size < MIN_PLAYERS_COUNT)
    commonViolations.push({
      message: `There are only ${playersForAllGames.size} unique players (required ${MIN_PLAYERS_COUNT})`
    })

  result.violations = createViolationList(gamesViolations, commonViolations)

  console.log('result.confirmingGames: ', result.confirmingGames)
  console.log('gamesViolations: \n', gamesViolations)
  console.log('commonViolations: \n', commonViolations)
  console.log('result.violations: \n', result.violations)

  return result
}

const createViolationList = (gamesViolations: GamesViolations[], commonViolations: CommonViolations[]) => {
  const violations: string[] = [...commonViolations.map(v => v.message)]

  const violationsMap: Record<GamesViolationEnum, number[]> = {
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
    console.log('violationsMap[enumKey]: ', value)
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

function convertTime(timeInMilli: number): string {
  const timeInSeconds = timeInMilli / 1000
  const hours: number = Math.floor(timeInSeconds / 3600)
  const minutes: number = Math.floor((timeInSeconds % 3600) / 60)

  let result = ''
  if (hours > 0) {
    result += `${hours} hours `
  }
  if (minutes > 0) {
    result += `${minutes} minutes `
  }
  return result.trim()
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
