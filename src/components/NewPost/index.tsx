import { useEffect, useState } from 'preact/hooks'
import { mapRuleVariantsToString, scrollTo } from '../../hepers'
import { Title } from './Title'
import { Picture } from './Picture'
import PostTags from '../PostTags'
import { IdsInputs } from './IdsInput'
import { Search } from './Search'
import { useSearch } from './useSearch'
import { PostFillingForm } from '../PostFillingForm'

const NewPost = (props: { userId: number }) => {
  const [approveIds, setApproveIds] = useState<string[]>(
    new Array<string>(8).fill(''),
  )
  const [isAllConfirmed, setIsAllConfirmed] = useState(false)
  const { game, gameId, setGameId, isSearching, isLoading, isInvalidId } =
    useSearch()

  const isGameFound = !!game

  useEffect(() => {
    if (isAllConfirmed)
      scrollTo('post-details-form')
  }, [isAllConfirmed])

  return (
    <div className="flex flex-col items-center mx-auto">
      <Title isSearching={isSearching} />

      <Search
        value={gameId}
        onChange={setGameId}
        isSearching={isSearching}
        isInvalidId={isInvalidId}
        isLoading={isLoading}
      />

      {isGameFound && <Picture />}

      {isGameFound && (
        <div className={'w-[450px] mt-[14px]'}>
          <PostTags
            rules={mapRuleVariantsToString(game.q.ruleVariants)}
            className="text-secondary !bg-border-light !border-[0.4px] shadow-dark"
            iconsClassName="fill-secondary"
            ulClassName="justify-center"
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
      {isGameFound && isAllConfirmed &&
        (
          <div className={'w-[700px] mt-[150px] mb-[300px]'}>
            <PostFillingForm
              userId={props.userId}
              game={game}
              approveIds={approveIds}
            />
          </div>
        )}
    </div>
  )
}

export default NewPost
