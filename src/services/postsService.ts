import type { CGABotGameDetails } from './cgabot'
// import { mapRuleVariantsToString } from '../hepers'
import type { PostDetailsDTO } from '../pages/api/posts/create'
import { supabase } from '../db/supabase/supabase'
import { mapRuleVariantsToString } from '../hepers'

const createPostDetails = async (id: number) => {
  await supabase.from('PostDetails').insert({ postId: id })
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

export const createPost = (game: CGABotGameDetails, post: PostDetailsDTO) => {
  // const post = {
  //   title: post.details.title,
  //   authorId: post.userId,
  //   description: post.details.description,
  //   gamerules: mapRuleVariantsToString(game.q.ruleVariants),
  //   status: 'PENDING_REPLY',
  //   type: post.details.type
  // }

  supabase
    .from('Post')
    .insert({
      title: post.details.title,
      authorUserId: post.userId,
      description: post.details.description,
      status: 'UNDER_REVIEW',
      type: 'NCV'
    })
    .select()
    .then(async (response) => {
      if (response.status === 201 && response.data != null) {
        const postId = response.data[0].id
        Promise.all([
          await createPostDetails(postId),
          await createRules(postId, mapRuleVariantsToString(game.q.ruleVariants))
        ])
      }
    })

  console.log('CREATION POST: ', post)
}
