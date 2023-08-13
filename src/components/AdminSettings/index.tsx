import { Classification } from './Classification'
import { Notes } from './Notes'
import { Votes } from './Votes'
import type { AuthentificatedUser } from '../../db/supabase/auth'
import type { PostDetails } from '../../db/prisma/queries'
import { useAdminSettings } from './useAdminSettings'

type AdminSettingsProps = {
  details: PostDetails;
  user: AuthentificatedUser;
};

const AdminSettings = (props: AdminSettingsProps) => {
  const {
    gameClassification,
    gameplayClassification,
    notes,
    votes,
    onChangeGameClassification,
    setGameplayClassificationOnChange,
    onChangeNotes,
  } = useAdminSettings(props.details)

  return (
    <div
      className={'h-[250px] flex bg-border-light shadow-dark rounded-[12px] p-[20px] justify-between'}
    >
      <Classification
        gameClassification={gameClassification}
        onChangeGameClassification={onChangeGameClassification}
        gameplayClassification={gameplayClassification}
        setGameplayClassification={setGameplayClassificationOnChange}
      />
      <Votes
        voces={votes}
        testerId={props.user.id}
        postId={props.details.id}
      />
      <Notes notes={notes} onChangeNotes={onChangeNotes} />
    </div>
  )
}

export default AdminSettings
