import { LruCache } from './cache'
import type { CGABotGameDetails } from './interface'

const CGABotUrl = import.meta.env.CGABOT_URL
const CGABotToken = import.meta.env.CGABOT_API_TOKEN

const cache = new LruCache<CGABotGameDetails>()

export { CGABotUrl, CGABotToken, cache }

