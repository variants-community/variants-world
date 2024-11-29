import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { getCgabotGameDetailsById } from 'cgabot/queries'

export const getGameDetails = defineAction({
  input: z.number(),
  handler: async gameNr => {
    if (!gameNr) return undefined
    return await getCgabotGameDetailsById(`${gameNr}`)
  }
})
