import * as fs from 'fs'
import type { OldGameData, Pair } from 'src/tools/migration/interfaces'

const path = '/Users/glebchanskiy/workflow/chess/v-migration/ts-migript/src/cgabot-default-rtdb-posts-export.json'

const obj = JSON.parse(fs.readFileSync(path, 'utf8'))
const games: OldGameData[] = Object.keys(obj).map(key => obj[key])

const gamesNrs = games
  .map(g =>
    g.requirements?.games
      ? ({ mainGame: g.requirements.games[g.requirements.games.length - 1], data: g } as Pair)
      : undefined
  )
  .filter(p => !!p) as Pair[]

export default gamesNrs
