import { PostFillingForm } from 'components/PostFillingForm'
import { Screens } from 'components/landing/Screens'
import { fetchGameById } from 'utils/fetch-queries'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useNewPostApprove } from 'components/landing/use-new-post-approve'
import { useSearch } from 'src/hooks/use-search'
import { useSignal } from '@preact/signals'
import FirstScreen from 'components/landing/FirstScreen'
import type { CGABotGameDetails } from 'cgabot'

const Landing = (props: { userId: number }) => {
  const isSecondStep = useSignal(false)
  const isGameAlredyAdded = useSignal(false)
  const {
    data: game,
    isFetching: loading,
    query: mainGameNr,
    setQuery: requestGame
  } = useSearch<number | undefined, CGABotGameDetails>({ default: undefined, onQuery: fetchGameById })

  const approveSlice = useNewPostApprove(game)

  useEffect(() => {
    if (game) {
      const gameIsAlredyAdded = async (gameToBeValidated: CGABotGameDetails) => {
        const { data } = await supabase.from('Post').select('gameNr').eq('gameNr', gameToBeValidated.gameNr).single()
        return data !== null
      }

      // eslint-disable-next-line github/no-then
      gameIsAlredyAdded(game).then(result => (isGameAlredyAdded.value = result))
    }
  }, [game])

  return (
    <Screens isSecondScreen={isSecondStep.value}>
      <FirstScreen
        onContinue={() => (isSecondStep.value = true)}
        disabled={isGameAlredyAdded.value}
        {...{ mainGameNr, game, loading, requestGame, ...approveSlice }}
      />
      {game && approveSlice.isApproved ? (
        <div class={'w-full mx-auto mt-[10%] max-w-230'}>
          <PostFillingForm userId={props.userId} game={game} approveIds={approveSlice.approveIds} />
          <button
            onClick={() => (isSecondStep.value = false)}
            class={` w-46 h-11 mx-auto sm:(ml-auto mr-2 mt-2 mb-4) text-center bg-primary  border border-border-dark shadow-dark font-[600] text-white text-lg rounded-lg ${
              isGameAlredyAdded.value ? 'opacity-50 cursor-default' : 'hover:bg-secondary'
            } transition-all duration-300 easy-in`}
          >
            Back
          </button>
        </div>
      ) : (
        <></>
      )}
    </Screens>
  )
}

export default Landing
