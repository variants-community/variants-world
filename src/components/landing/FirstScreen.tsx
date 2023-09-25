import { GameInputsGroup } from 'components/landing/GameInputsGroup'
import { LandingSearch } from 'components/landing/LandingSearch'
import { LandingTitle } from 'components/landing/LandingTitle'
import { Picture } from 'components/landing/Picture'
import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import PostTags from 'components/PostTags'
import type { CGABotGameDetails } from 'cgabot'
import type { useGameValidation } from 'components/landing/use-new-post-approve'

type Props = {
  onContinue: () => void
  game?: CGABotGameDetails
  disabled: boolean
  mainGameNr: number | undefined
  requestGame: (gameNr: number | undefined) => void
  loading: boolean
} & ReturnType<typeof useGameValidation>

const FirstScreen = (props: Props) => (
  <div class={`max-w-230 flex flex-col mx-auto items-center pb-10 transition-opacity duration-1000`}>
    <LandingTitle collapsed={!!props.game} />

    <LandingSearch
      value={props.mainGameNr}
      onChange={props.requestGame}
      collapsed={!!props.game}
      loading={props.loading}
      invalid={props.disabled}
    />

    {props.game && (
      <div class="animate-fadefast flex flex-col items-center">
        <Picture
          fen={props.game.q.startFen}
          class={`mt-[35px] w-11/12 sm:(w-[450px] h-[450px]) rounded-[12px] border border-[2px] border-border-dark shadow-dark`}
        />
        <div class={'sm:w-[450px] mt-[14px]'}>
          <PostTags
            rules={[props.game.q.timeControl, ...mapRuleVariantsToString(props.game.q.ruleVariants)]}
            class="text-secondary !bg-border-light !border-[0.4px] shadow-dark"
            iconsclass="fill-secondary"
            ulclass="justify-center"
          />
        </div>
        <GameInputsGroup
          disabled={props.disabled}
          approveIds={props.approveIds}
          approveIdsState={props.approveIdsState}
          changeApproveId={props.changeApproveId}
        />
        {props.isApproved && (
          <button
            onClick={props.onContinue}
            class={` w-46 h-11 mx-auto sm:(ml-auto mr-2 mt-2 mb-4) text-center bg-primary  border border-border-dark shadow-dark font-[600] text-white text-lg rounded-lg ${
              props.disabled ? 'opacity-50 cursor-default' : 'hover:bg-secondary'
            } transition-all duration-300 easy-in`}
          >
            Continue
          </button>
        )}
      </div>
    )}
  </div>
)

export default FirstScreen
