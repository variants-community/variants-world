import { DetailedSwitch } from 'components/common/DetailedSwitch'
import { FormInput } from 'components/common/FormInput'
import { FormTextarea } from 'components/common/FormTextarea'
import { MetRequirements } from 'components/landing/second/MetRequirements'
import { Picture } from 'components/common/Picture'
import { useFormData } from 'components/landing/second/use-form-data'
import type { CGABotGameDetails } from 'cgabot'
import type { ValidationDetails } from 'components/landing/use-new-post-approve'

type Props = {
  onBack: () => void
  userId: number
  game: CGABotGameDetails
  approveIds: string[]
  validationDetails: ValidationDetails
}

const SecondScreen = (props: Props) => {
  const { submit, errors, serverError, title, changeTitle, type, changeType, description, changeDescription } =
    useFormData(props)

  return (
    <div class={'w-full mx-auto max-w-230 pb-10 flex flex-col h-full'}>
      <div class="h-full flex flex-col justify-center items-center">
        <div class="sm:w-2/3 w-full pt-10 flex flex-col gap-y-8">
          <div class="flex flex-wrap gap-y-5 gap-x-10 justify-center">
            <Picture
              id={-1}
              fen={props.game.q.startFen}
              class={`w-40 h-40 bg-dark rounded-[12px] border border-[2px] border-border-dark shadow-dark`}
            />
            <MetRequirements validationDetails={props.validationDetails} />
          </div>

          <FormInput
            label="Name"
            value={title}
            setValue={changeTitle}
            invalid={errors.has('isOccupied')}
            error="A post with this name already exists"
            submit={submit}
          />

          <DetailedSwitch
            label="Type"
            value={type}
            setValue={changeType}
            options={{
              NCV: (
                <p>
                  <span class="text-primary">New Custom Variant</span> is a variant that becomes officially listed on
                  Variants if accepted. This type of variants must be balanced, fair, interesting, unique and of very
                  good quality.
                </p>
              ),
              WOF: (
                <p>
                  <span class="text-primary">Wheel of Fortune</span> is an arena rotation of quick, luck-based, fun and
                  exciting games. These games should be unbalanced and have a fast time control.
                </p>
              )
            }}
          />

          <FormTextarea
            label="Description"
            value={description}
            setValue={changeDescription}
            invalid={errors.has('invalidDescription')}
            error="Please describe your variant submission (> 10 characters)"
          />
        </div>
        <p
          class={`h-15 flex justify-center text-[18px] text-red ${
            serverError ? '' : 'hidden'
          } transition-opacity duration-100`}
        >
          {serverError}
        </p>
      </div>

      <div class="flex justify-between">
        <button
          onClick={props.onBack}
          class={`w-46 h-11 sm:(mr-2 mt-2 mb-4) text-center bg-primary hover:bg-secondary border border-border-dark shadow-dark font-[600] text-white text-lg rounded-lg transition-colors duration-100`}
        >
          Back
        </button>

        {!errors.size && (
          <button
            onClick={submit}
            class={`w-46 h-11 sm:(mr-2 mt-2 mb-4) text-center bg-primary  border border-border-dark shadow-dark ${
              errors.size ? 'filter grayscale-20 opacity-70 pointer-events-none' : 'hover:bg-secondary'
            } font-[600] text-white text-lg rounded-lg transition-colors duration-100`}
          >
            Post
          </button>
        )}
      </div>
    </div>
  )
}

export default SecondScreen
