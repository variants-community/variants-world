import { useEffect, useState } from 'preact/hooks'
import type { CGABotGameDetails } from '../../services/cgabot'
import { DescriptionInput } from './DescriptionInput'
import { TitleInput } from './TitleInput'
import {
  isDescriptionValid,
  isTitleValid,
  postGameToCreatePost,
} from '../../hepers'
import type { PostDetailsDTO } from '../../pages/api/posts/create'

type PostFillingFormProps = {
  userId: number;
  game: CGABotGameDetails;
  approveIds: string[];
};

export const PostFillingForm = (props: PostFillingFormProps) => {
  const [errors, setErrors] = useState<Set<string>>(new Set())

  const [title, setTitle] = useState<string>(props.game.q.title)
  const [description, setDescription] = useState<string>('sdfsdfds')

  useEffect(() => {
    const temp = new Set(errors)
    if (isTitleValid(title)) {
      temp.delete('title')
      setErrors(temp)
    } else {
      temp.add('title')
      setErrors(temp)
    }
    console.log('tit', errors)
  }, [title])

  useEffect(() => {
    const temp = new Set(errors)
    if (isDescriptionValid(description)) {
      console.log('des del')
      temp.delete('description')
      setErrors(temp)
    } else {
      console.log('des set')
      temp.add('description')
      setErrors(temp)
    }
    console.log('des', errors)
  }, [description])

  const submit = async (e: Event) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.target as HTMLFormElement)

    const type = formData.get('type')?.toString()
    const title = formData.get('title')?.toString()
    const description = formData.get('description')?.toString()

    if (errors.size === 0) {
      const data: PostDetailsDTO = {
        details: {
          description: description?.toString() ?? '',
          title: title?.toString() ?? '',
          type: type?.toString() ?? '',
        },
        gameId: props.game.gameNr.toString(),
        approveIds: props.approveIds,
        userId: props.userId,
      }

      const res = await postGameToCreatePost(data)

      if (res.status === 201) {
        window.location.replace(`http://localhost:3000/posts/${res.data.id}`)
      } else {
        console.log('status: ', res.status)
        console.log('message: ', res.statusText)
      }
    }
  }
  return (
    <form
      id="post-details-form"
      onSubmit={submit}
      className={'flex flex-col gap-[20px] w-full border border-border-light rounded-[12px] text-[28px] p-[20px] '}
    >
      <TitleInput
        title={title}
        setTitle={setTitle}
        isInvalid={errors.has('title')}
      />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
        isInvalid={errors.has('description')}
      />
      <button
        className={'border border-border-light p-[10px] rounded-[12px] mt-[20px]'}
      >
        Post
      </button>
    </form>
  )
}
