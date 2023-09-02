import { IdsInputs } from 'components/NewPost/IdsInput'
import { Picture } from 'components/NewPost/Picture'
import { PostFillingForm } from 'components/PostFillingForm'
import { Search } from 'components/NewPost/Search'
import { Title } from 'components/NewPost/Title'
import { fetchGameById } from 'utils/fetch-queries'
import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import { useNewPostApprove } from 'components/NewPost/use-new-post-approve'
import { useRef } from 'preact/hooks'
import { useSearch } from 'src/hooks/use-search'
import { useSignal } from '@preact/signals'
import PostTags from 'components/PostTags'
import type { CGABotGameDetails } from 'cgabot'

const NewPost = (props: { userId: number }) => {
  const step2ref = useRef<HTMLDivElement>(null)
  const isSecondStep = useSignal(false)
  const { data: game, isFetching, query, setQuery } = useSearch<CGABotGameDetails>({ onQuery: fetchGameById })
  const { isApproved, approveIds, approveIdsState, changeApproveId, clearApproveIds } = useNewPostApprove(game)

  const isGameFound = !!game

  const onSearch = (value: string) => {
    setQuery(value)
    clearApproveIds()
  }

  return (
    <div class="w-full h-screen overflow-hidden">
      <div
        class={`relative  absolute ${
          isSecondStep.value ? 'left-[-100%]' : 'left-0'
        } transition-all duration-400 easy-in-out`}
      >
        <div class={`absolute left-0 top-0 min-w-[100%] `}>
          <div
            class={`max-w-230 flex flex-col mx-auto items-center pb-10 ${
              isSecondStep.value ? 'opacity-0' : 'opacity-100'
            } transition-all duration-1000`}
          >
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
                  approveIdsState={approveIdsState}
                  changeApproveId={changeApproveId}
                />
                <button
                  onClick={() => {
                    if (isApproved) {
                      isSecondStep.value = true
                    }
                  }}
                  class={
                    ' w-46 h-11 mx-auto sm:(ml-auto mr-2 mt-2 mb-4) text-center bg-primary hover:bg-secondary border border-border-dark shadow-dark font-[600] text-white text-lg rounded-lg'
                  }
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>

        {game && isApproved && (
          <div class={'absolute left-[100%] min-w-[100%]'}>
            <div ref={step2ref} class={'w-full mx-auto mt-[10%] sm:(w-145)'}>
              <PostFillingForm userId={props.userId} game={game} approveIds={approveIds} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewPost
