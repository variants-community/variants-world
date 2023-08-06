type ValueType = void | boolean | string | number | number[]
type RuleMaker = (value: ValueType) => string

const map: Map<string, RuleMaker> = new Map([
  ['allowPassing', () => 'Passing'],
  ['anonymous', () => 'Anonymous'],
  ['anyCapture', () => 'Any Capture'],
  ['atomic', () => 'Atomic'],
  ['barePieceLoses', () => 'Bare Piece'],
  ['blindfold', () => 'Blindfold'],
  ['captureTheKing', () => 'Regicide'],
  ['crazyhouse', () => 'Crazyhouse'],
  ['crazywan', () => 'Crazywan'],
  ['deadwall', () => 'DeadWall'],
  ['diplomacy', () => 'Diplomacy'],
  ['duckChess', () => 'Duck'],
  ['fatalCapture', () => 'Fatal'],
  ['fogOfWar', () => 'Foq'],
  ['gameOfPoints', () => 'Points'],
  ['ghostBoard', () => 'Ghost'],
  ['giveaway', () => 'Giveaway'],
  ['koth', (value: ValueType) => `KotH(${value})`],
  ['nCheck', (value: ValueType) => `${value}-check`],
  ['noDkw', () => 'No Zombies'],
  ['noEnPassant', () => 'No EnP'],
  ['oppositeSideCastling', () => 'No Opp Castling'],
  ['oppX', (value: ValueType) => `Ox${value}`],
  ['play4mate', () => 'Play for Mate'],
  ['pointsForMate', (value: ValueType) => `+${value}`],
  ['promoteTo', (value: ValueType) => `=${value}`],
  ['promotionRank', (value: ValueType) => `${value}th`],
  ['seirawanSetup', () => 'Seirawan'],
  ['selfCheck', () => 'Self Check'],
  ['selfPartner', () => 'Self Partner'],
  ['semiAnonymous', () => 'Semianon'],
  ['setup', () => 'Setup'],
  ['sideways', () => 'Sideways'],
  ['stalemate', (value: ValueType) => `Stalemate ${value}`],
  ['taboo', () => 'Taboo'],
  ['takeover', () => 'Takeover'],
  ['teammate', (value: ValueType) => `Alt Teams ${value === 1 ? 'RB' : 'RG'}`],
  ['torpedo', () => 'Torpedo'],
])

class RuleMapper {
  private map: Map<string, RuleMaker>

  constructor(matches: Map<string, RuleMaker>) {
    this.map = matches
  }

  public makeRule(type: string, value: ValueType): string {
    const ruleMaker = this.map.get(type)
    if (ruleMaker)
      return ruleMaker(value)
    else 
      return 'undefined'
  }
}

export const ruleMapper = new RuleMapper(map)
