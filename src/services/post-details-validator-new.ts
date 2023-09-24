import { descriptionValid, gameExist, titleValid, userExist, validApprovedGames } from 'services/validation-utlis'

export interface PostDetails {
  userId: number
  gameId: string
  approveIds: string[]
  data: {
    description: string
    title: string
    type: 'NCV' | 'WOF'
  }
}

export const validatePostDetails = async (post: PostDetails) => {
  try {
    await userExist(post.userId)
    await gameExist(post.gameId)
    descriptionValid(post.data.description)
    await titleValid(post.data.title)
    await validApprovedGames(post.gameId, post.approveIds)
    // await validPlayers(post.gameId, post.approveIds)
  } catch (e) {
    throw e
  }
}
