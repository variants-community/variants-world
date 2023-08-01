import { useEffect, useState } from 'preact/hooks'
import { getValueFromEvent } from '../hepers'
import type { CGABotGameDetails } from '../cgabot'
import SpinnerIcon from './icons/SpinnerIcon'
import CrossIcon from './icons/CrossIcon'
import PostTags from './PostTags'
import AcceptedIcon from './icons/AcceptedIcon'

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
    <div className="flex flex-col items-center mx-auto">
      <PageTitle isHiden={!!game} />

      <GeneralSearch
        value={gameId}
        onChange={setGameId}
        isGameFound={!!game}
        isInvalidId={isInvalidId}
        isLoading={isLoading}
      />

      {game && <Picture />}

      {game && (
        <div className={'mt-[14px]'}>
          <PostTags
            rules={['firstRule', 'rule39', 'nextRule']}
            className="text-secondary !bg-border-light !border-[0.4px] shadow-dark"
            iconsClassName="fill-secondary"
          />
        </div>
      )}
      {game && <GamesInputs />}
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

const PageTitle = ({ isHiden }: { isHiden: boolean }) => (
  <h1
    className={`${
      isHiden ? 'hidden' : 'block'
    } text-[85px] mt-[180px] text-white font-[300] tracking-[2.55px] text-center text-shadow-light transition-all duration-1000`}
  >
    Variants universe starts<br />with a single game
  </h1>
)

const GeneralSearch = (props: GeneralSearchProps) => (
  <div
    className={`flex flex-row mx-auto bg-dark border border-[2px] border-border-dark shadow-light text-text font-[400] rounded-full items-center transition-all duration-1000 ${
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

const Picture = ({ isHiden }: { isHiden?: boolean }) => (
  <img
    src="/src/assets/images/game.png"
    className={`${
      isHiden ? 'hidden' : 'flex'
    } mt-[35px] w-[450px] h-[450px] rounded-[12px] border border-[2px] border-border-dark shadow-dark`}
  />
)

const GamesInputs = () => {
  const [values, setValues] = useState<string[]>(new Array<string>(8).fill(''))

  const onChangeValue = (value: string, index: number) => {
    const temp = values.map((i) => i)
    temp[index] = value
    setValues(temp)
  }

  return (
    <div
      className={'flex flex-wrap gap-[21px] mt-[75px] mx-auto justify-center'}
    >
      {values.map((value, index) => {
        return (
          <GameIdInput
            state={GameIdInputState.INPUT}
            key={index}
            value={value}
            setValue={(value) => {
              onChangeValue(value, index)
            }}
            placeholder={`game ${index + 1}`}
          />
        )
      })}
    </div>
  )
}

enum GameIdInputState {
  ACCEPTED,
  DECLINED,
  INPUT,
}

type GameIdInputProps = {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  state: GameIdInputState;
};

const GameIdInput = (props: GameIdInputProps) => {
  return (
    <div
      className={'w-[183px] flex flex-row gap-[8px] items-center text-[18px] px-[15px] py-[10px] border border-border-light rounded-full'}
    >
      {props.state === GameIdInputState.INPUT
        ? <span className={'text-[23px]'}>#</span>
        : props.state === GameIdInputState.ACCEPTED
        ? <AcceptedIcon />
        : <CrossIcon />}

      <input
        value={props.value}
        onChange={(e) => props.setValue(getValueFromEvent(e))}
        placeholder={props.placeholder}
        type="text"
        className={'w-[100%] bg-dark outline-none'}
      />
    </div>
  )
}

export default NewPost
