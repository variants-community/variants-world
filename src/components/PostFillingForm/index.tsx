import type { CGABotGameDetails } from '../../cgabot'
import { DescriptionInput } from './DescriptionInput'
import { TitleInput } from './TitleInput'
import { postGameToCreatePost } from '../../utils/fetchQueries'
import { TypeInput } from './TypeInput'
import { useFormData } from './useFormData'
import { useState } from 'preact/hooks'
import { SubmitError } from './SubmitError'
import type { PostDetailsDTO } from '../../services/createPost'

type PostFillingFormProps = {
  userId: number;
  game: CGABotGameDetails;
  approveIds: string[];
};

export const PostFillingForm = (props: PostFillingFormProps) => {
  const [submitError, setSubmitError] = useState<string>()

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
        data: {
          description: description?.toString() ?? '',
          title: title?.toString() ?? '',
          type: type?.toString() ?? '',
        },
        gameId: props.game.gameNr.toString(),
        approveIds: props.approveIds,
        userId: props.userId,
      }

      const response = await postGameToCreatePost(data)

      if (response.confirmedGameId) {
        window.location.replace(
          `http://localhost:3000/posts/${response.confirmedGameId}`,
        )
      } else if (response.error) {
          setSubmitError(response.error.message)
        
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
