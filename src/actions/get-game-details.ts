import { defineAction, z } from 'astro:actions'
import { getCgabotGameDetailsById } from 'cgabot/queries'

export const getGameDetails = defineAction({
  input: z.number(),
  handler: async gameNr => {
    if (!gameNr) return undefined
    return await getCgabotGameDetailsById(`${gameNr}`)
  }
})
