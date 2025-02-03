import { createPost } from 'actions/create-post'
import { getFilteredPosts } from 'actions/get-filtered-posts'
import { getGameDetails } from 'actions/get-game-details'
import { invalidate } from 'actions/invalidate'
import { starsWebhook } from 'actions/stars-webhook'
import { validateGames } from 'actions/validate-games'

export const server = {
  invalidate,
  starsWebhook,
  getFilteredPosts,
  createPost,
  validateGames,
  getGameDetails
}
