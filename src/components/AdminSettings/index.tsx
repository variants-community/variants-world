import { Classification } from 'components/AdminSettings/Classification'
import { Notes } from 'components/AdminSettings/Notes'
import { Votes } from 'components/AdminSettings/Votes'
import { useAdminSettings } from 'components/AdminSettings/use-admin-settings'
import type { AuthentificatedUser } from 'db/supabase/auth'
import type { PostDetails } from 'db/prisma/queries'

type AdminSettingsProps = {
  details: PostDetails
  user: AuthentificatedUser
}

const AdminSettings = (props: AdminSettingsProps) => {
  const {
    gameClassification,
    gameplayClassification,
    notes,
    votes,
    onChangeGameClassification,
    setGameplayClassificationOnChange,
    onChangeNotes
  } = useAdminSettings(props.details)

  return (
    <div
      class={
        'flex flex-col justify-between p-5 gap-[40px] sm:flex-col lg:(h-63 flex-row gap-0) bg-border-light shadow-dark rounded-xl'
      }
    >
      <Classification
        gameClassification={gameClassification}
        onChangeGameClassification={onChangeGameClassification}
        gameplayClassification={gameplayClassification}
        setGameplayClassification={setGameplayClassificationOnChange}
      />
      <Votes voces={votes} testerId={props.user.id} postDetailsId={props.details.id} />
      <Notes notes={notes} onChangeNotes={onChangeNotes} />
    </div>
  )
}

export default AdminSettings
