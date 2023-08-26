import { IdsInputs } from 'components/NewPost/IdsInput'
import { Picture } from 'components/NewPost/Picture'
import { PostFillingForm } from 'components/PostFillingForm'
import { Search } from 'components/NewPost/Search'
import { Title } from 'components/NewPost/Title'
import { mapRuleVariantsToString, scrollToElement } from 'utils/hepers'
import { useEffect, useState } from 'preact/hooks'
import { useSearch } from 'components/NewPost/use-search'
import PostTags from 'components/PostTags'

const NewPost = (props: { userId: number }) => {
  const [approveIds, setApproveIds] = useState<string[]>(new Array<string>(8).fill(''))
  const [isAllConfirmed, setIsAllConfirmed] = useState(false)
  const { game, gameId, setGameId, isSearching, isLoading, isInvalidId } = useSearch()

  const isGameFound = !!game

  useEffect(() => {
    if (isAllConfirmed) scrollToElement('post-details-form')
  }, [isAllConfirmed])

  const onSearch = (value: string) => {
    setGameId(value)
    setApproveIds(new Array<string>(8).fill(''))
  }

  return (
    <div class="flex flex-col items-center mx-auto">
      <Title isSearching={isSearching} />

      <Search
        value={gameId}
        onChange={onSearch}
        isSearching={isSearching}
        isInvalidId={isInvalidId}
        isLoading={isLoading}
      />

      {isGameFound && <Picture />}

      {isGameFound && (
        <div class={'sm:w-[450px] mt-[14px]'}>
          <PostTags
            rules={[game.q.timeControl, ...mapRuleVariantsToString(game.q.ruleVariants)]}
            class="text-secondary !bg-border-light !border-[0.4px] shadow-dark"
            iconsclass="fill-secondary"
            ulclass="justify-center"
          />
        </div>
      )}
      {isGameFound && (
        <IdsInputs
          approveIds={approveIds}
          setApproveIds={setApproveIds}
          setIsAllConfirmed={setIsAllConfirmed}
          mainGameId={game.gameNr.toString()}
          userId={props.userId}
        />
      )}
      {isGameFound && isAllConfirmed && (
        <div class={'w-11/12 sm:w-[700px] mt-[150px] mb-[300px]'}>
          <PostFillingForm userId={props.userId} game={game} approveIds={approveIds} />
        </div>
      )}
    </div>
  )
}

export default NewPost
