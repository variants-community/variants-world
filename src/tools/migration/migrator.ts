import {
  CGAPostStatus,
  CGAPostStatusMap,
  getFirstGroup,
  getGameType,
  toGameClassification,
  toGameplayClassification
} from 'src/tools/migration/utils'
import { type CreatePostDetails } from 'db/prisma/queries'
import { createPostMig, createShadowUser } from 'src/tools/migration/prisma-queries'
import { getGameDetailsById } from 'cgabot'
import games from 'src/tools/migration/games'
import type { GameClassification, GameplayClassification } from '@prisma/client'
import type { Pair } from 'src/tools/migration/interfaces'

const ShadowUserMap = new Map<string, number>()

const postIt = async (p: Pair) => {
  try {
    console.log('post: ', p.data.title)
    if (p.data.type === 2) throw Error('discussion thread')

    const game = await getGameDetailsById(`${p.mainGame.gameNr}`)

    if (game) {
      // Void user
      const userId = ShadowUserMap.get(p.data.author) as number

      // Game Type
      const type = getGameType(p.data.type)

      // Base Details
      const post: CreatePostDetails = {
        data: {
          description: '',
          title: p.data.title,
          type
        },
        confirmingGameNrs: [],
        gameNr: String(game.gameNr),
        userId
      }

      // notes
      const notes = p.data.notes

      // Game Status
      const gameStatus = CGAPostStatusMap[p.data.status as CGAPostStatus]

      // Verdict
      const verdict = p.data.message

      // Game/Gameplay Classification
      const gameRegex = /Game Classification: (\w+)/g
      const gameplayRegex = /Gameplay Classification: (\w+\s\w+|\w+)/g

      let gameClassification: GameClassification | undefined
      let gameplayClassification: GameplayClassification | undefined

      const gameMatche = getFirstGroup(gameRegex, p.data.notes)
      const gameplayMatche = getFirstGroup(gameplayRegex, p.data.notes)

      if (gameMatche) gameClassification = toGameClassification(gameMatche)
      if (gameplayMatche) gameplayClassification = toGameplayClassification(gameplayMatche)

      // Creating Post
      try {
        await createPostMig(game, post, {
          notes,
          gameClassification,
          gameplayClassification,
          verdict,
          gameStatus
        })
      } catch (err) {
        console.log(p)
        console.log('Error via creation post: ', err)
      }
    }
  } catch (err) {
    console.log(p)
    console.log('Error: ', err)
  }
}

export const runMigration = async () => {
  for (const g of games) {
    const author = g.data.author
    const userId = ShadowUserMap.get(author)

    if (!userId) {
      console.log(`create user: [${author}]`)
      const newUserId = await createShadowUser(author)
      ShadowUserMap.set(author, newUserId)
    }

    console.log(`founded user: [${author}]`)
  }

  for (const g of games) {
    await postIt(g)
  }
}
