import { useEffect, useState } from 'preact/hooks'
import { getValueFromEvent } from '../hepers'
import type { CGABotGameDetails } from '../cgabot'
import SpinnerIcon from './icons/SpinnerIcon'
import CrossIcon from './icons/CrossIcon'

const fetchGameById = async (gameId: string) => {
  const response = await fetch(`/api/game/${gameId}`, { method: 'get' })
  if (response.status === 200) {
    return await response.json() as CGABotGameDetails
  } else {
    return undefined
  }
}

const NewPost = () => {
  const [isInvalidId, setIsInvalidId] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [gameId, setGameId] = useState('')
  const [game, setGame] = useState<CGABotGameDetails>()

  useEffect(() => {
    if (gameId && /^\d{8}$/.test(gameId)) {
      setIsInvalidId(false)
      setIsLoading(true)

      fetchGameById(gameId).then((data) => {
        if (data) {
          setGame(data)
        } else {
          setIsInvalidId(true)
        }
        console.log('game recived: ', data)
      }).finally(() => setIsLoading(false))
    }
  }, [gameId])

  return (
    <div className="flex flex-col mx-auto">
      {!game && <PageTitle />}

      <GeneralSearch
        value={gameId}
        onChange={setGameId}
        isGameFound={!!game}
        isInvalidId={isInvalidId}
        isLoading={isLoading}
      />
    </div>
  )
}

type GeneralSearchProps = {
  value: string;
  onChange: (value: string) => void;
  isGameFound: boolean;
  isLoading: boolean;
  isInvalidId: boolean;
};

const GeneralSearch = (props: GeneralSearchProps) => (
  <div
    className={`flex flex-row mx-auto bg-dark border border-[2px] border-border-dark shadow-light text-text font-[400] rounded-full items-center ${
      props.isGameFound
        ? 'w-[492px] px-[18px] pt-[13px] pb-[12px] gap-[8px] mt-[100px]'
        : 'w-[762px] px-[28px] pt-[16px] pb-[16px] mt-[100px] gap-[14px]'
    }`}
  >
    <span className={`${props.isGameFound ? 'text-[23px]' : 'text-[38px]'} `}>
      #
    </span>
    <input
      disabled={props.isGameFound || props.isLoading}
      value={props.value}
      onChange={(e) => props.onChange(getValueFromEvent(e))}
      className={`w-full  bg-dark outline-none ${
        props.isGameFound ? 'text-[18px]' : 'text-[29px]'
      } `}
      type="text"
      placeholder={'game number or link'}
    />
    {props.isLoading && <SpinnerIcon />}
    {props.isInvalidId && <CrossIcon />}
  </div>
)

const PageTitle = () => (
  <h1 className="text-[85px] mt-[180px] text-white font-[300] tracking-[2.55px] text-center text-shadow-light">
    Variants universe starts<br />with a single game
  </h1>
)

export default NewPost
