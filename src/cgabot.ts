const CGABotUrl = import.meta.env.CGABOT_URL
const CGABotToken = import.meta.env.CGABOT_API_TOKEN

export const getGameDetailsById = async (gameId: string) => {
  if (gameId.length < 7 || gameId.length > 10) return undefined

  const response = await fetch(
    `${CGABotUrl}/game/${gameId}?` + new URLSearchParams({ token: CGABotToken })
  )

  if (response.status === 200)
    return (await response.json()) as CGABotGameDetails
  else return undefined
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
  [key: string]: boolean
}
