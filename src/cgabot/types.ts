export interface CGABotGameDetails {
  gameNr: number
  date: Date
  gameType: string
  termination: string
  abortedBy: number
  plies: number
  uid1: number
  uid2: number
  uid3: number
  uid4: number
  q: CGABotQ
  endDate: Date
  isBot1: string
  isBot2: string
  isBot3: string
  isBot4: string
  resigned: boolean
}

export interface FullCGABotGameDetails extends CGABotGameDetails {
  pgn4: string
}

export interface CGABotQ {
  title: string
  ruleVariants: CGABotRuleVariants
  startFen: string
  timeControl: string
}

export interface CGABotRuleVariants {
  [key: string]: string | boolean | number
}
