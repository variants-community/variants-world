import { LruCache } from '../db/cache'

const CGABotUrl = import.meta.env.CGABOT_URL
const CGABotToken = import.meta.env.CGABOT_API_TOKEN

const cache = new LruCache<CGABotGameDetails>()

const gameDetails: CGABotGameDetails = {
  _id: 'example_id',
  gameNr: 1,
  date: new Date(),
  gameType: 'chess',
  rated: true,
  gameOver: false,
  timeControlInitial: 600,
  timeControlIncrement: 10,
  timeControlIsDelay: false,
  result: 'ongoing',
  termination: '',
  abortedBy: 0,
  standings: [1, 2, 3, 4],
  duration: 0,
  plies: 0,
  uid1: 123,
  uid2: 456,
  uid3: 789,
  uid4: 1011,
  username1: 'player1',
  username2: 'player2',
  username3: 'player3',
  username4: 'player4',
  rating1: 1500,
  rating2: 1600,
  rating3: 1400,
  rating4: 1550,
  ratingDiff1: 0,
  ratingDiff2: 100,
  ratingDiff3: -100,
  ratingDiff4: 50,
  points1: 0,
  points2: 0,
  points3: 0,
  points4: 0,
  ip1: '127.0.0.1',
  ip2: '192.168.0.1',
  ip3: '10.0.0.1',
  ip4: '172.16.0.1',
  pgn4: '',
  endFen: '',
  q: {
    qId: 1,
    title: 'Example Question',
    gameType: 'chess',
    ratingMode: 'rapid',
    timeControlInitial: 600,
    increment: 10,
    ruleVariants: {
      allowPassing: true,
      promoteTo: 'DBCF',
      nCheck: 4,
    },
    startFen: '',
    maxRating: 2000,
    whiteBlack: true,
    eightByEight: true,
    dim: '',
    numRequired: 2,
    existingSeats: [1, 2],
    twoPlayer: true,
    twoPlayerWhiteVsBlack: false,
    type: '',
    avgDur: 0,
    timeControl: '',
    timeControlType: '',
    textForSearch: '',
    ratingComposites: [],
    subtitle: '',
    teaserText: '',
    description: '',
    description2: '',
    icon: '',
    variantUrl: '',
    wasListedGame: 0,
    ratingType: '',
    addedComps: [],
    affectComps: 0,
    checkBlocking: false,
    categoryNames: [],
    hideRuleIcons: false,
    isPublic: true,
    numJoined: 2,
    typeName: '',
  },
  tNr: null,
  __v: 0,
  endDate: new Date(),
  gameOverData: null,
  avatarUrl1: '',
  isBot1: '',
  chatIcon1: null,
  avatarUrl2: '',
  isBot2: '',
  chatIcon2: null,
  avatarUrl3: '',
  isBot3: '',
  chatIcon3: null,
  avatarUrl4: '',
  isBot4: '',
  chatIcon4: null,
}


cache.put('1', gameDetails)

export const getGameDetailsById = async (gameId: string) => {
  const fromCache = cache.get(gameId)

  if (fromCache) {
    console.log('[cgabot] from cache: ', fromCache._id)
    return fromCache
  }

  const response = await fetch(
    `${CGABotUrl}/game/${gameId}?` + new URLSearchParams({ token: CGABotToken })
  )

  if (response.status === 200) {
    const game = (await response.json()) as CGABotGameDetails
    cache.put(gameId, game)
    console.log('[cgabot] from cgabot API: ', game._id)
    return game
  }

  return undefined
}

export interface CGABotGameDetails {
  _id: string
  gameNr: number
  date: Date
  gameType: string
  rated: boolean
  gameOver: boolean
  timeControlInitial: number
  timeControlIncrement: number
  timeControlIsDelay: boolean
  result: string
  termination: string
  abortedBy: number
  standings: number[]
  duration: number
  plies: number
  uid1: number
  uid2: number
  uid3: number
  uid4: number
  username1: string
  username2: string
  username3: string
  username4: string
  rating1: number
  rating2: number
  rating3: number
  rating4: number
  ratingDiff1: number
  ratingDiff2: number
  ratingDiff3: number
  ratingDiff4: number
  points1: number
  points2: number
  points3: number
  points4: number
  ip1: string
  ip2: string
  ip3: string
  ip4: string
  pgn4: string
  endFen: string
  q: CGABotQ
  tNr: null
  __v: number
  endDate: Date
  gameOverData: null
  avatarUrl1: string
  isBot1: string
  chatIcon1: null
  avatarUrl2: string
  isBot2: string
  chatIcon2: null
  avatarUrl3: string
  isBot3: string
  chatIcon3: null
  avatarUrl4: string
  isBot4: string
  chatIcon4: null
}

export interface CGABotQ {
  qId: number
  title: string
  gameType: string
  ratingMode: string
  timeControlInitial: number
  increment: number
  // ruleVariants: CGABotRuleVariants
  ruleVariants: CGABotRuleVariants
  startFen: string
  maxRating: number
  whiteBlack: boolean
  eightByEight: boolean
  dim: string
  numRequired: number
  existingSeats: number[]
  twoPlayer: boolean
  twoPlayerWhiteVsBlack: boolean
  type: string
  avgDur: number
  timeControl: string
  timeControlType: string
  textForSearch: string
  ratingComposites: string[]
  subtitle: string
  teaserText: string
  description: string
  description2: string
  icon: string
  variantUrl: string
  wasListedGame: number
  ratingType: string
  addedComps: string[]
  affectComps: number
  checkBlocking: boolean
  categoryNames: string[]
  hideRuleIcons: boolean
  isPublic: boolean
  numJoined: number
  typeName: string
}

export interface CGABotRuleVariants {
  [key: string]: string | boolean | number
}
