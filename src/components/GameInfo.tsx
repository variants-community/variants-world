import { useState } from 'preact/hooks'
import PostTags from './PostTags'
import PostTitle from './PostTitle'
import PostUser from './PostUser'
import { getValueFromEvent } from '../hepers'
import { supabase } from '../db/supabase/supabase'
import type { GameType } from '@prisma/client'
import EditIcon from './icons/EditIcon'

type GameInfoProps = {
  postId: number;
  type: string;
  title: string;
  rules: string[];
  user: string;
  createdAt: Date;
  description: string;
  variantLink: string;
};

const daysLeft = (date: Date) => {
  const date_2 = new Date()
  const difference = date_2.getTime() - date.getTime()
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return totalDays
}

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
            <div
              onClick={() => toogleIsChangeable()}
              className={'cursor-pointer '}
            >
              <EditIcon className="  text-green" />
            </div>
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

      <Description
        isEditMode={isEditMode}
        value={description}
        onDescriptionChange={onDescriptionChange}
      />

      <div className={'flex flex-row justify-end mt-auto'}>
        <LinkToVariant isEditMode={isEditMode} value={variantLink} onVarianLinkChange={onVariantLinkChange} />
      </div>
    </div>
  )
}

type DescriptionProps = {
  isEditMode: boolean;
  value: string;
  onDescriptionChange: (e: Event) => void;
};

const Description = (props: DescriptionProps) => {
  return (
    <div className={'flex flex-col text-[16px] '}>
      <h2 className={'text-secondary font-semibold'}>Description</h2>
      {props.isEditMode
        ? <textarea rows={15} value={props.value} onChange={props.onDescriptionChange} className={'h-full bg-dark outline-none rounded-[3px]'} />
        : <p>{props.value}</p>}
    </div>
  )
}

const TimePassed = ({ from }: { from: Date }) => (
  <div className={'items-center '}>
    <span className={'block text-[16px] whitespace-nowrap'}>
      {`${daysLeft(from)} days ago`}
    </span>
  </div>
)

const LinkToVariant = ({ value, onVarianLinkChange, isEditMode}: { value: string, onVarianLinkChange: (e: Event) => void, isEditMode: boolean }) => (
  <>
    {isEditMode ? <input value={value} onChange={onVarianLinkChange} className={'block w-full bg-primary px-[32px] py-[7px] rounded-[3px] text-white font-semibold text-[14px]'}></input> :
<a
    href={value}
    className={'block bg-primary px-[32px] py-[7px] rounded-[3px] text-white font-semibold text-[14px]'}
  >
    Try this variant
  </a>}
  </>
  
)

export default GameInfo
