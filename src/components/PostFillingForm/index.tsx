import { DescriptionInput } from 'components/PostFillingForm/DescriptionInput'
import { SubmitError } from 'components/PostFillingForm/SubmitError'
import { TitleInput } from 'components/PostFillingForm/TitleInput'
import { TypeInput } from 'components/PostFillingForm/TypeInput'
import { postGameToCreatePost } from 'utils/fetch-queries'
import { useFormData } from 'components/PostFillingForm/use-form-data'
import { useState } from 'preact/hooks'
import type { CGABotGameDetails } from 'cgabot'
import type { GameType } from '@prisma/client'
import type { PostDetails } from 'services/post-details-validator'

type PostFillingFormProps = {
  userId: number
  game: CGABotGameDetails
  approveIds: string[]
}

export const PostFillingForm = (props: PostFillingFormProps) => {
  const [submitError, setSubmitError] = useState<string>()

  const { errors, title, setTitle, type, setType, description, setDescription } = useFormData({
    title: props.game.q.title
  })

  const submit = async (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    if (errors.size === 0) {
      const data: PostDetails = {
        data: {
          description: formData.get('description')?.toString() ?? '',
          title: formData.get('title')?.toString() ?? '',
          type: (formData.get('type')?.toString() as GameType) ?? 'WOF'
        },
        gameId: props.game.gameNr.toString(),
        approveIds: props.approveIds,
        userId: props.userId
      }

      const response = await postGameToCreatePost(data)

      if (response.confirmedGameId) {
        window.location.replace(`http://localhost:3000/posts/${response.confirmedGameId}`)
      } else if (response.error) {
        setSubmitError(response.error.message)
      }
    }
  }
  return (
    <form
      id="post-details-form"
      onSubmit={submit}
      class={'w-full flex flex-col p-5 gap-5 border border-border-light rounded-xl text-[28px]'}
    >
      <TitleInput title={title} setTitle={setTitle} isInvalid={errors.has('title')} />
      <TypeInput type={type} setType={setType} isInvalid={errors.has('type')} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
        isInvalid={errors.has('description')}
      />
      {submitError && <SubmitError error={submitError} />}
      <button class={'border border-border-light p-[10px] rounded-xl mt-5'}>Post</button>
    </form>
  )
}
