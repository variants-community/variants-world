import { CGABotToken, CGABotUrl, cache } from 'cgabot/config'
import type { CGABotGameDetails } from 'cgabot/types'

export const getGameDetailsById = async (requestedGameNr: string): Promise<CGABotGameDetails | undefined> => {
  const fromCache = cache.get(requestedGameNr)

  if (fromCache) {
    console.log('[cgabot] from cache: ', fromCache.gameNr)
    return fromCache
  }

  try {
    const response = await fetch(`${CGABotUrl}/game/${requestedGameNr}?${new URLSearchParams({ token: CGABotToken })}`)

    if (response && response.status === 200) {
      // prettier-ignore
      const {
        gameNr, date, gameType, termination, abortedBy, plies, uid1, uid2, uid3, uid4,
        endDate, isBot1, isBot2, isBot3, isBot4, q
      } = (await response.json()) as CGABotGameDetails
      const { startFen, ruleVariants, timeControl, title } = q

      //prettier-ignore
      const result = {
        gameNr, date, gameType, termination, abortedBy, plies, uid1, uid2, uid3, uid4,
        endDate, isBot1, isBot2, isBot3, isBot4, q: { startFen, ruleVariants, timeControl, title }
      } satisfies CGABotGameDetails

      cache.put(requestedGameNr, result)
      console.log('[cgabot] from cgabot API: ', requestedGameNr)
      return result
    }
  } finally {
    // return nothing (undefined)
  }
}
