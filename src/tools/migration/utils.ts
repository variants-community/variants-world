import { GameClassification, GameStatus, GameType, GameplayClassification } from '@prisma/client'

export function getFirstGroup(regexp: RegExp, str: string) {
  try {
    return Array.from(str.matchAll(regexp), m => m[1])[0] ?? undefined
  } catch (err) {
    console.log('getFirstGroup Error')
    return undefined
  }
}

export enum CGAPostStatus {
  Accepted,
  Declined,
  Pending,
  RNM,
  UR,
  Unknown
}

export const CGAPostStatusMap: Record<CGAPostStatus, GameStatus> = {
  [CGAPostStatus.Accepted]: GameStatus.ACCEPTED,
  [CGAPostStatus.Declined]: GameStatus.DECLINED,
  [CGAPostStatus.Pending]: GameStatus.PENDING_REPLY,
  [CGAPostStatus.RNM]: GameStatus.DECLINED,
  [CGAPostStatus.UR]: GameStatus.UNDER_REVIEW,
  [CGAPostStatus.Unknown]: GameStatus.PENDING_REPLY
}

export const GameClassificationMap: Record<string, GameClassification> = {
  materialistic: GameClassification.MATERIALISTIC,
  tactical: GameClassification.TACTICAL,
  dynamic: GameClassification.DYNAMIC,
  positional: GameClassification.POSITIONAL,
  strategic: GameClassification.STRATEGIC,
  fortune: GameClassification.FORTUNE
}

export const GameplayClassificationMap: Record<string, GameplayClassification> = {
  'first negative': GameplayClassification.FIRST_NEGATIVE,
  'first positive': GameplayClassification.FIRST_POSITIVE,
  'second positive': GameplayClassification.SECOND_POSITIVE,
  'second negative': GameplayClassification.SECOND_NEGATIVE
}

export const toGameClassification = (row: string) => {
  return GameClassificationMap[row.toLowerCase()] ?? undefined
}

export const toGameplayClassification = (row: string) => {
  return GameplayClassificationMap[row.toLowerCase()] ?? undefined
}

export const getGameType = (value: number) => {
  return value === 1 ? GameType.WOF : GameType.NCV
}
