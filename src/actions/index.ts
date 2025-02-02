import { createPost } from 'actions/create-post'
import { getFilteredPosts } from 'actions/get-filtered-posts'
import { getGameDetails } from 'actions/get-game-details'
import { starsWebhook } from 'actions/stars-webhook'
import { validateGames } from 'actions/validate-games'

export const server = {
  starsWebhook,
  getFilteredPosts,
  createPost,
  validateGames,
  getGameDetails
}
