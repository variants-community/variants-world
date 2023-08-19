import { useState } from 'preact/hooks'
import {
  addGameRuleAndGetId,
  addGameRuleToPost,
  getGameRuleId,
  removeGameRuleFromPost,
  updatePostGameRule
} from '../../db/supabase/queries'

export const usePostTagsEditMode = (postId: number, initRules: string[]) => {
  const [rules, setRules] = useState(initRules)

  const remove = async (toBeRemoved: string) => {
    const id = await getGameRuleId(toBeRemoved)

    if (id) {
      const ok = await removeGameRuleFromPost(id, postId)

      if (ok) {
        console.log('successfully delted: ', id)
        setRules([...rules.filter((p) => p !== toBeRemoved)])
      }
    }
  }

  const edit = async (old: string, edited: string) => {
    if (edited.length === 0) {
      setRules([...rules.filter((p) => p !== old)])
      remove(old)
      return
    }

    const oldRuleId = await getGameRuleId(old)

    if (!oldRuleId) {
      return
    }

    let editedId = await getGameRuleId(edited)

    if (!editedId) {
      console.log('rule not founded. Inserting: ', edited)
      editedId = await addGameRuleAndGetId(edited)
    }

    if (editedId) {
      const ok = await updatePostGameRule(editedId, oldRuleId, postId)

      if (ok) {
        const updated = [...rules.filter((p) => p !== old), edited]
        setRules(updated)
      }
    }
  }

  const add = async (toBeAdded: string) => {
    if (toBeAdded.length > 0) {
      let id = await getGameRuleId(toBeAdded)

      if (!id) {
        id = await addGameRuleAndGetId(toBeAdded)
      }

      if (id) {
        const ok = await addGameRuleToPost(id, postId)
        if (ok) {
          setRules([...rules.filter((p) => p !== toBeAdded), toBeAdded])
        }
      }
    }
  }
  return {
    rules,
    remove,
    edit,
    add
  }
}
