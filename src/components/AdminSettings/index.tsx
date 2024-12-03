import { Classification } from 'components/AdminSettings/Classification'
import { Notes } from 'components/AdminSettings/Notes'
import { VotingTool } from 'components/AdminSettings/VotingTool'
import { useAdminSettings } from 'components/AdminSettings/use-admin-settings'
import type { PostDetails } from 'db/prisma/queries'

type AdminSettingsProps = {
  details: PostDetails
  testerId?: number
}

const AdminSettings = (props: AdminSettingsProps) => {
  const {
    gameClassification,
    gameplayClassification,
    notes,
    votes,
    setVotes,
    onChangeGameClassification,
    setGameplayClassificationOnChange,
    onChangeNotes
  } = useAdminSettings(props.details)

  return (
    <div
      class={
        'flex flex-col justify-between p-5 gap-[40px] sm:flex-col lg:(h-63 flex-row gap-0) bg-border-light shadow-dark rounded-xl'
      }
      style={{ viewTransitionName: 'card-admin' }}
    >
      <Classification
        gameClassification={gameClassification}
        onChangeGameClassification={onChangeGameClassification}
        gameplayClassification={gameplayClassification}
        setGameplayClassification={setGameplayClassificationOnChange}
      />
      <VotingTool votes={votes} testerId={props.testerId ?? -1} postDetailsId={props.details.id} setVotes={setVotes} />
      <Notes notes={notes} onChangeNotes={onChangeNotes} />
    </div>
  )
}

export default AdminSettings
