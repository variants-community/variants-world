// Reusable validation methods for both client and server
import { MIN_DESCRIPTION_LENGTH, MIN_TITLE_LENGTH } from 'src/config'
import { getGameDetailsById } from 'cgabot'

export const descriptionValid = (description: string) => {
  if (description.trim().length < MIN_DESCRIPTION_LENGTH) throw new Error('Invalid description')
}

export const titleValid = (title: string) => {
  if (title.trim().length < MIN_TITLE_LENGTH) throw new Error('Invalid title')
}

export const doesGameExist = async (gameNr: string) => {
  const game = await getGameDetailsById(gameNr)
  if (!game) throw new Error('Game does not exist')
  return game
}
