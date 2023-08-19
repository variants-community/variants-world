import { useEffect, useRef, useState } from 'preact/hooks'
import { getValueFromEvent } from '../hepers'
import {
  addGameRuleAndGetId,
  addGameRuleToPost,
  getGameRuleId,
  removeGameRuleFromPost,
  updatePostGameRule,
} from '../db/supabase/queries'

type PostTagsProps = {
  postId: number;
  isEditMode: boolean;
  rules: string[];
  className?: string;
  iconsClassName?: string;
  ulClassName?: string;
};

const PostTags = (props: PostTagsProps) => {
  const [rules, setRules] = useState(props.rules)

  const remove = async (toBeRemoved: string) => {
    const id = await getGameRuleId(toBeRemoved)

    if (id) {
      const ok = await removeGameRuleFromPost(id, props.postId)

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
      const ok = await updatePostGameRule(editedId, oldRuleId, props.postId)

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
        const ok = await addGameRuleToPost(id, props.postId)
        if (ok) {
          setRules([...rules.filter((p) => p !== toBeAdded), toBeAdded])
        }
      }
    }
  }

  return (
    <div>
      <ul
        className={`flex flex-wrap items-center list-none gap-[10px] text-[14px] font-bold ${props.ulClassName}`}
      >
        {rules.sort().map((rule) => (
          <RuleItem
            key={rule}
            ruleName={rule}
            isEditMode={props.isEditMode}
            className={props.className}
            onRemove={() => remove(rule)}
            edit={edit}
          />
        ))}
        {props.isEditMode && (
          <AddRuleButton addRule={add} className={props.className} />
        )}
      </ul>
    </div>
  )
}

type RuleItemProps = {
  isEditMode: boolean;
  ruleName: string;
  className?: string;
  onRemove: () => void;
  edit: (old: string, edited: string) => void;
};

const RuleItem = (props: RuleItemProps) => {
  const [inputMode, setInputMode] = useState(false)
  const [value, setValue] = useState(props.ruleName)

  // const inputRef = useRef(null)

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current && inputMode) {
      ref.current.focus()
    }
  }, [inputMode])

  return (
    <li
      className={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] px-[5px] ${props.className}`}
    >
      {props.isEditMode
        ? inputMode
          ? (
            <input
              ref={ref}
              style={{ width: value.length + 'ch' }}
              className={'inline bg-dark outline-none'}
              value={value}
              onInput={(e) => setValue(getValueFromEvent(e))}
              onChange={() => {
                // if (inputMode)
                // props.edit(props.ruleName, getValueFromEvent(e))
                setInputMode(false)
              }}
              onBlur={(e) => {
                // if (inputMode)
                props.edit(props.ruleName, getValueFromEvent(e))
                setInputMode(false)
              }}
            >
            </input>
          )
          : <button onClick={() => setInputMode(true)}>{value}</button>
        : <span>{value}</span>}

      {props.isEditMode &&
        (
          <button onClick={() => props.onRemove()} className={'text-text'}>
            X
          </button>
        )}
    </li>
  )
}

type AddRuleButton = {
  className?: string;
  addRule: (rule: string) => void;
};

const AddRuleButton = (props: AddRuleButton) => {
  const [isInput, setIsInput] = useState(false)
  const [newRule, setNewRule] = useState('')

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current && isInput) {
      ref.current.focus()
    }
  }, [isInput])

  return (
    <>
      {isInput &&
        (
          <li
            className={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] px-[5px] ${props.className}`}
          >
            <input
              ref={ref}
              style={{
                width: newRule.length === 0 ? '10ch' : newRule.length + 'ch',
              }}
              className={'inline bg-dark outline-none'}
              value={newRule}
              onInput={(e) => setNewRule(getValueFromEvent(e))}
              onChange={() => {
                // props.addRule(getValueFromEvent(e))
                // setNewRule('')
                setIsInput(false)
              }}
              onBlur={(e) => {
                props.addRule(getValueFromEvent(e))
                setNewRule('')
                setIsInput(false)
              }}
            >
            </input>
          </li>
        )}
      {!isInput &&
        (
          <li>
            <button
              onClick={() => setIsInput(true)}
              className={'h-[26px] text-text border border-border-dark rounded-[3px] py-[5px] px-[5px]'}
            >
              + Add
            </button>
          </li>
        )}
    </>
  )
}

export default PostTags
