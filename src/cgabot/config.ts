import { LruCache } from 'cgabot/cache'
import type { CGABotGameDetails } from 'cgabot/types'

const CGABotUrl = import.meta.env.CGABOT_URL
const CGABotToken = import.meta.env.CGABOT_API_TOKEN

const cache = new LruCache<CGABotGameDetails>()

export { CGABotUrl, CGABotToken, cache }
