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

  const {
    data: game,
    isFetching,
    query,
    setQuery
  } = useSearch<CGABotGameDetails>({
    onQuery: async q => {
      return await fetchGameById(q)
    }
  })

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
    <div class="flex flex-col items-center mx-auto">
      <Title isSearching={!!game && !!query} />

      <Search value={query} onChange={onSearch} isSearching={!!game && !!query} isLoading={isFetching} />

      {isGameFound && (
        <>
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
              'mb-[45px] mx-auto lg:mx-0 lg:ml-auto w-[185px] h-[45px] mt-[10px] text-center bg-primary border border-border-dark shadow-dark font-[600] text-white text-[18px] rounded-[10px]'
            }
          >
            Continue
          </button>
        </>
      )}

      {game && isSecondStep && (
        <div class={'w-11/12 sm:w-[700px] mt-[150px] mb-[300px]'}>
          <PostFillingForm userId={props.userId} game={game} approveIds={approveIds} />
        </div>
      )}
    </div>
  )
}

export default NewPost
