import type { CGABotGameDetails } from '../../services/cgabot'
import { DescriptionInput } from './DescriptionInput'
import { TitleInput } from './TitleInput'
import { postGameToCreatePost } from '../../hepers'
import type {
  ErrorMessage,
  PostDetailsDTO,
} from '../../pages/api/posts/create'
import { TypeInput } from './TypeInput'
import { useFormData } from './useFormData'
import { useState } from 'preact/hooks'
import { SubmitError } from './SubmitError'

type PostFillingFormProps = {
  userId: number;
  game: CGABotGameDetails;
  approveIds: string[];
};

export const PostFillingForm = (props: PostFillingFormProps) => {
  const [submitError, setSubmitError] = useState<ErrorMessage>()

  const {
    errors,
    title,
    setTitle,
    type,
    setType,
    description,
    setDescription,
  } = useFormData({ title: props.game.q.title })

  const submit = async (e: Event) => {
    e.preventDefault()
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
        setSubmitError(res.data)
        console.log('status: ', res.status)
        console.log('message: ', res.data)
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
      <TypeInput
        type={type}
        setType={setType}
        isInvalid={errors.has('type')}
      />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
        isInvalid={errors.has('description')}
      />
      {submitError && <SubmitError error={submitError} />}
      <button
        className={'border border-border-light p-[10px] rounded-[12px] mt-[20px]'}
      >
        Post
      </button>
    </form>
  )
}
