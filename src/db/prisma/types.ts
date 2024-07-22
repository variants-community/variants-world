import type { GameStatus, GameType, UserRole } from '@prisma/client'
export type * from '@prisma/client'

export interface UserForCard {
  id: number
  username: string
  role: UserRole
  profileUrl: string | null
}

export interface PostForCard {
  id: number
  status: GameStatus
  type: GameType
  variantLink: string
  verdict: string
  likes: { userId: number }[]
  title: string
  authorUserId: number
  gamerules: { id: number; name: string }[]
  author: UserForCard
  commentsCount: number
  createdAt: Date
  updatedAt: Date
  description: string
  fen: string
}
