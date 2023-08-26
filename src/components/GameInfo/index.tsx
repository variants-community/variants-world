import { Description } from 'components/GameInfo/Description'
import { EditButton } from 'components/EditButton'
import { LinkToVariant } from 'components/GameInfo/LinkToVariant'
import { TimePassed } from 'components/GameInfo/TimePassed'
import { getValueFromEvent } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import { useState } from 'preact/hooks'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'
import type { GameType } from '@prisma/client'

type GameInfoProps = {
  displayEditBotton?: boolean
  postId: number
  type: string
  title: string
  rules: string[]
  user: string
  createdAt: Date
  description: string
  variantLink: string
}

const GameInfo = (props: GameInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(props.title)
  const [type, setType] = useState(props.type)
  const [description, setDescription] = useState(props.description)
  const [variantLink, setVariantLink] = useState(props.variantLink)

  const onTypeChange = async (e: Event) => {
    const newType = getValueFromEvent<GameType>(e)
    setType(newType)
    await supabase.from('Post').update({ type: newType }).eq('id', props.postId)
  }

  const onTitleChange = async (e: Event) => {
    const newTitle = getValueFromEvent<string>(e)
    setTitle(newTitle)
    await supabase.from('Post').update({ title: newTitle }).eq('id', props.postId)
  }

  const onDescriptionChange = async (e: Event) => {
    const newDescription = getValueFromEvent<string>(e)
    setDescription(newDescription)
    await supabase.from('Post').update({ description: newDescription }).eq('id', props.postId)
  }

  const onVariantLinkChange = async (e: Event) => {
    const newVariantLink = getValueFromEvent<string>(e)
    setVariantLink(newVariantLink)
  }

  const toogleIsChangeable = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <div
      class={
        'w-full sm:w-[500px] lg:w-[474px] flex flex-col bg-border-light rounded-[12px] shadow-dark p-[20px] gap-[20px]'
      }
    >
      <div class={'flex flex-col gap-[10px]'}>
        <div class={'flex flex-row items-center justify-between'}>
          <div class={'flex flex-row items-center gap-[10px]'}>
            <PostTitle
              isEditMode={isEditMode}
              type={type}
              title={title}
              onTypeChange={onTypeChange}
              onTitleChange={onTitleChange}
            />

            {props.displayEditBotton && <EditButton onClick={() => toogleIsChangeable()} />}
          </div>

          <TimePassed from={props.createdAt} />
        </div>

        <PostTags
          postId={props.postId}
          isEditMode={isEditMode}
          rules={props.rules}
          class="text-secondary"
          iconsclass="fill-secondary"
        />
      </div>

      <PostUser user={props.user} />

      {(description.length > 0 || isEditMode) && (
        <Description isEditMode={isEditMode} value={description} onDescriptionChange={onDescriptionChange} />
      )}

      <div class={'flex flex-row justify-end mt-auto'}>
        <LinkToVariant isEditMode={isEditMode} value={variantLink} onVarianLinkChange={onVariantLinkChange} />
      </div>
    </div>
  )
}

export default GameInfo
