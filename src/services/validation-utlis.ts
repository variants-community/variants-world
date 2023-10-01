import { getGameDetailsById } from 'cgabot'
import { isCGABotGameDetails } from 'utils/hepers'
import prisma from 'db/prisma/prisma'
import type { CGABotGameDetails } from 'cgabot'

// validation constants
const MIN_DESCRIPTION_LENGTH = 10
const MIN_TITLE_LENGTH = 4
const VALID_GAMES_NUMBER = 8
const MIN_TIME_BETWEEN_GAMES = 24 * 60 * 60 * 1000
const MIN_PLAYERS_COUNT = 9

export const userExist = async (userId: number) => {
  const count = await prisma.user.count({
    where: {
      id: userId
    }
  })

  if (count === 0) {
    throw new Error('User not found')
  }
}

export const gameExist = async (gameNr: string) => {
  const game = await getGameDetailsById(gameNr)
  if (game === undefined) throw new Error(`Game not found [${gameNr}]`)
}

export const validApprovedGames = async (gameNr: string, approveIds: string[]) => {
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
    console.log('time pass:', lastDate.getTime() - firstDate.getTime())
    throw Error('Not enough time has passed between the first and last game played')
  }

  if (palyers.size < MIN_PLAYERS_COUNT) {
    console.log('palyers.size:', palyers.size)
    throw Error('Too few different players have played the game')
  }
}

export const descriptionValid = (description: string) => {
  if (description.trim().length < MIN_DESCRIPTION_LENGTH) throw new Error('Provide a brief description.')
}

export const titleValid = async (title: string) => {
  if (title.trim().length < MIN_TITLE_LENGTH)
    throw new Error('Provide title whose length will be more than 3 characters')

  const count = await prisma.post.count({
    where: { title }
  })

  if (count !== 0) throw new Error('This title already exists')
}

export const isValidSimilarity = (games: CGABotGameDetails[]) => {
  return games.map(game => generateRowFen(game.q.startFen)).every(isSimilar)
}

const isSimilar = (value: string, i: number, array: string[]) => {
  return value === array[0]
}

const generateRowFen = (fen: string) =>
  fen
    .split('-')[0]
    ?.split(/[,/]/)
    .map(x => (isNaN(+x) ? (x.length === 1 ? x + x : x) : new Array(+x).fill('__').join('')))
    .join('') ?? ''
