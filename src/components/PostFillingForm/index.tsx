import { DescriptionInput } from 'components/PostFillingForm/DescriptionInput'
import { TitleInput } from 'components/PostFillingForm/TitleInput'
import { TypeInput } from 'components/PostFillingForm/TypeInput'
import { useFormData } from 'components/PostFillingForm/use-form-data'
import type { CGABotGameDetails } from 'cgabot'

type PostFillingFormProps = {
  userId: number
  game: CGABotGameDetails
  approveIds: string[]
}

export const PostFillingForm = (props: PostFillingFormProps) => {
  const { submit, errors, serverError, title, changeTitle, type, changeType, description, changeDescription } =
    useFormData(props)
  return (
    <form
      id="post-details-form"
      onSubmit={submit}
      class={'z-20 w-full flex flex-col p-5 gap-10 rounded-xl text-[28px]'}
    >
      <TitleInput title={title} setTitle={changeTitle} isOccupied={errors.has('isOccupied')} />
      <TypeInput type={type} setType={changeType} />
      <DescriptionInput
        description={description}
        setDescription={changeDescription}
        isInvalid={errors.has('invalidDescription')}
      />
      <p
        class={`h-15 flex justify-center text-[18px] text-red ${
          serverError ? 'opacity-100' : 'opacity-0'
        } transition-all duration-300 easy-in-out`}
      >
        {serverError}
      </p>
      <button
        class={
          'border border-border-light p-[10px] rounded-xl mt-3 hover:(shadow-light text-white) transition-all duration-300'
        }
      >
        Post
      </button>
    </form>
  )
}
