import { Screens } from 'components/landing/Screens'
import { fetchGameById } from 'utils/fetch-queries'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useGameValidation } from 'components/landing/use-new-post-approve'
import { useSearch } from 'src/hooks/use-search'
import { useSignal } from '@preact/signals'
import FirstScreen from 'components/landing/first/FirstScreen'
import SecondScreen from 'components/landing/second/SecondScreen'
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

  const validationSlice = useGameValidation(game)

  useEffect(() => {
    if (game) {
      const gameIsAlredyAdded = async (gameToBeValidated: CGABotGameDetails) => {
        const { data } = await supabase.from('Post').select('gameNr').eq('gameNr', gameToBeValidated.gameNr).single()
        return data !== null
      }

      // eslint-disable-next-line github/no-then
      gameIsAlredyAdded(game).then(result => (isGameAlredyAdded.value = result))
    } else {
      isGameAlredyAdded.value = false
    }
  }, [game])

  return (
    <>
      <div
        class={`fixed inset-0 top-12 bg-dark -z-1 transition-opacity duration-200 ${game ? 'opacity-60' : 'opacity-0'}`}
      />
      <Screens isSecondScreen={isSecondStep.value}>
        <FirstScreen
          onContinue={() => (isSecondStep.value = true)}
          disabled={isGameAlredyAdded.value}
          {...{ mainGameNr, game, loading, requestGame, ...validationSlice }}
        />
        {game && validationSlice.isApproved && (
          <SecondScreen
            onBack={() => (isSecondStep.value = false)}
            userId={props.userId}
            game={game}
            approveIds={validationSlice.approveIds}
          />
        )}
      </Screens>
    </>
  )
}

export default Landing
