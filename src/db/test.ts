import { GameClassification, GameStatus, GameType, GameplayClassification, RuleType } from '@prisma/client'
import prisma from './prisma'

async function main() {
  console.log('start')

  const rules = [
    { name: '4 min', type: RuleType.TIMECONTROL },
    { name: '3 min', type: RuleType.TIMECONTROL },
    { name: '2 min', type: RuleType.TIMECONTROL },
    { name: '1 min', type: RuleType.TIMECONTROL },
    { name: '3|2 min', type: RuleType.TIMECONTROL }
  ]

  rules.forEach(
    async (rule) =>
      await prisma.gameRule.upsert({
        where: { name: rule.name },
        update: { ...rule },
        create: { ...rule }
      })
  )

  const users = [
    { id: 1, name: 'glebchanskiy', isTester: false },
    { id: 2, name: 'ardonplay', isTester: false },
    { id: 3, name: 'badmoon', isTester: false },
    { id: 4, name: 'chubrik', isTester: false },
    { id: 5, name: 'admin12', isTester: true }
  ]

  users.forEach(
    async (user) =>
      await prisma.user.upsert({
        where: { id: user.id },
        update: { ...user },
        create: { ...user }
      })
  )

  const posts = [
    {
      id: 2,
      title: 'Zombie Land',
      type: GameType.NCV,
      status: GameStatus.PENDING_REPLY,
      verdict: 'pretty good',
      notes: '',
      gameClassification: GameClassification.FORTUNE,
      gameplayClassification: GameplayClassification.FIRST_POSITIVE,
      authorUserId: 1
    },
    {
      id: 1,
      title: 'Depressing Chess',
      type:  GameType.WOF,
      status: GameStatus.DECLINED,
      verdict: 'so depressing...',
      notes: '',
      gameClassification: GameClassification.DYNAMIC,
      gameplayClassification: GameplayClassification.FIRST_NEGATIVE,
      authorUserId: 2
    }
  ]

  posts.forEach(
    async (post) =>
      await prisma.post.upsert({
        where: { id: post.id },
        update: { ...post },
        create: { ...post }
      })
  )

  console.log('finish')
}

export const fillBD = () => {
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}
