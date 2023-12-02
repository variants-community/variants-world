import { GameInputsGroup } from 'components/landing/first/GameInputsGroup'
import { LandingSearch } from 'components/landing/first/LandingSearch'
import { LandingTitle } from 'components/landing/first/LandingTitle'
import { Picture } from 'components/common/Picture'
import { Violations } from 'components/landing/first/Violations'
import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import PostTags from 'components/PostTags'
import type { CGABotGameDetails } from 'cgabot'
import type { useNewPostValidation } from 'components/landing/use-new-post-validation'

type Props = {
  onContinue: () => void
  mainGame?: CGABotGameDetails
  disabled: boolean
  mainGameNr: number | undefined
  requestGame: (gameNr: number | undefined) => void
  loading: boolean
} & ReturnType<typeof useNewPostValidation>

const FirstScreen = (props: Props) => (
  <div class={`max-w-230 flex flex-col mx-auto items-center pb-10 transition-opacity duration-1000`}>
    <LandingTitle collapsed={!!props.mainGame} />

    <LandingSearch
      value={props.mainGameNr}
      onChange={props.requestGame}
      collapsed={!!props.mainGame}
      loading={props.loading}
      invalid={props.disabled}
    />

    <a
      href="/posts"
      class={`mt-16 opacity-0 animate-postfade animate-delay-600 animate-duration-500 hover:text-white transition-colors ease-linear
             w-52 h-42 bg-dark border border-border-light rounded-xl p-3 flex items-center justify-center text-lg font-semibold
             group flex-col justify-evenly overflow-hidden ${props.mainGame ? '!h-0 mt-0 p-0 !opacity-0' : ''}`}
      tabIndex={props.mainGame ? -1 : 0}
    >
      <img src="/assets/images/forum.png" class="h-18" />
      Explore posts
    </a>

    {props.mainGame && (
      <div class="animate-fadefast flex flex-col items-center">
        <Picture
          fen={props.mainGame.q.startFen}
          class={`mt-[35px] w-11/12 sm:(w-[450px] h-[450px]) bg-dark rounded-[12px] border border-[2px] border-border-dark shadow-dark`}
        />
        <div class={'sm:w-[450px] mt-[14px]'}>
          <PostTags
            rules={[props.mainGame.q.timeControl, ...mapRuleVariantsToString(props.mainGame.q.ruleVariants)]}
            class="text-secondary !bg-border-light !border-[0.4px] shadow-dark"
            iconsclass="fill-secondary"
            ulclass="justify-center"
          />
        </div>
        <GameInputsGroup
          disabled={props.disabled}
          inputsPayload={props.inputsPayload}
          setConfirmingGameNr={props.setConfirmingGameNr}
        />
        <Violations violations={props.violations} />
        {props.isAllValidated && (
          <button
            onClick={props.onContinue}
            class={` w-46 h-11 mx-auto sm:(ml-auto mr-2 mt-2 mb-4) text-center bg-primary  border border-border-dark shadow-dark font-[600] text-white text-lg rounded-lg ${
              props.disabled ? 'opacity-50 cursor-default' : 'hover:bg-secondary'
            } transition-colors duration-100 easy-in`}
          >
            Continue
          </button>
        )}
      </div>
    )}
  </div>
)

export default FirstScreen
