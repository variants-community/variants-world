export interface OldGameData {
  author: string
  contentHash: number
  dateCreated: number
  dateUpdated: number
  link: string
  locked: boolean
  message: string
  notes: string
  requirements: Requirements
  responseId: string
  screenshot: string
  status: number
  title: string
  type: number
}

export interface Requirements {
  details: Details
  games: Game[]
  position: Position
  result: Result
}

export interface Details {
  final: number
  games: number
  players: number
  timespan: number
  valid: number
}

export interface Game {
  final: boolean
  gameNr: number
  violations: number[]
}

export interface Position {
  fen: string
  gamerules: string
  other: string
  promotion: string
  timeControl: string
}

export interface Result {
  final: boolean
  games: boolean
  players: boolean
  timespan: boolean
  valid: boolean
}

export type Pair = { mainGame: Game; data: OldGameData }
