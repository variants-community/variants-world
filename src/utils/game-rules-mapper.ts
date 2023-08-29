import type { CGABotRuleVariants } from 'cgabot'

type ValueType = void | boolean | string | number | number[]
type RuleMaker = (value: ValueType) => string

const map: Record<string, RuleMaker> = {
  allowPassing: () => 'Passing',
  anonymous: () => 'Anonymous',
  anyCapture: () => 'Any Capture',
  atomic: () => 'Atomic',
  barePieceLoses: () => 'Bare Piece',
  blindfold: () => 'Blindfold',
  captureTheKing: () => 'Regicide',
  crazyhouse: () => 'Crazyhouse',
  crazywan: () => 'Crazywan',
  deadwall: () => 'DeadWall',
  diplomacy: () => 'Diplomacy',
  duckChess: () => 'Duck',
  fatalCapture: () => 'Fatal',
  fogOfWar: () => 'Foq',
  gameOfPoints: () => 'Points',
  ghostBoard: () => 'Ghost',
  giveaway: () => 'Giveaway',
  koth: value => (value === true ? 'KotH' : `KotH(${value})`),
  nCheck: value => `${value}-check`,
  noDkw: () => 'No Zombies',
  noEnPassant: () => 'No EnP',
  oppositeSideCastling: () => 'No Opp Castling',
  oppX: value => `Ox${value}`,
  play4mate: () => 'Play for Mate',
  pointsForMate: value => `+${value}`,
  promoteTo: value => `=${value}`,
  promotionRank: value => `${value}th`,
  seirawanSetup: () => 'Seirawan',
  selfCheck: () => 'Self Check',
  selfPartner: () => 'Self Partner',
  semiAnonymous: () => 'Semianon',
  setup: value => `Setup ${value}`,
  sideways: () => 'Sideways',
  stalemate: value => (typeof value === 'string' ? `Stalemate ${value}` : 'Stalemate'),
  taboo: () => 'Taboo',
  takeover: () => 'Takeover',
  teammate: value => (value === 1 ? 'Alt Teams' : value === 2 ? 'RB' : 'RG'),
  torpedo: () => 'Torpedo'
}

const makeRule = (type: string, value: ValueType) => {
  const ruleMaker = map[type]
  if (ruleMaker) {
    return ruleMaker(value)
  }
  return undefined
}

export const mapRuleVariantsToString = (rules: CGABotRuleVariants) => {
  const result = []
  for (const key of Object.keys(rules)) {
    const rule = makeRule(key, rules[key])
    if (rule) result.push(rule)
  }
  return result
}
