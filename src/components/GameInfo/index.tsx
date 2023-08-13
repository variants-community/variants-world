import { useState } from 'preact/hooks'
import PostTags from '../PostTags'
import PostTitle from '../PostTitle'
import PostUser from '../PostUser'
import { getValueFromEvent } from '../../hepers'
import { supabase } from '../../db/supabase/supabase'
import type { GameType } from '@prisma/client'
import { Description } from './Description'
import { LinkToVariant } from './LinkToVariant'
import { TimePassed } from './TimePassed'
import { EditButton } from '../EditButton'

type GameInfoProps = {
  displayEditBotton?: boolean;
  postId: number;
  type: string;
  title: string;
  rules: string[];
  user: string;
  createdAt: Date;
  description: string;
  variantLink: string;
};

const GameInfo = (props: GameInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(props.title)
  const [type, setType] = useState(props.type)
  const [description, setDescription] = useState(props.description)
  const [variantLink, setVariantLink] = useState(props.variantLink)

  const onTypeChange = async (e: Event) => {
    const type = getValueFromEvent<GameType>(e)
    setType(type)
    await supabase.from('Post').update({ type }).eq('id', props.postId)
  }

  const onTitleChange = async (e: Event) => {
    const title = getValueFromEvent<string>(e)
    setTitle(title)
    await supabase.from('Post').update({ title }).eq('id', props.postId)
  }

  const onDescriptionChange = async (e: Event) => {
    const description = getValueFromEvent<string>(e)
    setDescription(description)
    await supabase.from('Post').update({ description }).eq('id', props.postId)
  }

  const onVariantLinkChange = async (e: Event) => {
    const variantLink = getValueFromEvent<string>(e)
    setVariantLink(variantLink)
  }

  const toogleIsChangeable = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <div
      className={'w-full flex flex-col bg-border-light rounded-[12px] shadow-dark p-[20px] gap-[20px]'}
    >
      <div className={'flex flex-col gap-[10px]'}>
        <div className={'flex flex-row items-center justify-between'}>
          <div className={'flex flex-row items-center gap-[10px]'}>
            <PostTitle
              isEditMode={isEditMode}
              type={type}
              title={title}
              onTypeChange={onTypeChange}
              onTitleChange={onTitleChange}
            />

            {props.displayEditBotton && (
              <EditButton onClick={() => toogleIsChangeable()} />
            )}
          </div>

          <TimePassed from={props.createdAt} />
        </div>

        <PostTags
          rules={props.rules}
          className="text-secondary"
          iconsClassName="fill-secondary"
        />
      </div>

      <PostUser user={props.user} />

      {description.length > 0 &&
        (
          <Description
            isEditMode={isEditMode}
            value={description}
            onDescriptionChange={onDescriptionChange}
          />
        )}

      <div className={'flex flex-row justify-end mt-auto'}>
        <LinkToVariant
          isEditMode={isEditMode}
          value={variantLink}
          onVarianLinkChange={onVariantLinkChange}
        />
      </div>
    </div>
  )
}

export default GameInfo
