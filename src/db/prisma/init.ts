import {
  GameClassification,
  GameStatus,
  GameType,
  GameplayClassification,
  RuleType,
  UserRole,
  VoteValue
} from '@prisma/client'
import prisma from './prisma'

export async function main() {
  console.log('start')

  // const rules = [
  //   { name: '4 min', type: RuleType.TIMECONTROL },
  //   { name: '3 min', type: RuleType.TIMECONTROL },
  //   { name: '2 min', type: RuleType.TIMECONTROL },
  //   { name: '1 min', type: RuleType.TIMECONTROL },
  //   { name: '3|2 min', type: RuleType.TIMECONTROL },
  //   { name: '5-check', type: RuleType.GAMEPLAY },
  //   { name: '7-check', type: RuleType.GAMEPLAY },
  //   { name: 'Points', type: RuleType.GAMEPLAY }
  //   // { name: '1 min', type: RuleType.TIMECONTROL },
  //   // { name: '3|2 min', type: RuleType.TIMECONTROL }
  // ]

  // rules.forEach(
  //   async (rule) =>
  //     await prisma.gameRule.upsert({
  //       where: { name: rule.name },
  //       update: { ...rule },
  //       create: { ...rule }
  //     })
  // )

  // const users = [
  //   { id: 1, name: 'glebchanskiy', role: UserRole.MEMBER },
  //   { id: 2, name: 'ardonplay', role: UserRole.MEMBER },
  //   { id: 3, name: 'badmoon', role: UserRole.MEMBER },
  //   { id: 4, name: 'chubrik', role: UserRole.MEMBER },
  //   { id: 5, name: 'admin12', role: UserRole.MEMBER }
  // ]

  // users.forEach(
  //   async (user) =>
  //     await prisma.user.upsert({
  //       where: { id: user.id },
  //       update: { ...user },
  //       create: { ...user }
  //     })
  // )

  // const posts = [
  //   {
  //     id: 2,
  //     title: 'Zombie Land',
  //     description: 'This position is a revision of an old one, as I already submitted “Quasars” a while ago and it was declined. There is a new concept: the Red pieces in the center blow up material with an atomic capture at random, though it can mate others a lot. To mate Red himself, you have to give one check to his royal, which can swap sides, by invoking one of the other regular pawns to blow up themselves by capturing one of your pieces and clear the road. Archbishops are most useful for checkmating Red because they can cover both the squares Red’s royal can move to from both sides. Yellow has a larger army to stop Blue and Green from teaming in most cases and try to prevent them from checkmating Red. Checkmating Red is a big thing because Play-4-Mate makes checkmates stand over other moves, it is harder to catch up on points when a 48-point mate is already taken, and ...',
  //     type: GameType.NCV,
  //     status: GameStatus.ACCEPTED,
  //     verdict: 'pretty good',
  //     // authorUserId: 1,
  //     // createdAt: new Date(),
  //     // updatedAt: new Date(),
  //     // postDetailsId: 2
  //   },
  //   {
  //     id: 1,
  //     title: 'Depressing Chess',
  //     description: 'Old one, as I already submitted “Quasars” a while ago and it was declined. There is a new concept: the Red pieces in the center blow up material with an atomic capture at random, though it can mate others a lot. To mate Red himself, you have to give one check to his royal, which can swap sides, by invoking one of the other regular pawns to blow up themselves by capturing one of your pieces and clear the road. Archbishops are most useful for checkmating Red because they can cover both the squares Red’s royal can move to from both sides. Yellow has a larger army to stop Blue and Green from teaming in most cases and try to prevent them from checkmating Red. Checkmating Red is a big thing because Play-4-Mate makes checkmates stand over other moves, it is harder to catch up on points when a 48-point mate is already taken, and ...',
  //     type:  GameType.WOF,
  //     status: GameStatus.DECLINED,
  //     verdict: 'so depressing...',

  //     // authorUserId: 2,
  //     // createdAt: new Date(),
  //     // updatedAt: new Date(),
  //     // postDetailsId: 1
  //   }
  // ]

  // const details = [
  //   {
  //     id: 1,
  //     postId: 1,
  //     notes: '',
  //     gameClassification: GameClassification.FORTUNE,
  //     gameplayClassification: GameplayClassification.FIRST_POSITIVE
  //   },
  //   {
  //     id: 2,
  //     postId: 2,
  //     notes: '',
  //     gameClassification: GameClassification.DYNAMIC,
  //     gameplayClassification: GameplayClassification.SECOND_NEGATIVE
  //   }
  // ]

    // posts.forEach(
  //   async (post) =>
  //     await prisma.post.upsert({
  //       where: { id: post.id },
  //       update: { ...post },
  //       create: { ...post, authorUserId: 1 }
  //     })
  // )

  // details.forEach(
  //   async (detail) =>
  //     await prisma.postDetails.upsert({
  //       where: { id: detail.id },
  //       update: { ...detail },
  //       create: { ...detail }
  //     })
  // )





  // const voces = [
  //   {
  //     id: 1,
  //     postId: 1,
  //     testerId: 1,
  //     value: VoteValue.POSITIVE
  //   },
  //   {
  //     id: 2,
  //     postId: 1,
  //     testerId: 2,
  //     value: VoteValue.NEGATIVE
  //   },
  //   {
  //     id: 3,
  //     postId: 1,
  //     testerId: 3,
  //     value: VoteValue.NEUTRAL
  //   }
  // ]

  // voces.forEach(
  //   async (voce) =>
  //     await prisma.voice.upsert({
  //       where: { id: voce.id },
  //       update: { ...voce },
  //       create: { ...voce }
  //     })
  // )

  // const ruleTypes = [
  //   {
  //     id: 1,
  //     name: 'Passing'
  //   },
  //   {
  //     id: 2,
  //     name: 'Anonymous'
  //   },
  //   {
  //     id: 3,
  //     name: 'Atomic'
  //   },
  //   {
  //     id: 4,
  //     name: 'Bare Piece'
  //   },

  // ]

  // const gameRules = [
  //   { 
  //     id: 1,
  //     postId: 1, 
  //     ruleTypeId: 1,
  //   },
  //   {
  //     id: 2,
  //     postId: 1, 
  //     ruleTypeId: 2,
  //   },
  //   {
  //     id: 3,
  //     postId: 1, 
  //     ruleTypeId: 3,
  //   },
  //   {
  //     id: 4,
  //     postId: 1, 
  //     ruleTypeId: 4,
  //   },
  //   {
  //     id: 5,
  //     postId: 2, 
  //     ruleTypeId: 2,
  //   },
  //   {
  //     id: 6,
  //     postId: 2, 
  //     ruleTypeId: 4,
  //   },

  // ]

  // ruleTypes.map(async type => {
  //   await prisma.ruleType.upsert({
  //     where: { id: type.id},
  //     update: {...type},
  //     create: {...type}
  //   })
  // })


  // gameRules.map(async rule => {
  //   await prisma.gameRule.upsert({
  //     where: { id: rule.id},
  //     update: {...rule},
  //     create: {...rule}
  //   })
  // })
  

  console.log('finish')
}

// Passing | allowPassing | true
// Anonymous | anonymous | true
// Any Capture | anyCapture | true
// Atomic | atomic | true
// Bare Piece | barePieceLoses | true
// Blindfold | blindfold | true
// Regicide | captureTheKing | true
// Crazyhouse | crazyhouse | true
// Crazywan | crazywan | true

// main()
// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })
