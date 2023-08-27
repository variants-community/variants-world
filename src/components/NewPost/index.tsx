import { IdsInputs } from 'components/NewPost/IdsInput'
import { Picture } from 'components/NewPost/Picture'
import { PostFillingForm } from 'components/PostFillingForm'
import { Search } from 'components/NewPost/Search'
import { Title } from 'components/NewPost/Title'
import { fetchGameById } from 'utils/fetch-queries'
import { mapRuleVariantsToString, scrollToElement } from 'utils/hepers'
import { useEffect, useState } from 'preact/hooks'
import { useSearch } from 'src/hooks/use-search'
import PostTags from 'components/PostTags'
import type { CGABotGameDetails } from 'cgabot'

const NewPost = (props: { userId: number }) => {
  const [approveIds, setApproveIds] = useState<string[]>(new Array<string>(8).fill(''))
  const [isAllConfirmed, setIsAllConfirmed] = useState(false)
  const [isSecondStep, setIsSecondStep] = useState(false)

  const { data: game, isFetching, query, setQuery } = useSearch<CGABotGameDetails>({ onQuery: fetchGameById })

  const isGameFound = !!game

  useEffect(() => {
    if (isAllConfirmed) {
      scrollToElement('post-details-form')
    }
  }, [isAllConfirmed])

  const onSearch = (value: string) => {
    setQuery(value)
    setApproveIds(new Array<string>(8).fill(''))
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'scroll')
  })

  return (
    <div class="flex flex-col items-center mx-auto max-w-230 w-11/12">
      <Title isSearching={!!game && !!query} />

      <Search value={query} onChange={onSearch} isSearching={!!game && !!query} isLoading={isFetching} />

      {isGameFound && (
        <div class="animate-fadefast flex flex-col items-center">
          <Picture />
          <div class={'sm:w-[450px] mt-[14px]'}>
            <PostTags
              rules={[game.q.timeControl, ...mapRuleVariantsToString(game.q.ruleVariants)]}
              class="text-secondary !bg-border-light !border-[0.4px] shadow-dark"
              iconsclass="fill-secondary"
              ulclass="justify-center"
            />
          </div>
          <IdsInputs
            approveIds={approveIds}
            setApproveIds={setApproveIds}
            setIsAllConfirmed={setIsAllConfirmed}
            mainGameId={game.gameNr.toString()}
            userId={props.userId}
          />
          <button
            onClick={() => {
              if (isAllConfirmed) setIsSecondStep(true)
            }}
            class={
              'ml-auto w-46 h-11 mt-2 mb-4 text-center bg-primary hover:bg-secondary border border-border-dark shadow-dark font-[600] text-white text-lg rounded-lg'
            }
          >
            Continue
          </button>
        </div>
      )}

      {game && isSecondStep && (
        <div class={'w-11/12 sm:w-175 mt-[36] mb-[75]'}>
          <PostFillingForm userId={props.userId} game={game} approveIds={approveIds} />
        </div>
      )}
    </div>
  )
}

export default NewPost
