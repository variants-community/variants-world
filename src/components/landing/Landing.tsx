import { Screens } from 'components/landing/Screens'
import { actions } from 'astro:actions'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useNewPostValidation } from 'components/landing/use-new-post-validation'
import { useSearch } from 'src/hooks/use-search'
import { useSignal } from '@preact/signals'
import FirstScreen from 'components/landing/first/FirstScreen'
import SecondScreen from 'components/landing/second/SecondScreen'
import type { CGABotGameDetails } from 'cgabot'

const Landing = (props: { userId: number }) => {
  const isSecondStep = useSignal(false)
  const isGameAlredyAdded = useSignal(false)
  const {
    data: mainGame,
    isFetching: loading,
    query: mainGameNr,
    setQuery: requestGame
  } = useSearch<number | undefined, CGABotGameDetails>({ default: undefined, onQuery: actions.getGameDetails.orThrow })

  const validationSlice = useNewPostValidation(mainGame)

  useEffect(() => {
    if (mainGame) {
      const gameIsAlredyAdded = async (gameToBeValidated: CGABotGameDetails) => {
        const { data } = await supabase.from('Post').select('gameNr').eq('gameNr', gameToBeValidated.gameNr).single()
        return data !== null
      }

      // eslint-disable-next-line github/no-then
      gameIsAlredyAdded(mainGame).then(result => (isGameAlredyAdded.value = result))
    } else {
      isGameAlredyAdded.value = false
    }
  }, [mainGame])

  return (
    <>
      <div
        class={`fixed inset-0 top-12 bg-dark -z-1 transition-opacity duration-200 ${
          mainGame ? 'opacity-60' : 'opacity-0'
        }`}
      />
      <Screens isSecondScreen={isSecondStep.value}>
        <FirstScreen
          onContinue={() => (isSecondStep.value = true)}
          disabled={isGameAlredyAdded.value}
          {...{ mainGameNr, mainGame, loading, requestGame }}
          {...validationSlice}
        />
        {mainGame && validationSlice.isAllValidated && validationSlice.validationDetails && (
          <SecondScreen
            onBack={() => (isSecondStep.value = false)}
            userId={props.userId}
            mainGame={mainGame}
            confirmingGameNrs={validationSlice.confirmingGameNrs}
            validationDetails={validationSlice.validationDetails}
          />
        )}
      </Screens>
    </>
  )
}

export default Landing
