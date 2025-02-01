import { createPost } from 'actions/create-post'
import { getFilteredPosts } from 'actions/get-filtered-posts'
import { getGameDetails } from 'actions/get-game-details'
import { getPosts } from 'actions/get-posts'
import { starsWebhook } from 'actions/stars-webhook'
import { validateGames } from 'actions/validate-games'

export const server = {
  starsWebhook,
  getPosts,
  getFilteredPosts,
  createPost,
  validateGames,
  getGameDetails
}
