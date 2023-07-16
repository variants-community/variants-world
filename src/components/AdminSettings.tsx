const gameClsfc = [
  'Materialistic',
  'Tactical',
  'Dynamic',
  'Positional',
  'Strategic',
  'Fortune',
]

const gameplayClsfc = [
  'First Positive',
  'First Negative',
  'Second Positive',
  'Second Negative',
]

const votes = [
  { tester: 'qilp', value: '-1' },
  { tester: 'bstri', value: '+1' },
  { tester: 'NoWellOkay', value: '+1' },
  { tester: 'TheCheeseDuck', value: '-1' },
  { tester: 'CheesMasterGS', value: '+1' },
]

const AdminSettings = () => (
  <div
    className={'flex bg-border-light shadow-dark rounded-[12px] p-[20px] justify-between'}
  >
    <GameClassification />
    <Votes />
    <Notes />
  </div>
)

export default AdminSettings

const GameClassification = () => (
  <div className={'flex flex-col text-[16px] font-semibold'}>
    <label htmlFor="game-clsfc" className={'text-secondary'}>
      Game Classification
    </label>
    <select
      id="game-clsfc"
      className="w-[200px] text-white bg-dark border border-2 border-border-dark rounded-[3px] px-[10px] py-[6px] mt-[6px] outline-none"
    >
      {gameClsfc.map((clsf) => (
        <option key={clsf} value={clsf.toLowerCase()}>{clsf}</option>
      ))}
    </select>

    <label htmlFor="gameplay-clsfc" className={'text-secondary pt-[21px]'}>
      Gameplay Classification
    </label>
    <select
      id="gameplay-clsfc"
      className="w-[200px] text-white bg-dark border border-2 border-border-dark rounded-[3px] px-[10px] py-[6px] mt-[6px] outline-none"
    >
      {gameplayClsfc.map((clsf) => (
        <option key={clsf} value={clsf.toLowerCase().replaceAll(' ', '_')}>
          {clsf}
        </option>
      ))}
    </select>

    <div className="flex items-center mt-[8px]">
      <input
        id="checkbox1"
        type="checkbox"
        value=""
        className="h-[14px] w-[14px] appearance-none outline-none accent-dark border border-primary rounded-[3px] transition-all checked:bg-primary"
      />
      <label htmlFor="checkbox1" className="ml-[6px] text-white">
        waiting and shuffling can be optimal
      </label>
    </div>

    <div className="flex mt-[8px] mt-[13px]">
      <input
        id="checkbox2"
        type="checkbox"
        value=""
        className="h-[14px] w-[14px] mt-[1px] appearance-none outline-none accent-dark border border-primary rounded-[3px] transition-all checked:bg-primary"
      />
      <label htmlFor="checkbox2" className="ml-[6px] text-white">
        attacking the other player directly by aggressively<br />developing
        one’s own ideas is viable
      </label>
    </div>
  </div>
)

const Votes = () => (
  <div className={'flex flex-col'}>
    <div className={'w-[160px] flex flex-row justify-between font-semibold'}>
      <h2 className={'text-primary font-[16px] font-semibold'}>Votes</h2>
      <div className={'flex flex-row text-white text-[14px] gap-[5px]'}>
        <button
          className={'w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] bg-primary'}
        >
          -1
        </button>
        <button
          className={'w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px]'}
        >
          +0
        </button>
        <button
          className={'w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px]'}
        >
          +1
        </button>
      </div>
    </div>

    <ul
      className={'flex flex-col gap-[8px] mt-[6px] font-[16px] font-semibold'}
    >
      {votes.map((vote) => (
        <li
          key={vote.tester}
          className={'h-[30px] px-[10px] flex flex-row justify-between bg-dark border border-[2px] border-border-dark rounded-[3px]'}
        >
          <span>{vote.tester}</span>
          <span>{vote.value}</span>
        </li>
      ))}
    </ul>
  </div>
)

const Notes = () => (
  <div className={'flex flex-col'}>
    <h2 className={'text-primary font-[16px] font-semibold'}>Notes</h2>
    <textarea
      placeholder={'Private notes of CGA Team'}
      type="text"
      rows={4}
      className={'h-full w-[375px] p-[10px] mt-[6px] font-[16px] font-semibold bg-dark border border-[2px] border-border-dark rounded-[3px] outline-none resize-none'}
    />
  </div>
)
