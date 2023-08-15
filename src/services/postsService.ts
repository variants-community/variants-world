import type { CGABotGameDetails } from './cgabot'
import type { PostDetailsDTO } from '../pages/api/posts/create'
import { supabase } from '../db/supabase/supabase'
import { mapRuleVariantsToString } from '../hepers'

const createPostDetails = async (id: number, gameId: string) => {
  await supabase
    .from('PostDetails')
    .insert({ postId: id })
    .then((response) =>
      response.status === 201
        ? console.log(
            `[post creation service] [${gameId}] - PostDetails successfully created`
          )
        : console.log(
            `[post creation service] [${gameId}] - Failed to create post details`
          )
    )
}

const createRules = async (id: number, rules: string[]) => {
  rules.map(async (rule) =>
    supabase
      .from('GameRule')
      .upsert({ name: rule }, { onConflict: 'name' })
      .select()
      .then(async (response) => {
        if (response.status === 201 && response.data != null) {
          await supabase
            .from('_GameRuleToPost')
            .insert({ A: response.data[0].id, B: id })
        }
      })
  )
}

export const createPost = async (
  game: CGABotGameDetails,
  post: PostDetailsDTO
) => {
  const status = await supabase
    .from('Post')
    .insert({
      title: post.details.title,
      authorUserId: post.userId,
      description: post.details.description,
      status: 'UNDER_REVIEW',
      variantLink: post.details.title,
      type: 'NCV'
    })
    .select()
    .then(async (response) => {
      if (response.status === 201 && response.data != null) {
        console.log(
          `[post creation service] [${post.gameId}] - Post successfully created\ndetails: ${response.data[0]}`
        )
        const postId = response.data[0].id
        Promise.all([
          await createPostDetails(postId, post.gameId),
          await createRules(
            postId,
            mapRuleVariantsToString(game.q.ruleVariants)
          )
        ])
      } else {
        console.log(
          `[post creation service] [${post.gameId}] - Failed to create post - ${response.status} - ${response.statusText}\ndetails: `, response.error
        )
      }
      return response.status
    })

  return status
}
